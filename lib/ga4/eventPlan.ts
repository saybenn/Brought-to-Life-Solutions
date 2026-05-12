// lib/ga4/eventPlan.ts
import type { SiteConfig } from "@/lib/siteConfig/schema";

export type ActionMetricKey = "cta" | "forms" | "calls";

export type ActionMetricCounts = Record<ActionMetricKey, number>;

/**
 * ACTION EVENT TRANSLATOR (Intent lane)
 *
 * This file ONLY cares about action metrics:
 * - cta
 * - forms
 * - calls
 *
 * Traffic (pageViews) is a separate lane handled by traffic queries.
 */
export function buildEventPlan(config: SiteConfig) {
  const metricsEnabled: Record<ActionMetricKey, boolean> = {
    cta: !!config.metricsEnabled?.cta,
    forms: !!config.metricsEnabled?.forms,
    calls: !!config.metricsEnabled?.calls,
  };

  const eventNamesByMetric: Record<ActionMetricKey, string | undefined> = {
    cta: config.eventMap.ctaEventName,
    forms: config.eventMap.formEventName,
    calls: config.eventMap.callEventName,
  };

  const eventNamesToQuery: string[] = [];

  if (metricsEnabled.cta && eventNamesByMetric.cta) {
    eventNamesToQuery.push(eventNamesByMetric.cta);
  }

  if (metricsEnabled.forms && eventNamesByMetric.forms) {
    eventNamesToQuery.push(eventNamesByMetric.forms);
  }

  if (metricsEnabled.calls && eventNamesByMetric.calls) {
    eventNamesToQuery.push(eventNamesByMetric.calls);
  }

  const intentDefinition: ActionMetricKey[] = config.intentDefinition;

  function computeIntentTotal(counts: ActionMetricCounts) {
    return intentDefinition.reduce((total, metric) => {
      if (!metricsEnabled[metric]) return total;
      return total + counts[metric];
    }, 0);
  }

  return {
    metricsEnabled,
    eventNamesByMetric,
    eventNamesToQuery,
    intentDefinition,
    computeIntentTotal,
  };
}