// /lib/catalog/OfferDetails.ts
import type { OfferDetail } from "./types";

export const OFFER_DETAILS: Record<string, OfferDetail> = {
  // =========================
  // BUILD
  // =========================

  starter_system: {
    offerId: "starter_system",
    slug: "starter-system",
    title: "Starter System",

    hero: {
      eyebrow: "FOUNDATION",
      headline:
        "A simple website that makes your business feel legitimate and brings in real calls.",
      subhead:
        "Built for service businesses that need a solid foundation—something you can confidently send people to without planning to redo it next year.",
      whyItExists:
        "A lot of good businesses lose work for a quiet reason: their website doesn’t explain them clearly. This gives you a credible, call-ready foundation so customers understand what you do and feel comfortable reaching out.",
      proofLine:
        "Calls and form submissions go straight to you—no dashboards to babysit, no wondering where leads went.",
      proofCue: "Best for owners putting a real foundation in place for the first time.",
      perspectiveLock:
        "Most starter sites don’t fail because they look bad. They fail because they stay vague. Clarity is what turns visits into calls.",
      primaryActionLabel: "View what’s included",
      primaryActionTargetId: "included",
      secondaryActionLabel: "Talk first",
      secondaryActionHref: "/contact?intent=talk&offerId=starter_system",
    },

    shift: {
      title: "Before → After",
      before: [
        "You hesitate when someone asks for your website",
        "Visitors don’t quickly understand what you do",
        "Your business feels smaller online than it really is",
        "New work depends mostly on referrals or luck",
      ],
      after: [
        "A website you’re comfortable sending to anyone",
        "Clear service pages written in plain language",
        "Calls and form leads routed directly to you",
        "A foundation you can improve over time instead of starting over",
      ],
    },

 included: {
  title: "What you actually get",
  intro:
    "If you move forward, here’s what’s included—clearly scoped so you know exactly what you’re buying.",
  groups: [
    {
      title: "Website foundation",
      items: [
        "Mobile-friendly website built for service businesses",
        "Up to 5 core pages (typically: Home, Services, About, Contact + 1 extra page)",
        "Simple structure so customers understand you quickly",
      ],
    },
    {
      title: "Calls + contact wiring",
      items: [
        "Call buttons and contact forms wired directly to you",
        "Clear lead path so visitors know what to do next",
        "Basic tracking for intent (form submit + click-to-call)",
      ],
    },
    {
      title: "Findability baseline (setup, not ongoing SEO)",
      items: [
        "On-page basics: titles, meta descriptions, headers",
        "Google Business Profile checklist (setup or tune-up guidance)",
        "Foundation meant to last—not something you redo next year",
      ],
    },
    {
      title: "Review + revisions",
      items: [
        "2 structured revision rounds focused on clarity and accuracy",
        "Launch checklist + verification (forms, calls, key pages)",
      ],
    },
  ],
  effortLine:
    "We handle the build and wiring. You review and approve—nothing more.",
  note:
    "Clear scope. No surprise add-ons. If you need more pages or deeper tracking, that’s a different package.",
},


    difference: {
      title: 'How this is different from “a website”',
      notThis: [
        "This is not a pretty template with your logo slapped on it.",
        "This is not a vague ‘online presence’ project.",
      ],
      thisIs: [
        "A clean foundation built for real service customers.",
        "Clear pages + clear contact paths so calls are the natural next step.",
        "A site you can grow from instead of replacing.",
      ],
    },

    fit: {
      title: "Who it’s for (and who it’s not)",
      goodFor: [
        "Service businesses that need a credible foundation quickly",
        "Owners starting out or fixing a weak/dated site",
        "People who value clarity over fancy design",
      ],
      notFor: [
        "Hobby projects",
        "People shopping for the cheapest possible option",
        "Businesses unwilling to keep things simple and clear",
      ],
    },

    purchase: {
      title: "Ready when you are",
      price: {
        display: "From $2,000",
        cadence: "one_time",
        startingAtCents: 200000,
      },
      stepsTitle: "After routing:",
      steps: [
        "We onboard you and collect what we need (services, service area, basics)",
        "We draft the structure and core pages for clarity",
        "We build and wire calls/forms so leads reach you",
        "You review — we tighten anything unclear",
        "We launch and verify everything is working",
      ],
      riskRemoval: [
        "Clear scope up front — no surprise add-ons.",
        "You’ll know what’s included before you pay.",
        "Built to be improved over time — not replaced next year.",
      ],
      scarcityLine:
        "We take on a limited number of builds at a time so every system gets attention.",
      primaryCta: {
        label: "Start Starter System",
        href: "/products/starter-system?intent=buy&offerId=starter_system",
      },
      secondaryCta: {
        label: "Talk first",
        href: "/contact?intent=talk&offerId=starter_system",
      },
    },

    meta: {
      title: "Starter System | Brought to Life Solutions",
      description:
        "A simple website foundation that makes your business feel legitimate and brings in real calls — built for service businesses.",
    },
  },

  revenue_engine: {
    offerId: "revenue_engine",
    slug: "revenue-engine",
    title: "Revenue Engine",

    hero: {
      eyebrow: "BUILD",
      headline: "A website built to produce booked jobs—and show you where they come from.",
      subhead:
        "Built for service businesses that rely on steady income and need their website to do more than look professional.",
      whyItExists:
        "Too many service businesses keep paying for redesigns that feel productive but don’t change results. This system ends that loop by building a site that produces booked jobs—and makes it obvious what’s working and what isn’t.",
      proofLine:
        "You can see which pages generate calls—and which don’t—so decisions are based on evidence, not guesswork.",
      proofCue: "Most chosen by owners whose income depends on consistent performance.",
      perspectiveLock:
        "Most service websites fail quietly. They look fine, get visits, and still leave owners unsure whether the site is actually helping. This is built to be measured, adjusted, and trusted—like a system, not a gamble.",
      primaryActionLabel: "View what’s included",
      primaryActionTargetId: "included",
      secondaryActionLabel: "Talk first",
      secondaryActionHref: "/contact?intent=talk&offerId=revenue_engine",
    },

    shift: {
      title: "Before → After",
      before: [
        "You don’t know which pages actually bring in work",
        "Traffic numbers rise but calls don’t follow",
        "You’re unsure whether the site is helping or just existing",
        "Decisions are based on hunches and redesigns",
      ],
      after: [
        "Clear visibility into which pages drive calls",
        "A site designed around booking jobs, not just browsing",
        "Evidence you can act on instead of assumptions",
        "A system you can improve instead of replacing",
      ],
    },

included: {
  title: "What you actually get",
  intro:
    "If this is the right fit, here’s what’s included—scoped for performance, not excess.",
  groups: [
    {
      title: "Revenue-focused structure",
      items: [
        "Pages mapped to your revenue-producing services (not filler)",
        "Up to 8 pages total (commonly: Home, Services, 3–4 Service Pages, About, Contact/Booking)",
        "Clear paths that guide visitors toward booking",
        "High-visibility calls and forms wired straight to you",
      ],
    },
    {
      title: "Conversion clarity",
      items: [
        "Conversion structure on key pages: problem → solution → proof → next step",
        "CTA language aligned across the site so actions feel obvious",
      ],
    },
    {
      title: "Tracking clarity + dashboard (included)",
      items: [
        "GA4 + GTM setup for measurement",
        "Event tracking: CTA clicks, form submits, click-to-call",
        "Revenue Engine Dashboard (decision-focused): intent by source + by page + what to improve next",
        "Truth constraint: calls mean click-to-call unless true call tracking is added",
      ],
    },
    {
      title: "Call tracking options",
      items: [
        "Included: click-to-call tracking (measures call intent from the site)",
        "Optional add-on: tracked call numbers (measures actual calls + sources; monthly pass-through cost)",
      ],
    },
    {
      title: "Launch verification + handoff",
      items: [
        "Launch checklist + verification (events firing, forms working, routing confirmed)",
        "Simple post-launch summary: what’s working and what to improve next",
      ],
    },
    {
      title: "Review + revisions",
      items: [
        "2 structured revision rounds focused on clarity and conversion flow",
      ],
    },
  ],
  effortLine:
    "We handle the build, wiring, tracking, and dashboard. You review and approve—nothing more.",
  note:
    "The dashboard is built for decisions, not vanity metrics. You’ll be able to see which pages drive real intent and what to improve next.",
},


    difference: {
      title: "How this is different from “a redesign”",
      notThis: [
        "This is not a visual refresh hoping results improve.",
        "This is not a brochure site built to look nice.",
        "This is not ‘SEO magic.’",
      ],
      thisIs: [
        "A system designed around booked jobs.",
        "Pages built to earn trust, prompt action, and be measured.",
        "A foundation meant to be improved over time instead of rebuilt.",
      ],
    },

    fit: {
      title: "Who it’s for (and who it’s not)",
      goodFor: [
        "Owners who rely on their business income and need predictability",
        "Service businesses where phone calls and booked jobs matter most",
        "People tired of guessing whether their website works",
      ],
      notFor: [
        "Hobby projects or “just need something online”",
        "People shopping for the cheapest option",
        "Businesses unwilling to keep things clear and measurable",
      ],
    },

    purchase: {
      title: "Ready when you are",
      price: {
        display: "From $4,800",
        cadence: "one_time",
        startingAtCents: 480000,
      },
      stepsTitle: "After routing:",
      steps: [
        "We confirm fit and clarify scope",
        "We map pages around revenue-producing services",
        "We build and wire the system (pages, CTAs, tracking)",
        "You review — we tighten anything unclear",
        "We launch and verify everything is working",
      ],
      riskRemoval: [
        "Clear scope up front — no surprise add-ons.",
        "You’ll know what’s included before you pay.",
        "You’ll be able to see what’s working after launch.",
      ],
      scarcityLine:
        "We take on a limited number of builds at a time so every system gets attention.",
      primaryCta: {
        label: "Start Revenue Engine",
        href: "/checkout?offerId=revenue_engine&intent=buy",
      },
      secondaryCta: {
        label: "Start with a routing call",
        href: "/contact?section=revenue_engine&intent=talk&offerId=revenue_engine",
      },
    },

    meta: {
      title: "Revenue Engine | Brought to Life Solutions",
      description:
        "A conversion-focused website system built to generate calls and booked jobs—with tracking so you can see what works.",
    },
  },

  growth_partner: {
    offerId: "growth_partner",
    slug: "growth-partner",
    title: "Growth Partner",

    hero: {
      eyebrow: "ONGOING",
      headline: "Ongoing improvements so your system makes more money over time.",
      subhead:
        "Built for operators who want a real systems partner—not a freelancer, and not random marketing.",
      whyItExists:
        "After a launch, most businesses stall because nobody owns the monthly priorities. This keeps improvements shipping on a steady cadence so performance compounds instead of drifting.",
      proofLine:
        "Each month you get clear priorities, what changed, and what to do next.",
      proofCue: "Limited spots. Ongoing capacity-based partnership.",
      perspectiveLock:
        "Most growth work fails because it’s random. This is measured improvement, shipped consistently.",
      primaryActionLabel: "View what’s included",
      primaryActionTargetId: "included",
      secondaryActionLabel: "Talk first",
      secondaryActionHref: "/contact?intent=talk&offerId=growth_partner",
    },

    shift: {
      title: "Before → After",
      before: [
        "Your site sits unchanged for months",
        "You’re not sure what to improve first",
        "Marketing ideas come and go without a plan",
        "Results feel inconsistent",
      ],
      after: [
        "A monthly cadence of improvements that compound",
        "Clear priorities instead of guesswork",
        "Changes shipped to pages, tracking, and offers",
        "Simple reporting that shows what changed",
      ],
    },

    included: {
  title: "What you actually get",
  intro:
    "This is ongoing optimization. You’re paying for consistent improvements and clear direction—not busywork.",
  groups: [
    {
      title: "Monthly review + priorities",
      items: [
        "Monthly performance review (what changed, what’s working, what’s leaking)",
        "A short prioritized plan for the month (what we’re doing next and why)",
      ],
    },
    {
      title: "Improvements shipped",
      items: [
        "Up to 2 focused improvements shipped per month (pages, CTAs, tracking, clarity fixes)",
        "Implementation that compounds over time instead of random tactics",
      ],
    },
    {
      title: "Clarity reporting",
      items: [
        "Simple monthly recap: what shipped, what it impacts, what’s next",
        "Decision signals you can actually use (no vanity reporting)",
      ],
    },
  ],
  effortLine:
    "We handle the analysis and changes. You approve direction—nothing more.",
  note:
    "This is not unlimited work. It’s a steady cadence of high-leverage improvements.",
},


    difference: {
      title: "How this is different from typical “marketing help”",
      notThis: [
        "This is not a random list of marketing ideas.",
        "This is not selling you vague “growth.”",
        "This is not chasing every trend.",
      ],
      thisIs: [
        "A steady cadence: review → prioritize → ship improvements.",
        "Work grounded in what your site is actually doing.",
        "A partner that keeps your revenue system healthy and compounding.",
      ],
    },

    fit: {
      title: "Who it’s for (and who it’s not)",
      goodFor: [
        "Owners playing the long game who want compounding improvements",
        "Businesses already getting leads who want more predictability",
        "Operators who value clear priorities and execution",
      ],
      notFor: [
        "People who want instant results with no changes",
        "Businesses unwilling to track or improve anything",
        "Anyone shopping for the cheapest monthly retainer",
      ],
    },

    purchase: {
      title: "Ready when you are",
      price: { display: "Application", cadence: "application" },
      stepsTitle: "After approval:",
      steps: [
        "We review your current foundation and goals",
        "We agree on a monthly focus and success signals",
        "We run monthly review + ship improvements",
        "You receive a simple recap of what changed and what’s next",
      ],
      riskRemoval: [
        "You’ll always know what we’re working on and why.",
        "Changes are based on real performance, not guesses.",
        "You can pause if priorities change.",
      ],
      scarcityLine:
        "We take on a limited number of partners so the work stays high-attention.",
      primaryCta: {
        label: "Apply",
        href: "/products/growth-partner?intent=apply&offerId=growth_partner",
      },
      secondaryCta: {
        label: "Talk first",
        href: "/contact?intent=talk&offerId=growth_partner",
      },
    },

    meta: {
      title: "Growth Partner | Brought to Life Solutions",
      description:
        "An ongoing systems partnership: monthly review, clear priorities, improvements shipped, and simple reporting.",
    },
  },

  // =========================
  // CARE
  // =========================

  care_plan: {
    offerId: "care_plan",
    slug: "care-plan",
    title: "Hosting & Care Plan",

    hero: {
      eyebrow: "SUPPORT",
      headline: "Your site stays fast, secure, and working—without you thinking about it.",
      subhead:
        "Built for owners who want their website handled quietly and reliably in the background.",
      whyItExists:
        "Small sites rarely fail all at once. They break slowly—forms stop working, pages get sluggish, updates lapse—and leads quietly disappear. This keeps the system stable, monitored, and owned so problems are caught before they cost you work.",
      proofLine:
        "Updates, monitoring, and backups handled on a steady cadence.",
      proofCue: "Best for owners who want zero downtime and zero headaches.",
      perspectiveLock:
        "Most small business sites don’t crash. They decay. This plan exists to prevent that slow bleed.",
      primaryActionLabel: "View what’s included",
      primaryActionTargetId: "included",
      secondaryActionLabel: "Talk first",
      secondaryActionHref: "/contact?intent=talk&offerId=care_plan",
    },

    shift: {
      title: "Before → After",
      before: [
        "You notice problems after leads are already lost",
        "Slow pages and broken forms go unchecked",
        "Updates and fixes happen only when something breaks",
        "You don’t want to touch any of it",
      ],
      after: [
        "Your site stays monitored and maintained",
        "Basic issues get handled before they become disasters",
        "You have a clear owner for fixes and upkeep",
        "Your site stays reliable as a business tool",
      ],
    },

included: {
  title: "What you actually get",
  intro:
    "This is the maintenance layer that keeps your site stable so it can keep producing.",
  groups: [
    {
      title: "Hosting + stability",
      items: [
        "Reliable hosting",
        "Uptime monitoring + basic performance checks",
        "Backups + restore readiness",
        "Security hygiene and routine updates",
      ],
    },
    {
      title: "Ownership when things break",
      items: [
        "Issue troubleshooting and fixes when problems appear",
        "Form and lead-path verification checks (so leads don’t quietly disappear)",
      ],
    },
    {
      title: "Small updates (bounded)",
      items: [
        "Up to 60 minutes of small content updates per month (text swaps, image swaps, simple edits)",
        "Time includes communication and implementation",
        "Non-emergency response: within 2 business days",
        "Urgent issues (site down / forms broken): same or next business day",
      ],
    },
  ],
  effortLine:
    "We handle maintenance and fixes. You send requests when needed—nothing more.",
  note:
    "This covers upkeep and small changes. Additional time beyond 60 minutes is billed at a standard hourly rate or deferred to the next month—your choice.",
},


    difference: {
      title: "How this is different from “cheap hosting”",
      notThis: [
        "This is not ‘here’s a login, good luck.’",
        "This is not waiting until things break.",
      ],
      thisIs: [
        "A plan with ownership: upkeep, support, and stability.",
        "Reliability so your site keeps doing its job.",
      ],
    },

    fit: {
      title: "Who it’s for (and who it’s not)",
      goodFor: [
        "Owners who never want to think about the tech",
        "Businesses where every missed call matters",
        "Clients who want a dependable operator maintaining the system",
      ],
      notFor: [
        "People who want to self-host and self-manage everything",
        "Projects that don’t need any upkeep expectations",
      ],
    },

    purchase: {
      title: "Ready when you are",
      price: {
        display: "From $199/mo",
        cadence: "monthly",
        startingAtCents: 19900,
      },
      stepsTitle: "After routing:",
      steps: [
        "We connect hosting + access",
        "We verify key site functions (forms, calls, key pages)",
        "We maintain stability and handle small fixes as needed",
      ],
      riskRemoval: [
        "Clear expectations on what’s covered.",
        "No confusion about who owns fixes and upkeep.",
        "Support when something breaks.",
      ],
      primaryCta: {
        label: "Start Care Plan",
        href: "/products/care-plan?intent=subscribe&offerId=care_plan",
      },
      secondaryCta: {
        label: "Talk first",
        href: "/contact?intent=talk&offerId=care_plan",
      },
    },

    meta: {
      title: "Hosting & Care Plan | Brought to Life Solutions",
      description:
        "Monthly hosting + upkeep so your site stays fast, secure, and working — without you thinking about it.",
    },
  },

  // =========================
  // SEO
  // =========================

  seo_maintenance: {
    offerId: "seo_maintenance",
    slug: "local-seo-maintenance",
    title: "SEO Maintenance",

    hero: {
      eyebrow: "GROWTH",
      headline: "Steady local visibility on Google—without having to think about SEO.",
      subhead:
        "Built for service businesses that want consistent discovery without obsessing over rankings or tactics.",
      whyItExists:
        "Local visibility rarely collapses overnight. It fades when profiles go stale, pages stop getting updated, and no one is paying attention. This keeps the basics healthy month after month so your business doesn’t quietly slide backward.",
      proofLine: "Simple monthly reporting that shows what’s holding steady and what needs attention.",
      proofCue: "Best for owners who want steady visibility, not constant SEO work.",
      perspectiveLock:
        "Most local SEO doesn’t fail because it was done wrong. It fails because it’s neglected. This is quiet upkeep so visibility doesn’t drift while you’re focused on running the business.",
      primaryActionLabel: "View what’s included",
      primaryActionTargetId: "included",
      secondaryActionLabel: "Talk first",
      secondaryActionHref: "/contact?intent=talk&offerId=seo_maintenance",
    },

    shift: {
      title: "Before → After",
      before: [
        "Your Google visibility drifts over time",
        "Your GBP gets stale",
        "On-page basics go untouched",
        "You don’t know what to do next",
      ],
      after: [
        "Steady upkeep so your local presence stays healthy",
        "On-page improvements handled where needed",
        "Monthly check-ins so you’re not guessing",
        "Simple reporting + next steps",
      ],
    },

    included: {
  title: "What you actually get",
  intro:
    "This is steady local visibility upkeep—the basics done consistently, the right way.",
  groups: [
    {
      title: "Google Business Profile upkeep",
      items: [
        "Monthly GBP audit (categories, services, hours, links, consistency)",
        "1 GBP update per month (post or profile update as needed)",
      ],
    },
    {
      title: "On-page improvements ",
      items: [
        "Up to 2 on-page improvements per month (titles/meta/headers on priority pages)",
        "Basic technical hygiene checks (indexing signals, obvious issues)",
      ],
    },
    {
      title: "Cadence + reporting",
      items: [
        "Simple monthly update: what changed, what’s holding steady, what needs attention next",
        "Ethical approach only (no spam, no shady tactics)",
      ],
    },
  ],
  effortLine:
    "We handle the upkeep and improvements. You stay focused on running the business.",
  note:
    "This maintains and protects visibility. It does not promise instant rankings or aggressive growth.",
},


    difference: {
      title: "How this is different from “SEO magic”",
      notThis: [
        "This is not a guarantee of #1 rankings overnight.",
        "This is not spam backlinks or shady tricks.",
      ],
      thisIs: [
        "Steady local fundamentals that support discovery over time.",
        "Maintenance that prevents visibility from slipping.",
      ],
    },

    fit: {
      title: "Who it’s for (and who it’s not)",
      goodFor: [
        "Local service businesses that want steady visibility",
        "Owners who want SEO handled without drama",
        "Businesses that value consistency",
      ],
      notFor: [
        "People demanding instant rankings",
        "Businesses unwilling to be consistent with basics",
      ],
    },

    purchase: {
      title: "Ready when you are",
      price: {
        display: "From $300/mo",
        cadence: "monthly",
        startingAtCents: 30000,
      },
      stepsTitle: "After routing:",
      steps: [
        "We confirm your service area, categories, and priority keywords",
        "We run your baseline check (GBP + on-page essentials)",
        "We maintain cadence + ship improvements monthly",
        "You receive a simple update and next steps",
      ],
      riskRemoval: [
        "Clear monthly deliverables and cadence.",
        "Ethical approach — no shady tactics.",
        "Simple reporting so you know what’s happening.",
      ],
      primaryCta: {
        label: "Start SEO Maintenance",
        href: "/products/local-seo-maintenance?intent=subscribe&offerId=seo_maintenance",
      },
      secondaryCta: {
        label: "Talk first",
        href: "/contact?intent=talk&offerId=seo_maintenance",
      },
    },

    meta: {
      title: "SEO Maintenance | Brought to Life Solutions",
      description:
        "Steady local SEO upkeep: GBP updates, on-page improvements, and simple monthly reporting.",
    },
  },

  seo_momentum: {
    offerId: "seo_momentum",
    slug: "seo-momentum",
    title: "SEO Momentum",

    hero: {
      eyebrow: "GROWTH",
      headline: "Build steady Google visibility so you get more calls over time.",
      subhead:
        "Built for service businesses that want consistent progress without aggressive tactics.",
      whyItExists:
        "Many businesses never gain traction because nothing new gets published and key pages never get improved. This creates consistent momentum so visibility compounds over time.",
      proofLine:
        "You’ll see consistent publishing + on-page improvements on a set cadence.",
      proofCue: "Best for owners who want progress that compounds over time.",
      perspectiveLock:
        "Momentum comes from consistency. This is steady content + on-page improvement so visibility compounds.",
      primaryActionLabel: "View what’s included",
      primaryActionTargetId: "included",
      secondaryActionLabel: "Talk first",
      secondaryActionHref: "/contact?intent=talk&offerId=seo_momentum",
    },

    shift: {
      title: "Before → After",
      before: [
        "Your site stays static for months",
        "No consistent content to support search discovery",
        "Key pages don’t get improved",
        "Visibility growth feels stalled",
      ],
      after: [
        "Consistent publishing cadence that compounds",
        "On-page optimization across key pages",
        "Internal linking improvements",
        "Steady progress without shady tactics",
      ],
    },

included: {
  title: "What you actually get",
  intro:
    "This is the consistent work that builds long-term visibility: content + on-page optimization + structure.",
  groups: [
    {
      title: "Maintenance foundation",
      items: ["Everything in SEO Maintenance"],
    },
    {
      title: "Content cadence (defined)",
      items: [
        "1 optimized local content piece per month (typically 800–1,200 words)",
        "Includes publishing + basic on-page formatting + internal links",
        "Topic selection aligned to your services and customer questions",
      ],
    },
    {
      title: "Optimization + structure",
      items: [
        "On-page optimization across priority pages (beyond the 2 small tweaks in maintenance as needed)",
        "Internal linking improvements to support discovery and clarity",
      ],
    },
  ],
  effortLine:
    "We handle the publishing and optimization. You approve direction—nothing more.",
  note:
    "Built to compound month-to-month. No shortcuts. No spikes-and-drops work.",
},


    difference: {
      title: "How this is different from aggressive SEO",
      notThis: [
        "This is not spam backlinks or shortcuts.",
        "This is not chasing algorithm tricks.",
      ],
      thisIs: [
        "A steady system: publish consistently + improve key pages.",
        "Work that compounds when done monthly.",
      ],
    },

    fit: {
      title: "Who it’s for (and who it’s not)",
      goodFor: [
        "Businesses ready to invest steadily for long-term visibility and growth",
        "Owners who want progress without SEO drama",
        "Service businesses wanting more inbound calls over time",
      ],
      notFor: [
        "Anyone demanding instant rankings",
        "Businesses unwilling to be consistent month-to-month",
      ],
    },

    purchase: {
      title: "Ready when you are",
      price: {
        display: "From $600/mo",
        cadence: "monthly",
        startingAtCents: 60000,
      },
      stepsTitle: "After routing:",
      steps: [
        "We confirm goals, services, and priority topics",
        "We set a simple publishing cadence and page priorities",
        "We publish and optimize monthly",
        "You get a simple update showing what shipped and what’s next",
      ],
      riskRemoval: [
        "Clear cadence and deliverables.",
        "Ethical tactics only.",
        "Built to compound over time, not spike and die.",
      ],
      primaryCta: {
        label: "Start SEO Momentum",
        href: "/products/seo-momentum?intent=subscribe&offerId=seo_momentum",
      },
      secondaryCta: {
        label: "Talk first",
        href: "/contact?intent=talk&offerId=seo_momentum",
      },
    },

    meta: {
      title: "SEO Momentum | Brought to Life Solutions",
      description:
        "Ongoing content + on-page optimization to build steady Google visibility and more calls over time.",
    },
  },

  // =========================
  // ASSETS
  // =========================

  copywriting: {
    offerId: "copywriting",
    slug: "copywriting",
    title: "Copywriting & Content",

    hero: {
      eyebrow: "ASSETS",
      headline: "Clear copy that helps customers understand you fast—and take the next step.",
      subhead:
        "Built for owners who want professional messaging without wrestling the words.",
      whyItExists:
        "Most service sites don’t convert because the message stays vague—people land, don’t understand, and leave. This makes your offer clear and guides visitors toward action.",
      proofLine:
        "Your pages follow a simple structure: problem → solution → proof → next step.",
      proofCue: "Best for owners who know their site is unclear and want it fixed.",
      perspectiveLock:
        "Most websites don’t convert because the message is unclear. Clarity removes friction.",
      primaryActionLabel: "View what’s included",
      primaryActionTargetId: "included",
      secondaryActionLabel: "Talk first",
      secondaryActionHref: "/contact?intent=talk&offerId=copywriting",
    },

    shift: {
      title: "Before → After",
      before: [
        "Customers land on your page and still don’t ‘get it’",
        "Your services feel vague or generic",
        "People hesitate because trust isn’t built in the words",
        "Your CTA is weak or unclear",
      ],
      after: [
        "Customers understand what you do quickly",
        "Pages build confidence and reduce hesitation",
        "Clear next steps that increase calls/forms",
        "Messaging that supports conversion and basic search readability",
      ],
    },

    included: {
  title: "What you actually get",
  intro:
    "Written in human language and built to convert—without sounding like ‘agency copy.’",
  groups: [
    {
      title: "Conversion-focused copy (per page)",
      items: [
        "1 conversion-focused page written or rewritten (service page, homepage, or landing page)",
        "Clear structure: problem → solution → proof → next step",
        "CTA tightening so the next step feels obvious",
      ],
    },
    {
      title: "Finalize the message",
      items: [
        "2 revision rounds to finalize clarity and tone",
        "Delivered ready-to-publish",
      ],
    },
    {
      title: "Supports visibility",
      items: [
        "Basic search readability (headings + scannable structure)",
      ],
    },
  ],
  effortLine:
    "We write or rewrite the page. You approve the final version—nothing more.",
  note:
    "This price is per page. If you need multiple pages, we’ll scope it clearly before work begins.",
},


    difference: {
      title: "How this is different from ‘just writing words’",
      notThis: [
        "This is not generic filler copy.",
        "This is not writing that sounds good but says nothing.",
      ],
      thisIs: [
        "Message clarity built for service buyers.",
        "Structure that reduces confusion and increases action.",
      ],
    },

    fit: {
      title: "Who it’s for (and who it’s not)",
      goodFor: [
        "Owners who want to delegate the headache of writing",
        "Businesses that want clearer service pages and stronger CTAs",
        "Anyone who knows their site is unclear or generic",
      ],
      notFor: [
        "People who want ‘creative writing’ instead of conversion clarity",
        "Businesses unwilling to keep the message simple",
      ],
    },

    purchase: {
      title: "Ready when you are",
      price: {
        display: "From $690",
        cadence: "one_time",
        startingAtCents: 69000,
      },
      stepsTitle: "After routing:",
      steps: [
        "We collect what you do, who you serve, and what customers ask most",
        "We draft the copy in a conversion structure",
        "You review — we revise to finalize tone and clarity",
        "You receive ready-to-publish copy",
      ],
      riskRemoval: [
        "Clear scope before work begins.",
        "Revisions included to finalize clarity.",
        "Written for real customers, not ‘marketing people.’",
      ],
      primaryCta: {
        label: "Start Copywriting",
        href: "/products/copywriting?intent=buy&offerId=copywriting",
      },
      secondaryCta: {
        label: "Talk first",
        href: "/contact?intent=talk&offerId=copywriting",
      },
    },

    meta: {
      title: "Copywriting & Content | Brought to Life Solutions",
      description:
        "Clear service-page copy that reduces confusion and increases calls — without you wrestling the words.",
    },
  },
trust_asset_photography: {
  offerId: "trust_asset_photography",
  slug: "trust-asset-photography",
  title: "Trust Asset Photography",

  hero: {
    eyebrow: "ASSETS",
    headline: "Credibility-first photos that make calling feel safe.",
    subhead:
      "Built for service businesses whose website is structurally sound—but visually unconvincing (stock, phone pics, or nothing).",
    whyItExists:
      "Service businesses lose good work when their site feels generic or visually uncommitted. This exists to replace “vibes” photography with trust assets: the specific images your website needs to earn confidence and prompt contact.",
    proofLine:
      "Delivered organized by page-use, so the photos can be installed immediately—not sit in a folder.",
    proofCue:
      "Not a brand shoot. A trust upgrade for your revenue system.",
    perspectiveLock:
      "Most buyers don’t need more personality. They need to see real work and feel safe calling.",
    primaryActionLabel: "View what’s included",
    primaryActionTargetId: "included",
    secondaryActionLabel: "Talk first",
    secondaryActionHref: "/contact?intent=talk&offerId=trust_asset_photography",
  },

  shift: {
    title: "Before → After",
    before: [
      "Your site feels generic because it relies on stock photos",
      "Phone pictures undermine trust even when your work is solid",
      "Visitors can’t picture what working with you looks like",
      "You lose calls because the business feels unclear",
    ],
    after: [
      "Real visuals that match the quality of your work",
      "Trust built faster without over-explaining",
      "Clear proof moments (process, people, results) across the site",
      "Photos delivered in a way that’s easy to install and use",
    ],
  },

included: {
  title: "What you actually get",
  intro:
    "This is a web-first deliverable: a scoped shoot that produces the photos your website needs to earn trust and prompt action.",
  groups: [
    {
      title: "Shot planning ",
      items: [
        "Shot list tied to your hero, services, proof, and about sections",
        "Plan built around what customers need to see to feel safe calling",
      ],
    },
    {
      title: "On-site photography session",
      items: [
        "Up to 3 hours on location",
        "Guided capture of process + proof moments (real work, not staged lifestyle)",
      ],
    },
    {
      title: "Web-ready delivery",
      items: [
        "25 edited and web-optimized images (performance-friendly)",
        "Files named + organized by page-use for easy install",
        "Web usage rights for your site and owned channels",
      ],
    },
  ],
  effortLine:
    "We plan the shot list and run the session. You show up and do normal work—we capture it.",
  note:
    "You are not buying a giant gallery. You’re buying installable trust assets for conversion moments.",
},


  difference: {
    title: "How this is different from “brand photography”",
    notThis: [
      "This is not a lifestyle shoot for social content.",
      "This is not aesthetic direction or moodboards.",
      "This is not a massive gallery with no plan for usage.",
    ],
    thisIs: [
      "Photos chosen for conversion moments on your site.",
      "Real work, real process, real proof—captured deliberately.",
      "Delivered organized so it can be installed immediately.",
    ],
  },

  fit: {
    title: "Who it’s for (and who it’s not)",
    goodFor: [
      "Service businesses with a solid offer but weak visual trust",
      "Owners whose site uses stock photos or low-quality phone images",
      "Businesses ready to show real work and real process",
    ],
    notFor: [
      "Influencer-style content days",
      "Projects that want “branding vibes” more than trust assets",
      "Businesses unwilling to be photographed doing real work",
    ],
  },

  purchase: {
    title: "Ready when you are",
    price: {
      display: "From $1,500",
      cadence: "one_time",
      startingAtCents: 150000,
    },
    stepsTitle: "After routing:",
    steps: [
      "We confirm fit and define what the website needs to show",
      "We build a shot list mapped to your key pages",
      "We schedule and run the on-site session",
      "We edit and deliver images organized by page-use",
      "Optional: we install the photos into your site (if applicable)",
    ],
    riskRemoval: [
      "We confirm fit before any work begins.",
      "Clear shot list and scope before scheduling.",
      "Delivered organized for web install—not as a random gallery.",
    ],
    scarcityLine:
      "Sessions are limited to protect quality and turnaround.",
    primaryCta: {
      label: "Start with a routing call",
      href: "/contact?intent=talk&offerId=trust_asset_photography",
    },
    // no secondaryCta (keep singular)
  },

  meta: {
    title: "Trust Asset Photography | Brought to Life Solutions",
    description:
      "Credibility-first photos designed for your website: real work, real process, real proof—delivered organized by page-use for easy install.",
  },
},
  revenue_roadmap: {
    offerId: "revenue_roadmap",
    slug: "revenue-roadmap",
    title: "Revenue Roadmap Session",

    hero: {
      eyebrow: "ASSETS",
      headline: "A clear plan for where revenue is leaking—and what to fix first.",
      subhead:
        "Built for owners who want clarity before committing to a larger build or investment.",
      whyItExists:
        "Most owners can feel something isn’t working but can’t point to where. This identifies the bottleneck and gives you a written fix-sequence before you spend more money guessing.",
      proofLine:
        "You leave with a prioritized list of issues and next steps—written in plain English.",
      proofCue: "Best for owners who want certainty before scaling or rebuilding.",
      perspectiveLock:
        "Most businesses aren’t missing effort. They’re missing sequence. This gives you the order of operations before more money is spent.",
      primaryActionLabel: "See what you get",
      primaryActionTargetId: "included",
      secondaryActionLabel: "Book the session",
      secondaryActionHref: "/contact?intent=talk&offerId=revenue_roadmap",
    },

    shift: {
      title: "Before → After",
      before: [
        "You feel like leads are leaking but can’t prove where",
        "You don’t know what to fix first",
        "You’re unsure whether you need a rebuild or just adjustments",
        "Decisions are guesses",
      ],
      after: [
        "Clear diagnosis of what’s not working and why",
        "A prioritized plan (what to fix first, second, third)",
        "Clarity on whether you need a build, care, or targeted upgrades",
        "Next steps you can actually follow",
      ],
    },

   included: {
  title: "What you actually get",
  intro:
    "This is a decision session. You’re buying clarity and sequence—not a vague consult.",
  groups: [
    {
      title: "Diagnosis ",
      items: [
        "Review of your current website and lead flow",
        "Identify where trust, clarity, or conversion is breaking",
      ],
    },
    {
      title: "Session",
      items: [
        "75-minute session walking through findings and options",
        "Answers in plain English (no jargon, no pressure)",
      ],
    },
    {
      title: "Written plan ",
      items: [
        "Prioritized fix list (what to fix first, second, third)",
        "Recommendation: build vs targeted upgrades vs care",
        "Written summary delivered within 48 hours",
      ],
    },
  ],
  effortLine:
    "We do the review and plan. You show up for the session—nothing more.",
  note:
    "This does not include implementation. If you want us to build or fix, we’ll scope that next.",
},


    difference: {
      title: "How this is different from a typical ‘consultation’",
      notThis: [
        "This is not vague advice with no follow-through.",
        "This is not a sales call disguised as a strategy session.",
      ],
      thisIs: [
        "A clear diagnosis and a written plan.",
        "A sequence you can follow so decisions aren’t guesses.",
      ],
    },

    fit: {
      title: "Who it’s for (and who it’s not)",
      goodFor: [
        "Owners who want clarity before spending on a full build",
        "Businesses that feel stuck and want a clean plan",
        "People who want a calm, practical next step",
      ],
      notFor: [
        "People who want free consulting",
        "Anyone unwilling to act on clear next steps",
      ],
    },

    purchase: {
      title: "Ready when you are",
      price: {
        display: "From $250",
        cadence: "one_time",
        startingAtCents: 25000,
      },
      stepsTitle: "After routing:",
      steps: [
        "We collect your site + a few quick questions",
        "We review your current flow and identify leaks",
        "We meet for the session and walk through findings",
        "You receive a written priority list and next steps",
      ],
      riskRemoval: [
        "You’ll leave with a written plan, not vibes.",
        "Clear recommendations without pressure.",
        "Plain-English priorities you can act on.",
      ],
      primaryCta: {
        label: "Book the session",
        href: "/contact?intent=talk&offerId=revenue_roadmap",
      },
      secondaryCta: {
        label: "View Revenue Engine",
        href: "/products/revenue-engine?intent=buy&offerId=revenue_engine",
      },
    },

    meta: {
      title: "Revenue Roadmap Session | Brought to Life Solutions",
      description:
        "A decision session that identifies revenue leaks and gives you a prioritized plan in plain English.",
    },
  },
};

export const OFFER_DETAILS_BY_SLUG: Record<string, OfferDetail> =
  Object.fromEntries(Object.values(OFFER_DETAILS).map((d) => [d.slug, d]));

export const OFFER_DETAILS_BY_ID: Record<string, OfferDetail> =
  Object.fromEntries(Object.values(OFFER_DETAILS).map((d) => [d.offerId, d]));
