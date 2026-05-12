import { getGa4Client, toGa4PropertyPath } from "@/lib/ga4/client";
import type { DashboardRange, IsoDateString } from "@/lib/ga4/types";
import type { PathMatchMode } from "@/lib/analytics/config.types";

export type Ga4SiteContext = {
  propertyId: string;
};

export type Ga4StringMatchType =
  | "EXACT"
  | "BEGINS_WITH"
  | "ENDS_WITH"
  | "CONTAINS"
  | "FULL_REGEXP"
  | "PARTIAL_REGEXP";

export type Ga4FilterExpression = {
  filter?: {
    fieldName: string;
    stringFilter?: {
      matchType: Ga4StringMatchType;
      value: string;
      caseSensitive?: boolean;
    };
    inListFilter?: {
      values: string[];
      caseSensitive?: boolean;
    };
  };
  andGroup?: {
    expressions: Ga4FilterExpression[];
  };
  notExpression?: Ga4FilterExpression;
};

export type Ga4DateRange = {
  startDate: string;
  endDate: string;
};

export type Ga4OrderBy = {
  dimension?: { dimensionName: string };
  metric?: { metricName: string };
  desc?: boolean;
};

export type QueryDateInput =
  | DashboardRange
  | {
      startDate: IsoDateString;
      endDate: IsoDateString;
    };

export type Ga4ReportParams = {
  propertyId: string;
  dimensions?: string[];
  metrics: string[];
  dateRanges?: Ga4DateRange[];
  dimensionFilter?: Ga4FilterExpression;
  metricFilter?: Ga4FilterExpression;
  offset?: number;
  limit?: number;
  orderBys?: Ga4OrderBy[];
  keepEmptyRows?: boolean;
};

export type ParsedGa4Row = {
  dimensions: Record<string, string>;
  metrics: Record<string, number>;
};

type Ga4RunReportResponseRow = {
  dimensionValues?: Array<{ value?: string | null }>;
  metricValues?: Array<{ value?: string | null }>;
};

type Ga4RunReportResponse = {
  rows?: Ga4RunReportResponseRow[];
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isQuotaError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const maybe = error as { code?: number; details?: string; message?: string };

  return (
    maybe.code === 8 ||
    (typeof maybe.details === "string" &&
      maybe.details.includes("Exhausted concurrent requests quota")) ||
    (typeof maybe.message === "string" &&
      maybe.message.includes("Exhausted concurrent requests quota"))
  );
}

export function getDateRange(range: QueryDateInput): Ga4DateRange[] {
  if (typeof range === "number") {
    return [
      {
        startDate: `${range}daysAgo`,
        endDate: "today",
      },
    ];
  }

  return [
    {
      startDate: range.startDate,
      endDate: range.endDate,
    },
  ];
}

export function dimension(name: string) {
  return { name };
}

export function metric(name: string) {
  return { name };
}

export function stringFilter(
  fieldName: string,
  matchType: Ga4StringMatchType,
  value: string,
  caseSensitive = false
): Ga4FilterExpression {
  return {
    filter: {
      fieldName,
      stringFilter: {
        matchType,
        value,
        caseSensitive,
      },
    },
  };
}

export function inListFilter(
  fieldName: string,
  values: string[],
  caseSensitive = false
): Ga4FilterExpression {
  return {
    filter: {
      fieldName,
      inListFilter: {
        values,
        caseSensitive,
      },
    },
  };
}

export function andGroup(
  expressions: Array<Ga4FilterExpression | undefined | null>
): Ga4FilterExpression | undefined {
  const filtered = expressions.filter(Boolean) as Ga4FilterExpression[];
  if (filtered.length === 0) return undefined;
  if (filtered.length === 1) return filtered[0];

  return {
    andGroup: {
      expressions: filtered,
    },
  };
}

export function notExpression(
  expression?: Ga4FilterExpression | null
): Ga4FilterExpression | undefined {
  if (!expression) return undefined;
  return { notExpression: expression };
}

