import type { GoalDefinition, GoalKey } from "@/lib/analytics/config.types";

export type DashboardRange = 7 | 30 | 90;

/**
 * Shared date string after normalization.
 * API payload should use YYYY-MM-DD.
 * Raw GA4 often returns YYYYMMDD.
 */
export type IsoDateString = string;

export type Ga4DateString = string;

/**
 * Low-level row shape for "event counts by date".
 */
export type EventCountByDateRow = {
  date: Ga4DateString;
  eventName: string;
  count: number;
};

/**
 * Low-level row shape for "event counts by page".
 */
export type EventCountByPageRow = {
  pageLocation: string;
  eventName: string;
  count: number;
};

/**
 * Low-level row shape for "event counts by source".
 */
export type EventCountBySourceRow = {
  sourceMedium: string;
  eventName: string;
  count: number;
};

/**
 * CTA click base query shape.
 */
export type CtaClickRow = {
  ctaLabel: string;
  ctaLocation: string;
  ctaIntent: string;
  clicks: number;
};

/**
 * Page views trend query output.
 */
export type PageViewsTrendRow = {
  date: Ga4DateString;
  pageViews: number;
};

/**
 * Date-scoped count for a specific filtered page/event combination.
 */
export type SpecificPageEventTrendRow = {
  date: Ga4DateString;
  count: number;
};

/**
 * Raw step count before funnel math is computed.
 */
export type GoalStepCount = {
  key: string;
  name: string;
  count: number;
};

/**
 * Query-layer result for one goal's uncomputed progression counts.
 */
export type GoalStepCountsResult = {
  goalKey: GoalKey;
  goalName: string;
  entryCount: number;
  completionCount: number;
  steps: GoalStepCount[];
};

/**
 * Internal input contract for source conversion query builders.
 */
export type GoalSourceCountRow = {
  sourceMedium: string;
  entries: number;
  completions: number;
};

/**
 * Internal input contract for CTA outcome query builders.
 */
export type GoalCtaOutcomeBaseRow = {
  ctaLabel: string;
  ctaLocation: string;
  clicks: number;
  completions?: number;
};

export type GoalQueryContext = {
  goalKey: GoalKey;
  goalDefinition: GoalDefinition;
  range: DashboardRange;
};

/**
 * Optional query note metadata for routes that want to surface
 * approximation or insufficient-data warnings back to the payload.
 */
export type QueryNote =
  | "cta_outcome_linkage_unreliable"
  | "session_attribution_approximation"
  | "insufficient_data"
  | "goal_disabled";