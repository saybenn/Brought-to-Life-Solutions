export type ModuleKey =
  | "analytics"
  | "customer_management"
  | "commerce"
  | "content"
  | "integrity"
  | "settings";

export type PanelKey =
  | "executiveSnapshot"
  | "goalHealth"
  | "funnelProgression"
  | "conversionTrend"
  | "leadSourceConversion"
  | "ctaOutcomePerformance"
  | "goalCompletionTrend"
  | "nextActions"
  | "trafficContext"
  | "pageViewBreakdown";

export type GoalKey = "primary" | "secondary" | "tertiary";

export type PathMatchMode = "exact" | "starts_with" | "contains";

export type EventMap = {
  pageViewEventName: string;
  ctaEventName: string;
  formEventName?: string;
  callEventName?: string;
  bookingEventName?: string;
};

export type FunnelEntry =
  | {
      type: "page";
      match: string;
      matchMode?: PathMatchMode;
    }
  | {
      type: "event";
      eventName: string;
    }
  | {
      type: "cta";
      label?: string;
      location?: string;
    };

export type FunnelStep = {
  key: string;
  name: string;
  eventName?: string;
  pageMatch?: string;
  pageMatchMode?: PathMatchMode;
  ctaLabel?: string;
  ctaLocation?: string;
};

export type GoalDefinition = {
  enabled: boolean;
  name: string;
  successEvent: string;
  entry: FunnelEntry;
  funnelSteps: FunnelStep[];
};

export type ModuleConfig = {
  enabled: boolean;
};

export type DashboardNavItem = {
  key: ModuleKey;
  path: string;
  label: string;
};

export type AnalyticsNavConfig = {
  items: DashboardNavItem[];
};

export type AnalyticsFilters = {
  excludeSourceMediumContains?: string[];
};

export type AnalyticsNextActions = {
  topWinner?: string;
  underperformer?: string;
  nextStep?: string;
  manual?: string;
};

export type AnalyticsConfig = {
  modules: Partial<Record<ModuleKey, ModuleConfig>>;
  nav?: AnalyticsNavConfig;
  panels: Partial<Record<PanelKey, boolean>>;
  eventMap: EventMap;
  filters?: AnalyticsFilters;
  goals: {
    primary: GoalDefinition;
    secondary?: GoalDefinition;
    tertiary?: GoalDefinition;
  };
  nextActions?: AnalyticsNextActions;
};

export function isGoalEnabled(goal?: GoalDefinition | null): goal is GoalDefinition {
  return Boolean(goal?.enabled);
}

export function isModuleEnabled(
  modules: AnalyticsConfig["modules"] | undefined,
  moduleKey: ModuleKey
): boolean {
  return Boolean(modules?.[moduleKey]?.enabled);
}

export function isPanelEnabled(
  panels: AnalyticsConfig["panels"] | undefined,
  panelKey: PanelKey
): boolean {
  return Boolean(panels?.[panelKey]);
}