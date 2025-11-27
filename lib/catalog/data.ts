// /lib/catalog/data.ts

import type { Product, Stage } from "./types";

 export const STAGES: Stage[] = [
  { id: "websites",   label: "Websites",   blurb: "Launch fast, convert clearly.", order: 1 },
  { id: "care",       label: "Care Plan",  blurb: "Hosting + backups + edits.",    order: 2 },
  { id: "maintenance",label: "Maintenance",blurb: "Updates and uptime, no hosting.",order: 3 },
  { id: "seo",        label: "SEO",        blurb: "From visibility to dominance.", order: 4 },
  { id: "ads",        label: "Paid Ads",   blurb: "Immediate, measurable leads.",  order: 5 },
];
const img = (n: number) => `/images/placeholders/ph-${n}.jpg`;

export const PRODUCTS: Product[] = [
  {
    id: "p_web_build",
    slug: "website-build",
    title: "Website Build",
    stage: "websites",
    image: img(1),
    rating: 4.8,
    ratingCount: 37,
    duration: "14–21 day build",
    includes: [
      "Next.js + Tailwind custom design",
      "Home/Services/Contact/About (+ Gallery/Blog optional)",
      "Lead forms w/ email/SMS",
      "GBP & Maps integration",
      "On-page SEO basics (meta/schema/alt)",
      "Image optimization + SSL/hosting setup",
    ],
    excludes: [
      "Paid ad management",
      "Advanced SEO/content retainers",
      "Custom web-app features (dashboards/portals)",
      "Stock photo licenses beyond standard",
    ],
    requirements: ["Logo/brand files", "Service list + cities", "Domain/registrar access", "Timely feedback"],
    timeline: "Typical build is 2–3 weeks with 2 feedback cycles.",
    faq: [
      { q: "Do you write all content?", a: "We lightly edit for clarity. Full copywriting is an add-on." },
      { q: "Can I add pages later?", a: "Yes—via Care Plan or hourly updates." },
    ],
    reviews: [{ author: "S. Greene", quote: "Clean, fast launch and calls started coming in.", rating: 5 }],
    blurb: "Credible, fast, mobile-first site that actually gets you calls.",
    pricing: { model: "one_time", minCents: 150000, maxCents: 500000, cadence: "project", tiers: [
  {
    key: "basic",
    label: "Basic",
    fullCents: 150000,
    blurb: "Launch fast with a tight 4-page site.",
    includes: [
      "1 design concept",
      "Up to 4 pages (Home/Services/About/Contact)",
      "1 lead form + email notify",
      "On-page SEO basics",
      "Up to 5 stock images"
    ],
    excludes: ["Copywriting", "Blog/CMS", "A/B tests", "Custom animations"]
  },
  {
    key: "standard",
    label: "Standard",
    fullCents: 200000,
    blurb: "Conversion-first pages + basic testing.",
    includes: [
      "Everything in Basic",
      "Up to 6 pages + 1 landing page",
      "Light copy edits",
      "Basic schema markup",
      "1 A/B headline test",
      "GA4 goal setup"
    ],
    excludes: ["Long-form copy", "Advanced animations"]
  },
  {
    key: "pro",
    label: "Pro",
    fullCents: 300000,
    blurb: "Scale-ready build with CRO and CMS.",
    includes: [
      "Everything in Standard",
      "Up to 10 pages",
      "Blog setup + CMS (Services/Projects)",
      "Advanced schema",
      "2 A/B tests",
      "Animation polish + speed budget"
    ],
    excludes: ["Custom web-app features"]
  },
], },
    
    isFeatured: true,
  //  stripePriceId?: string;            // used for pay-in-full OR subscriptions
  // stripeDepositPriceId?: string;     // 50% deposit (Checkout)
  // stripeRemainderPriceId?: string;   // 50% remainder (Invoice)
    tags: ["website","nextjs","tailwind","seo","forms"],
    upsell: ["care-plan", "light-seo"]
  },
  {
  id: "p_web_spa",
  slug: "single-page-applications",
  title: "Single Page Applications",
  stage: "websites",
  image: img(8),
  rating: 4.7,
  ratingCount: 28,
  duration: "2–4 week build",
  includes: [
    "Next.js app shell + client routing",
    "Design tokens (Tailwind) + responsive UI",
    "Auth scaffold (email link/passwordless)",
    "On-page SEO basics for landing shell",
  ],
  excludes: [
    "Complex multi-tenant roles",
    "Large-scale reporting pipelines",
    "Offline-first with complex sync",
  ],
  requirements: [
    "Primary user roles",
    "List of key screens/flows",
    "Brand tokens or palette",
  ],
  timeline: "2–4 weeks depending on features & integrations.",
  faq: [
    { q: "Can we add features later?", a: "Yes—via Care/Maintenance or a follow-on scope." },
    { q: "Is the app SEO-friendly?", a: "Landing shell is optimized; auth-gated screens are app-first." },
  ],
  reviews: [{ author: "K. Tran", quote: "Snappy, clean, easy to maintain.", rating: 5 }],
  blurb: "Fast, app-like experiences with smooth navigation and modern UX.",
  pricing: {
    model: "one_time",
    cadence: "project",
    tiers: [
      {
        key: "basic",
        label: "Basic",
        fullCents: 199000,
        blurb: "Proof-of-concept SPA with a polished UI shell.",
        includes: [
          "App shell + routing",
          "2–3 key screens (Dashboard/Profile/Settings)",
          "Auth (email link/passwordless)",
          "Design system baseline",
        ],
        excludes: ["Complex roles/permissions", "Realtime features", "External API beyond auth"],
        // stripeDepositPriceId: "price_dep_spa_basic_50",
        // stripeRemainderPriceId: "price_rem_spa_basic_50",
      },
      {
        key: "standard",
        label: "Standard",
        fullCents: 349000,
        blurb: "Data-backed SPA with CRUD flows and a light admin.",
        includes: [
          "Everything in Basic",
          "CRUD data (Supabase or equivalent)",
          "Role-aware nav (user/admin)",
          "1 integration (email/storage/webhook)",
          "Optimistic form UX",
        ],
        excludes: ["Multi-tenant ACL", "Advanced offline mode"],
        // stripeDepositPriceId: "price_dep_spa_std_50",
        // stripeRemainderPriceId: "price_rem_spa_std_50",
      },
      {
        key: "pro",
        label: "Pro",
        fullCents: 599000,
        blurb: "Scale-ready SPA: roles, integrations, and realtime polish.",
        includes: [
          "Everything in Standard",
          "Roles/permissions matrix",
          "2 integrations (payments-lite/search/maps/etc.)",
          "Realtime refresh/toasts",
          "Performance budget + Lighthouse pass",
        ],
        excludes: ["Marketplace billing", "Complex reporting"],
        // stripeDepositPriceId: "price_dep_spa_pro_50",
        // stripeRemainderPriceId: "price_rem_spa_pro_50",
      },
    ],
  },
  isFeatured: false,
  tags: ["nextjs","spa","auth","dashboard","tailwind"],
  upsell: ["care-plan","monthly-maintenance","light-seo"],
},
{
  id: "p_web_ecom",
  slug: "e-commerce-development",
  title: "E-commerce Development",
  stage: "websites",
  image: img(9),
  rating: 4.8,
  ratingCount: 31,
  duration: "3–6 week build",
  includes: [
    "Modern storefront with secure checkout",
    "Product detail + trust patterns",
    "On-page SEO basics + product schema",
  ],
  excludes: [
    "Photography",
    "International tax automation",
    "ERP integrations",
  ],
  requirements: [
    "Product list with pricing/variants",
    "Policy decisions (shipping/returns)",
    "Brand tokens or palette",
  ],
  timeline: "3–6 weeks depending on tier & catalog size.",
  faq: [
    { q: "Do you support subscriptions?", a: "Yes—included on Scale tier with Stripe subs." },
    { q: "Can we migrate from Shopify?", a: "Yes—light migrations possible (quoted separately)." },
  ],
  reviews: [{ author: "R. Diaz", quote: "Launched smoothly and converted day one.", rating: 5 }],
  blurb: "Modern storefronts with conversion best practices and secure checkout.",
  pricing: {
    model: "one_time",
    cadence: "project",
    tiers: [
      {
        key: "starter",
        label: "Starter",
        fullCents: 299000,
        blurb: "Launch a boutique shop with essentials done right.",
        includes: [
          "Up to 25 products (manual seed)",
          "Stripe Checkout (one-time)",
          "Cart-like flow + thank-you",
          "Product schema + SEO basics",
          "Order email notifications",
        ],
        excludes: ["Variants w/ complex pricing", "Subscriptions", "Inventory sync (ERP)"],
        // stripeDepositPriceId: "price_dep_ecom_starter_50",
        // stripeRemainderPriceId: "price_rem_ecom_starter_50",
      },
      {
        key: "standard",
        label: "Standard",
        fullCents: 499000,
        blurb: "Variants, basic inventory, and analytics for growth.",
        includes: [
          "Everything in Starter",
          "Variants (size/color) + price adjustments",
          "Basic inventory counts",
          "Promo/discount codes",
          "GA4 enhanced ecommerce events",
        ],
        excludes: ["Subscription proration", "Multi-warehouse logic"],
        // stripeDepositPriceId: "price_dep_ecom_std_50",
        // stripeRemainderPriceId: "price_rem_ecom_std_50",
      },
      {
        key: "scale",
        label: "Scale",
        fullCents: 799000,
        blurb: "Subscriptions, CMS content, and performance hardening.",
        includes: [
          "Everything in Standard",
          "Stripe subscriptions + basic customer portal",
          "CMS for blog/landing content",
          "Image CDN + perf budget",
          "Trust UX (badges, policies, returns)",
        ],
        excludes: ["Marketplace multi-seller payouts", "Complex tax automation across countries"],
        // stripeDepositPriceId: "price_dep_ecom_scale_50",
        // stripeRemainderPriceId: "price_rem_ecom_scale_50",
      },
    ],
  },
  isFeatured: false,
  tags: ["ecommerce","stripe","variants","seo","ga4"],
  upsell: ["care-plan","paid-ad-management","advanced-seo-growth"],
},
  {
    id: "p_web_lead_machine",
    slug: "lead-machine-website",
    title: "Lead Machine Website",
    stage: "websites",
    image: img(2),
    rating: 4.9,
    ratingCount: 24,
    duration: "21–28 day build",
    includes: [
      "Conversion-first layout + copy",
      "GA4 + call tracking + pixels",
      "Click-to-call + instant notifications",
      "Schema + local SEO markup",
      "Optional A/B headline tests",
    ],
    excludes: [
      "Paid ad budget",
      "Ongoing SEO retainers",
      "Call center/answering service",
    ],
    requirements: ["USP/offer details", "Testimonials/photos", "Tracking access (GA4/GSC)", "Landing page approvals"],
    timeline: "3–4 weeks including tracking setup and 1 round of A/B test.",
    faq: [
      { q: "Is ad spend included?", a: "No—management fee is separate from your ad budget." },
      { q: "Will you manage ongoing tests?", a: "Yes, via Care Plan or Ads Management." },
    ],
    reviews: [{ author: "J. Boyd", quote: "Night-and-day improvement in call volume.", rating: 5 }],
    blurb: "Turns clicks into booked jobs—proof, urgency, and trackable CTAs.",
    pricing: { model: "one_time", minCents: 300000, maxCents: 700000, cadence: "project", // /lib/catalog/data.ts (within websiteBuild.pricing.tiers)

 },
  //  stripePriceId?: string;            // used for pay-in-full OR subscriptions
  // stripeDepositPriceId?: string;     // 50% deposit (Checkout)
  // stripeRemainderPriceId?: string;   // 50% remainder (Invoice)
    tags: ["conversion","analytics","schema","tracking"],
    upsell: ["care-plan", "paid-ad-management", "advanced-seo-growth"]
  },

  {
    id: "p_care_plan",
    slug: "care-plan",
    title: "Hosting & Care Plan",
    stage: "care",
    image: img(3),
    rating: 4.7,
    ratingCount: 51,
    duration: "Monthly",
    includes: [
      "Managed hosting + SSL",
      "Weekly backups + restore support",
      "Core updates + security + uptime",
      "1–2 content edits/month",
      "Monthly performance report",
    ],
    excludes: [
      "Major redesigns or new features",
      "Paid ad management",
      "Advanced SEO/content production",
    ],
    requirements: ["Domain access for DNS", "Primary contact for approvals"],
    timeline: "Ongoing monthly service; reports every 30 days.",
    faq: [
      { q: "What if I need more edits?", a: "We can add blocks of hours or move to Maintenance." },
    ],
    reviews: [{ author: "L. James", quote: "Zero downtime, quick edits—peace of mind.", rating: 5 }],
    blurb: "Your site stays fast, safe, and fresh—so you don’t lose leads.",
    pricing: { model: "recurring", minCents: 15000, maxCents: 30000, cadence: "month" },
  //  stripePriceId?: string;            // used for pay-in-full OR subscriptions
  // stripeDepositPriceId?: string;     // 50% deposit (Checkout)
  // stripeRemainderPriceId?: string;   // 50% remainder (Invoice)
    tags: ["care","hosting","backups","ssl","updates"],
    upsell: ["light-seo"]
  },

  {
    id: "p_maintenance",
    slug: "monthly-maintenance",
    title: "Monthly Maintenance",
    stage: "maintenance",
    image: img(4),
    rating: 4.5,
    ratingCount: 33,
    duration: "Monthly",
    includes: [
      "Core updates (framework/deps)",
      "Uptime & SSL checks",
      "Bug fixes (<1 hr/mo)",
      "Quarterly health report",
    ],
    excludes: ["Hosting/servers", "Content edits beyond bug fixes", "New pages/components"],
    requirements: ["Access to code repo/hosting", "Point of contact for approvals"],
    timeline: "Ongoing monthly; quarterly deep check.",
    faq: [{ q: "Self-hosted okay?", a: "Yes—this plan is for self-hosted setups." }],
    reviews: [{ author: "H. Patel", quote: "No more surprise breaks after updates.", rating: 4 }],
    blurb: "Lightweight reliability if you self-host—no broken-site panic.",
    pricing: { model: "recurring", minCents: 10000, maxCents: 15000, cadence: "month" },
  //  stripePriceId?: string;            // used for pay-in-full OR subscriptions
  // stripeDepositPriceId?: string;     // 50% deposit (Checkout)
  // stripeRemainderPriceId?: string;   // 50% remainder (Invoice)
    tags: ["maintenance","updates","uptime","ssl"],
    upsell: ["care-plan"]
  },

  {
    id: "p_seo_light",
    slug: "light-seo",
    title: "Light SEO",
    stage: "seo",
    image: img(5),
    rating: 4.6,
    ratingCount: 58,
    duration: "Monthly",
    includes: [
      "GBP optimization (posts, photos, services)",
      "On-page SEO (titles/headers/schema)",
      "Local citations + 1–2 backlinks/month",
      "Monthly ranking report (5–10 keywords)",
    ],
    excludes: ["Long-form content/blogs", "Aggressive link building", "Paid ads"],
    requirements: ["Access to GA4/GSC/GBP", "Brand photos/services list"],
    timeline: "First results typically 4–8 weeks for local terms.",
    faq: [
      { q: "Do you guarantee rankings?", a: "No—SEO is competitive. We report improvements monthly." },
    ],
    reviews: [{ author: "C. Nguyen", quote: "Steady climb in calls after 6 weeks.", rating: 5 }],
    blurb: "Visibility maintenance that starts moving the needle locally.",
    pricing: { model: "recurring", minCents: 30000, maxCents: 50000, cadence: "month" },
  //  stripePriceId?: string;            // used for pay-in-full OR subscriptions
  // stripeDepositPriceId?: string;     // 50% deposit (Checkout)
  // stripeRemainderPriceId?: string;   // 50% remainder (Invoice)
    tags: ["seo","local","citations","backlinks","reporting"],
    upsell: ["advanced-seo-growth", "paid-ad-management"]
  },

  {
    id: "p_seo_advanced",
    slug: "advanced-seo-growth",
    title: "Advanced SEO / Growth",
    stage: "seo",
    image: img(6),
    rating: 4.7,
    ratingCount: 29,
    duration: "Monthly",
    includes: [
      "All from Light SEO",
      "2–4 blog posts/month",
      "Authority backlink outreach",
      "Competitor gap analysis + CRO",
      "GA4 + GSC deep reporting",
    ],
    excludes: ["Paid ad budget", "PR retainers"],
    requirements: ["Subject matter inputs", "Review cycles for blogs"],
    timeline: "Compounding growth; evaluate quarterly.",
    faq: [{ q: "Content approvals?", a: "Yes—drafts shared prior to publishing." }],
    reviews: [{ author: "D. Romero", quote: "Traffic doubled over a quarter.", rating: 5 }],
    blurb: "Scale traffic and leads with content + authority building.",
    pricing: { model: "recurring", minCents: 100000, maxCents: 200000, cadence: "month" },
  //  stripePriceId?: string;            // used for pay-in-full OR subscriptions
  // stripeDepositPriceId?: string;     // 50% deposit (Checkout)
  // stripeRemainderPriceId?: string;   // 50% remainder (Invoice)
    tags: ["seo","content","backlinks","analytics","cro"],
    upsell: ["care-plan", "paid-ad-management"]
  },

  {
    id: "p_ads_mgmt",
    slug: "paid-ad-management",
    title: "Paid Ad Management",
    stage: "ads",
    image: img(7),
    rating: 4.4,
    ratingCount: 22,
    duration: "Monthly",
    includes: [
      "Google Ads setup + management",
      "Retargeting campaigns",
      "Landing page design + tracking",
      "Monthly ROI report",
    ],
    excludes: ["Ad spend budget", "Organic SEO work"],
    requirements: ["Billing method for ads", "Geo/keyword targets", "Offer/USP"],
    timeline: "Leads as soon as approved; optimize weekly.",
    faq: [{ q: "Is ad spend included?", a: "No—management covers setup/optimization only." }],
    reviews: [{ author: "R. Cole", quote: "Phone started ringing the first week.", rating: 4 }],
    blurb: "Immediate, measurable lead flow while SEO ramps up.",
    pricing: { model: "recurring", minCents: 100000, maxCents: 150000, cadence: "month", note: "+ ad spend" },
  //  stripePriceId?: string;            // used for pay-in-full OR subscriptions
  // stripeDepositPriceId?: string;     // 50% deposit (Checkout)
  // stripeRemainderPriceId?: string;   // 50% remainder (Invoice)
    tags: ["ads","google","retargeting","landing","roi"],
    upsell: ["lead-machine-website"]
  },
  {
  id: "p_seo_copy",
  slug: "copywriting-content",
  title: "Copywriting & Content",
  stage: "seo",
  image: img(10),
  rating: 4.6,
  ratingCount: 42,
  duration: "7–21 day delivery (tier-based)",
  includes: [
    "Brand voice calibration (brief)",
    "SEO-aligned structure (H1–H3, meta hints)",
    "Proofread & ready-to-publish text",
  ],
  excludes: [
    "Stock photography",
    "Design/layout beyond text delivery",
    "Programmatic SEO at scale (separate scope)",
  ],
  requirements: [
    "Services list + USP",
    "Target audience and geography",
    "Reference examples (if any)",
  ],
  timeline: "Tier-based turnaround with 1–2 rounds of edits.",
  faq: [
    { q: "Can you match my voice?", a: "Yes—voice brief & samples help us nail tone." },
    { q: "Do you upload to my site?", a: "Yes via Care/Maintenance or as an add-on." },
  ],
  reviews: [{ author: "M. Holt", quote: "Clean, persuasive, and on-brand.", rating: 5 }],
  blurb: "Clear, conversion-focused words that sound like you and rank well.",
  pricing: {
    model: "one_time",
    cadence: "project",
    tiers: [
      {
        key: "pages-4",
        label: "Website Copy — 4 Pages",
        fullCents: 69000, // $690
        blurb: "Tight, polished copy for small service sites.",
        includes: [
          "Home, Services, About, Contact (or similar 4)",
          "Voice brief + 1 revision round",
          "SEO titles/meta suggestions",
        ],
        excludes: ["Long-form content", "Landing page CRO testing"],
        // stripeDepositPriceId: "price_dep_copy_4_50",
        // stripeRemainderPriceId: "price_rem_copy_4_50",
      },
      {
        key: "pages-8",
        label: "Website Copy — 8 Pages",
        fullCents: 119000, // $1,190
        blurb: "Deeper breadth for growing sites or multi-service.",
        includes: [
          "Up to 8 core pages",
          "2 revision rounds",
          "Internal linking map suggestions",
        ],
        excludes: ["Blog program", "Programmatic SEO"],
        // stripeDepositPriceId: "price_dep_copy_8_50",
        // stripeRemainderPriceId: "price_rem_copy_8_50",
      },
      {
        key: "blog-4",
        label: "Blog Pack — 4 Posts",
        fullCents: 99000, // $990
        blurb: "Topical cluster or monthly cadence starter.",
        includes: [
          "4 × ~800–1,000 words",
          "Keyword brief per post",
          "1 revision round per post",
        ],
        excludes: ["Link building", "Graphic creation"],
        // stripeDepositPriceId: "price_dep_blog_4_50",
        // stripeRemainderPriceId: "price_rem_blog_4_50",
      },
    ],
  },
  isFeatured: false,
  tags: ["copywriting","content","seo","website-copy","blogs"],
  upsell: ["advanced-seo-growth","light-seo","care-plan"],
},
];

