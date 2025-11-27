export type StageId = "websites" | "care" | "maintenance" | "seo" | "ads";
export type Stage = { id: StageId; label: string; blurb: string; order: number };

export type QA = { q: string; a: string };
export type Review = { author: string; quote: string; rating?: number; date?: string };

export type PricingModel = "one_time" | "recurring";

export type Tier = {
  key: string;                 // "basic" | "standard" | "pro"
  label: string;               // "Basic"
  fullCents: number;           // 150000 ($1,500)
  blurb?: string;              // tier-specific promise
  includes?: string[];         // what’s added at this tier
  excludes?: string[];         // limits at this tier
  stripeDepositPriceId?: string;    // optional saved 50% Price
  stripeRemainderPriceId?: string;  // optional saved 50% Price
};

export type Pricing = {
  model: PricingModel;
  cadence?: "project" | "month" | "year";
  minCents?: number;          // derived when tiers exist (for cards/filters)
  maxCents?: number;          // derived when tiers exist
  tiers?: Tier[];             // for one_time products with ranges
  note?: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  blurb?: string;
  stage: string;
  image?: string;
  pricing: Pricing;
  flow?: "fast" | "book_first" | "invoice_first";             // UI default only
  stripePriceId?: string;            // used for pay-in-full OR subscriptions
  stripeDepositPriceId?: string;     // 50% deposit (Checkout)
  stripeRemainderPriceId?: string;   // 50% remainder (Invoice)
  duration?: string;      // “14–21 day build”
  includes: string[];
  // NEW (scope-protection):
  excludes?: string[];    // “Doesn’t include”
  requirements?: string[]; // “What we need from you”
  timeline?: string;      // short paragraph
  faq?: QA[];
  reviews?: Review[];
  upsell?: string[];      // slugs to promote
  // misc:
  rating?: number;
  ratingCount?: number;
  isFeatured?: boolean;
  tags?: string[];
    calendlySlug?: string;      // e.g., "btl/intro-call"

};
