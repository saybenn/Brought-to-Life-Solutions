import type { PathMatchMode } from "@/lib/analytics/config.types";
import type { EventCountBySourceRow } from "@/lib/ga4/types";
import type { Ga4FilterExpression, QueryDateInput } from "@/lib/ga4/queryBase";
import type { LeadSourceDiagnostics } from "@/lib/dashboard/payload";
import {
  andGroup,
  buildExcludeContainsFilters,
  eventNameInFilter,
  getDateRange,
  matchesPath,
  parseRunReportRows,
  runGa4Report,
  stringFilter,
} from "@/lib/ga4/queryBase";

type QueryEventCountsBySourceArgs = {
  propertyId: string;
  range: QueryDateInput;
  eventNames: string[];
  pageMatch?: string;
  pageMatchMode?: PathMatchMode;
  ctaLabel?: string;
  ctaLocation?: string;
  excludeSourceMediumContains?: string[];
};

export type QueryEventCountsBySourceResult = {
  rows: EventCountBySourceRow[];
  diagnostics: LeadSourceDiagnostics;
};

function buildExactMatchFilter(
  dimensionName: string,
  value?: string | null,
): Ga4FilterExpression | null {
  const normalized = typeof value === "string" ? value.trim() : "";
  if (!normalized) return null;

  return stringFilter(dimensionName, "EXACT", normalized, false);
}

function normalizeSourceMedium(value?: string | null): string {
  return (value ?? "").trim();
}

function classifyNoiseSourceMedium(
  sourceMedium: string,
): "noise_only" | "unattributed_only" | null {
  const normalized = sourceMedium.trim().toLowerCase();

  if (!normalized) return "unattributed_only";
  if (normalized.includes("(not set)")) return "unattributed_only";
  if (normalized.includes("tagassistant.google.com")) return "noise_only";
  if (normalized.includes("localhost")) return "noise_only";
  if (normalized.includes("127.0.0.1")) return "noise_only";

  if (normalized === "test") return "noise_only";
  if (normalized.startsWith("test /")) return "noise_only";
  if (normalized === "testing") return "noise_only";
  if (normalized.startsWith("testing /")) return "noise_only";

  return null;
}

export async function queryEventCountsBySource({
  propertyId,
  range,
  eventNames,
  pageMatch,
  pageMatchMode = "contains",
  ctaLabel,
  ctaLocation,
  excludeSourceMediumContains,
}: QueryEventCountsBySourceArgs): Promise<QueryEventCountsBySourceResult> {
  const normalizedEventNames = eventNames.filter(
    (name): name is string => typeof name === "string" && name.trim().length > 0,
  );

  if (!normalizedEventNames.length) {
    return {
      rows: [],
      diagnostics: {
        reason: "no_data",
        rawRowCount: 0,
        keptRowCount: 0,
        droppedRowCount: 0,
        droppedExamples: [],
      },
    };
  }

  const normalizedPageMatch =
    typeof pageMatch === "string" && pageMatch.trim().length > 0
      ? pageMatch.trim()
      : undefined;

  const dimensionNames = [
    "sessionSourceMedium",
    "eventName",
    "pageLocation",
    "customEvent:label",
    "customEvent:location",
  ] as const;

  const metricNames = ["eventCount"] as const;

  const filterParts: Array<Ga4FilterExpression | null | undefined> = [
    eventNameInFilter(normalizedEventNames),
    buildExactMatchFilter("customEvent:label", ctaLabel),
    buildExactMatchFilter("customEvent:location", ctaLocation),
    buildExcludeContainsFilters(
      "sessionSourceMedium",
      excludeSourceMediumContains,
    ),
  ];

  const response = await runGa4Report({
    propertyId,
    dimensions: [...dimensionNames],
    metrics: [...metricNames],
    dateRanges: getDateRange(range),
    dimensionFilter: andGroup(filterParts),
    orderBys: [
      { metric: { metricName: "eventCount" }, desc: true },
      { dimension: { dimensionName: "sessionSourceMedium" } },
    ],
  });

  const parsedRows = parseRunReportRows(
    response,
    [...dimensionNames],
    [...metricNames],
  );

  const aggregated = new Map<string, EventCountBySourceRow>();
  const droppedExamples = new Set<string>();
  let droppedRowCount = 0;
  let sawNoiseOnly = false;
  let sawUnattributedOnly = false;

  for (const row of parsedRows) {
    const sourceMedium = normalizeSourceMedium(
      row.dimensions.sessionSourceMedium || "(not set)",
    );
    const eventName = row.dimensions.eventName;
    const pageLocation = row.dimensions.pageLocation;
    const count = row.metrics.eventCount ?? 0;

    if (count <= 0) continue;

    if (
      normalizedPageMatch &&
      !matchesPath(pageLocation, normalizedPageMatch, pageMatchMode)
    ) {
      continue;
    }

    const noiseType = classifyNoiseSourceMedium(sourceMedium);
    if (noiseType) {
      droppedRowCount += 1;
      if (droppedExamples.size < 6) {
        droppedExamples.add(sourceMedium);
      }
      if (noiseType === "noise_only") sawNoiseOnly = true;
      if (noiseType === "unattributed_only") sawUnattributedOnly = true;
      continue;
    }

    const existing = aggregated.get(sourceMedium);

    if (existing) {
      existing.count += count;
      continue;
    }

    aggregated.set(sourceMedium, {
      sourceMedium,
      eventName,
      count,
    });
  }

  const rows = Array.from(aggregated.values()).sort((a, b) => b.count - a.count);

  let reason: LeadSourceDiagnostics["reason"] = "ok";
  if (parsedRows.length === 0) {
    reason = "no_data";
  } else if (rows.length === 0 && sawNoiseOnly && !sawUnattributedOnly) {
    reason = "noise_only";
  } else if (rows.length === 0 && sawUnattributedOnly && !sawNoiseOnly) {
    reason = "unattributed_only";
  } else if (rows.length === 0 && (sawNoiseOnly || sawUnattributedOnly)) {
    reason = sawNoiseOnly ? "noise_only" : "unattributed_only";
  }

  const diagnostics: LeadSourceDiagnostics = {
    reason,
    rawRowCount: parsedRows.length,
    keptRowCount: rows.length,
    droppedRowCount,
    droppedExamples: Array.from(droppedExamples),
  };

  return {
    rows,
    diagnostics,
  };
}