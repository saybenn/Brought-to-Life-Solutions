import type { EventCountByDateRow } from "@/lib/ga4/types";
import type { QueryDateInput } from "@/lib/ga4/queryBase";
import {
  eventNameInFilter,
  getDateRange,
  parseRunReportRows,
  runGa4Report,
} from "@/lib/ga4/queryBase";

type QueryEventCountsByDateArgs = {
  propertyId: string;
  range: QueryDateInput;
  eventNames: string[];
};

export async function queryEventCountsByDate({
  propertyId,
  range,
  eventNames,
}: QueryEventCountsByDateArgs): Promise<EventCountByDateRow[]> {
  const normalizedEventNames = eventNames.filter(
    (name): name is string => typeof name === "string" && name.trim().length > 0
  );

  if (!normalizedEventNames.length) return [];

  const dimensionNames = ["date", "eventName"] as const;
  const metricNames = ["eventCount"] as const;

  const response = await runGa4Report({
    propertyId,
    dimensions: [...dimensionNames],
    metrics: [...metricNames],
    dateRanges: getDateRange(range),
    dimensionFilter: eventNameInFilter(normalizedEventNames),
    orderBys: [
      { dimension: { dimensionName: "date" } },
      { dimension: { dimensionName: "eventName" } },
    ],
  });

  const rows = parseRunReportRows(response, [...dimensionNames], [...metricNames]);

  return rows.map((row) => ({
    date: row.dimensions.date,
    eventName: row.dimensions.eventName,
    count: row.metrics.eventCount ?? 0,
  }));
}