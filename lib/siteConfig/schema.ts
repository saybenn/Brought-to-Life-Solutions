import { z } from "zod";

export const ModuleKeySchema = z.enum([
  "analytics",
  "customer_management",
  "commerce",
  "content",
  "integrity",
  "settings",
]);

export const PanelKeySchema = z.enum([
  "executiveSnapshot",
  "goalHealth",
  "funnelProgression",
  "conversionTrend",
  "leadSourceConversion",
  "ctaOutcomePerformance",
  "goalCompletionTrend",
  "nextActions",
  "trafficContext",
  "pageViewBreakdown",
]);

export const MetricKeySchema = z.enum(["cta", "forms", "calls"]);
export const TrafficKeySchema = z.enum(["pageViews"]);
export const PathMatchModeSchema = z.enum(["exact", "starts_with", "contains"]);

const ModulesSchema = z
  .object({
    analytics: z.object({ enabled: z.boolean() }),
    customer_management: z.object({ enabled: z.boolean() }),
    commerce: z.object({ enabled: z.boolean() }),
    content: z.object({ enabled: z.boolean() }),
    integrity: z.object({ enabled: z.boolean() }),
    settings: z.object({ enabled: z.boolean() }),
  })
  .partial();

const PanelsSchema = z
  .object({
    executiveSnapshot: z.boolean(),
    goalHealth: z.boolean(),
    funnelProgression: z.boolean(),
    conversionTrend: z.boolean(),
    leadSourceConversion: z.boolean(),
    ctaOutcomePerformance: z.boolean(),
    goalCompletionTrend: z.boolean(),
    nextActions: z.boolean(),
    trafficContext: z.boolean(),
    pageViewBreakdown: z.boolean(),
  })
  .partial();

const MetricsEnabledSchema = z
  .object({
    cta: z.boolean(),
    forms: z.boolean(),
    calls: z.boolean(),
  })
  .partial();

const TrafficEnabledSchema = z
  .object({
    pageViews: z.boolean(),
  })
  .partial();

const NavSchema = z.object({
  items: z.array(
    z.object({
      key: ModuleKeySchema,
      path: z.string().min(1),
      label: z.string().min(1),
    })
  ),
});

const EventMapSchema = z.object({
  pageViewEventName: z.string().min(1),
  ctaEventName: z.string().min(1),
  formEventName: z.string().min(1).optional(),
  callEventName: z.string().min(1).optional(),
  bookingEventName: z.string().min(1).optional(),
});

const FunnelEntrySchema = z.union([
  z.object({
    type: z.literal("page"),
    match: z.string().min(1),
    matchMode: PathMatchModeSchema.optional(),
  }),
  z.object({
    type: z.literal("event"),
    eventName: z.string().min(1),
  }),
  z.object({
    type: z.literal("cta"),
    label: z.string().min(1).optional(),
    location: z.string().min(1).optional(),
  }),
]);

const FunnelStepSchema = z
  .object({
    key: z.string().min(1),
    name: z.string().min(1),
    eventName: z.string().min(1).optional(),
    pageMatch: z.string().min(1).optional(),
    pageMatchMode: PathMatchModeSchema.optional(),
    ctaLabel: z.string().min(1).optional(),
    ctaLocation: z.string().min(1).optional(),
  })
  .superRefine((step, ctx) => {
    if (!step.eventName && !step.pageMatch && !step.ctaLabel && !step.ctaLocation) {
      ctx.addIssue({
        code: "custom",
        message:
          "Funnel step must define at least one of eventName, pageMatch, ctaLabel, or ctaLocation",
      });
    }
  });