// ── Products: Coaching (fixed-price, one-time) ──────────────────────────────
export const PRODUCT_COACH_CLARITY: Product = {
  id: "p_coach_clarity",
  slug: "clarity-purpose-coaching",
  title: "Clarity & Purpose Coaching",
  stage: "coaching",
  image: img(21),
  rating: 4.8,
  ratingCount: 19,
  duration: "60–90 min session",
  includes: [
    "Goal discovery worksheet",
    "Values & direction mapping",
    "Simple 30-day action plan",
  ],
  excludes: ["Therapy or medical advice", "Multi-month accountability"],
  requirements: ["Brief intake form before session"],
  timeline: "Book within 7 days; plan delivered within 24–48h.",
  faq: [
    { q: "Is this a one-off?", a: "Yes, but you can book follow-ups anytime." },
  ],
  reviews: [{ author: "A. Reyes", quote: "Left with clarity and momentum.", rating: 5 }],
  blurb: "Find direction and define your next steps with a concrete, simple plan.",
  pricing: { model: "one_time", cadence: "project", minCents: 9900, maxCents: 9900 },
  tags: ["coaching","clarity","purpose"],
  upsell: ["productivity-discipline-mastery"],
};

export const PRODUCT_COACH_CONFIDENCE: Product = {
  id: "p_coach_confidence",
  slug: "confidence-mindset-coaching",
  title: "Confidence & Mindset Coaching",
  stage: "coaching",
  image: img(22),
  rating: 4.7,
  ratingCount: 17,
  duration: "60–90 min session",
  includes: [
    "Limiting beliefs audit",
    "Mindset reframing exercises",
    "Daily micro-habits (2–3)",
  ],
  excludes: ["Clinical treatment", "Long-term therapy"],
  requirements: ["Short pre-session questionnaire"],
  timeline: "Session scheduled within 5–7 days; notes same day.",
  faq: [
    { q: "Do I get homework?", a: "Yes—light, practical exercises that stick." },
  ],
  reviews: [{ author: "J. Nolan", quote: "Real, practical confidence shifts.", rating: 5 }],
  blurb: "Break through self-doubt and install practical, confidence-building habits.",
  pricing: { model: "one_time", cadence: "project", minCents: 14900, maxCents: 14900 },
  tags: ["coaching","mindset","confidence"],
  upsell: ["clarity-purpose-coaching","productivity-discipline-mastery"],
};

