import type {
  AnalyticsNavConfig,
  AnalyticsNextActions,
  GoalKey,
  ModuleKey,
  PanelKey,
} from "@/lib/analytics/config.types";
import type { DashboardRange, IsoDateString } from "@/lib/ga4/types";

export type DashboardRangeKey =
  | "7"
  | "30"
  | "90"
  | "current_quarter"
  | "previous_quarter";

export type AutoDiagnosis = {
  diagnosisType: string;
  reason: string;
  recommendation: string;
};

export type DashboardNextActions = AnalyticsNextActions & {
  manual?: AnalyticsNextActions["manual"];
  autoDiagnosis?: AutoDiagnosis | null;
};

export type DashboardRangeMeta = {
  rangeKey: DashboardRangeKey;
  label?: string;
  startDate?: IsoDateString;
  endDate?: IsoDateString;
};

export type FunnelStepResult = {
  key: string;
  name: string;
  count: number;
  dropoffFromPreviousPct?: number | null;
  conversionFromEntryPct?: number | null;
};

export type BiggestLeak = {
  fromStepKey: string;
  fromStepName: string;
  toStepKey: string;
  toStepName: string;
  dropoffPct: number;
};

export type GoalProgression = {
  goalKey: GoalKey;
  goalName: string;
  entryCount: number;
  completionCount: number;
  conversionRatePct: number;
  steps: FunnelStepResult[];
  biggestLeak?: BiggestLeak | null;
};

export type ExecutiveSnapshot = {
  funnelEntries: number;
  primaryCompletions: number;
  primaryConversionRatePct: number;
  biggestLeakLabel?: string | null;
  secondaryCompletions?: number;
  tertiaryCompletions?: number;
};

export type GoalHealthRow = {
  goalKey: GoalKey;
  goalName: string;
  entryCount: number;
  completionCount: number;
  conversionRatePct: number;
};

export type TrendPoint = {
  date: IsoDateString;
  entries: number;
  completions: number;
  conversionRatePct?: number | null;
};

export type LeadSourceRow = {
  sourceMedium: string;
  entries: number;
  completions: number;
  conversionRatePct: number;
};

export type LeadSourceEmptyStateReason =
  | "ok"
  | "no_data"
  | "noise_only"
  | "unattributed_only";

export type LeadSourceDiagnostics = {
  reason: LeadSourceEmptyStateReason;
  rawRowCount: number;
  keptRowCount: number;
  droppedRowCount: number;
  droppedExamples?: string[];
};

export type CtaOutcomeRow = {
  ctaLabel: string;
  ctaDisplayLabel?: string | null;
  ctaAnalyticsLabel?: string | null;
  ctaLocation: string;
  clicks: number;
  completions?: number | null;
  conversionRatePct?: number | null;
};

export type GoalCompletionPoint = {
  date: IsoDateString;
  forms?: number;
  calls?: number;
  bookings?: number;
};

export type TrafficContextPoint = {
  date: IsoDateString;
  pageViews: number;
};

export type PageViewRow = {
  pageLocation: string;
  pagePath: string;
  views: number;
  sharePct?: number | null;
};

export type DashboardPayloadMeta = {
  siteId: string;
  rangeDays?: DashboardRange;
  range: DashboardRangeMeta;
  generatedAtIso: string;
  insufficientData: boolean;
  notes?: string[];
  modules: Partial<Record<ModuleKey, { enabled: boolean }>>;
  panelsEnabled: Partial<Record<PanelKey, boolean>>;
  nav?: AnalyticsNavConfig;
  goalsEnabled: {
    primary: boolean;
    secondary: boolean;
    tertiary: boolean;
  };
};

export type DashboardPayload = {
  meta: DashboardPayloadMeta;
  executiveSnapshot: ExecutiveSnapshot;
  goalHealth: GoalHealthRow[];
  funnelProgression: GoalProgression[];
  conversionTrend: {
    primary?: TrendPoint[];
    secondary?: TrendPoint[];
    tertiary?: TrendPoint[];
  };
  leadSourceConversion: {
    primary?: LeadSourceRow[];
    secondary?: LeadSourceRow[];
    tertiary?: LeadSourceRow[];
  };
  leadSourceDiagnostics?: {
    primary?: LeadSourceDiagnostics;
    secondary?: LeadSourceDiagnostics;
    tertiary?: LeadSourceDiagnostics;
  };
  ctaOutcomePerformance: {
    primary?: CtaOutcomeRow[];
    secondary?: CtaOutcomeRow[];
    tertiary?: CtaOutcomeRow[];
  };
  goalCompletionTrend: GoalCompletionPoint[];
  goalCompletionLabels?: GoalCompletionLabels;
  trafficContext?: TrafficContextPoint[];
  pageViewBreakdown?: PageViewRow[];
  nextActions: DashboardNextActions;
};

export type ExecutiveSnapshotPanelProps = {
  data: ExecutiveSnapshot;
};

export type GoalHealthPanelProps = {
  data: GoalHealthRow[];
};

export type FunnelProgressionPanelProps = {
  data: GoalProgression[];
  activeGoalKey?: GoalKey;
};

export type ConversionTrendPanelProps = {
  data: {
    primary?: TrendPoint[];
    secondary?: TrendPoint[];
    tertiary?: TrendPoint[];
  };
  activeGoalKey?: GoalKey;
};

export type LeadSourceConversionPanelProps = {
  data: {
    primary?: LeadSourceRow[];
    secondary?: LeadSourceRow[];
    tertiary?: LeadSourceRow[];
  };
  diagnostics?: {
    primary?: LeadSourceDiagnostics;
    secondary?: LeadSourceDiagnostics;
    tertiary?: LeadSourceDiagnostics;
  };
  activeGoalKey?: GoalKey;
};

export type CtaOutcomePerformancePanelProps = {
  data: {
    primary?: CtaOutcomeRow[];
    secondary?: CtaOutcomeRow[];
    tertiary?: CtaOutcomeRow[];
  };
  activeGoalKey?: GoalKey;
};

export type GoalCompletionLabels = {
  primary: string;
  secondary?: string;
  tertiary?: string;
};

export type GoalCompletionTrendPanelProps = {
  data: GoalCompletionPoint[];
  labels?: GoalCompletionLabels;
};

export type NextActionsPanelProps = {
  data: DashboardNextActions;
};

export type TrafficContextPanelProps = {
  data?: TrafficContextPoint[];
};

export type PageViewBreakdownPanelProps = {
  data?: PageViewRow[];
};