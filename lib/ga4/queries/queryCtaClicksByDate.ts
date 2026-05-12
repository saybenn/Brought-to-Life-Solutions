import {
  andGroup,
  eventNameEqualsFilter,
  getDateRange,
  parseRunReportRows,
  runGa4Report,
  stringFilter,
} from "@/lib/ga4/queryBase";
import type { QueryDateInput } from "@/lib/ga4/queryBase";

export type CtaClickByDateRow = {
  date: string;
  ctaLabel: string;
  ctaLocation: string;
  clicks: number;
};

type QueryCtaClicksByDateArgs = {
  propertyId: string;
  range: QueryDateInput;
  ctaEventName: string;
  ctaLabel?: string;
  ctaLocation?: string;
};

export async function queryCtaClicksByDate({
  propertyId,
  range,
  ctaEventName,
  ctaLabel,
  ctaLocation,
}: QueryCtaClicksByDateArgs): Promise<CtaClickByDateRow[]> {
  if (!ctaEventName) return [];

  const dimensionNames = [
    "date",
    "customEvent:label",
    "customEvent:location",
  ] as const;
  const metricNames = ["eventCount"] as const;

  const response = await runGa4Report({
    propertyId,
    dimensions: [...dimensionNames],
    metrics: [...metricNames],
    dateRanges: getDateRange(range),
    dimensionFilter: andGroup([
      eventNameEqualsFilter(ctaEventName),
      ctaLabel
        ? stringFilter("customEvent:label", "EXACT", ctaLabel, false)
        : undefined,
      ctaLocation
        ? stringFilter("customEvent:location", "EXACT", ctaLocation, false)
        : undefined,
    ]),
    orderBys: [
      { dimension: { dimensionName: "date" } },
      { metric: { metricName: "eventCount" }, desc: true },
    ],
  });

  const rows = parseRunReportRows(response, [...dimensionNames], [...metricNames]);

  return rows.map((row) => ({
    date: row.dimensions.date,
    ctaLabel: row.dimensions["customEvent:label"] || "(unlabeled CTA)",
    ctaLocation: row.dimensions["customEvent:location"] || "(unknown location)",
    clicks: row.metrics.eventCount ?? 0,
  }));
}