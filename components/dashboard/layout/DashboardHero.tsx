import DashboardControlBar from "@/components/dashboard/layout/DashboardControlBar";
import DashboardInsightBanner from "@/components/dashboard/layout/DashboardInsightBanner";
import DashboardKpiStrip from "@/components/dashboard/layout/DashboardKpiStrip";
import Badge from "@/components/ui/Badge";
import { DASHBOARD_COPY } from "@/lib/dashboard/copy";
import { formatGeneratedAt } from "@/lib/dashboard/formatters";
import type { GoalKey } from "@/lib/analytics/config.types";
import type {
  DashboardPayload,
  ExecutiveSnapshot,
  GoalProgression,
} from "@/lib/dashboard/payload";
import type { DashboardRangeKey } from "@/lib/dashboard/dateRanges";

type GoalToggleOption = {
  value: GoalKey;
  label: string;
};

type DashboardHeroProps = {
  meta: DashboardPayload["meta"];
  executiveSnapshot: ExecutiveSnapshot;
  funnelProgression: GoalProgression[];
  range: DashboardRangeKey;
  onRangeChange: (value: DashboardRangeKey) => void;
  goalValue?: GoalKey;
  goalOptions: GoalToggleOption[];
  onGoalChange?: (value: GoalKey) => void;
  notes?: string[];
  isRefreshing?: boolean;
};

function getGoalLabel(
  goalOptions: GoalToggleOption[],
  goalValue?: GoalKey,
): string | undefined {
  if (!goalValue) return undefined;
  return goalOptions.find((option) => option.value === goalValue)?.label;
}

export default function DashboardHero({
  meta,
  executiveSnapshot,
  funnelProgression,
  range,
  onRangeChange,
  goalValue,
  goalOptions,
  onGoalChange,
  notes,
  isRefreshing = false,
}: DashboardHeroProps) {
  const activeGoalLabel = getGoalLabel(goalOptions, goalValue);

  return (
    <section className="dash-hero" aria-labelledby="dashboard-title">
      <div className="dash-hero__top">
        <div className="dash-hero__copy">
          <div className="dash-hero__eyebrow">Performance Overview</div>

          <h1 id="dashboard-title" className="dash-hero__title">
            {DASHBOARD_COPY.hero.title}
          </h1>

          <p className="dash-hero__description">
            {DASHBOARD_COPY.hero.description}
          </p>

          <div className="dash-hero__meta-row">
            <Badge tone="muted">{meta.range.label ?? range}</Badge>

            {activeGoalLabel ? (
              <Badge tone="accent">Focus: {activeGoalLabel}</Badge>
            ) : null}

            {isRefreshing ? <Badge tone="warning">Refreshing…</Badge> : null}

            <span className="dash-hero__generated">
              Generated {formatGeneratedAt(meta.generatedAtIso)}
            </span>
          </div>
        </div>

        <div className="dash-hero__desktop-meta" aria-label="Current site">
          <div className="dash-hero__meta-label">Site</div>
          <div className="dash-hero__meta-value">{meta.siteId}</div>
        </div>
      </div>

      <div className="dash-hero__controls">
        <DashboardControlBar
          range={range}
          onRangeChange={onRangeChange}
          goalValue={goalValue}
          goalOptions={goalOptions}
          onGoalChange={onGoalChange}
        />
      </div>

      <DashboardKpiStrip
        data={executiveSnapshot}
        funnelProgression={funnelProgression}
        activeGoalKey={goalValue}
      />

      {notes?.length ? (
        <div className="dash-hero__notes">
          <DashboardInsightBanner lines={notes} />
        </div>
      ) : null}
    </section>
  );
}
