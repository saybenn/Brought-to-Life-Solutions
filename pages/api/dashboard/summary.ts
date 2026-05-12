import type { NextApiRequest, NextApiResponse } from "next";
import type {
  AnalyticsConfig,
  GoalDefinition,
  GoalKey,
  EventMap,
} from "@/lib/analytics/config.types";
import { isGoalEnabled, isModuleEnabled } from "@/lib/analytics/config.types";
import { normalizeSummary } from "@/lib/dashboard/normalizeSummary";
import {
  DashboardPayloadSchema,
  DashboardSummaryQuerySchema,
} from "@/lib/dashboard/schemas/summary";
import type {
  DashboardPayload,
  GoalProgression,
  TrendPoint,
  LeadSourceRow,
  CtaOutcomeRow,
  LeadSourceDiagnostics,
  PageViewRow,
} from "@/lib/dashboard/payload";
import type { QueryDateInput } from "@/lib/ga4/queryBase";
import {
  normalizeDashboardRangeKey,
  resolveDashboardRange,
  toQueryDateInput,
  type ResolvedDashboardRange,
} from "@/lib/dashboard/dateRanges";
import { runDiagnosisEngine } from "@/lib/dashboard/diagnosisEngine";
import { queryPageViewsTrend } from "@/lib/ga4/queries/queryPageViewsTrend";
import { queryPageViewsByPage } from "@/lib/ga4/queries/queryPageViewsByPage";
import { queryGoalStepCounts } from "@/lib/ga4/funnel/queryGoalStepCounts";
import { queryGoalTrend } from "@/lib/ga4/funnel/queryGoalTrend";
import { queryGoalSourceConversion } from "@/lib/ga4/funnel/queryGoalSourceConversion";
import { queryGoalCtaOutcomePerformance } from "@/lib/ga4/funnel/queryGoalCtaOutcomePerformance";
import { buildGoalProgression } from "@/lib/ga4/funnel/buildGoalProgression";
import { buildExecutiveSnapshot } from "@/lib/ga4/funnel/buildExecutiveSnapshot";
import { buildGoalHealth } from "@/lib/ga4/funnel/buildGoalHealth";
import { buildGoalCompletionTrend } from "@/lib/ga4/funnel/buildGoalCompletionTrend";
import { getSiteConfig } from "@/lib/siteConfig/getSiteConfig";

type ApiErrorBody = {
  error: string;
  details?: string;
};

type GoalBundle = {
  goalKey: GoalKey;
  goalDefinition: GoalDefinition;
};

type SiteConfigResult = {
  siteId: string;
  config: AnalyticsConfig;
  ga4PropertyId: string;
};

type GoalDataResult = {
  goalKey: GoalKey;
  progression: GoalProgression;
  trend: TrendPoint[];
  sourceConversion: LeadSourceRow[];
  sourceDiagnostics: LeadSourceDiagnostics;
  ctaOutcomePerformance: CtaOutcomeRow[];
};

