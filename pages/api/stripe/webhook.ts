// /pages/api/stripe/webhook.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import {
  attachCheckoutSessionToOrder,
  findOrderBySessionId,
  findOrderBySubscriptionId,
  markOrderPaidBySubscriptionId,
} from "@/lib/db/orders";
import {
  upsertInstallmentPlan,
  updateInstallmentProgress,
  markInstallmentCompleted,
} from "@/lib/db/installmentPlans";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function readRawBody(req: NextApiRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks);
}

function logJson(obj: Record<string, any>) {
  console.log(JSON.stringify(obj));
}

// Dev-only idempotency
const seenEventIds = new Set<string>();

function constructEventWithAnySecret(
  rawBody: Buffer,
  signature: string,
  secrets: string[],
): Stripe.Event {
  let lastErr: unknown = null;

  for (const secret of secrets) {
    if (!secret) continue;
    try {
      return stripe.webhooks.constructEvent(rawBody, signature, secret);
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr ?? new Error("No webhook secret matched");
}

function getSubscriptionIdFromInvoice(invoice: Stripe.Invoice): string | null {
  const anyInv = invoice as any;

  // Classic location
  if (typeof anyInv.subscription === "string") return anyInv.subscription;

  // Newer nested location (seen in your payload)
  const parentSub = anyInv?.parent?.subscription_details?.subscription;
  if (typeof parentSub === "string") return parentSub;

  // Fallback: first line item parent details
  const lineSub =
    anyInv?.lines?.data?.[0]?.parent?.subscription_item_details?.subscription;
  if (typeof lineSub === "string") return lineSub;

  return null;
}

/**
 * Installment logic runs ONLY for subscriptions that have:
 *   subscription.metadata.payment_plan === "true"
 *   subscription.metadata.installments is a number > 1
 *
 * DB behavior:
 * - Ensure installment_plans row exists (self-healing) using orders.stripe_subscription_id join
 * - Update paid_count each time a paid invoice arrives
 * - Cancel subscription + mark plan completed once paid_count >= installments
 */
async function handleInstallmentPaidInvoice(
  invoice: Stripe.Invoice,
  event: Stripe.Event,
) {
  const subscriptionId = getSubscriptionIdFromInvoice(invoice);

  if (!subscriptionId) {
    logJson({
      type: "installment.skip_no_subscription",
      event_type: event.type,
      event_id: event.id,
      invoice_id: invoice.id,
    });
    return;
  }

  // Pull subscription metadata (payment_plan/installments)
  let sub: Stripe.Subscription;
  try {
    sub = await stripe.subscriptions.retrieve(subscriptionId);
  } catch (e: any) {
    logJson({
      type: "installment.subscription_missing",
      event_type: event.type,
      event_id: event.id,
      invoice_id: invoice.id,
      subscription_id: subscriptionId,
      message: e?.message || "subscription retrieve failed",
    });
    return;
  }

  const isPlan = sub.metadata?.payment_plan === "true";
  const installmentsRaw = sub.metadata?.installments;
  const installments = installmentsRaw ? Number(installmentsRaw) : NaN;

  // Not an installment plan => do nothing (protects Care/SEO/etc.)
  if (!isPlan || !Number.isFinite(installments) || installments <= 1) {
    logJson({
      type: "installment.not_a_plan",
      event_type: event.type,
      event_id: event.id,
      invoice_id: invoice.id,
      subscription_id: subscriptionId,
      payment_plan: sub.metadata?.payment_plan || null,
      installments: installmentsRaw || null,
    });
    return;
  }

  // Canonical count: list paid invoices for this subscription
  const paidInvoices = await stripe.invoices.list({
    subscription: subscriptionId,
    status: "paid",
    limit: 100,
  });
  const paidCount = paidInvoices.data.length;

  logJson({
    type: "installment.progress",
    event_type: event.type,
    event_id: event.id,
    invoice_id: invoice.id,
    subscription_id: subscriptionId,
    paidCount,
    installments,
  });

  /**
   * ✅ DB self-heal:
   * - If installment_plans row was never created (race, missing checkout event, etc.),
   *   create it now using the orders table (orders.stripe_subscription_id).
   *
   * NOTE: this requires findOrderBySubscriptionId to exist in /lib/db/orders.ts.
   * If you don't want to add it, remove this block and accept that progress updates
   * will silently affect 0 rows if the plan row doesn't exist.
   */
  try {
    const order = await findOrderBySubscriptionId(subscriptionId);
    if (order?.id) {
      await upsertInstallmentPlan({
        order_id: order.id,
        stripe_subscription_id: subscriptionId,
        installments,
      });
    } else {
      logJson({
        type: "installment.db_missing_order_for_subscription",
        subscription_id: subscriptionId,
        invoice_id: invoice.id,
        note: "No order row found with this stripe_subscription_id. Plan row cannot be created.",
      });
    }
  } catch (e: any) {
    logJson({
      type: "installment.db_upsert_plan_failed",
      subscription_id: subscriptionId,
      invoice_id: invoice.id,
      message: e?.message || "unknown",
    });
  }

  // Update DB progress (paid_count)
  await updateInstallmentProgress({
    stripe_subscription_id: subscriptionId,
    paid_count: paidCount,
  });

  if (paidCount >= installments) {
    // Cancel subscription in Stripe
    try {
      await stripe.subscriptions.cancel(subscriptionId);
      logJson({
        type: "subscription.canceled_by_installment_rule",
        subscription_id: subscriptionId,
        paidCount,
        installments,
      });
    } catch (e: any) {
      logJson({
        type: "installment.cancel_failed_but_ok",
        subscription_id: subscriptionId,
        message: e?.message || "cancel failed",
      });
    }

    // Mark plan completed in DB
    await markInstallmentCompleted({ stripe_subscription_id: subscriptionId });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const sigHeader = req.headers["stripe-signature"];
  const sig = Array.isArray(sigHeader) ? sigHeader[0] : sigHeader;
  if (!sig) return res.status(400).send("Missing signature");

  let event: Stripe.Event;

  try {
    const rawBody = await readRawBody(req);

    const secrets = [
      process.env.STRIPE_WEBHOOK_SECRET_LOCAL || "", // Stripe CLI
      process.env.STRIPE_WEBHOOK_SECRET || "", // Dashboard endpoint
    ];

    if (!secrets.some(Boolean)) return res.status(500).send("Webhook not configured");

    event = constructEventWithAnySecret(rawBody, sig, secrets);
  } catch (err: any) {
    logJson({
      type: "webhook.signature_verification_failed",
      message: err?.message || "unknown",
    });
    return res.status(400).send("Invalid signature");
  }

  if (seenEventIds.has(event.id)) {
    return res.status(200).json({ received: true, deduped: true });
  }
  seenEventIds.add(event.id);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const internalSessionId =
          (session.client_reference_id as string | null) ||
          session.metadata?.session_id ||
          null;

        logJson({
          type: event.type,
          event_id: event.id,
          stripe_checkout_session_id: session.id,
          mode: session.mode,
          payment_status: session.payment_status,
          subscription: session.subscription,
          client_reference_id: session.client_reference_id,
          metadata: session.metadata,
        });

        // Attach Stripe identifiers to Orders row (by internal session id)
        if (internalSessionId) {
          await attachCheckoutSessionToOrder({
            session_id: internalSessionId,
            stripe_checkout_session_id: session.id,
            stripe_payment_intent_id:
              typeof session.payment_intent === "string" ? session.payment_intent : null,
            stripe_subscription_id:
              typeof session.subscription === "string" ? session.subscription : null,
            stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
            customer_email:
              session.customer_details?.email || session.customer_email || null,
            markPaid: session.payment_status === "paid",
          });
        }

        // Create installment_plans row if this checkout is a plan
        const isPlan = session.metadata?.payment_plan === "true";
        const installments = Number(session.metadata?.installments || "0");
        const subId = typeof session.subscription === "string" ? session.subscription : null;

        if (
          internalSessionId &&
          isPlan &&
          subId &&
          Number.isFinite(installments) &&
          installments > 1
        ) {
          const order = await findOrderBySessionId(internalSessionId);
          if (order?.id) {
            await upsertInstallmentPlan({
              order_id: order.id,
              stripe_subscription_id: subId,
              installments,
            });
          } else {
            logJson({
              type: "installment.db_missing_order_for_session",
              session_id: internalSessionId,
              subscription_id: subId,
              note: "No order row found for this internal session id.",
            });
          }
        }

        break;
      }

      // Older/common event
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInstallmentPaidInvoice(invoice, event);

        // Mark order paid for subscription invoices
        const subscriptionId = getSubscriptionIdFromInvoice(invoice);
        if (subscriptionId) await markOrderPaidBySubscriptionId(subscriptionId);

        break;
      }

      // What you are receiving in your logs
      case "invoice_payment.paid": {
        const invoicePayment = event.data.object as any;
        const invoiceId =
          typeof invoicePayment?.invoice === "string" ? invoicePayment.invoice : null;

        if (!invoiceId) {
          logJson({
            type: "installment.skip_no_invoice_id",
            event_type: event.type,
            event_id: event.id,
          });
          break;
        }

        const invoice = (await stripe.invoices.retrieve(invoiceId)) as Stripe.Invoice;
        await handleInstallmentPaidInvoice(invoice, event);

        const subscriptionId = getSubscriptionIdFromInvoice(invoice);
        if (subscriptionId) await markOrderPaidBySubscriptionId(subscriptionId);

        break;
      }

      // Log only (avoid double-cancel)
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        logJson({
          type: event.type,
          event_id: event.id,
          invoice_id: invoice.id,
          note: "Logged only (plan logic handled by invoice.paid / invoice_payment.paid).",
        });
        break;
      }

      default: {
        logJson({ type: event.type, event_id: event.id });
        break;
      }
    }

    return res.status(200).json({ received: true });
  } catch (err: any) {
    logJson({
      type: "webhook.handler_error",
      event_id: event.id,
      event_type: event.type,
      message: err?.message || "unknown",
    });
    return res.status(500).send("Webhook handler error");
  }
}
