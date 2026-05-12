import type { GoalDefinition } from "@/lib/analytics/config.types";
import type { TrendPoint } from "@/lib/dashboard/payload";
import type { QueryDateInput } from "@/lib/ga4/queryBase";
import { queryEventCountsByDate } from "@/lib/ga4/queries/queryEventCountsByDate";
import { querySpecificPageEventTrend } from "@/lib/ga4/queries/querySpecificPageEventTrend";
import { queryCtaClicksByDate } from "@/lib/ga4/queries/queryCtaClicksByDate";

type QueryGoalTrendArgs = {
  propertyId: string;
  range: QueryDateInput;
  goalDefinition: GoalDefinition;
  ctaEventName: string;
  pageViewEventName: string;
};

function roundPct(value: number): number {
  return Number(value.toFixed(2));
}

function safeConversionRate(entries: number, completions: number): number | null {
  if (entries <= 0) return null;
  return roundPct((completions / entries) * 100);
}

function sumDateRows<T extends { date: string }>(
  rows: T[],
  getCount: (row: T) => number
): Map<string, number> {
  const map = new Map<string, number>();

  for (const row of rows) {
    map.set(row.date, (map.get(row.date) ?? 0) + getCount(row));
  }

  return map;
}

async function queryEntryTrend({
  propertyId,
  range,
  goalDefinition,
  ctaEventName,
  pageViewEventName,
}: QueryGoalTrendArgs): Promise<Map<string, number>> {
  const entry = goalDefinition.entry;

  if (entry.type === "event") {
    const rows = await queryEventCountsByDate({
      propertyId,
      range,
      eventNames: [entry.eventName],
    });

    return sumDateRows(rows, (row) => row.count);
  }

  if (entry.type === "page") {
    const rows = await querySpecificPageEventTrend({
      propertyId,
      range,
      eventName: pageViewEventName,
      pageMatch: entry.match,
      pageMatchMode: entry.matchMode ?? "contains",
    });

    return sumDateRows(rows, (row) => row.count);
  }

  if (entry.type === "cta") {
    const rows = await queryCtaClicksByDate({
      propertyId,
      range,
      ctaEventName,
      ctaLabel: entry.label,
      ctaLocation: entry.location,
    });

    return sumDateRows(rows, (row) => row.clicks);
  }

  return new Map<string, number>();
}

export async function queryGoalTrend({
  propertyId,
  range,
  goalDefinition,
  ctaEventName,
  pageViewEventName,
}: QueryGoalTrendArgs): Promise<TrendPoint[]> {
  const [entryMap, completionRows] = await Promise.all([
    queryEntryTrend({
      propertyId,
      range,
      goalDefinition,
      ctaEventName,
      pageViewEventName,
    }),
    queryEventCountsByDate({
      propertyId,
      range,
      eventNames: [goalDefinition.successEvent],
    }),
  ]);

  const completionMap = sumDateRows(completionRows, (row) => row.count);

  const dates = new Set<string>([...entryMap.keys(), ...completionMap.keys()]);

  return Array.from(dates)
    .sort((a, b) => a.localeCompare(b))
    .map((date) => {
      const entries = entryMap.get(date) ?? 0;
      const completions = completionMap.get(date) ?? 0;

      return {
        date,
        entries,
        completions,
        conversionRatePct: safeConversionRate(entries, completions),
      };
    });
}