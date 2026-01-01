import type {  OfferDetail } from "./types";


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
        "A simple website that makes your business look legit and gets you calls.",
      subhead:
        "Built for service businesses that need a clean foundation — not something you’ll redo next year.",
      proofLine:
        "Your calls and form leads go straight to you — no mystery where leads went.",
      proofCue: "Best for owners getting their first real foundation online.",
      perspectiveLock:
        "Most starter sites look fine but stay vague. Clarity is what turns visits into calls.",
      primaryActionLabel: "View what’s included",
      primaryActionTargetId: "included",
      secondaryActionLabel: "Talk first",
      secondaryActionHref: "/booking?intent=talk&offerId=starter_system",
    },

    shift: {
      title: "Before → After",
      before: [
        "No clear place to send people when they ask for your website",
        "Customers don’t quickly understand what you do",
        "Your business feels “small” online even if you do great work",
        "Calls depend on luck and word-of-mouth only",
      ],
      after: [
        "A clean, credible website you’re proud to send people to",
        "Clear service pages that explain what you do in plain language",
        "Calls and form leads routed directly to you",
        "A foundation you can improve over time instead of starting over",
      ],
    },

    included: {
      title: "What you actually get",
      intro:
        "If you paid today, this is what you would receive — clearly scoped and built for clarity and calls.",
      groups: [
        {
          title: "Website foundation",
          items: [
            "Mobile-friendly website built for service businesses",
            "Clear structure so customers understand you fast",
          ],
        },
        {
          title: "Calls + contact wiring",
          items: [
            "Call buttons and contact forms wired to you",
            "Simple lead path so customers know what to do next",
          ],
        },
        {
          title: "Findability baseline",
          items: [
            "Basic local SEO setup so people can find you",
            "A foundation you won’t need to redo in a year",
          ],
        },
      ],
      effortLine:
        "We handle the build and wiring. You review and approve — nothing more.",
      note: "No jargon. No fluff. You’ll know what you’re getting.",
    },

    difference: {
      title: 'How this is different from “a website”',
      notThis: [
        "This is not a pretty template with your logo slapped on it.",
        "This is not a vague ‘online presence’ project.",
      ],
      thisIs: [
        "A clean foundation built for service customers.",
        "Clear pages + clear contact paths so calls are the natural next step.",
        "A site you can grow from instead of replacing.",
      ],
    },

    fit: {
      title: "Who it’s for (and who it’s not)",
      goodFor: [
        "Service businesses that need a credible foundation fast",
        "Owners starting out or fixing a weak/dated site",
        "People who want clarity instead of fancy design",
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
      stepsTitle: "After purchase:",
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
        href: "/booking?intent=talk&offerId=starter_system",
      },
    },

    meta: {
      title: "Starter System | Brought to Life Solutions",
      description:
        "A simple, credible website foundation that makes your business look legit and gets you calls — built for service businesses.",
    },
  },

  revenue_engine: {
    // Included so your map is complete. Keep/adjust as needed to match your current best version.
     offerId: "revenue_engine",
  slug: "revenue-engine",
  title: "Revenue Engine",

  hero: {
    headline:
      "A website that reliably turns visitors into phone calls and booked jobs.",
    subhead:
      "Built for service businesses that want predictable leads — not another redesign.",

    // NEW: Proof of results line (under subhead)
    proofLine: "You’ll know which pages bring calls—and which don’t.",

    proofCue: "Most chosen by owners who depend on their business income.",
    primaryActionLabel: "View what’s included",
    primaryActionTargetId: "included",
        secondaryActionLabel: "Talk first",
      secondaryActionHref: "/booking?intent=talk&offerId=revenue_engine",

    // NEW: Perspective Lock (below CTA / short diagnosis band)
    perspectiveLock:
      "Most service websites fail because they’re built to look good, not to produce calls. We build sites to be measured, adjusted, and trusted—like a system, not a gamble.",
  },

  shift: {
    title: "Before → After",
    before: [
      "Your website looks fine, but it doesn’t reliably produce calls",
      "You don’t know which pages are working",
      "Traffic feels random",
      "Decisions are guesses",
    ],
    after: [
      "Calls come from specific pages and offers",
      "You can see what produces revenue",
      "Fixes are intentional instead of random",
      "Your site behaves like a system — not a brochure",
    ],
  },

  included: {
    title: "What you actually get",
    intro:
      "If you paid today, this is what you would receive — clearly scoped and built to convert.",
    groups: [
      {
        title: "Website built to convert",
        items: [
          "Fast, mobile-first build designed to get calls",
          "Clear service pages that explain what you do and why you’re the right choice",
          "High-visibility call buttons and contact forms wired straight to you",
        ],
      },
      {
        title: "Tracking + visibility",
        items: [
          "Call + form tracking so results aren’t a mystery",
          "Basic local SEO structure so customers can find you",
          "Analytics setup so you know what’s working",
        ],
      },
      {
        title: "Control room (simple dashboard)",
        items: [
          "A simple dashboard that shows what pages and offers produce leads",
          "A system you can improve instead of replacing next year",
        ],
      },
    ],

    // NEW: Effort / ownership clarity (under included list)
    effortLine:
      "We handle the build, wiring, and tracking. You review and approve—nothing more.",

    note:
      "No jargon. No fluff. Everything above is built so you can verify it’s working.",
  },

  difference: {
    title: "How this is different from “a website”",
    notThis: [
      "This is not a brochure site.",
      "This is not a template with your logo slapped on it.",
      "This is not “SEO magic.”",
    ],
    thisIs: [
      "A revenue system built for service businesses.",
      "Pages built to convert, wired to contact actions, and tracked.",
      "A foundation you can improve over time instead of starting over.",
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
      "Businesses unwilling to follow basic structure and clarity",
    ],
  },

  purchase: {
    title: "Ready when you are",
    price: {
      display: "From $4,800",
      cadence: "one_time",
      startingAtCents: 480000,
    },
    stepsTitle: "After purchase:",
    steps: [
      "We onboard you and collect what we need (services, service area, brand basics)",
      "We review your business and how you want leads to come in",
      "We build and wire the system (pages, CTAs, tracking)",
      "You review — we tighten anything unclear",
      "We launch and verify everything is working",
    ],
    riskRemoval: [
      "Clear scope up front — no surprise add-ons.",
      "You’ll know what’s included before you pay.",
      "You’ll be able to see what’s working after launch.",
    ],

    // NEW: Scarcity / capacity truth (above primary CTA)
    scarcityLine:
      "We take on a limited number of builds at a time so every system gets attention.",

    primaryCta: {
      label: "Start Revenue Engine",
      href: "/checkout?offerId=revenue_engine&intent=buy",
    },
    secondaryCta: {
      label: "Talk first",
      href: "/booking?section=revenue_engine&intent=talk&offerId=revenue_engine",
    },
  },

  meta: {
    title: "Revenue Engine | Brought to Life Solutions",
    description:
      "A conversion-focused website system built to generate calls and booked jobs — with tracking so you can see what works.",
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
        "Built for operators who want a real systems partner — not a freelancer and not random marketing.",
      proofLine:
        "Each month you’ll get clear priorities, what changed, and what to do next.",
      proofCue: "Limited spots. Ongoing capacity-based partnership.",
      perspectiveLock:
        "Most growth work fails because it’s random. This is measured improvement, shipped consistently.",
      primaryActionLabel: "View what’s included",
      primaryActionTargetId: "included",
      secondaryActionLabel: "Talk first",
      secondaryActionHref: "/booking?intent=talk&offerId=growth_partner",
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
        "This is ongoing optimization. You’re paying for consistent improvements and clear direction — not busywork.",
      groups: [
        {
          title: "Monthly review + priorities",
          items: [
            "Monthly performance review",
            "Clear priorities on what to improve next",
          ],
        },
        {
          title: "Improvements shipped",
          items: [
            "Improvements shipped to pages and tracking",
            "Offer/CTA tuning based on what’s happening",
          ],
        },
        {
          title: "Clarity reporting",
          items: [
            "Simple reporting that shows what changed",
            "Next steps so you’re never guessing",
          ],
        },
      ],
      effortLine:
        "We handle the analysis and changes. You approve direction — nothing more.",
      note: "Measured progress. No random tactics. No fluff.",
    },

    difference: {
      title: "How this is different from typical “marketing help”",
      notThis: [
        "This is not a random list of marketing ideas.",
        "This is not selling you vague “growth.”",
        "This is not chasing every trend.",
      ],
      thisIs: [
        "A steady systems cadence: review → prioritize → ship improvements.",
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
        href: "/booking?intent=talk&offerId=growth_partner",
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
      headline: "Your site stays fast, secure, and working — without thinking about it.",
      subhead:
        "Built for owners who want zero downtime and zero headaches.",
      proofLine:
        "Updates, monitoring, and backups handled on a steady cadence.",
      perspectiveLock:
        "Most small business sites break slowly, then quietly bleed leads. This keeps your system stable.",
      primaryActionLabel: "View what’s included",
      primaryActionTargetId: "included",
      secondaryActionLabel: "Talk first",
      secondaryActionHref: "/booking?intent=talk&offerId=care_plan",
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
          items: ["Reliable hosting", "Ongoing upkeep for site stability"],
        },
        {
          title: "Protection",
          items: ["Basic security hygiene", "Backup/restore readiness"],
        },
        {
          title: "Small fixes",
          items: ["Small content updates as needed", "Support when issues appear"],
        },
      ],
      effortLine:
        "We handle the maintenance and fixes. You send requests when needed — nothing more.",
      note: "This is the ‘keep it working’ plan. Calm reliability.",
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
      stepsTitle: "After signup:",
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
        href: "/booking?intent=talk&offerId=care_plan",
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
      headline: "Help more local customers find you on Google each month.",
      subhead:
        "Built for service businesses that want steady visibility without obsessing over SEO.",
      proofLine: "You’ll get simple monthly reporting and next steps.",
      perspectiveLock:
        "Most local SEO fails because it’s neglected. This is steady upkeep so visibility doesn’t slide backwards.",
      primaryActionLabel: "View what’s included",
      primaryActionTargetId: "included",
      secondaryActionLabel: "Talk first",
      secondaryActionHref: "/booking?intent=talk&offerId=seo_maintenance",
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
        "This is steady local visibility upkeep — the basics done consistently, the right way.",
      groups: [
        {
          title: "Google Business Profile upkeep",
          items: ["Google Business Profile updates and upkeep"],
        },
        {
          title: "On-page improvements",
          items: ["On-page improvements (titles/meta/headers) where needed"],
        },
        {
          title: "Cadence + reporting",
          items: [
            "Local visibility maintenance cadence (ethical, steady)",
            "Simple monthly reporting and next steps",
          ],
        },
      ],
      effortLine:
        "We handle the upkeep and improvements. You stay focused on running the business.",
      note: "No shady tactics. Just consistent fundamentals.",
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
      stepsTitle: "After signup:",
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
        href: "/booking?intent=talk&offerId=seo_maintenance",
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
      proofLine: "You’ll see consistent publishing + on-page improvements on a set cadence.",
      perspectiveLock:
        "Momentum comes from consistency. This is steady content + on-page improvement so visibility compounds.",
      primaryActionLabel: "View what’s included",
      primaryActionTargetId: "included",
      secondaryActionLabel: "Talk first",
      secondaryActionHref: "/booking?intent=talk&offerId=seo_momentum",
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
          title: "Content cadence",
          items: ["Consistent content publishing (blog cadence per plan)"],
        },
        {
          title: "Optimization + structure",
          items: [
            "On-page optimization across key pages",
            "Internal linking improvements",
          ],
        },
      ],
      effortLine:
        "We handle the publishing and optimization. You approve direction — nothing more.",
      note: "Steady progress. Ethical approach. Built to compound.",
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
      stepsTitle: "After signup:",
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
        href: "/booking?intent=talk&offerId=seo_momentum",
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
      headline:
        "Clear, persuasive copy that makes customers understand you fast — and take the next step.",
      subhead:
        "Built for owners who want professional messaging without wrestling the words.",
      proofLine:
        "Your pages will follow a clear structure: problem → solution → proof → next step.",
      perspectiveLock:
        "Most websites don’t convert because the message is unclear. Clarity removes friction.",
      primaryActionLabel: "View what’s included",
      primaryActionTargetId: "included",
      secondaryActionLabel: "Talk first",
      secondaryActionHref: "/booking?intent=talk&offerId=copywriting",
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
        "Messaging that supports both conversion and basic search readability",
      ],
    },

    included: {
      title: "What you actually get",
      intro:
        "If you paid today, this is what you would receive — written in human language and built to convert.",
      groups: [
        {
          title: "Conversion-focused copy",
          items: [
            "Conversion-focused service-page copy",
            "Clear structure: problem → solution → proof → next step",
          ],
        },
        {
          title: "Finalize the message",
          items: ["Revisions to finalize messaging"],
        },
        {
          title: "Supports visibility",
          items: ["Copy that supports basic search readability"],
        },
      ],
      effortLine:
        "We write or rewrite your pages. You approve the final version — nothing more.",
      note: "No fluff. No ‘agency voice.’ Just clear words that do their job.",
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
      stepsTitle: "After purchase:",
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
        href: "/booking?intent=talk&offerId=copywriting",
      },
    },

    meta: {
      title: "Copywriting & Content | Brought to Life Solutions",
      description:
        "Clear, persuasive service-page copy that reduces confusion and increases calls — without you wrestling the words.",
    },
  },

  revenue_roadmap: {
    offerId: "revenue_roadmap",
    slug: "revenue-roadmap",
    title: "Revenue Roadmap Session",

    hero: {
      eyebrow: "FOUNDATION",
      headline: "A clear plan for where revenue is leaking — and how to fix it.",
      subhead:
        "Built for owners who want clarity before committing to a bigger build.",
      proofLine:
        "You leave with a written priority list of fixes and next steps — in plain English.",
      perspectiveLock:
        "Most owners aren’t missing effort — they’re missing a clear sequence. This gives you the sequence.",
      primaryActionLabel: "See what you get",
      primaryActionTargetId: "included",
      secondaryActionLabel: "Book the session",
      secondaryActionHref: "/booking?intent=talk&offerId=revenue_roadmap",
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
        "This is a decision session. You’re buying clarity and sequence — not a vague consult.",
      groups: [
        {
          title: "Diagnosis",
          items: [
            "Review of your current website and lead flow",
            "Identify where trust, clarity, or conversion is breaking",
          ],
        },
        {
          title: "Plan",
          items: [
            "Written priority list of fixes and improvements",
            "Recommended next step (build vs upgrades vs care)",
          ],
        },
        {
          title: "Direction",
          items: [
            "Clear scope for what a build would include (if needed)",
            "Answers to your questions in plain English",
          ],
        },
      ],
      effortLine:
        "We do the review and plan. You show up for the session — nothing more.",
      note: "You leave with something you can act on.",
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
      stepsTitle: "After booking:",
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
        href: "/booking?intent=talk&offerId=revenue_roadmap",
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