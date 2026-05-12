// lib/ga4/queries/formHealth.ts
import { runGa4Report } from "../queryBase";
import { toGa4DateRange } from "../range";
import type { DashboardRange } from "../types";
import type { SiteConfig } from "@/lib/siteConfig/schema";
import { buildEventPlan } from "@/lib/ga4/eventPlan";

export async function queryFormHealth(
  range: DashboardRange,
  config: SiteConfig
) {
  const plan = buildEventPlan(config);

  if (!plan.metricsEnabled.forms) return [];

  const propertyId = config.ga4PropertyId;
  if (!propertyId) return [];

  const formEventName = plan.eventNamesByMetric.forms;
  if (!formEventName) return [];

  const report = await runGa4Report({
    propertyId,
    dateRanges: [toGa4DateRange(range)],
    dimensions: ["date"],
    metrics: ["eventCount"],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: { matchType: "EXACT", value: formEventName },
      },
    },
    limit: 10000,
    orderBys: [{ dimension: { dimensionName: "date" } }],
  });

  return (report.rows ?? []).map((row) => ({
    date: row.dimensionValues?.[0]?.value ?? "",
    submissions: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}