import type { QueryDateInput } from "@/lib/ga4/queryBase";
import type { CtaOutcomeRow } from "@/lib/dashboard/payload";
import { queryCtaClicks } from "@/lib/ga4/queries/queryCtaClicks";

type QueryGoalCtaOutcomePerformanceArgs = {
  propertyId: string;
  range: QueryDateInput;
  ctaEventName: string;
};

type RawCtaRow = Awaited<ReturnType<typeof queryCtaClicks>>[number];

function normalizeValue(value?: string | null): string {
  return (value ?? "").trim().toLowerCase();
}

function isMeaningfulCtaRow(row: RawCtaRow): boolean {
  const analyticsLabel = normalizeValue(row.ctaLabel);
  const displayLabel = normalizeValue(row.ctaDisplayLabel);
  const location = normalizeValue(row.ctaLocation);

  if (!row.clicks || row.clicks <= 0) return false;
  if (!analyticsLabel && !displayLabel && !location) return false;

  const hasOnlyUnknowns =
    analyticsLabel === "(unlabeled cta)" &&
    (!displayLabel || displayLabel === "(unlabeled cta)") &&
    location === "(unknown location)";

  if (hasOnlyUnknowns) return false;

  return true;
}

export async function queryGoalCtaOutcomePerformance({
  propertyId,
  range,
  ctaEventName,
}: QueryGoalCtaOutcomePerformanceArgs): Promise<CtaOutcomeRow[]> {
  const rows = await queryCtaClicks({
    propertyId,
    range,
    ctaEventName,
  });

  return rows
    .filter(isMeaningfulCtaRow)
    .map((row) => ({
      ctaLabel: row.ctaDisplayLabel || row.ctaLabel,
      ctaDisplayLabel: row.ctaDisplayLabel || row.ctaLabel,
      ctaAnalyticsLabel: row.ctaLabel,
      ctaLocation: row.ctaLocation,
      clicks: row.clicks,
      completions: null,
      conversionRatePct: null,
    }))
    .sort((a, b) => b.clicks - a.clicks);
}