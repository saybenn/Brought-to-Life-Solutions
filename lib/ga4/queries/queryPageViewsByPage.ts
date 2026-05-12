import type { PageViewRow } from "@/lib/dashboard/payload";
import type { QueryDateInput } from "@/lib/ga4/queryBase";
import {
  eventNameEqualsFilter,
  getDateRange,
  normalizePathForMatch,
  parseRunReportRows,
  runGa4Report,
} from "@/lib/ga4/queryBase";

type QueryPageViewsByPageArgs = {
  propertyId: string;
  range: QueryDateInput;
  pageViewEventName: string;
};

function roundPct(value: number): number {
  return Number(value.toFixed(2));
}

function shouldExcludePagePath(pagePath: string): boolean {
  if (!pagePath) return true;

  if (pagePath === "/login") return true;
  if (pagePath === "/dashboard") return true;
  if (pagePath.startsWith("/dashboard/")) return true;

  return false;
}

export async function queryPageViewsByPage({
  propertyId,
  range,
  pageViewEventName,
}: QueryPageViewsByPageArgs): Promise<PageViewRow[]> {
  if (!pageViewEventName) return [];

  const dimensionNames = ["pageLocation"] as const;
  const metricNames = ["eventCount"] as const;

  const response = await runGa4Report({
    propertyId,
    dimensions: [...dimensionNames],
    metrics: [...metricNames],
    dateRanges: getDateRange(range),
    dimensionFilter: eventNameEqualsFilter(pageViewEventName),
    orderBys: [
      { metric: { metricName: "eventCount" }, desc: true },
      { dimension: { dimensionName: "pageLocation" } },
    ],
  });

  const rows = parseRunReportRows(response, [...dimensionNames], [...metricNames]);

  const aggregated = new Map<string, PageViewRow>();

  for (const row of rows) {
    const pageLocation = row.dimensions.pageLocation || "";
    const pagePath = normalizePathForMatch(pageLocation);
    const views = row.metrics.eventCount ?? 0;

    if (!pagePath || views <= 0) continue;
    if (shouldExcludePagePath(pagePath)) continue;

    const existing = aggregated.get(pagePath);
    if (existing) {
      existing.views += views;
      continue;
    }

    aggregated.set(pagePath, {
      pageLocation,
      pagePath,
      views,
      sharePct: null,
    });
  }

  const out = Array.from(aggregated.values()).sort((a, b) => b.views - a.views);
  const totalViews = out.reduce((sum, row) => sum + row.views, 0);

  return out.map((row) => ({
    ...row,
    sharePct: totalViews > 0 ? roundPct((row.views / totalViews) * 100) : null,
  }));
}