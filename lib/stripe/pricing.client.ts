// lib/stripe/pricing.client.ts
export const OFFER_IDS = ["revenue_engine", "starter_system"] as const;
export type OfferId = (typeof OFFER_IDS)[number];

export type PricingClient = {
  offerId: OfferId;
  title: string;
  hasPlan: boolean;
  planLabel?: string;
  planHelperText?: string;
};

export const PRICING_CLIENT: Record<OfferId, PricingClient> = {
  revenue_engine: {
    offerId: "revenue_engine",
    title: "Revenue Engine",
    hasPlan: true,
    planLabel: "2-pay plan",
    planHelperText: "$2,400 today, $2,400 next month",
  },
  starter_system: {
    offerId: "starter_system",
    title: "Starter System",
    hasPlan: true,
    planLabel: "2-pay plan",
    planHelperText: "$1,000 today, $1,000 next month.",
  },
};
