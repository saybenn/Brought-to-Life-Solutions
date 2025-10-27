// /lib/catalog/types.ts
export type StageId =
  | "websites"
  | "care"
  | "maintenance"
  | "seo"
  | "ads";

export interface Stage {
  id: StageId;
  label: string;
  blurb?: string;
  order?: number;
}

export type PricingModel = "one_time" | "recurring";
export type PricingCadence = "month" | "year" | "project";

export interface Pricing {
  model: PricingModel;           // one_time | recurring
  minCents: number;              // lower bound in cents
  maxCents?: number;             // optional upper bound in cents
  cadence?: PricingCadence;      // e.g. 'month' for recurring, 'project' for one-time if you want
  note?: string;                 // e.g. "+ ad spend"
}

export interface Product {
  id: string;
  slug: string;                  // /product/[slug]
  title: string;
  stage: StageId;
  image: string;                 // 4:3 temporary placeholder
  rating: number;                // 0..5
  ratingCount: number;
  duration: string;              // e.g., "14–21 day build", "Monthly"
  includes: string[];            // first 2 surface in card
  blurb: string;                 // benefit-forward one-liner
  pricing: Pricing;              // <-- new
  isFeatured?: boolean;
  tags?: string[];
}
