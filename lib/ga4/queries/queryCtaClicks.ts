import type { QueryDateInput } from "@/lib/ga4/queryBase";
import {
  eventNameEqualsFilter,
  getDateRange,
  parseRunReportRows,
  runGa4Report,
} from "@/lib/ga4/queryBase";

export type CtaClickRow = {
  ctaLabel: string;
  ctaDisplayLabel?: string | null;
  ctaLocation: string;
  ctaIntent: string;
  clicks: number;
};

type QueryCtaClicksArgs = {
  propertyId: string;
  range: QueryDateInput;
  ctaEventName: string;
};

function normalizeDimensionValue(value?: string | null): string {
  return (value ?? "").trim();
}

function titleCaseWords(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      if (word.toLowerCase() === "cta") return "CTA";
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function humanizeAnalyticsLabel(label: string): string {
  const normalized = normalizeDimensionValue(label);

  if (!normalized) return "(unlabeled CTA)";

  const lower = normalized.toLowerCase();

  if (lower === "primary_guided_cta") {
    return "Guided CTA";
  }

  return titleCaseWords(
    normalized
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function makeAggregateKey(label: string, location: string, intent: string): string {
  return `${label}__${location}__${intent}`;
}

export async function queryCtaClicks({
  propertyId,
  range,
  ctaEventName,
}: QueryCtaClicksArgs): Promise<CtaClickRow[]> {
  if (!ctaEventName) return [];

  const dimensionNames = [
    "customEvent:label",
    "customEvent:location",
    "customEvent:intent",
  ] as const;

  const metricNames = ["eventCount"] as const;

  const response = await runGa4Report({
    propertyId,
    dimensions: [...dimensionNames],
    metrics: [...metricNames],
    dateRanges: getDateRange(range),
    dimensionFilter: eventNameEqualsFilter(ctaEventName),
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  });

  const rows = parseRunReportRows(response, [...dimensionNames], [...metricNames]);

  const aggregated = new Map<string, CtaClickRow>();

  for (const row of rows) {
    const ctaLabel =
      normalizeDimensionValue(row.dimensions["customEvent:label"]) ||
      "(unlabeled CTA)";

    const ctaLocation =
      normalizeDimensionValue(row.dimensions["customEvent:location"]) ||
      "(unknown location)";

    const ctaIntent = normalizeDimensionValue(
      row.dimensions["customEvent:intent"],
    );

    const clicks = row.metrics.eventCount ?? 0;
    if (clicks <= 0) continue;

    const key = makeAggregateKey(ctaLabel, ctaLocation, ctaIntent);
    const existing = aggregated.get(key);

    if (existing) {
      existing.clicks += clicks;
      continue;
    }

    aggregated.set(key, {
      ctaLabel,
      ctaDisplayLabel: humanizeAnalyticsLabel(ctaLabel),
      ctaLocation,
      ctaIntent,
      clicks,
    });
  }

  return Array.from(aggregated.values()).sort((a, b) => b.clicks - a.clicks);
}