export const PRODUCT_COACH_PRODUCTIVITY: Product = {
  id: "p_coach_productivity",
  slug: "productivity-discipline-mastery",
  title: "Productivity & Discipline Mastery",
  stage: "coaching",
  image: img(23),
  rating: 4.8,
  ratingCount: 21,
  duration: "75–90 min session",
  includes: [
    "Custom daily/weekly schedule template",
    "Anti-procrastination toolkit",
    "Habit tracking framework",
  ],
  excludes: ["Team workflows", "Corporate OKR setup"],
  requirements: ["Share typical week + 3 core goals"],
  timeline: "Templates delivered within 24–48h post-session.",
  faq: [
    { q: "Will you set up tools?", a: "We give templates and walk you through setup." },
  ],
  reviews: [{ author: "M. Chen", quote: "Finally a routine I can keep.", rating: 5 }],
  blurb: "Structure your day, kill procrastination, and lock in habits you’ll actually keep.",
  pricing: { model: "one_time", cadence: "project", minCents: 19900, maxCents: 19900 },
  tags: ["coaching","productivity","habits"],
  upsell: ["clarity-purpose-coaching"],
};

export const PRODUCT_COACH_ANXIETY: Product = {
  id: "p_coach_anxiety",
  slug: "overcoming-anxiety-stress-coaching",
  title: "Overcoming Anxiety & Stress Coaching",
  stage: "coaching",
  image: img(24),
  rating: 4.7,
  ratingCount: 14,
  duration: "60–90 min session",
  includes: [
    "Trigger mapping",
    "Breathing & grounding techniques",
    "Stress-reduction micro-routine",
  ],
  excludes: ["Medical diagnosis", "Emergency counseling"],
  requirements: ["Brief intake about stress patterns"],
  timeline: "Session within 7 days; routine delivered in 24h.",
  faq: [
    { q: "Is this therapy?", a: "No—coaching with practical tools; not medical care." },
  ],
  reviews: [{ author: "S. Dorsey", quote: "Simple tools that actually work.", rating: 5 }],
  blurb: "Practical tools to manage stress, calm your body, and regain control.",
  pricing: { model: "one_time", cadence: "project", minCents: 14900, maxCents: 14900 },
  tags: ["coaching","stress","anxiety"],
  upsell: ["confidence-mindset-coaching"],
};
