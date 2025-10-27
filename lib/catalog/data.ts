// /lib/catalog/data.ts
import type { Product, Stage } from "./types";

export const STAGES: Stage[] = [
  { id: "websites",   label: "Websites",   blurb: "Launch fast, convert clearly.", order: 1 },
  { id: "care",       label: "Care Plan",  blurb: "Hosting + backups + edits.",    order: 2 },
  { id: "maintenance",label: "Maintenance",blurb: "Updates and uptime, no hosting.",order: 3 },
  { id: "seo",        label: "SEO",        blurb: "From visibility to dominance.", order: 4 },
  { id: "ads",        label: "Paid Ads",   blurb: "Immediate, measurable leads.",  order: 5 },
];

const img = (n: number) => `/images/placeholders/ph-${n}.jpg`; // 4:3

export const PRODUCTS: Product[] = [
  // Websites
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
    blurb: "Credible, fast, mobile-first site that actually gets you calls.",
    pricing: {
      model: "one_time",
      minCents: 150000,
      maxCents: 500000,
      cadence: "project",
    },
    isFeatured: true,
    tags: ["website","nextjs","tailwind","seo","forms"],
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
    blurb: "Turns clicks into booked jobs—proof, urgency, and trackable CTAs.",
    pricing: {
      model: "one_time",
      minCents: 300000,
      maxCents: 700000,
      cadence: "project",
    },
    tags: ["conversion","analytics","schema","tracking"],
  },

  // Care Plan (recurring)
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
    blurb: "Your site stays fast, safe, and fresh—so you don’t lose leads.",
    pricing: {
      model: "recurring",
      minCents: 15000,
      maxCents: 30000,
      cadence: "month",
    },
    tags: ["care","hosting","backups","ssl","updates"],
  },

  // Maintenance (recurring)
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
    blurb: "Lightweight reliability if you self-host—no broken-site panic.",
    pricing: {
      model: "recurring",
      minCents: 10000,
      maxCents: 15000,
      cadence: "month",
    },
    tags: ["maintenance","updates","uptime","ssl"],
  },

  // SEO (recurring) — Light
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
    blurb: "Visibility maintenance that starts moving the needle locally.",
    pricing: {
      model: "recurring",
      minCents: 30000,
      maxCents: 50000,
      cadence: "month",
    },
    tags: ["seo","local","citations","backlinks","reporting"],
  },

  // SEO (recurring) — Advanced
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
    blurb: "Scale traffic and leads with content + authority building.",
    pricing: {
      model: "recurring",
      minCents: 100000,
      maxCents: 200000,
      cadence: "month",
    },
    tags: ["seo","content","backlinks","analytics","cro"],
  },

  // Ads (recurring) — mgmt fee (note)
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
    blurb: "Immediate, measurable lead flow while SEO ramps up.",
    pricing: {
      model: "recurring",
      minCents: 100000,
      maxCents: 150000,
      cadence: "month",
      note: "+ ad spend",
    },
    tags: ["ads","google","retargeting","landing","roi"],
  },
];
