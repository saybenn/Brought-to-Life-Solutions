// /lib/catalog/types.ts

export type OfferStage =
  | "Starter"
  | "Build"
  | "Growth"
  | "Care"
  | "Assets"
  | "MostChosen"
  | "Foundation"
  | "Ongoing"
  | "Support"
  | string;

export type OfferCategory =
  | "BUILD"
  | "GROWTH"
  | "CARE"
  | "ASSETS"
  | "STARTER"
  | "Build"
  | "Growth"
  | "Care"
  | "Assets"
  | "Starter"
  | string;

export type OfferCadence =
  | "one_time"
  | "monthly"
  | "subscription"
  | "application"
  | string;

export type OfferCardCta =
  | "Buy"
  | "Subscribe"
  | "Apply"
  | "BookCall"
  | string;

export type PricingModel = "one_time" | "recurring" | "application" | string;

export type PricingCadence =
  | "month"
  | "year"
  | "one_time"
  | "application"
  | string;

export type PricingTier = {
  id?: string;
  label?: string;
  name?: string;
  fullCents: number;
  compareAtCents?: number;
  description?: string;
};

export type Pricing = {
  model: PricingModel;
  cadence?: PricingCadence;
  minCents?: number;
  maxCents?: number;
  tiers?: PricingTier[];
};

export type Offer = {
  offerId?: string;
  id: string;
  slug: string;
  title: string;
  category?: OfferCategory;
  stage?: OfferStage;
  badge?: string;
  isFeatured?: boolean;

  /**
   * Shop/catalog card fields.
   * These are used by /lib/catalog/offers.ts and shop/product card UI.
   */
  promise?: string;
  subpromise?: string;
  bestFor?: string;
  startingAtCents?: number;
  installFeeCents?: number;
  cadence?: OfferCadence;
  cta?: OfferCardCta;
  outcomeHeadline?: string;
  outcomeNarrative?: string;
  deliverablesIntro?: string;
  deliverables?: string[];
};

export type OfferCta = {
  label: string;
  href: string;
  analyticsLabel?: string;
  intent?: string;
};

export type OfferHero = {
  eyebrow: string;
  headline: string;
  subhead: string;
  whyItExists?: string;
  proofLine?: string;
  proofCue?: string;
  perspectiveLock?: string;
  primaryActionLabel?: string;
  primaryActionTargetId?: string;
  secondaryCta?: OfferCta;
};

export type OfferShift = {
  title: string;
  before: string[];
  after: string[];
};

export type OfferIncludedGroup = {
  title: string;
  items: string[];
};

export type OfferIncluded = {
  title: string;
  intro?: string;

  /**
   * Current product detail structure.
   */
  groups?: OfferIncludedGroup[];

  /**
   * Legacy / flat fallback structure used by some included sections.
   */
  items?: string[];

  effortLine?: string;
  note?: string;
};

export type OfferDifference = {
  title: string;
  notThis: string[];
  thisIs: string[];
};

export type OfferFit = {
  title: string;
  goodFor: string[];
  notFor: string[];
};

export type OfferPrice = {
  display: string;
  cadence: OfferCadence;
  startingAtCents?: number;
  installFeeCents?: number;
};

export type OfferPurchase = {
  title: string;
  price: OfferPrice;
  stepsTitle?: string;
  steps: string[];
  riskRemoval?: string[];
  scarcityLine?: string;
  primaryCta: OfferCta;
  secondaryCta?: OfferCta;
};

export type OfferMeta = {
  title: string;
  description: string;
};

export type OfferDetail = {
  offerId?: string;
  slug?: string;
  id?: string;
  title?: string;

  /**
   * Legacy booking hook used by /pages/api/intake/submit.ts.
   * Keep optional so current offers do not need it.
   */
  calendlySlug?: string;

  hero: OfferHero;
  shift?: OfferShift;
  included?: OfferIncluded;
  difference?: OfferDifference;
  fit?: OfferFit;
  purchase: OfferPurchase;
  meta: OfferMeta;
};

/**
 * Case study types.
 * Kept here because /components/case-study/CaseStudyPage.tsx imports
 * CaseStudy from "@/lib/catalog/types".
 */
export type CaseStudyImage = {
  src: string;
  alt: string;
};

export type CaseStudyEvidenceAsset = CaseStudyImage & {
  kind: "desktop" | "mobile" | string;
};

export type CaseStudyCta = {
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type CaseStudyPillar = {
  title: string;
  bullets: string[];
};

export type CaseStudyOutcome = {
  label: string;
  value: string;
  note?: string;
};

export type CaseStudyTestimonial = {
  quote: string;
  name: string;
  org: string;
};

export type CaseStudyMobileEvidence = {
  eyebrow: string;
  description: string;
};

export type CaseStudyAssets = {
  hero: CaseStudyImage;
  supportingHero: CaseStudyImage;
  evidence: CaseStudyEvidenceAsset[];
};

export type CaseStudyMeta = {
  title: string;
  description: string;
};

export type CaseStudy = {
  id?: string;
  slug: string;

  clientName: string;
  industry: string;
  location: string;

  eyebrow: string;
  heroHeadline: string;
  heroSubhead: string;

  contextLabel: string;
  contextBody: string[];
  contextPullQuote: string;

  problemTitle: string;
  problemBullets: string[];
  problemCloser?: string;

  systemTitle: string;
  systemIntro: string;
  pillars: CaseStudyPillar[];

  frameworkLabel: string;
  socketsLine: string;
  sockets: string[];

  resultingTitle: string;
  resultingCaption: string;
  mobileEvidence?: CaseStudyMobileEvidence;

  outcomesTitle: string;
  outcomes: CaseStudyOutcome[];
  outcomesCloser?: string;

  testimonial: CaseStudyTestimonial;

  qualifyTitle: string;
  qualifyFor: string[];
  qualifyNotFor: string[];

  cta: CaseStudyCta;

  assets: CaseStudyAssets;

  meta?: CaseStudyMeta;
};

/**
 * Compatibility exports for the current dynamic case-study route.
 * Replace these with real case-study records or re-export from a dedicated
 * /lib/catalog/caseStudies.ts data file when the data source is finalized.
 */
export const CASE_STUDIES: CaseStudy[] = [];

export const CASE_STUDY_BY_SLUG: Record<string, CaseStudy> =
  CASE_STUDIES.reduce<Record<string, CaseStudy>>((acc, study) => {
    acc[study.slug] = study;
    return acc;
  }, {});