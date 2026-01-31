// /pages/api/orders/verify.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { attachCheckoutSessionToOrder } from "@/lib/db/orders";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const stripeSessionId =
    typeof req.query.session_id === "string" ? req.query.session_id : "";

  if (!stripeSessionId) {
    return res.status(400).json({ verified: false, error: "Missing session_id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

    const isPaidOneTime =
      session.mode === "payment" && session.payment_status === "paid";

    const isPaidSubscription =
      session.mode === "subscription" && !!session.subscription;

    const verified = isPaidOneTime || isPaidSubscription;

    const internalSessionId =
      (session.client_reference_id as string | null) ||
      session.metadata?.session_id ||
      null;

    if (verified && internalSessionId) {
      await attachCheckoutSessionToOrder({
        session_id: internalSessionId,
        stripe_checkout_session_id: session.id,
        stripe_payment_intent_id:
          typeof session.payment_intent === "string" ? session.payment_intent : null,
        stripe_subscription_id:
          typeof session.subscription === "string" ? session.subscription : null,
        stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
        customer_email: session.customer_details?.email || session.customer_email || null,
        // For payment mode, this is truly “paid” now.
        // For subscription mode, session.payment_status is usually "paid" for first invoice too.
        markPaid: session.payment_status === "paid",
      });
    }

    return res.status(200).json({
      verified,
      mode: session.mode,
      payment_status: session.payment_status,

      offer_id: session.metadata?.offer_id || null,
      offer_category: session.metadata?.offer_category || null,
      cta_location: session.metadata?.cta_location || null,

      session_id: internalSessionId || null,

      utm_source: session.metadata?.utm_source || null,
      utm_medium: session.metadata?.utm_medium || null,
      utm_campaign: session.metadata?.utm_campaign || null,
      utm_content: session.metadata?.utm_content || null,
      utm_term: session.metadata?.utm_term || null,

      payment_plan: session.metadata?.payment_plan || null,
      installments: session.metadata?.installments || null,
    });
  } catch (e: any) {
    return res.status(200).json({
      verified: false,
      error: e?.message || "Verification failed",
    });
  }
}
