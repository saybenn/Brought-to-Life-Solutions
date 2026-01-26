// lib/stripe/pricing.server.ts
import { requireEnv } from "./env";
import type { OfferId } from "./pricing.client";

export type OfferCategory = "build" | "sprint" | "retainer" | "addon";

export type PricingServer = {
  offerId: OfferId;
  offerCategory: OfferCategory;
  fullPriceId: string;
  plan?: {
    priceId: string;
    installments: number;
  };
};


export const PRICING_SERVER: Record<OfferId, PricingServer> = {
  revenue_engine: {
    offerId: "revenue_engine",
    offerCategory: "build",
    fullPriceId: requireEnv("STRIPE_PRICE_REVENUE_ENGINE_FULL"),
    plan: {
      priceId: requireEnv("STRIPE_PRICE_REVENUE_ENGINE_PLAN_2PAY"),
      installments: 2,
    },
  },
  starter_system: {
    offerId: "starter_system",
    offerCategory: "build",
    fullPriceId: requireEnv("STRIPE_PRICE_STARTER_FULL"),
    plan: {
      priceId: requireEnv("STRIPE_PRICE_STARTER_PLAN_2PAY"),
      installments: 2,
    },
  },
};
