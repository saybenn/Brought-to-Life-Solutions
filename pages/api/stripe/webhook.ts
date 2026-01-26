// /pages/api/stripe/webhook.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

/**
 * Stripe Webhook (Pages Router)
 * - Verifies signature (STRIPE_WEBHOOK_SECRET)
 * - Handles:
 *   - checkout.session.completed (purchase confirmation signal)
 *   - invoice.paid (installment tracking + auto-close plan subscriptions)
 *   - invoice.payment_failed (ops visibility)
 *
 * IMPORTANT:
 * - bodyParser must be disabled to verify signature.
 */
export const config = {
  api: { bodyParser: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

async function readRawBody(req: NextApiRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks);
}

// Minimal idempotency (dev-only). In production, use a DB table.
const seenEventIds = new Set<string>();

function logJson(obj: Record<string, any>) {
  console.log(JSON.stringify(obj));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  let event: Stripe.Event;

  try {
    const webhookSecret = requireEnv("STRIPE_WEBHOOK_SECRET");
    const sig = req.headers["stripe-signature"];
    if (!sig || typeof sig !== "string") return res.status(400).send("Missing signature");

    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    // Never process unverified payloads
    return res.status(400).send("Invalid signature");
  }

  // Minimal idempotency (dev-only)
  if (seenEventIds.has(event.id)) return res.status(200).json({ received: true, deduped: true });
  seenEventIds.add(event.id);

  try {
    switch (event.type) {
      /**
       * 1) Purchase confirmation: session completed
       * Use this to create an internal "order" record later (DB),
       * or log now for MVP.
       */
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        logJson({
          type: event.type,
          event_id: event.id,
          created: event.created,
          session_id: session.id,
          mode: session.mode,
          payment_status: session.payment_status,
          subscription: session.subscription,
          client_reference_id: session.client_reference_id,
          metadata: session.metadata,
        });

        break;
      }

      /**
       * 2) Subscription installment payment: invoice paid
       * This is the canonical “money collected” signal for payment plans.
       * It also enforces your installment rule: cancel after N paid invoices.
       */
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;

        const subscriptionId = (invoice as any).subscription as string;
        if (!subscriptionId || typeof subscriptionId !== "string") {
          logJson({
            type: event.type,
            event_id: event.id,
            invoice_id: invoice.id,
            note: "No subscription on invoice; skipping.",
          });
          break;
        }

        // Load subscription to read metadata (payment_plan/installments)
        const sub = await stripe.subscriptions.retrieve(subscriptionId);

        const isPlan = sub.metadata?.payment_plan === "true";
        const installmentsRaw = sub.metadata?.installments;
        const installments = installmentsRaw ? Number(installmentsRaw) : NaN;

        // If not a payment plan, we still log for visibility and exit
        if (!isPlan || !Number.isFinite(installments) || installments <= 1) {
          logJson({
            type: event.type,
            event_id: event.id,
            invoice_id: invoice.id,
            subscription_id: subscriptionId,
            is_plan: isPlan,
            installments: installmentsRaw || null,
            note: "Not an installment plan; no auto-close action.",
          });
          break;
        }

        // Count paid invoices for this subscription
        // (For MVP scale, this is fine. If you scale, store counts in DB.)
        const paidInvoices = await stripe.invoices.list({
          subscription: subscriptionId,
          status: "paid",
          limit: 100,
        });

        const paidCount = paidInvoices.data.length;

        logJson({
          type: event.type,
          event_id: event.id,
          invoice_id: invoice.id,
          subscription_id: subscriptionId,
          paidCount,
          installments,
        });

        // Auto-close rule: cancel after N payments
        if (paidCount >= installments) {
          // Cancel subscription (stops future charges)
          await stripe.subscriptions.cancel(subscriptionId);

          logJson({
            type: "subscription.canceled_by_installment_rule",
            subscription_id: subscriptionId,
            paidCount,
            installments,
          });
        }

        break;
      }

      /**
       * 3) Payment failed: ops visibility
       * For MVP: log it. Later: email/Slack + pause work.
       */
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;

        logJson({
          type: event.type,
          event_id: event.id,
          invoice_id: invoice.id,
          subscription_id: (invoice as any).subscription as string | null,
          customer: invoice.customer || null,
          attempt_count: invoice.attempt_count ?? null,
          metadata: invoice.metadata || null,
        });

        break;
      }

      default: {
        // Keep noise low but visible
        logJson({ type: event.type, event_id: event.id });
        break;
      }
    }

    // Must return 200 quickly or Stripe retries
    return res.status(200).json({ received: true });
  } catch (err: any) {
    // Returning 500 causes Stripe to retry; that can be useful.
    logJson({
      type: "webhook.handler_error",
      event_id: event.id,
      event_type: event.type,
      message: err?.message || "unknown",
    });

    return res.status(500).send("Webhook handler error");
  }
}
