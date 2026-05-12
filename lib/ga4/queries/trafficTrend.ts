// lib/ga4/queries/trafficTrend.ts
import { runGa4Report } from "../queryBase";
import { toGa4DateRange } from "../range";
import type { DashboardRange } from "../types";
import type { SiteConfig } from "@/lib/siteConfig/schema";

export async function queryPageViewsTrend(
  range: DashboardRange,
  config: SiteConfig
) {
  if (!config.trafficEnabled.pageViews) return [];

  const propertyId = config.ga4PropertyId;
  if (!propertyId) return [];

  const eventName = config.eventMap.pageViewEventName;
  if (!eventName) return [];

  const report = await runGa4Report({
    propertyId,
    dateRanges: [toGa4DateRange(range)],
    dimensions: ["date"],
    metrics: ["eventCount"],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: { matchType: "EXACT", value: eventName },
      },
    },
    limit: 10000,
    orderBys: [{ dimension: { dimensionName: "date" } }],
  });

  return (report.rows ?? []).map((row) => ({
    date: row.dimensionValues?.[0]?.value ?? "",
    pageViews: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}