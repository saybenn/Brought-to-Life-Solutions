import type { PageViewsTrendRow } from "@/lib/ga4/types";
import type { QueryDateInput } from "@/lib/ga4/queryBase";
import {
  eventNameEqualsFilter,
  getDateRange,
  parseRunReportRows,
  runGa4Report,
} from "@/lib/ga4/queryBase";

type QueryPageViewsTrendArgs = {
  propertyId: string;
  range: QueryDateInput;
  pageViewEventName: string;
};

export async function queryPageViewsTrend({
  propertyId,
  range,
  pageViewEventName,
}: QueryPageViewsTrendArgs): Promise<PageViewsTrendRow[]> {
  if (!pageViewEventName) return [];

  const dimensionNames = ["date"] as const;
  const metricNames = ["eventCount"] as const;

  const response = await runGa4Report({
    propertyId,
    dimensions: [...dimensionNames],
    metrics: [...metricNames],
    dateRanges: getDateRange(range),
    dimensionFilter: eventNameEqualsFilter(pageViewEventName),
    orderBys: [{ dimension: { dimensionName: "date" } }],
  });

  const rows = parseRunReportRows(response, [...dimensionNames], [...metricNames]);

  return rows.map((row) => ({
    date: row.dimensions.date,
    pageViews: row.metrics.eventCount ?? 0,
  }));
}