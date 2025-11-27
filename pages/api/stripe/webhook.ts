// /pages/api/stripe/webhook.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
import { buffer } from "micro";
import { markPaid, setCustomer, upsertOrder } from "@/lib/ordersTemp";
import Stripe from "stripe";


export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const sig = req.headers["stripe-signature"] as string;
  const buf = await buffer(req);

  try {
    const event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);

   // /pages/api/stripe/webhook.ts (inside checkout.session.completed)
if (event.type === "checkout.session.completed") {
  const session = event.data.object as any;
  const sessionId = session.id as string;

  const customerId = session.customer as string | undefined;
  const email = session.customer_details?.email as string | undefined;

  let receiptUrl: string | undefined;

  if (session.payment_intent) {
    // Retrieve PaymentIntent and *treat it* as a PaymentIntent (ignore Response wrapper)
    const pi = (await stripe.paymentIntents.retrieve(
      session.payment_intent as string,
      { expand: ["latest_charge"] }
    )) as unknown as Stripe.PaymentIntent;

    // latest_charge can be an ID or an expanded Charge object
    let chargeId: string | undefined;

    if (typeof pi.latest_charge === "string") {
      chargeId = pi.latest_charge;
    } else if (pi.latest_charge && typeof pi.latest_charge === "object") {
      // when expanded, latest_charge is a Charge object
      chargeId = (pi.latest_charge as Stripe.Charge).id;
    }

    if (chargeId) {
      const charge = await stripe.charges.retrieve(chargeId);
      receiptUrl = charge.receipt_url ?? undefined;
    }
  }

  // Use the helper we defined earlier in /lib/ordersTemp.ts
  markPaid(sessionId, receiptUrl);
  if (customerId) setCustomer(sessionId, customerId, email);

  return res.json({ received: true });


  }} catch (err: any) {
    console.error(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