function getQueryRangeFromResolvedRange(
  resolved: ResolvedDashboardRange,
): QueryDateInput {
  return toQueryDateInput(resolved);
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function readString(
  obj: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = obj[key];
  return typeof value === "string" && value.trim() ? value : undefined;
}

function readEventMap(raw: unknown): EventMap {
  const obj = asRecord(raw);
  if (!obj) {
    throw new Error("Site config is missing eventMap.");
  }

  const pageViewEventName = readString(obj, "pageViewEventName");
  const ctaEventName = readString(obj, "ctaEventName");
  const formEventName = readString(obj, "formEventName");
  const callEventName = readString(obj, "callEventName");
  const bookingEventName = readString(obj, "bookingEventName");

  if (!pageViewEventName) {
    throw new Error("Site config eventMap.pageViewEventName is required.");
  }

  if (!ctaEventName) {
    throw new Error("Site config eventMap.ctaEventName is required.");
  }

  return {
    pageViewEventName,
    ctaEventName,
    formEventName,
    callEventName,
    bookingEventName,
  };
}

function isGoalDefinition(value: unknown): value is GoalDefinition {
  const obj = asRecord(value);
  if (!obj) return false;

  return (
    typeof obj.enabled === "boolean" &&
    typeof obj.name === "string" &&
    typeof obj.successEvent === "string" &&
    Array.isArray(obj.funnelSteps) &&
    !!obj.entry &&
    typeof obj.entry === "object"
  );
}

function readGoals(raw: unknown): AnalyticsConfig["goals"] {
  const obj = asRecord(raw);
  if (!obj) {
    throw new Error("Site config is missing goals.");
  }

  const primaryRaw = obj.primary;
  const secondaryRaw = obj.secondary;
  const tertiaryRaw = obj.tertiary;

  if (!isGoalDefinition(primaryRaw)) {
    throw new Error("Site config goals.primary is invalid or missing.");
  }

  if (secondaryRaw != null && !isGoalDefinition(secondaryRaw)) {
    throw new Error("Site config goals.secondary is invalid.");
  }

  if (tertiaryRaw != null && !isGoalDefinition(tertiaryRaw)) {
    throw new Error("Site config goals.tertiary is invalid.");
  }

  const goals: AnalyticsConfig["goals"] = {
    primary: primaryRaw,
  };

  if (isGoalDefinition(secondaryRaw)) {
    goals.secondary = secondaryRaw;
  }

  if (isGoalDefinition(tertiaryRaw)) {
    goals.tertiary = tertiaryRaw;
  }

  return goals;
}

function toAnalyticsConfig(raw: unknown): AnalyticsConfig {
  const obj = asRecord(raw);
  if (!obj) {
    throw new Error("Site config is invalid.");
  }

  return {
    modules: (asRecord(obj.modules) as AnalyticsConfig["modules"]) ?? {},
    nav: (obj.nav as AnalyticsConfig["nav"] | undefined) ?? undefined,
    panels: (asRecord(obj.panels) as AnalyticsConfig["panels"]) ?? {},
    eventMap: readEventMap(obj.eventMap),
    filters: (obj.filters as AnalyticsConfig["filters"] | undefined) ?? undefined,
    goals: readGoals(obj.goals),
    nextActions: (obj.nextActions as AnalyticsConfig["nextActions"] | undefined) ?? undefined,
  };
}

function getGa4PropertyIdFromRawConfig(raw: unknown): string | undefined {
  const obj = asRecord(raw);
  if (!obj) return process.env.GA4_PROPERTY_ID;

  const directCamel = readString(obj, "ga4PropertyId");
  if (directCamel) return directCamel;

  const directSnake = readString(obj, "ga4_property_id");
  if (directSnake) return directSnake;

  const integrations = asRecord(obj.integrations);
  if (integrations) {
    const ga4 = asRecord(integrations.ga4);
    if (ga4) {
      const propertyId = readString(ga4, "propertyId");
      if (propertyId) return propertyId;
    }
  }

  return process.env.GA4_PROPERTY_ID;
}

function getEnabledGoals(config: AnalyticsConfig): GoalBundle[] {
  const bundles: GoalBundle[] = [];

  if (isGoalEnabled(config.goals.primary)) {
    bundles.push({
      goalKey: "primary",
      goalDefinition: config.goals.primary,
    });
  }

  if (isGoalEnabled(config.goals.secondary)) {
    bundles.push({
      goalKey: "secondary",
      goalDefinition: config.goals.secondary,
    });
  }

  if (isGoalEnabled(config.goals.tertiary)) {
    bundles.push({
      goalKey: "tertiary",
      goalDefinition: config.goals.tertiary,
    });
  }

  return bundles;
}

function collectMetaNotes(
  notes: Set<string>,
  config: AnalyticsConfig,
): string[] | undefined {
  if (
    !config.eventMap.formEventName &&
    !config.eventMap.callEventName &&
    !config.eventMap.bookingEventName
  ) {
    notes.add("No completion events configured for goal completion trend.");
  }

  notes.add("Source conversion uses session-source attribution and is approximate.");

  return notes.size ? Array.from(notes) : undefined;
}

async function resolveSiteConfig(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<SiteConfigResult> {
  const siteContext = await getSiteConfig(req, res);

  if (!siteContext.siteId) {
    throw new Error("Unable to resolve siteId from getSiteConfig(req,res).");
  }

  const rawConfig = siteContext.config as unknown;
  const config = toAnalyticsConfig(rawConfig);
  const ga4PropertyId = getGa4PropertyIdFromRawConfig(rawConfig);

  if (!ga4PropertyId) {
    throw new Error("GA4 property ID is missing from site config or environment.");
  }

  return {
    siteId: siteContext.siteId,
    config,
    ga4PropertyId,
  };
}

async function buildGoalData(
  propertyId: string,
  resolvedRange: ResolvedDashboardRange,
  config: AnalyticsConfig,
  bundle: GoalBundle,
): Promise<GoalDataResult> {
  const range = getQueryRangeFromResolvedRange(resolvedRange);
  const { goalKey, goalDefinition } = bundle;

  const [stepCounts, trend, sourceConversionResult, ctaOutcomePerformance] =
    await Promise.all([
      queryGoalStepCounts({
        propertyId,
        range,
        goalKey,
        goalDefinition,
        ctaEventName: config.eventMap.ctaEventName,
        pageViewEventName: config.eventMap.pageViewEventName,
      }),
      queryGoalTrend({
        propertyId,
        range,
        goalDefinition,
        ctaEventName: config.eventMap.ctaEventName,
        pageViewEventName: config.eventMap.pageViewEventName,
      }),
      queryGoalSourceConversion({
        propertyId,
        range,
        goalDefinition,
        ctaEventName: config.eventMap.ctaEventName,
        pageViewEventName: config.eventMap.pageViewEventName,
        filters: config.filters,
      }),
      queryGoalCtaOutcomePerformance({
        propertyId,
        range,
        ctaEventName: config.eventMap.ctaEventName,
      }),
    ]);

  const progression = buildGoalProgression({
    ...stepCounts,
    goalKey,
  });

  return {
    goalKey,
    progression,
    trend,
    sourceConversion: sourceConversionResult.rows,
    sourceDiagnostics: sourceConversionResult.diagnostics,
    ctaOutcomePerformance,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardPayload | ApiErrorBody>,
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    const parsedQuery = DashboardSummaryQuerySchema.safeParse({
      rangeKey:
        typeof req.query.rangeKey === "string" ? req.query.rangeKey : undefined,
      range: typeof req.query.range === "string" ? req.query.range : undefined,
    });

    if (!parsedQuery.success) {
      return res.status(400).json({
        error: "Invalid dashboard summary query params.",
        details: parsedQuery.error.issues.map((issue) => issue.message).join(" "),
      });
    }

    const rangeKey = normalizeDashboardRangeKey(
      parsedQuery.data.rangeKey ?? parsedQuery.data.range,
    );
    const resolvedRange = resolveDashboardRange(rangeKey);
    const queryRange = getQueryRangeFromResolvedRange(resolvedRange);
    const notes = new Set<string>();

    const { siteId, config, ga4PropertyId } = await resolveSiteConfig(req, res);

    if (!isModuleEnabled(config.modules, "analytics")) {
      return res.status(403).json({
        error: "Analytics module is disabled for this site.",
      });
    }

    const enabledGoals = getEnabledGoals(config);

    if (!enabledGoals.length) {
      const emptyPayload: DashboardPayload = {
        meta: {
          siteId,
          rangeDays: resolvedRange.rangeDays,
          range: {
            rangeKey: resolvedRange.rangeKey,
            label: resolvedRange.label,
            startDate: resolvedRange.startDate,
            endDate: resolvedRange.endDate,
          },
          generatedAtIso: new Date().toISOString(),
          insufficientData: true,
          notes: ["No analytics goals are enabled for this site."],
          modules: config.modules ?? {},
          panelsEnabled: config.panels ?? {},
          nav: config.nav,
          goalsEnabled: {
            primary: false,
            secondary: false,
            tertiary: false,
          },
        },
        executiveSnapshot: {
          funnelEntries: 0,
          primaryCompletions: 0,
          primaryConversionRatePct: 0,
          biggestLeakLabel: null,
        },
        goalHealth: [],
        funnelProgression: [],
        conversionTrend: {},
        leadSourceConversion: {},
        leadSourceDiagnostics: {},
        ctaOutcomePerformance: {},
        goalCompletionTrend: [],
        trafficContext: [],
        pageViewBreakdown: [],
        nextActions: {
          ...(config.nextActions ?? {}),
          autoDiagnosis: null,
        },
      };

      const validatedEmptyPayload = DashboardPayloadSchema.safeParse(
        normalizeSummary(emptyPayload),
      );

      if (!validatedEmptyPayload.success) {
        console.error("Invalid dashboard summary payload", validatedEmptyPayload.error.flatten());
        return res.status(500).json({
          error: "Dashboard summary payload failed validation.",
          details: validatedEmptyPayload.error.issues
            .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
            .join(" "),
        });
      }

      return res.status(200).json(validatedEmptyPayload.data);
    }

    const goalResults: GoalDataResult[] = [];
    for (const bundle of enabledGoals) {
      const result = await buildGoalData(
        ga4PropertyId,
        resolvedRange,
        config,
        bundle,
      );
      goalResults.push(result);
    }

    const [goalCompletionTrend, trafficContext, pageViewBreakdown] = await Promise.all([
      buildGoalCompletionTrend({
        propertyId: ga4PropertyId,
        range: queryRange,
        eventMap: config.eventMap,
      }),
      config.panels?.trafficContext
        ? queryPageViewsTrend({
            propertyId: ga4PropertyId,
            range: queryRange,
            pageViewEventName: config.eventMap.pageViewEventName,
          })
        : Promise.resolve([]),
      config.panels?.pageViewBreakdown
        ? queryPageViewsByPage({
            propertyId: ga4PropertyId,
            range: queryRange,
            pageViewEventName: config.eventMap.pageViewEventName,
          })
        : Promise.resolve([] as PageViewRow[]),
    ]);

    const progressionMap = new Map<GoalKey, GoalProgression>(
      goalResults.map((item): [GoalKey, GoalProgression] => [
        item.goalKey,
        item.progression,
      ]),
    );

    const trendPayload: DashboardPayload["conversionTrend"] = {};
    const sourcePayload: DashboardPayload["leadSourceConversion"] = {};
    const sourceDiagnosticsPayload: DashboardPayload["leadSourceDiagnostics"] = {};
    const ctaPayload: DashboardPayload["ctaOutcomePerformance"] = {};

    for (const result of goalResults) {
      trendPayload[result.goalKey] = result.trend;
      sourcePayload[result.goalKey] = result.sourceConversion;
      sourceDiagnosticsPayload[result.goalKey] = result.sourceDiagnostics;
      ctaPayload[result.goalKey] = result.ctaOutcomePerformance;

      if (
        result.ctaOutcomePerformance.some(
          (row) => row.conversionRatePct == null,
        )
      ) {
        notes.add(
          "CTA outcome performance shows raw clicks where downstream linkage is not reliable.",
        );
      }
    }

    const primary = progressionMap.get("primary");
    if (!primary) {
      return res.status(500).json({
        error: "Primary goal progression could not be built.",
      });
    }

    const secondary = progressionMap.get("secondary") ?? null;
    const tertiary = progressionMap.get("tertiary") ?? null;

    const funnelProgression: GoalProgression[] = Array.from(
      progressionMap.values(),
    );
    const executiveSnapshot = buildExecutiveSnapshot(
      primary,
      secondary,
      tertiary,
    );
    const goalHealth = buildGoalHealth(funnelProgression);

    const selectedDiagnosisGoal = primary ?? funnelProgression[0] ?? null;

    const autoDiagnosis = selectedDiagnosisGoal
      ? runDiagnosisEngine({
          progression: selectedDiagnosisGoal,
          sourceConversion: sourcePayload[selectedDiagnosisGoal.goalKey] ?? [],
          ctaOutcomePerformance:
            ctaPayload[selectedDiagnosisGoal.goalKey] ?? [],
        })
      : null;

    const payload: DashboardPayload = {
      meta: {
        siteId,
        rangeDays: resolvedRange.rangeDays,
        range: {
          rangeKey: resolvedRange.rangeKey,
          label: resolvedRange.label,
          startDate: resolvedRange.startDate,
          endDate: resolvedRange.endDate,
        },
        generatedAtIso: new Date().toISOString(),
        insufficientData: funnelProgression.every(
          (goal) => goal.entryCount === 0 && goal.completionCount === 0,
        ),
        notes: collectMetaNotes(notes, config),
        modules: config.modules ?? {},
        panelsEnabled: config.panels ?? {},
        nav: config.nav,
        goalsEnabled: {
          primary: Boolean(config.goals.primary?.enabled),
          secondary: Boolean(config.goals.secondary?.enabled),
          tertiary: Boolean(config.goals.tertiary?.enabled),
        },
      },
      executiveSnapshot,
      goalHealth,
      funnelProgression,
      conversionTrend: trendPayload,
      leadSourceConversion: sourcePayload,
      leadSourceDiagnostics: sourceDiagnosticsPayload,
      ctaOutcomePerformance: ctaPayload,
      goalCompletionTrend,
     goalCompletionLabels: {
        primary: config.goals.primary?.name ?? "Primary Goal",
        secondary: config.goals.secondary?.name,
        tertiary: config.goals.tertiary?.name,
      },
      trafficContext,
      pageViewBreakdown,
      nextActions: {
        ...(config.nextActions ?? {}),
        autoDiagnosis,
      },
    };

    const normalizedPayload = normalizeSummary(payload);
    const validatedPayload = DashboardPayloadSchema.safeParse(normalizedPayload);

    if (!validatedPayload.success) {
      console.error("Invalid dashboard summary payload", validatedPayload.error.flatten());
      return res.status(500).json({
        error: "Dashboard summary payload failed validation.",
        details: validatedPayload.error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join(" "),
      });
    }

    return res.status(200).json(validatedPayload.data);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown dashboard summary error.";

    console.error("dashboard summary error", error);

    return res.status(500).json({
      error: "Failed to build dashboard summary.",
      details: message,
    });
  }
}