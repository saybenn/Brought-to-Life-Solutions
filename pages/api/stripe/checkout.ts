// /pages/api/stripe/checkout.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { PRICING_SERVER } from "@/lib/stripe/pricing.server";
import { createOrderRow } from "@/lib/db/orders";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

const OFFER_MEMO: Record<string, string> = {
  starter_system:
    "Starter System: 5-page website foundation, call & form routing, basic tracking.",
  revenue_engine:
    "Revenue Engine: conversion-focused website, intent tracking, and performance dashboard.",
};

type Body = {
  offerId: string;
  paymentMode?: "full" | "plan";
  session_id: string;
  cta_location?: string;
  entry_path?: string;
  referrer?: string;
  utm?: Record<string, string | undefined>;
  email?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const {
      offerId,
      paymentMode = "full",
      session_id,
      cta_location,
      entry_path,
      referrer,
      utm,
      email,
    } = (req.body || {}) as Body;

    if (!offerId) return res.status(400).json({ error: "Missing offerId" });
    if (!session_id) return res.status(400).json({ error: "Missing session_id" });

    const cfg = PRICING_SERVER[offerId as keyof typeof PRICING_SERVER];
    if (!cfg) return res.status(400).json({ error: "Invalid offerId" });

    const wantsPlan = paymentMode === "plan";
    if (wantsPlan && !cfg.plan) {
      return res.status(400).json({ error: "Payment plan not available for this offer" });
    }

    const mode: "payment" | "subscription" = wantsPlan ? "subscription" : "payment";
    const priceId = wantsPlan ? cfg.plan!.priceId : cfg.fullPriceId;

    // ✅ Create internal order row BEFORE redirect (reliability)
    await createOrderRow({
      session_id,
      offer_id: cfg.offerId,
      offer_category: cfg.offerCategory,
      payment_plan: wantsPlan,
      installments: wantsPlan ? cfg.plan!.installments : 1,
      cta_location,
      entry_path,
      referrer,
      utm,
      customer_email: email,
    });

    const siteUrl = requireEnv("NEXT_PUBLIC_SITE_URL");
    const successUrl = `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${siteUrl}/checkout/canceled?offer_id=${encodeURIComponent(offerId)}`;

    const metadata: Record<string, string> = {
      offer_id: cfg.offerId,
      offer_category: cfg.offerCategory,
      payment_plan: wantsPlan ? "true" : "false",
      installments: wantsPlan ? String(cfg.plan!.installments) : "1",
      memo: OFFER_MEMO[cfg.offerId] || "",
      session_id,
      cta_location: cta_location || "",
      entry_path: entry_path || "",
      referrer: referrer || "",
      utm_source: utm?.utm_source || "",
      utm_medium: utm?.utm_medium || "",
      utm_campaign: utm?.utm_campaign || "",
      utm_content: utm?.utm_content || "",
      utm_term: utm?.utm_term || "",
    };

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: false,
      billing_address_collection: "auto",
      ...(email ? { customer_email: email } : {}),
      client_reference_id: session_id,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
      ...(mode === "subscription" ? { subscription_data: { metadata } } : {}),
    });

    return res.status(200).json({ url: session.url });
  } catch {
    return res.status(500).json({ error: "Checkout configuration error." });
  }
}