export function buildExcludeContainsFilters(
  fieldName: string,
  containsValues?: string[]
): Ga4FilterExpression | undefined {
  if (!containsValues?.length) return undefined;

  const exclusions = containsValues
    .map((value) =>
      notExpression(stringFilter(fieldName, "CONTAINS", value, false))
    )
    .filter(Boolean) as Ga4FilterExpression[];

  return andGroup(exclusions);
}

export async function runGa4Report(
  params: Ga4ReportParams
): Promise<Ga4RunReportResponse> {
  const client = getGa4Client();

  const request = {
    property: toGa4PropertyPath(params.propertyId),
    dimensions: (params.dimensions ?? []).map(dimension),
    metrics: params.metrics.map(metric),
    dateRanges: params.dateRanges ?? getDateRange(30),
    dimensionFilter: params.dimensionFilter,
    metricFilter: params.metricFilter,
    offset: params.offset,
    limit: params.limit,
    orderBys: params.orderBys,
    keepEmptyRows: params.keepEmptyRows ?? false,
  };

  try {
    const [response] = await client.runReport(request);
    return response as Ga4RunReportResponse;
  } catch (error) {
    if (!isQuotaError(error)) {
      throw error;
    }

    await sleep(750);

    const [response] = await client.runReport(request);
    return response as Ga4RunReportResponse;
  }
}

export function parseRunReportRows(
  response: Ga4RunReportResponse,
  dimensionNames: string[],
  metricNames: string[]
): ParsedGa4Row[] {
  const rows = response.rows ?? [];

  return rows.map((row: Ga4RunReportResponseRow) => {
    const dimensions: Record<string, string> = {};
    const metrics: Record<string, number> = {};

    dimensionNames.forEach((name, index) => {
      dimensions[name] = row.dimensionValues?.[index]?.value ?? "";
    });

    metricNames.forEach((name, index) => {
      metrics[name] = toNumber(row.metricValues?.[index]?.value);
    });

    return { dimensions, metrics };
  });
}

export function toNumber(value: string | number | null | undefined): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value !== "string") return 0;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function normalizePathForMatch(value: string): string {
  const raw = (value ?? "").trim();
  if (!raw) return "/";

  try {
    const url = new URL(raw);
    const pathname = url.pathname || "/";
    return pathname.replace(/\/+$/, "") || "/";
  } catch {
    const withoutHash = raw.split("#")[0] ?? raw;
    const withoutQuery = withoutHash.split("?")[0] ?? withoutHash;
    return withoutQuery.replace(/\/+$/, "") || "/";
  }
}

function normalizeExpectedPathForStartsWith(value: string): string {
  const raw = (value ?? "").trim();
  if (!raw) return "/";

  try {
    const url = new URL(raw);
    const pathname = url.pathname || "/";
    return pathname === "/" ? "/" : pathname;
  } catch {
    const withoutHash = raw.split("#")[0] ?? raw;
    const withoutQuery = withoutHash.split("?")[0] ?? withoutHash;
    return withoutQuery || "/";
  }
}

export function matchesPath(
  actual: string,
  expected: string,
  mode: PathMatchMode = "contains"
): boolean {
  const actualPath = normalizePathForMatch(actual);

  if (mode === "exact") {
    const expectedPath = normalizePathForMatch(expected);
    return actualPath === expectedPath;
  }

  if (mode === "starts_with") {
    const expectedPath = normalizeExpectedPathForStartsWith(expected);
    return actualPath.startsWith(expectedPath);
  }

  const expectedPath = normalizePathForMatch(expected);
  return actualPath.includes(expectedPath);
}

export function pageLocationContainsFilter(
  pageMatch: string
): Ga4FilterExpression {
  return stringFilter("pageLocation", "CONTAINS", pageMatch, false);
}

export function eventNameEqualsFilter(eventName: string): Ga4FilterExpression {
  return stringFilter("eventName", "EXACT", eventName, false);
}

export function eventNameInFilter(eventNames: string[]): Ga4FilterExpression {
  return inListFilter("eventName", eventNames, false);
}