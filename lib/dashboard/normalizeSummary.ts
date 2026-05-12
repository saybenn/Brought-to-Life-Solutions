import type {
  CtaOutcomeRow,
  DashboardPayload,
  GoalCompletionPoint,
  GoalProgression,
  LeadSourceRow,
  PageViewRow,
  TrafficContextPoint,
  TrendPoint,
} from "@/lib/dashboard/payload";

function isGa4DateString(value: string): boolean {
  return /^\d{8}$/.test(value);
}

export function normalizeGa4DateToIso(value: string): string {
  if (!value) return value;
  if (!isGa4DateString(value)) return value;

  const year = value.slice(0, 4);
  const month = value.slice(4, 6);
  const day = value.slice(6, 8);

  return `${year}-${month}-${day}`;
}

function sortByDateAsc<T extends { date: string }>(rows: T[] | undefined): T[] | undefined {
  if (!rows) return rows;
  return [...rows].sort((a, b) => a.date.localeCompare(b.date));
}

function normalizeTrendPoints(rows?: TrendPoint[]): TrendPoint[] | undefined {
  if (!rows) return rows;

  return sortByDateAsc(
    rows.map((row) => ({
      ...row,
      date: normalizeGa4DateToIso(row.date),
    }))
  );
}

function normalizeGoalCompletionTrend(rows?: GoalCompletionPoint[]): GoalCompletionPoint[] {
  if (!rows?.length) return [];

  return sortByDateAsc(
    rows.map((row) => ({
      ...row,
      date: normalizeGa4DateToIso(row.date),
    }))
  ) as GoalCompletionPoint[];
}

function normalizeTrafficContext(rows?: TrafficContextPoint[]): TrafficContextPoint[] {
  if (!rows?.length) return [];

  return sortByDateAsc(
    rows.map((row) => ({
      ...row,
      date: normalizeGa4DateToIso(row.date),
    }))
  ) as TrafficContextPoint[];
}

function normalizeGoalProgressions(rows: GoalProgression[]): GoalProgression[] {
  return [...rows].sort((a, b) => {
    const order = { primary: 0, secondary: 1, tertiary: 2 } as const;
    return order[a.goalKey] - order[b.goalKey];
  });
}

function normalizeLeadSourceRows(rows?: LeadSourceRow[]): LeadSourceRow[] | undefined {
  if (!rows) return rows;

  return [...rows].sort((a, b) => {
    if (b.completions !== a.completions) return b.completions - a.completions;
    if (b.conversionRatePct !== a.conversionRatePct) return b.conversionRatePct - a.conversionRatePct;
    if (b.entries !== a.entries) return b.entries - a.entries;
    return a.sourceMedium.localeCompare(b.sourceMedium);
  });
}

function normalizeCtaOutcomeRows(rows?: CtaOutcomeRow[]): CtaOutcomeRow[] | undefined {
  if (!rows) return rows;

  return [...rows].sort((a, b) => {
    if (b.clicks !== a.clicks) return b.clicks - a.clicks;

    const aConv = a.conversionRatePct ?? -1;
    const bConv = b.conversionRatePct ?? -1;
    if (bConv !== aConv) return bConv - aConv;

    if (a.ctaLabel !== b.ctaLabel) return a.ctaLabel.localeCompare(b.ctaLabel);
    return a.ctaLocation.localeCompare(b.ctaLocation);
  });
}

function normalizePageViewBreakdown(rows?: PageViewRow[]): PageViewRow[] {
  if (!rows?.length) return [];

  return [...rows].sort((a, b) => {
    if (b.views !== a.views) return b.views - a.views;
    return a.pagePath.localeCompare(b.pagePath);
  });
}

export function normalizeSummary(payload: DashboardPayload): DashboardPayload {
  return {
    ...payload,
    funnelProgression: normalizeGoalProgressions(payload.funnelProgression),
    conversionTrend: {
      primary: normalizeTrendPoints(payload.conversionTrend.primary),
      secondary: normalizeTrendPoints(payload.conversionTrend.secondary),
      tertiary: normalizeTrendPoints(payload.conversionTrend.tertiary),
    },
    leadSourceConversion: {
      primary: normalizeLeadSourceRows(payload.leadSourceConversion.primary),
      secondary: normalizeLeadSourceRows(payload.leadSourceConversion.secondary),
      tertiary: normalizeLeadSourceRows(payload.leadSourceConversion.tertiary),
    },
    ctaOutcomePerformance: {
      primary: normalizeCtaOutcomeRows(payload.ctaOutcomePerformance.primary),
      secondary: normalizeCtaOutcomeRows(payload.ctaOutcomePerformance.secondary),
      tertiary: normalizeCtaOutcomeRows(payload.ctaOutcomePerformance.tertiary),
    },
    goalCompletionTrend: normalizeGoalCompletionTrend(payload.goalCompletionTrend),
    trafficContext: normalizeTrafficContext(payload.trafficContext),
    pageViewBreakdown: normalizePageViewBreakdown(payload.pageViewBreakdown),
  };
}