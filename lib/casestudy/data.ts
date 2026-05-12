// /lib/casestudy/data.ts

import type { CaseStudy } from "@/lib/catalog/types";

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "bold-city-iaq",
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
    socketsLine: "When these are wired together, traffic stops being random.",
    sockets: [
      "Visibility",
      "Proof",
      "Conversion",
      "Offer Strength",
      "Operations",
      "Analytics",
    ],

    resultingTitle: "The resulting system",
    resultingCaption:
      "A fast, focused site designed to handle urgency, establish trust, and convert local traffic into calls.",

    mobileEvidence: {
      eyebrow: "MOBILE-FIRST EXPERIENCE",
      description:
        "Most emergency decisions happen on a phone. The system was designed accordingly.",
    },

    outcomesTitle: "What changed",
    outcomes: [
      {
        label: "Inbound calls",
        value: "≈ 3× increase",
        note: "Owner-reported after the new site went live.",
      },
      {
        label: "Inquiry consistency",
        value: "More steady inbound",
      },
      {
        label: "Owner confidence",
        value: "Proud to share the site",
      },
      {
        label: "Referrals",
        value: "Referred another restoration company",
      },
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

    assets: {
      hero: {
        src: "/images/case-studies/bold-city-iaq/jobsite.webp",
        alt: "Bold City IAQ technician working during restoration job.",
      },
      supportingHero: {
        src: "/images/case-studies/bold-city-iaq/jobsite-02.webp",
        alt: "Bold City IAQ truck with debris image.",
      },
      evidence: [
        {
          src: "/images/case-studies/bold-city-iaq/desktop-01.webp",
          alt: "Bold City IAQ website — desktop hero section.",
          kind: "desktop",
        },
        {
          src: "/images/case-studies/bold-city-iaq/desktop-02.webp",
          alt: "Bold City IAQ website — desktop contact and FAQ section.",
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
          alt: "Bold City IAQ website — mobile trust and certification section.",
          kind: "mobile",
        },
      ],
    },

    meta: {
      title:
        "Bold City IAQ Case Study — From Invisible to 3× More Calls | Brought To Life Solutions",
      description:
        "How Brought To Life Solutions helped Bold City IAQ turn a weak web presence into a clearer, faster, trust-building website system that increased inbound calls.",
    },
  },
];

export const CASE_STUDY_BY_SLUG: Record<string, CaseStudy> =
  CASE_STUDIES.reduce<Record<string, CaseStudy>>((acc, study) => {
    acc[study.slug] = study;
    return acc;
  }, {});