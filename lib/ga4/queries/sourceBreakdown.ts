// lib/ga4/queries/sourceBreakdown.ts
import { runGa4Report } from "../queryBase";
import type { DashboardRange } from "../types";
import type { SiteConfig } from "@/lib/siteConfig/schema";
import { buildEventPlan, ActionMetricCounts } from "@/lib/ga4/eventPlan";
import { excludeTagAssistant } from "../filters";
import { toGa4DateRange } from "../range";

export async function querySourceBreakdown(range: DashboardRange, config: SiteConfig) {
  const plan = buildEventPlan(config);
  const propertyId = config.ga4PropertyId;
  if (!propertyId) return [];
  if (plan.eventNamesToQuery.length === 0) return [];

  const report = await runGa4Report({
    propertyId,
    dateRanges: [toGa4DateRange(range)],
    dimensions: ["sessionSourceMedium", "eventName"],
    metrics: ["eventCount"],
    dimensionFilter: {
      andGroup: {
        expressions: [
          {
            filter: {
              fieldName: "eventName",
              inListFilter: { values: plan.eventNamesToQuery },
            },
          },
          excludeTagAssistant(),
        ],
      },
    },
    limit: 10000,
  });

  const map = new Map<
    string,
    { sourceMedium: string; ctaClicks: number; formSubmits: number; callClicks: number }
  >();

  for (const row of report.rows ?? []) {
    const sourceMedium = row.dimensionValues?.[0]?.value ?? "(not set)";
    const eventName = row.dimensionValues?.[1]?.value ?? "";
    const count = Number(row.metricValues?.[0]?.value ?? 0);

    if (!map.has(sourceMedium)) {
      map.set(sourceMedium, { sourceMedium, ctaClicks: 0, formSubmits: 0, callClicks: 0 });
    }

    const entry = map.get(sourceMedium)!;

    if (eventName === plan.eventNamesByMetric.cta) entry.ctaClicks += count;
    if (eventName === plan.eventNamesByMetric.forms) entry.formSubmits += count;

    const callName = plan.eventNamesByMetric.calls;
    if (callName && eventName === callName) entry.callClicks += count;
  }

  return Array.from(map.values())
    .map((s) => {
      const counts: ActionMetricCounts = {
        cta: s.ctaClicks,
        forms: s.formSubmits,
        calls: s.callClicks,
      };
      return { ...s, intentTotal: plan.computeIntentTotal(counts) };
    })
    .sort((a, b) => b.intentTotal - a.intentTotal);
}
