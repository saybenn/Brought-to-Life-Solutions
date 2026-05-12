import type { PathMatchMode } from "@/lib/analytics/config.types";
import type { SpecificPageEventTrendRow } from "@/lib/ga4/types";
import type { QueryDateInput } from "@/lib/ga4/queryBase";
import {
  eventNameEqualsFilter,
  getDateRange,
  matchesPath,
  parseRunReportRows,
  runGa4Report,
} from "@/lib/ga4/queryBase";

type QuerySpecificPageEventTrendArgs = {
  propertyId: string;
  range: QueryDateInput;
  eventName: string;
  pageMatch: string;
  pageMatchMode?: PathMatchMode;
};

export async function querySpecificPageEventTrend({
  propertyId,
  range,
  eventName,
  pageMatch,
  pageMatchMode = "contains",
}: QuerySpecificPageEventTrendArgs): Promise<SpecificPageEventTrendRow[]> {
  const normalizedEventName = eventName?.trim();
  const normalizedPageMatch = pageMatch?.trim();

  if (!normalizedEventName || !normalizedPageMatch) return [];

  const dimensionNames = ["date", "pageLocation"] as const;
  const metricNames = ["eventCount"] as const;

  const response = await runGa4Report({
    propertyId,
    dimensions: [...dimensionNames],
    metrics: [...metricNames],
    dateRanges: getDateRange(range),
    dimensionFilter: eventNameEqualsFilter(normalizedEventName),
    orderBys: [{ dimension: { dimensionName: "date" } }],
  });

  const rows = parseRunReportRows(response, [...dimensionNames], [...metricNames]);

  const totalsByDate = new Map<string, number>();

  for (const row of rows) {
    const date = row.dimensions.date;
    const pageLocation = row.dimensions.pageLocation;
    const count = row.metrics.eventCount ?? 0;

    if (!matchesPath(pageLocation, normalizedPageMatch, pageMatchMode)) {
      continue;
    }

    totalsByDate.set(date, (totalsByDate.get(date) ?? 0) + count);
  }

  return Array.from(totalsByDate.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}