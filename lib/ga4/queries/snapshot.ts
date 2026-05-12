// lib/ga4/queries/snapshot.ts
import { runGa4Report } from "../queryBase";
import type { DashboardRange } from "../types";
import type { SiteConfig } from "@/lib/siteConfig/schema";
import { buildEventPlan, ActionMetricCounts } from "@/lib/ga4/eventPlan";
import { toGa4DateRange } from "../range";

export async function querySnapshot(range: DashboardRange, config: SiteConfig) {
  const plan = buildEventPlan(config);
  const propertyId = config.ga4PropertyId;
  if (!propertyId) return [];
  // If nothing is enabled, return zeros.
  if (plan.eventNamesToQuery.length === 0) {
    const counts: ActionMetricCounts = { cta: 0, forms: 0, calls: 0 };
    return {
      ctaClicks: 0,
      formSubmits: 0,
      callClicks: 0,
      intentTotal: plan.computeIntentTotal(counts),
    };
  }
const formEventName = plan.eventNamesByMetric.forms;

if (!formEventName) return [];
  const report = await runGa4Report({
     dateRanges: [toGa4DateRange(range)],
   propertyId,

    dimensions: ["eventName"],
    metrics: ["eventCount"],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: { values: plan.eventNamesToQuery },
      },
    },
    limit: 50,
  });

  const counts: ActionMetricCounts = { cta: 0, forms: 0, calls: 0 };

  for (const row of report.rows ?? []) {
    const name = row.dimensionValues?.[0]?.value ?? "";
    const count = Number(row.metricValues?.[0]?.value ?? 0);

    if (name === plan.eventNamesByMetric.cta) counts.cta += count;
    if (name === plan.eventNamesByMetric.forms) counts.forms += count;

    const callName = plan.eventNamesByMetric.calls;
    if (callName && name === callName) counts.calls += count;
  }

  return {
    ctaClicks: counts.cta,
    formSubmits: counts.forms,
    callClicks: counts.calls,
    intentTotal: plan.computeIntentTotal(counts),
  };
}
