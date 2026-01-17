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

export type Offer = {
  id: string;
  slug: string;
  title: string;
  outcomeHeadline: string;
  outcomeNarrative: string;
  deliverablesIntro: string;
  deliverables: string[];
  category: "Build" | "Care" | "Growth" | "Assets";
  stage: "Foundation" | "MostChosen" | "Ongoing" | "Support";
  promise: string;              // Outcome-first
  subpromise?: string;              // Outcome-first
  bestFor: string;              // Who this is for
  startingAtCents?: number;
  cadence: "one_time" | "monthly" | "application";
  cta: "Buy" | "Subscribe" | "Apply" | "BookCall";
  badge?: "Most Chosen" | "Foundation" | "Ongoing";
  isFeatured?: boolean;
};

// Product page detail model (maps 1:1 to your 6-section structure)
// /lib/catalog/types.ts

export type OfferDetail = {
  offerId: string;
  slug: string;
  title: string;

  // Section 1: Outcome Above the Fold
  hero: {
    eyebrow?: string;
    headline: string;
    subhead: string;

    // NEW: proof-of-results line (placed under subhead)
    proofLine?: string;
whyItExists?: string;

    // NEW: Perspective Lock diagnosis block (placed below CTA)
    perspectiveLock?: string;

    proofCue?: string; // e.g. "Most chosen..."
    primaryActionLabel: string;
    primaryActionTargetId: string;
   secondaryActionLabel: string;
   secondaryActionHref: string;
  };

  // Section 2: Before → After Shift
  shift: {
    title: string;
    before: string[];
    after: string[];
  };

  // Section 3: Receipt Test
  included: {
    title: string;
    intro?: string;
    groups?: Array<{
      title: string;
      items: string[];
    }>;
    items?: string[];

    // NEW: effort / ownership clarity line (placed under included list)
    effortLine?: string;

    note?: string;
  };

  // Section 4: Difference
  difference: {
    title: string;
    notThis: string[];
    thisIs: string[];
  };

  // Section 5: Fit
  fit: {
    title: string;
    goodFor: string[];
    notFor: string[];
  };

  // Section 6: Purchase / CTA
  purchase: {
    title: string;
    price: {
      display: string;
      cadence: "one_time" | "monthly" | "application";
      startingAtCents?: number;
    };

    stepsTitle: string;
    steps: string[];

    riskRemoval?: string[];

    // NEW: capacity-based scarcity line (placed above primary CTA)
    scarcityLine?: string;

    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
  };

  meta?: {
    title: string;
    description: string;
  };
};


// /data/caseStudies.ts
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
  role?: string;
};

