import { runGa4Report } from "../queryBase";
import { toGa4DateRange } from "../range";
import type { DashboardRange } from "../types";
import type { SiteConfig } from "@/lib/siteConfig/schema";

export async function probePageDimension(
  range: DashboardRange,
  pageDimension: string,
  config: SiteConfig
) {
  if (!config.ga4PropertyId) return [];
  const propertyId = config.ga4PropertyId;
  if (!propertyId) return [];
  const report = await runGa4Report({
    propertyId,
    dateRanges: [toGa4DateRange(range)],
    dimensions: [pageDimension, "eventName"],
    metrics: ["eventCount"],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: { values: ["click cta", "scroll depth"] },
      },
    },
    limit: 10000,
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  });

  return (report.rows ?? []).map((row) => ({
    page: row.dimensionValues?.[0]?.value ?? "(not set)",
    eventName: row.dimensionValues?.[1]?.value ?? "",
    count: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}