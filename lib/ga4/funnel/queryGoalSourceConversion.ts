import type { GoalDefinition } from "@/lib/analytics/config.types";
import type { EventCountBySourceRow } from "@/lib/ga4/types";
import type { QueryDateInput } from "@/lib/ga4/queryBase";
import type {
  LeadSourceDiagnostics,
  LeadSourceRow,
} from "@/lib/dashboard/payload";
import {
  queryEventCountsBySource,
  type QueryEventCountsBySourceResult,
} from "@/lib/ga4/queries/queryEventCountsBySource";

type QueryGoalSourceConversionArgs = {
  propertyId: string;
  range: QueryDateInput;
  goalDefinition: GoalDefinition;
  ctaEventName: string;
  pageViewEventName: string;
  filters?: {
    excludeSourceMediumContains?: string[];
  };
};

export type QueryGoalSourceConversionResult = {
  rows: LeadSourceRow[];
  diagnostics: LeadSourceDiagnostics;
};

function roundPct(value: number): number {
  return Number(value.toFixed(2));
}

function buildSourceMap(rows: EventCountBySourceRow[]): Map<string, number> {
  const map = new Map<string, number>();

  for (const row of rows) {
    map.set(row.sourceMedium, (map.get(row.sourceMedium) ?? 0) + row.count);
  }

  return map;
}

async function queryEntrySourceRows({
  propertyId,
  range,
  goalDefinition,
  ctaEventName,
  pageViewEventName,
  filters,
}: QueryGoalSourceConversionArgs): Promise<QueryEventCountsBySourceResult> {
  const entry = goalDefinition.entry;

  if (entry.type === "event") {
    return queryEventCountsBySource({
      propertyId,
      range,
      eventNames: [entry.eventName],
      excludeSourceMediumContains: filters?.excludeSourceMediumContains,
    });
  }

  if (entry.type === "page") {
    return queryEventCountsBySource({
      propertyId,
      range,
      eventNames: [pageViewEventName],
      pageMatch: entry.match,
      pageMatchMode: entry.matchMode ?? "contains",
      excludeSourceMediumContains: filters?.excludeSourceMediumContains,
    });
  }

  if (entry.type === "cta") {
    return queryEventCountsBySource({
      propertyId,
      range,
      eventNames: [ctaEventName],
      ctaLabel: entry.label,
      ctaLocation: entry.location,
      excludeSourceMediumContains: filters?.excludeSourceMediumContains,
    });
  }

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

function combineDiagnostics(
  entryDiagnostics: LeadSourceDiagnostics,
  completionDiagnostics: LeadSourceDiagnostics,
  finalRowCount: number,
): LeadSourceDiagnostics {
  if (finalRowCount > 0) {
    return {
      reason: "ok",
      rawRowCount:
        entryDiagnostics.rawRowCount + completionDiagnostics.rawRowCount,
      keptRowCount: finalRowCount,
      droppedRowCount:
        entryDiagnostics.droppedRowCount + completionDiagnostics.droppedRowCount,
      droppedExamples: [
        ...(entryDiagnostics.droppedExamples ?? []),
        ...(completionDiagnostics.droppedExamples ?? []),
      ].slice(0, 6),
    };
  }

  const reasons = [entryDiagnostics.reason, completionDiagnostics.reason];

  let reason: LeadSourceDiagnostics["reason"] = "no_data";
  if (reasons.includes("noise_only")) {
    reason = "noise_only";
  } else if (reasons.includes("unattributed_only")) {
    reason = "unattributed_only";
  }

  return {
    reason,
    rawRowCount: entryDiagnostics.rawRowCount + completionDiagnostics.rawRowCount,
    keptRowCount: 0,
    droppedRowCount:
      entryDiagnostics.droppedRowCount + completionDiagnostics.droppedRowCount,
    droppedExamples: [
      ...(entryDiagnostics.droppedExamples ?? []),
      ...(completionDiagnostics.droppedExamples ?? []),
    ].slice(0, 6),
  };
}

export async function queryGoalSourceConversion({
  propertyId,
  range,
  goalDefinition,
  ctaEventName,
  pageViewEventName,
  filters,
}: QueryGoalSourceConversionArgs): Promise<QueryGoalSourceConversionResult> {
  const [entryResult, completionResult] = await Promise.all([
    queryEntrySourceRows({
      propertyId,
      range,
      goalDefinition,
      ctaEventName,
      pageViewEventName,
      filters,
    }),
    queryEventCountsBySource({
      propertyId,
      range,
      eventNames: [goalDefinition.successEvent],
      excludeSourceMediumContains: filters?.excludeSourceMediumContains,
    }),
  ]);

  const entryMap = buildSourceMap(entryResult.rows);
  const completionMap = buildSourceMap(completionResult.rows);

  const allSources = new Set<string>([
    ...entryMap.keys(),
    ...completionMap.keys(),
  ]);

  const rows = Array.from(allSources)
    .map((sourceMedium) => {
      const entries = entryMap.get(sourceMedium) ?? 0;
      const completions = completionMap.get(sourceMedium) ?? 0;
      const conversionRatePct =
        entries > 0 ? roundPct((completions / entries) * 100) : 0;

      return {
        sourceMedium,
        entries,
        completions,
        conversionRatePct,
      };
    })
    .filter((row) => row.entries > 0 || row.completions > 0)
    .sort((a, b) => {
      if (b.completions !== a.completions) return b.completions - a.completions;
      if (b.conversionRatePct !== a.conversionRatePct) {
        return b.conversionRatePct - a.conversionRatePct;
      }
      return b.entries - a.entries;
    });

  const diagnostics = combineDiagnostics(
    entryResult.diagnostics,
    completionResult.diagnostics,
    rows.length,
  );

  console.debug("[source-conversion] queryGoalSourceConversion", {
    goalName: goalDefinition.name,
    entryDiagnostics: entryResult.diagnostics,
    completionDiagnostics: completionResult.diagnostics,
    finalDiagnostics: diagnostics,
    finalRowCount: rows.length,
    finalPreview: rows.slice(0, 20),
  });

  return {
    rows,
    diagnostics,
  };
}