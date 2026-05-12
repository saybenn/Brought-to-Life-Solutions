// lib/ga4/queries/ctaPerformance.ts
import { runGa4Report } from "../queryBase";
import type { DashboardRange } from "../types";
import type { SiteConfig } from "@/lib/siteConfig/schema";
import { buildEventPlan } from "@/lib/ga4/eventPlan";
import { toGa4DateRange } from "../range";

export async function queryCtaPerformance(range: DashboardRange, config: SiteConfig) {
  const plan = buildEventPlan(config);
    const propertyId = config.ga4PropertyId;
  if (!propertyId) return [];
  if (!plan.metricsEnabled.cta) return [];
const ctaEventName = plan.eventNamesByMetric.cta;

if (!ctaEventName) return [];
    const report = await runGa4Report({
dateRanges: [toGa4DateRange(range)],
    dimensions: ["pageLocation", "eventName"],
    metrics: ["eventCount"],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: { values: plan.eventNamesToQuery },
      },
    },
    limit: 10000,
    propertyId,
  });

  return (report.rows ?? []).map((row) => ({
    ctaLabel: row.dimensionValues?.[0]?.value ?? "(not set)",
    intent: row.dimensionValues?.[1]?.value ?? "(not set)",
    ctaLocation: row.dimensionValues?.[2]?.value ?? "(not set)",
    clicks: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}