const GoalDefinitionSchema = z
  .object({
    enabled: z.boolean(),
    name: z.string().min(1),
    successEvent: z.string().min(1),
    entry: FunnelEntrySchema,
    funnelSteps: z.array(FunnelStepSchema).min(1),
  })
  .superRefine((goal, ctx) => {
    if (goal.entry.type === "page") {
      const entry = goal.entry;

      const hasMatchingPageStep = goal.funnelSteps.some((step) => {
        if (step.pageMatch !== entry.match) return false;
        return (step.pageMatchMode ?? "contains") === (entry.matchMode ?? "contains");
      });

      if (!hasMatchingPageStep) {
        ctx.addIssue({
          code: "custom",
          path: ["funnelSteps"],
          message:
            "Page-entry goals should include at least one funnel step with a matching pageMatch and pageMatchMode",
        });
      }
    }

    if (goal.entry.type === "cta") {
      const entry = goal.entry;

      const hasMatchingCtaStep = goal.funnelSteps.some((step) => {
        if (entry.label && step.ctaLabel !== entry.label) return false;
        if (entry.location && step.ctaLocation !== entry.location) return false;
        return Boolean(step.ctaLabel || step.ctaLocation || step.eventName);
      });

      if (!hasMatchingCtaStep) {
        ctx.addIssue({
          code: "custom",
          path: ["funnelSteps"],
          message:
            "CTA-entry goals should include at least one funnel step aligned to the CTA entry definition",
        });
      }
    }
  });

const GoalsSchema = z.object({
  primary: GoalDefinitionSchema,
  secondary: GoalDefinitionSchema.optional(),
  tertiary: GoalDefinitionSchema.optional(),
});

export const SiteConfigSchema = z
  .object({
    siteId: z.string().optional(),

    ga4PropertyId: z.string().min(1).optional(),
    ga4_property_id: z.string().min(1).optional(),

    nav: NavSchema.optional(),

    modules: ModulesSchema.default({
      analytics: { enabled: true },
      settings: { enabled: true },
      commerce: { enabled: true },
      content: { enabled: true },
      integrity: { enabled: false },
      customer_management: { enabled: true },
    }),

    panels: PanelsSchema.default({
      executiveSnapshot: true,
      goalHealth: true,
      funnelProgression: true,
      conversionTrend: true,
      leadSourceConversion: true,
      ctaOutcomePerformance: true,
      goalCompletionTrend: true,
      nextActions: true,
      trafficContext: true,
      pageViewBreakdown: true,
    }),

    metricsEnabled: MetricsEnabledSchema.default({
      cta: true,
      forms: true,
      calls: false,
    }),

    trafficEnabled: TrafficEnabledSchema.default({
      pageViews: true,
    }),

    intentDefinition: z
      .array(MetricKeySchema)
      .default(["forms"])
      .refine((arr) => arr.length > 0, "intentDefinition must have at least one metric"),

    eventMap: EventMapSchema,

    filters: z
      .object({
        excludeSourceMediumContains: z.array(z.string()).optional(),
      })
      .optional(),

    goals: GoalsSchema,

    nextActions: z
      .object({
        topWinner: z.string().optional(),
        underperformer: z.string().optional(),
        nextStep: z.string().optional(),
      })
      .optional(),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.metricsEnabled.calls && !cfg.eventMap.callEventName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["eventMap", "callEventName"],
        message: "callEventName is required when metricsEnabled.calls is true",
      });
    }

    if (cfg.trafficEnabled.pageViews && !cfg.eventMap.pageViewEventName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["eventMap", "pageViewEventName"],
        message: "pageViewEventName is required when trafficEnabled.pageViews is true",
      });
    }

    for (const m of cfg.intentDefinition) {
      if (!cfg.metricsEnabled[m]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["intentDefinition"],
          message: `intentDefinition includes "${m}" but metricsEnabled.${m} is not true`,
        });
      }
    }

    const goalsToCheck = [
      { key: "primary", value: cfg.goals.primary },
      { key: "secondary", value: cfg.goals.secondary },
      { key: "tertiary", value: cfg.goals.tertiary },
    ] as const;

    for (const goal of goalsToCheck) {
      if (!goal.value || !goal.value.enabled) continue;

      if (goal.value.entry.type === "cta") {
        if (!goal.value.entry.label && !goal.value.entry.location) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["goals", goal.key, "entry"],
            message: "CTA entry should define at least a label or location",
          });
        }
      }
    }

    if (cfg.nav?.items?.length) {
      for (const item of cfg.nav.items) {
        void cfg.modules[item.key]?.enabled;
      }
    }
  });

export type SiteConfig = z.infer<typeof SiteConfigSchema>;