export type CaseStudyCTA = {
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type CaseStudyMobileEvidence = {
  eyebrow: string;
  description: string;
};

export type CaseStudyAsset = {
  src: string; // must be in /public
  alt: string;
  kind: "photo" | "desktop" | "mobile";
};

export type CaseStudy = {
  slug: string;
  eyebrow: string; // e.g. "CASE STUDY"
  clientName: string;
  industry: string;
  location: string;

  heroHeadline: string;
  heroSubhead: string;

  // section: context
  contextLabel: string;
  contextBody: string[];
  contextPullQuote: string;

  // section: problem
  problemTitle: string;
  problemBullets: string[];
  problemCloser?: string;

  // section: system
  systemTitle: string;
  systemIntro: string;
  pillars: CaseStudyPillar[];

  // section: framework
  frameworkLabel: string;
  sockets: string[];
  socketsLine: string;

  // section: resulting system
  resultingTitle: string;
  resultingCaption: string;

  // section: outcomes
  outcomesTitle: string;
  outcomes: CaseStudyOutcome[];
  outcomesCloser?: string;

  testimonial: CaseStudyTestimonial;

  // section: qualification
  qualifyTitle: string;
  qualifyFor: string[];
  qualifyNotFor: string[];

  cta: CaseStudyCTA;

  mobileEvidence?: CaseStudyMobileEvidence;

  assets: {
    hero: CaseStudyAsset; // usually jobsite photo
    supportingHero: CaseStudyAsset; // usually jobsite photo
    evidence: CaseStudyAsset[]; // desktop/mobile screenshots etc
  };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "bold-city-iaq",
    eyebrow: "CASE STUDY",
    clientName: "Bold City IAQ",
    industry: "Water Restoration",
    location: "Jacksonville, FL",

    heroHeadline: "From invisible to 3× more calls",
    heroSubhead:
      "How a Jacksonville water restoration company replaced guesswork with a revenue-engineered web system.",

    contextLabel: "THE CONTEXT",
    contextBody: [
      "Bold City IAQ had the expertise, certifications, and real-world experience to handle serious restoration work.",
      "But online, that reality wasn’t translating. Their website wasn’t clearly communicating urgency, credibility, or scope — and as a result, both customers and search engines were overlooking them.",
    ],
    contextPullQuote: "The problem wasn’t effort. It was infrastructure.",

    problemTitle: "What actually needed fixing",
    problemBullets: [
      "Clarify services for people under stress",
      "Make emergency actions obvious on mobile",
      "Establish trust signals that match the real-world work",
      "Build a local visibility foundation Google can understand",
      "Create a site the owner is proud to share",
    ],
    problemCloser: "This wasn’t a redesign problem. It was a systems problem.",

    systemTitle: "The system we installed",
    systemIntro:
      "We approached Bold City IAQ the way we approach every emergency-driven business: by engineering clarity, speed, and trust into the system from the ground up.",

    pillars: [
      {
        title: "Real-world proof",
        bullets: [
          "On-site photography from actual cleanup work (no stock imagery)",
          "Visual credibility that matches the seriousness of the service",
          "A brand presence the owner can stand behind",
        ],
      },
      {
        title: "Emergency-first UX",
        bullets: [
          "Navigation designed for urgency, not browsing",
          "Clear service paths and high-signal hierarchy",
          "Calls-to-action placed with intent, not clutter",
        ],
      },
      {
        title: "Local visibility foundation",
        bullets: [
          "Jacksonville-focused structure and service clarity",
          "Fast, stable Next.js build for technical trust",
          "Clean indexing-friendly page structure",
        ],
      },
      {
        title: "Conversion discipline",
        bullets: [
          "Fewer choices, clearer next step",
          "Mobile treated as the primary surface",
          "Trust-first layout: proof before persuasion",
        ],
      },
    ],

    frameworkLabel: "THE FRAMEWORK BEHIND THE BUILD",
    sockets: [
      "Visibility",
      "Proof",
      "Conversion",
      "Offer Strength",
      "Operations",
      "Analytics",
    ],
    socketsLine: "When these are wired together, traffic stops being random.",

    resultingTitle: "The resulting system",
    resultingCaption:
      "A fast, focused site designed to handle urgency, establish trust, and convert local traffic into calls.",

    outcomesTitle: "What changed",
    outcomes: [
      {
        label: "Inbound calls",
        value: "≈ 3× increase",
        note: "Owner-reported after the new site went live.",
      },
      { label: "Inquiry consistency", value: "More steady inbound" },
      { label: "Owner confidence", value: "Proud to share the site" },
      { label: "Referrals", value: "Referred another restoration company" },
    ],
    outcomesCloser:
      "No gimmicks. No trends. Just a system doing its job when it matters.",

    testimonial: {
      quote:
        "“Sabin rebuilt our entire website, and it made all the difference. Professional, prompt, and easy to work with. After the new site went live, we started getting almost three times the calls.”",
      name: "Bold City IAQ",
      org: "Water Restoration & Mold Remediation",
    },

    qualifyTitle: "Who this is for",
    qualifyFor: [
      "Local service businesses that depend on inbound calls",
      "High-trust, high-urgency industries (restoration, HVAC, roofing, legal)",
      "Owners who want outcomes and clarity — not trend-driven design",
    ],
    qualifyNotFor: [
      "Template shoppers",
      "“Just make it look nice” redesigns with no system work",
      "Businesses unwilling to invest in fundamentals",
    ],

    cta: {
      heading: "Want predictable calls instead of guesswork?",
      body: "If you want clarity before committing, start with a strategy conversation. If you already know you need a system, view the build options.",
      primaryLabel: "Book strategy call",
      primaryHref: "/contact?intent=strategy",
      secondaryLabel: "View systems",
      secondaryHref: "/shop",
    },
mobileEvidence: {
  eyebrow: "MOBILE-FIRST EXPERIENCE",
  description:
    "Most emergency decisions happen on a phone. The system was designed accordingly.",
},
    // IMPORTANT: these paths must exist in /public
    assets: {
      hero: {
        src: "/images/case-studies/bold-city-iaq/jobsite.webp",
        alt: "Bold City IAQ technician working during restoration job (on-site proof photo).",
        kind: "photo",
      },
      supportingHero: {

          src: "/images/case-studies/bold-city-iaq/jobsite-02.webp",
          alt: "Bold City IAQ truck with debris image.",
          kind: "photo",
        
      },
      evidence: [
        {
          src: "/images/case-studies/bold-city-iaq/desktop-01.webp",
          alt: "Bold City IAQ website — desktop hero section.",
          kind: "desktop",
        },
        {
          src: "/images/case-studies/bold-city-iaq/desktop-02.webp",
          alt: "Bold City IAQ website — desktop contact + FAQ section.",
          kind: "desktop",
        },
        {
          src: "/images/case-studies/bold-city-iaq/desktop-03.webp",
          alt: "Bold City IAQ website — desktop services section.",
          kind: "desktop",
        },
        {
          src: "/images/case-studies/bold-city-iaq/mobile-03.webp",
          alt: "Bold City IAQ website — mobile hero section.",
          kind: "mobile",
        },
        {
          src: "/images/case-studies/bold-city-iaq/mobile-04.webp",
          alt: "Bold City IAQ website — mobile trust/certs section.",
          kind: "mobile",
        },
       
      ],
    },
  },
];

export const CASE_STUDY_BY_SLUG: Record<string, CaseStudy> = Object.fromEntries(
  CASE_STUDIES.map((c) => [c.slug, c])
);
