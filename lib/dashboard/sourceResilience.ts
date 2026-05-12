// lib/dashboard/sourceResilience.ts

export type SourceRowInput = {
  sourceMedium: string;

  // Query layer might omit these if the metric is disabled
  ctaClicks?: number;
  formSubmits?: number;
  callClicks?: number;

  // Caller should compute intentTotal correctly using config.intentDefinition
  intentTotal?: number;
};

export type SourceRow = {
  sourceMedium: string;

  // Always numbers after normalization
  ctaClicks: number;
  formSubmits: number;
  callClicks?: number;

  // Always a number after normalization
  intentTotal: number;
};

export type SourceResilienceMeta = {
  totalIntent: number;
  sourceCount: number;
  suppressed: boolean;
  reason?: string;
};

type Options = {
  minTotalIntentToInterpret?: number; // default 20
  minPerSourceToKeep?: number;        // default 2
  maxSources?: number;                // default 8
  hideInternal?: boolean;             // default true

  // Config-driven excludes
  excludeSourceMediumContains?: string[];
};

function toLowerSafe(s: unknown) {
  return String(s ?? "").toLowerCase();
}

function normalizeRow(r: SourceRowInput): SourceRow {
  const cta = Number(r.ctaClicks ?? 0);
  const forms = Number(r.formSubmits ?? 0);

  // If metric disabled, it will often be undefined; preserve "optional" but numeric
  const calls =
    r.callClicks == null ? undefined : Number(r.callClicks ?? 0);

  // If caller computed intentTotal, trust it. Otherwise fallback to sum of available.
  const fallbackIntent = cta + forms + (calls ?? 0);
  const intent =
    typeof r.intentTotal === "number" && Number.isFinite(r.intentTotal)
      ? r.intentTotal
      : fallbackIntent;

  return {
    sourceMedium: r.sourceMedium ?? "(not set)",
    ctaClicks: cta,
    formSubmits: forms,
    callClicks: calls,
    intentTotal: intent,
  };
}

export function normalizeSourcesForLowTraffic(
  rows: SourceRowInput[],
  opts?: Options
): { rows: SourceRow[]; meta: SourceResilienceMeta } {
  const {
    minTotalIntentToInterpret = 20,
    minPerSourceToKeep = 2,
    maxSources = 8,
    hideInternal = true,
    excludeSourceMediumContains = [],
  } = opts ?? {};

  const safe = Array.isArray(rows) ? rows : [];
  const normalized = safe.map(normalizeRow);

  const excludeContainsLower = excludeSourceMediumContains.map((s) => toLowerSafe(s));

  const filtered = normalized.filter((r) => {
    const s = toLowerSafe(r.sourceMedium);

    for (const sub of excludeContainsLower) {
      if (sub && s.includes(sub)) return false;
    }

    if (hideInternal) {
      if (s.includes("tagassistant.google.com")) return false;
      if (s.includes("localhost")) return false;
    }

    return true;
  });

  const totalIntent = filtered.reduce((sum, r) => sum + r.intentTotal, 0);

  if (filtered.length === 0) {
    return {
      rows: [],
      meta: {
        totalIntent: 0,
        sourceCount: 0,
        suppressed: true,
        reason: "No usable source rows after filtering.",
      },
    };
  }

  // Bucket tiny sources into Other
  let other: SourceRow | null = null;
  const keep: SourceRow[] = [];

  for (const r of filtered) {
    if (r.intentTotal < minPerSourceToKeep) {
      if (!other) {
        other = {
          sourceMedium: "Other",
          ctaClicks: 0,
          formSubmits: 0,
          callClicks: 0,
          intentTotal: 0,
        };
      }
      other.ctaClicks += r.ctaClicks;
      other.formSubmits += r.formSubmits;
      other.callClicks = Number(other.callClicks ?? 0) + Number(r.callClicks ?? 0);
      other.intentTotal += r.intentTotal;
    } else {
      keep.push(r);
    }
  }

  keep.sort((a, b) => b.intentTotal - a.intentTotal);

  const limited = keep.slice(0, maxSources);
  const overflow = keep.slice(maxSources);

  if (overflow.length > 0) {
    if (!other) {
      other = {
        sourceMedium: "Other",
        ctaClicks: 0,
        formSubmits: 0,
        callClicks: 0,
        intentTotal: 0,
      };
    }
    for (const r of overflow) {
      other.ctaClicks += r.ctaClicks;
      other.formSubmits += r.formSubmits;
      other.callClicks = Number(other.callClicks ?? 0) + Number(r.callClicks ?? 0);
      other.intentTotal += r.intentTotal;
    }
  }

  const outRows = other && other.intentTotal > 0 ? [...limited, other] : limited;
  const suppressed = totalIntent < minTotalIntentToInterpret;

  return {
    rows: outRows,
    meta: {
      totalIntent,
      sourceCount: outRows.length,
      suppressed,
      reason: suppressed
        ? `Only ${totalIntent} total intent events in range. Source breakdown is statistically noisy.`
        : undefined,
    },
  };
}
