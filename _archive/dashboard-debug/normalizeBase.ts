// lib/dashboard/normalizeBase.ts
import type { DashboardPayload, DashboardRange, DashboardMeta } from "./payload";

const INSUFFICIENT_INTENT_THRESHOLD = 20;

export function normalizeDashboardBase(args: {
  rangeDays: DashboardRange;

  snapshot: DashboardPayload["snapshot"];

  intentTrend?: DashboardPayload["intentTrend"];
  trafficTrend?: DashboardPayload["trafficTrend"];
  sourceBreakdown?: DashboardPayload["sourceBreakdown"];
  pageIntent?: DashboardPayload["pageIntent"];
  ctaPerformance?: DashboardPayload["ctaPerformance"];
  formHealth?: DashboardPayload["formHealth"];
  nextActions?: DashboardPayload["nextActions"];
  notes?: string[];

  metaOverrides?: Partial<
    Omit<DashboardMeta, "rangeDays" | "generatedAtIso" | "insufficientData" | "notes">
  >;
}): DashboardPayload {
  const insufficientData =
    (args.snapshot.intentTotal ?? 0) < INSUFFICIENT_INTENT_THRESHOLD;

  return {
    meta: {
      rangeDays: args.rangeDays,
      generatedAtIso: new Date().toISOString(),
      insufficientData,
      notes: args.notes ?? [],
      ...(args.metaOverrides ?? {}),
    },

    snapshot: args.snapshot,

    intentTrend: args.intentTrend ?? [],
    trafficTrend: args.trafficTrend ?? undefined,

    sourceBreakdown: args.sourceBreakdown ?? [],
    pageIntent: args.pageIntent ?? [],
    ctaPerformance: args.ctaPerformance ?? [],
    formHealth: args.formHealth ?? [],

    nextActions: args.nextActions ?? {},
  };
}
