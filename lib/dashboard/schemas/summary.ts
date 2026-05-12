import { z } from "zod";

export const DashboardRangeKeySchema = z.enum([
  "7",
  "30",
  "90",
  "current_quarter",
  "previous_quarter",
]);

export const DashboardSummaryQuerySchema = z.object({
  rangeKey: DashboardRangeKeySchema.optional(),
  range: DashboardRangeKeySchema.optional(),
});

const AutoDiagnosisSchema = z.object({
  diagnosisType: z.string(),
  reason: z.string(),
  recommendation: z.string(),
});

const DashboardRangeMetaSchema = z.object({
  rangeKey: DashboardRangeKeySchema,
  label: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

const FunnelStepResultSchema = z.object({
  key: z.string(),
  name: z.string(),
  count: z.number(),
  dropoffFromPreviousPct: z.number().nullable().optional(),
  conversionFromEntryPct: z.number().nullable().optional(),
});

const BiggestLeakSchema = z.object({
  fromStepKey: z.string(),
  fromStepName: z.string(),
  toStepKey: z.string(),
  toStepName: z.string(),
  dropoffPct: z.number(),
});

const GoalProgressionSchema = z.object({
  goalKey: z.enum(["primary", "secondary", "tertiary"]),
  goalName: z.string(),
  entryCount: z.number(),
  completionCount: z.number(),
  conversionRatePct: z.number(),
  steps: z.array(FunnelStepResultSchema),
  biggestLeak: BiggestLeakSchema.nullable().optional(),
});

const ExecutiveSnapshotSchema = z.object({
  funnelEntries: z.number(),
  primaryCompletions: z.number(),
  primaryConversionRatePct: z.number(),
  biggestLeakLabel: z.string().nullable().optional(),
  secondaryCompletions: z.number().optional(),
  tertiaryCompletions: z.number().optional(),
});

const GoalHealthRowSchema = z.object({
  goalKey: z.enum(["primary", "secondary", "tertiary"]),
  goalName: z.string(),
  entryCount: z.number(),
  completionCount: z.number(),
  conversionRatePct: z.number(),
});

const TrendPointSchema = z.object({
  date: z.string(),
  entries: z.number(),
  completions: z.number(),
  conversionRatePct: z.number().nullable().optional(),
});

const LeadSourceRowSchema = z.object({
  sourceMedium: z.string(),
  entries: z.number(),
  completions: z.number(),
  conversionRatePct: z.number(),
});

const LeadSourceDiagnosticsSchema = z.object({
  reason: z.enum(["ok", "no_data", "noise_only", "unattributed_only"]),
  rawRowCount: z.number(),
  keptRowCount: z.number(),
  droppedRowCount: z.number(),
  droppedExamples: z.array(z.string()).optional(),
});

const CtaOutcomeRowSchema = z.object({
  ctaLabel: z.string(),
  ctaLocation: z.string(),
  clicks: z.number(),
  completions: z.number().nullable().optional(),
  conversionRatePct: z.number().nullable().optional(),
});

const GoalCompletionPointSchema = z.object({
  date: z.string(),
  forms: z.number().optional(),
  calls: z.number().optional(),
  bookings: z.number().optional(),
});

const TrafficContextPointSchema = z.object({
  date: z.string(),
  pageViews: z.number(),
});

const PageViewRowSchema = z.object({
  pageLocation: z.string(),
  pagePath: z.string(),
  views: z.number(),
  sharePct: z.number().nullable().optional(),
});

const DashboardNextActionsSchema = z.object({
  topWinner: z.string().optional(),
  underperformer: z.string().optional(),
  nextStep: z.string().optional(),
  manual: z.string().optional(),
  autoDiagnosis: AutoDiagnosisSchema.nullable().optional(),
});

const ModuleConfigSchema = z.object({
  enabled: z.boolean(),
});

const DashboardNavItemSchema = z.object({
  key: z.enum([
    "analytics",
    "customer_management",
    "commerce",
    "content",
    "integrity",
    "settings",
  ]),
  path: z.string(),
  label: z.string(),
});

const DashboardPayloadMetaSchema = z.object({
  siteId: z.string(),
  rangeDays: z.union([z.literal(7), z.literal(30), z.literal(90)]).optional(),
  range: DashboardRangeMetaSchema,
  generatedAtIso: z.string(),
  insufficientData: z.boolean(),
  notes: z.array(z.string()).optional(),
  modules: z.record(
    z.enum([
      "analytics",
      "customer_management",
      "commerce",
      "content",
      "integrity",
      "settings",
    ]),
    ModuleConfigSchema,
  ),
  panelsEnabled: z.record(
    z.enum([
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
    ]),
    z.boolean(),
  ),
  nav: z
    .object({
      items: z.array(DashboardNavItemSchema),
    })
    .optional(),
  goalsEnabled: z.object({
    primary: z.boolean(),
    secondary: z.boolean(),
    tertiary: z.boolean(),
  }),
});

export const DashboardPayloadSchema = z.object({
  meta: DashboardPayloadMetaSchema,
  executiveSnapshot: ExecutiveSnapshotSchema,
  goalHealth: z.array(GoalHealthRowSchema),
  funnelProgression: z.array(GoalProgressionSchema),
  conversionTrend: z.object({
    primary: z.array(TrendPointSchema).optional(),
    secondary: z.array(TrendPointSchema).optional(),
    tertiary: z.array(TrendPointSchema).optional(),
  }),
  leadSourceConversion: z.object({
    primary: z.array(LeadSourceRowSchema).optional(),
    secondary: z.array(LeadSourceRowSchema).optional(),
    tertiary: z.array(LeadSourceRowSchema).optional(),
  }),
  leadSourceDiagnostics: z
    .object({
      primary: LeadSourceDiagnosticsSchema.optional(),
      secondary: LeadSourceDiagnosticsSchema.optional(),
      tertiary: LeadSourceDiagnosticsSchema.optional(),
    })
    .optional(),
  ctaOutcomePerformance: z.object({
    primary: z.array(CtaOutcomeRowSchema).optional(),
    secondary: z.array(CtaOutcomeRowSchema).optional(),
    tertiary: z.array(CtaOutcomeRowSchema).optional(),
  }),
  goalCompletionTrend: z.array(GoalCompletionPointSchema),
  trafficContext: z.array(TrafficContextPointSchema).optional(),
  pageViewBreakdown: z.array(PageViewRowSchema).optional(),
  nextActions: DashboardNextActionsSchema,
});

export type DashboardSummaryQueryInput = z.infer<
  typeof DashboardSummaryQuerySchema
>;

export type DashboardPayloadValidated = z.infer<typeof DashboardPayloadSchema>;