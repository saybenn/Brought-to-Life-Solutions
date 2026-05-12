// lib/ga4/queries/pageIntent.ts
import { runGa4Report } from "../queryBase";
import type { DashboardRange } from "../types";
import type { SiteConfig } from "@/lib/siteConfig/schema";
import { buildEventPlan, ActionMetricCounts } from "@/lib/ga4/eventPlan";
import { toGa4DateRange } from "../range";

function toPathname(url: string) {
  try {
    return new URL(url).pathname || "(not set)";
  } catch {
    return url.split("?")[0] || "(not set)";
  }
}

export async function queryPageIntent(range: DashboardRange, config: SiteConfig) {
    const propertyId = config.ga4PropertyId;
  if (!propertyId) return [];
  const plan = buildEventPlan(config);

  if (plan.eventNamesToQuery.length === 0) return [];
const formEventName = plan.eventNamesByMetric.forms;

if (!formEventName) return [];
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

  const map = new Map<
    string,
    { pagePath: string; ctaClicks: number; formSubmits: number; callClicks: number }
  >();

  for (const row of report.rows ?? []) {
    const pageLocation = row.dimensionValues?.[0]?.value ?? "(not set)";
    const eventName = row.dimensionValues?.[1]?.value ?? "";
    const count = Number(row.metricValues?.[0]?.value ?? 0);

    const pagePath = toPathname(pageLocation);

    if (!map.has(pagePath)) {
      map.set(pagePath, { pagePath, ctaClicks: 0, formSubmits: 0, callClicks: 0 });
    }

    const entry = map.get(pagePath)!;

    if (eventName === plan.eventNamesByMetric.cta) entry.ctaClicks += count;
    if (eventName === plan.eventNamesByMetric.forms) entry.formSubmits += count;

    const callName = plan.eventNamesByMetric.calls;
    if (callName && eventName === callName) entry.callClicks += count;
  }

  return Array.from(map.values())
    .map((p) => {
      const counts: ActionMetricCounts = {
        cta: p.ctaClicks,
        forms: p.formSubmits,
        calls: p.callClicks,
      };
      return { ...p, intentTotal: plan.computeIntentTotal(counts) };
    })
    .sort((a, b) => b.intentTotal - a.intentTotal);
}
