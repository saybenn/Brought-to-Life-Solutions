export const DASHBOARD_COPY = {
  hero: {
    title: "Funnel Analytics Dashboard",
    description:
      "See where visitors become leads, where they drop off, and what to improve next.",
  },
  executiveSnapshot: {
    title: "Executive Snapshot",
    description:
      "Quick read on leads, conversion rate, and the biggest leak in the funnel.",
    tooltip:
      "Start here for the top story before digging into charts and details.",
  },
  goalHealth: {
    title: "Goal Health",
    description:
      "Compare performance across each tracked goal.",
    tooltip:
      "Useful for seeing which goals are healthy and which need attention.",
  },
  funnelProgression: {
    title: "Funnel Progression",
    description:
      "See how people move through the selected goal step by step.",
    tooltip:
      "The biggest leak is the step where the most people stop moving forward.",
  },
  conversionTrend: {
    title: "Conversion Trend",
    description:
      "Track funnel entries and completed actions over time.",
    tooltip:
      "Use this to spot momentum, slowdowns, or unstable conversion behavior.",
  },
  leadSourceConversion: {
    title: "Lead Source Conversion",
    description:
      "Estimated lead performance by traffic source.",
    tooltip:
      "This is estimated using session-source data, not exact person-by-person paths.",
  },
  ctaOutcomePerformance: {
    title: "CTA Outcome Performance",
    description:
      "See which calls to action get clicked most.",
    tooltip:
      "Outcome data may be estimated or unavailable for some CTA rows.",
  },
  goalCompletionTrend: {
    title: "Goal Completion Trend",
    description:
      "Track completed forms, calls, and bookings over time.",
    tooltip:
      "Use this to see which completion types are carrying results.",
  },
  nextActions: {
    title: "Next Actions",
    description:
      "What is working, what is weak, and what to fix next.",
    tooltip:
      "This section turns the dashboard into plain-language action guidance.",
  },
  trafficContext: {
    title: "Traffic Context",
    description:
      "Support-only page view trend.",
    tooltip:
      "Helpful for context, but not the main decision signal.",
  },
} as const;