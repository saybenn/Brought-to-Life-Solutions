import type { EventCountByPageRow } from "@/lib/ga4/types";
import type { QueryDateInput } from "@/lib/ga4/queryBase";
import {
  eventNameInFilter,
  getDateRange,
  parseRunReportRows,
  runGa4Report,
} from "@/lib/ga4/queryBase";

type QueryEventCountsByPageArgs = {
  propertyId: string;
  range: QueryDateInput;
  eventNames: string[];
};

export async function queryEventCountsByPage({
  propertyId,
  range,
  eventNames,
}: QueryEventCountsByPageArgs): Promise<EventCountByPageRow[]> {
  const normalizedEventNames = eventNames.filter(
    (name): name is string => typeof name === "string" && name.trim().length > 0
  );

  if (!normalizedEventNames.length) return [];

  const dimensionNames = ["pageLocation", "eventName"] as const;
  const metricNames = ["eventCount"] as const;

  const response = await runGa4Report({
    propertyId,
    dimensions: [...dimensionNames],
    metrics: [...metricNames],
    dateRanges: getDateRange(range),
    dimensionFilter: eventNameInFilter(normalizedEventNames),
    orderBys: [
      { metric: { metricName: "eventCount" }, desc: true },
      { dimension: { dimensionName: "pageLocation" } },
    ],
  });

  const rows = parseRunReportRows(response, [...dimensionNames], [...metricNames]);

  return rows.map((row) => ({
    pageLocation: row.dimensions.pageLocation,
    eventName: row.dimensions.eventName,
    count: row.metrics.eventCount ?? 0,
  }));
}