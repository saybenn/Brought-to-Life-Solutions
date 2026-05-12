import { runGa4Report } from "../queryBase";
import { toGa4DateRange } from "../range";
import type { DashboardRange } from "../types";
import type { SiteConfig } from "@/lib/siteConfig/schema";
import { buildEventPlan, type ActionMetricCounts } from "@/lib/ga4/eventPlan";

export async function queryIntentTrend(range: DashboardRange, config: SiteConfig) {
    const propertyId = config.ga4PropertyId;
  if (!propertyId) return [];
  const plan = buildEventPlan(config);

  if (plan.eventNamesToQuery.length === 0) return [];

const formEventName = plan.eventNamesByMetric.forms;

if (!formEventName) return [];

  const report = await runGa4Report({
    propertyId,
    dateRanges: [toGa4DateRange(range)],
    dimensions: ["date", "eventName"],
    metrics: ["eventCount"],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: { values: plan.eventNamesToQuery },
      },
    },
    limit: 10000,
    orderBys: [{ dimension: { dimensionName: "date" } }],
  });

  // rest stays same
}