/// /lib/catalog/data.ts

import type { Offer } from "./types";


const img = (n: number) => `/images/placeholders/ph-${n}.jpg`;
export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function getPriceSignal(o: Offer) {
  if (!o.startingAtCents) return "";
  const base = `From ${formatMoney(o.startingAtCents)}`;
  return o.cadence === "monthly" ? `${base}/mo` : base;
}

export function getPrimaryCtaLabel(o: Offer) {
  switch (o.cta) {
    case "Buy":
      return "View System";
    case "Subscribe":
      return "View Plan";
    case "Apply":
      return "Apply";
    case "BookCall":
      return "Book Session";
    default:
      return "View";
  }
}

export function trackShopEvent(event: string, payload: Record<string, any>) {
  if (typeof window === "undefined") return;
  (window as any).__btl_shop_events = (window as any).__btl_shop_events || [];
  (window as any).__btl_shop_events.push({ event, payload, ts: Date.now() });
}

export const OFFERS: Offer[] = [
  {
    id: "starter_system",
    slug: "starter-system",
    title: "Starter System",
    category: "Build",
    stage: "Foundation",
    // overwrite with plain-English outcome
    promise: "A simple website that makes your business look legit and gets you calls.",
    // optional: add supporting line (kept in your schema)
    subpromise:
      "Clean, fast, and built so customers trust you and know how to reach you.",
    bestFor:
      "Owners starting out or fixing a bad site who want something solid, not fancy.",
    startingAtCents: 200000,
    cadence: "one_time",
    cta: "Buy",
    badge: "Foundation",
    isFeatured: true,

    // added: receipt-test copy (safe to ignore in UI until you use it)
    outcomeHeadline:
      "A simple website that makes your business look legit and gets you calls.",
    outcomeNarrative:
      "We build a clean, fast site so customers trust you, understand what you do, and contact you.",
    deliverablesIntro: "You get:",
    deliverables: [
      "Mobile-friendly website built for service businesses",
      "Clear service pages that explain what you do",
      "Call buttons and contact forms wired to you",
      "Basic local SEO setup so people can find you",
      "A foundation you won’t need to redo in a year",
    ],
  },

  {
    id: "revenue_engine",
    slug: "revenue-engine",
    title: "Revenue Engine",
    category: "Build",
    stage: "MostChosen",
    // overwrite with plain-English outcome
    promise:
      "A website that reliably turns visitors into phone calls and booked jobs.",
    subpromise:
      "We wire your site so the right people find you, trust you, and contact you — without guessing what’s working.",
    bestFor:
      "Owners who depend on their business income and want predictable leads.",
    startingAtCents: 480000,
    cadence: "one_time",
    cta: "Buy",
    badge: "Most Chosen",
    isFeatured: true,

    // added: receipt-test copy
    outcomeHeadline:
      "A website that reliably turns visitors into phone calls and booked jobs.",
    outcomeNarrative:
      "We wire your site so the right people find you, trust you, and contact you — without guessing what’s working.",
    deliverablesIntro: "You get:",
    deliverables: [
      "Everything in the Starter System",
      "Conversion-focused pages built to get leads",
      "Call and form tracking so results aren’t a mystery",
      "A simple dashboard showing what produces revenue",
      "A system you can improve instead of replacing",
    ],
  },

  {
    id: "growth_partner",
    slug: "growth-partner",
    title: "Growth Partner",
    category: "Growth",
    stage: "Ongoing",
    // overwrite with plain-English outcome
    promise:
      "Ongoing improvements so your system makes more money over time.",
    subpromise:
      "We review what’s happening, fix what’s leaking, and improve what’s working — every month.",
    bestFor:
      "Owners playing the long game who want a real partner, not a freelancer.",
    cadence: "application",
    cta: "Apply",
    badge: "Ongoing",
    isFeatured: true,

    // added: receipt-test copy
    outcomeHeadline:
      "Ongoing improvements so your system makes more money over time.",
    outcomeNarrative:
      "We review what’s happening, fix what’s leaking, and improve what’s working — every month.",
    deliverablesIntro: "You get:",
    deliverables: [
      "Monthly performance review",
      "Clear priorities on what to improve next",
      "Improvements shipped to pages and tracking",
      "Simple reporting that shows what changed",
    ],
  },

  // SUPPORT / CARE
  {
    id: "care_plan",
    slug: "care-plan",
    title: "Hosting & Care Plan",
    category: "Care",
    stage: "Support",
    // already aligned; keep but tighten slightly
    promise:
      "Your site stays fast, secure, and working — without you thinking about it.",
    subpromise:
      "We handle updates, monitoring, and backups so nothing quietly breaks.",
    bestFor: "Owners who want zero headaches and zero downtime.",
    startingAtCents: 19900,
    cadence: "monthly",
    cta: "Subscribe",

    // added: receipt-test copy
    outcomeHeadline:
      "Your site stays fast, secure, and working — without you thinking about it.",
    outcomeNarrative:
      "We keep things updated, monitored, and running so leads don’t break and pages don’t go down.",
    deliverablesIntro: "You get:",
    deliverables: [
      "Managed hosting and SSL",
      "Updates and security maintenance",
      "Monitoring and backups",
      "Small fixes so leads don’t break",
    ],
  },

  // GROWTH ADD-ONS
  {
    id: "seo_maintenance",
    slug: "local-seo-maintenance",
    title: "Local SEO Maintenance",
    category: "Growth",
    stage: "Support",
    // overwrite into plain English
    promise: "Help more local customers find you on Google each month.",
    subpromise:
      "We keep your local presence accurate, active, and improving over time.",
    bestFor:
      "Local service businesses that want steady visibility without guessing.",
    startingAtCents: 30000,
    cadence: "monthly",
    cta: "Subscribe",

    outcomeHeadline: "Help more local customers find you on Google each month.",
    outcomeNarrative:
      "We maintain and improve your local visibility so you show up more often for the searches that matter.",
    deliverablesIntro: "You get:",
    deliverables: [
      "Ongoing local SEO maintenance",
      "Consistency checks (business info, listings, key pages)",
      "Ongoing improvements based on what’s working",
      "Simple reporting so you can see progress",
    ],
  },

  {
    id: "seo_momentum",
    slug: "seo-momentum",
    title: "SEO Momentum",
    category: "Growth",
    stage: "Support",
    // overwrite into plain English
    promise: "Build steady Google visibility so you get more calls over time.",
    subpromise:
      "We improve your pages and add content so you climb without shady tactics.",
    bestFor:
      "Service businesses that want consistent progress without aggressive SEO games.",
    startingAtCents: 60000,
    cadence: "monthly",
    cta: "Subscribe",

    outcomeHeadline:
      "Build steady Google visibility so you get more calls over time.",
    outcomeNarrative:
      "We improve your on-page content and structure so you earn more discovery month after month.",
    deliverablesIntro: "You get:",
    deliverables: [
      "On-page improvements to key service pages",
      "Content updates that support rankings and conversions",
      "Ongoing optimization based on performance",
      "Simple reporting so you can track progress",
    ],
  },

  // ASSETS
  {
    id: "copywriting",
    slug: "copywriting",
    title: "Copywriting & Content",
    category: "Assets",
    stage: "Support",
    // overwrite into plain English
    promise: "Clear words that make people trust you and take action.",
    subpromise:
      "We write service messaging that explains what you do and why you’re the right choice.",
    bestFor:
      "Owners who know they’re good — but their website doesn’t explain it.",
    startingAtCents: 69000,
    cadence: "one_time",
    cta: "Buy",

    outcomeHeadline: "Clear words that make people trust you and take action.",
    outcomeNarrative:
      "We rewrite or write your pages so customers understand you fast and feel confident calling.",
    deliverablesIntro: "You get:",
    deliverables: [
      "Professional service-page copy written for real customers",
      "Clear structure: problem → solution → proof → next step",
      "Edits for clarity, trust, and conversions",
      "Copy that supports basic search visibility",
    ],
  },

  // CONVERSION BRIDGE
  {
    id: "revenue_roadmap",
    slug: "revenue-roadmap",
    title: "Revenue Roadmap Session",
    category: "Assets",
    stage: "Foundation",
    // overwrite into plain English (keeps your intent)
    promise: "Find what’s broken online and what to fix next.",
    subpromise:
      "A working session that shows where money is leaking and what actually matters.",
    bestFor: "Owners who want answers before spending more money.",
    startingAtCents: 25000,
    cadence: "one_time",
    cta: "BookCall",

    outcomeHeadline: "Find what’s broken online and what to fix next.",
    outcomeNarrative:
      "We review your site and visibility, then give you a clear plan you can follow.",
    deliverablesIntro: "You get:",
    deliverables: [
      "Review of your site and traffic",
      "Clear diagnosis of problems",
      "Written action plan after the call",
    ],
  },
];



