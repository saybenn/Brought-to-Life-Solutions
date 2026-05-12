import { useMemo } from "react";

import DashboardPanelShell from "@/components/dashboard/layout/DashboardPanelShell";
import EmptyState from "@/components/ui/EmptyState";
import PanelHeader from "@/components/ui/PanelHeader";
import { DASHBOARD_COPY } from "@/lib/dashboard/copy";
import { formatInteger, formatPercent } from "@/lib/dashboard/formatters";
import type { GoalKey } from "@/lib/analytics/config.types";
import type {
  FunnelProgressionPanelProps,
  GoalProgression,
} from "@/lib/dashboard/payload";

function getActiveGoal(
  data: GoalProgression[],
  activeGoalKey?: GoalKey,
): GoalProgression | undefined {
  if (activeGoalKey) {
    return data.find((goal) => goal.goalKey === activeGoalKey);
  }

  return data[0];
}

function getBandWidth(index: number, total: number): number {
  if (total <= 1) return 100;

  const minWidth = 42;
  const maxWidth = 100;
  const step = (maxWidth - minWidth) / (total - 1);

  return Math.max(maxWidth - index * step, minWidth);
}

function getStepPercent(
  step: GoalProgression["steps"][number],
  index: number,
): number | null {
  if (index === 0) return 100;
  return step.conversionFromEntryPct ?? null;
}

function getStepMeta(index: number): string {
  if (index === 0) return "Entry step";
  return "From funnel entry";
}

function getStepTone(index: number, total: number): string {
  const tones = [
    "dash-funnel-band--tone-1",
    "dash-funnel-band--tone-2",
    "dash-funnel-band--tone-3",
    "dash-funnel-band--tone-4",
    "dash-funnel-band--tone-5",
  ];

  if (total <= tones.length) return tones[index] ?? tones[tones.length - 1];

  const scaledIndex = Math.min(
    Math.floor((index / Math.max(total - 1, 1)) * (tones.length - 1)),
    tones.length - 1,
  );

  return tones[scaledIndex];
}

type FunnelProgressionV2Props = FunnelProgressionPanelProps;

export default function FunnelProgressionV2({
  data,
  activeGoalKey,
}: FunnelProgressionV2Props) {
  const activeGoal = useMemo(
    () => getActiveGoal(data, activeGoalKey),
    [data, activeGoalKey],
  );

  if (!activeGoal) {
    return (
      <DashboardPanelShell surface="base" className="dash-anchor-panel">
        <PanelHeader
          title={DASHBOARD_COPY.funnelProgression.title}
          description={DASHBOARD_COPY.funnelProgression.description}
          tooltip={DASHBOARD_COPY.funnelProgression.tooltip}
        />

        <EmptyState description="Funnel progression data is not available for the selected goal." />
      </DashboardPanelShell>
    );
  }

  if (!activeGoal.steps.length) {
    return (
      <DashboardPanelShell surface="base" className="dash-anchor-panel">
        <PanelHeader
          title={DASHBOARD_COPY.funnelProgression.title}
          description={DASHBOARD_COPY.funnelProgression.description}
          tooltip={DASHBOARD_COPY.funnelProgression.tooltip}
          actions={
            <span className="dash-chart-control">{activeGoal.goalName}</span>
          }
        />

        <EmptyState description="Funnel step data is not available for this goal." />
      </DashboardPanelShell>
    );
  }

  const biggestLeak = activeGoal.biggestLeak;
  const totalSteps = activeGoal.steps.length;

  return (
    <DashboardPanelShell surface="base" className="dash-anchor-panel">
      <PanelHeader
        title={DASHBOARD_COPY.funnelProgression.title}
        description={DASHBOARD_COPY.funnelProgression.description}
        tooltip={DASHBOARD_COPY.funnelProgression.tooltip}
        actions={
          <span className="dash-chart-control">{activeGoal.goalName}</span>
        }
      />

      <div className="dash-funnel-mockup" aria-label="Funnel progression">
        <div className="dash-funnel-labels" aria-hidden="true">
          {activeGoal.steps.map((step, index) => {
            const isLeakTarget = biggestLeak?.toStepKey === step.key;

            return (
              <div
                key={step.key}
                className={`dash-funnel-label ${
                  isLeakTarget ? "is-leak-target" : ""
                }`}
              >
                <span
                  className={`dash-funnel-label__dot ${getStepTone(index, totalSteps)}`}
                />
                <span>{step.name}</span>
              </div>
            );
          })}
        </div>

        <div className="dash-funnel-bands" aria-hidden="true">
          {activeGoal.steps.map((step, index) => {
            const width = getBandWidth(index, totalSteps);
            const isLeakTarget = biggestLeak?.toStepKey === step.key;

            return (
              <div
                key={step.key}
                className={`dash-funnel-band ${getStepTone(
                  index,
                  totalSteps,
                )} ${isLeakTarget ? "is-leak-target" : ""}`}
                style={{ width: `${width}%` }}
                title={`${step.name}: ${formatInteger(step.count)}`}
              />
            );
          })}
        </div>

        <div className="dash-funnel-values" aria-hidden="true">
          {activeGoal.steps.map((step, index) => {
            const percent = getStepPercent(step, index);
            const isLeakTarget = biggestLeak?.toStepKey === step.key;

            return (
              <div
                key={step.key}
                className={`dash-funnel-value ${
                  isLeakTarget ? "is-leak-target" : ""
                }`}
              >
                <strong>{formatInteger(step.count)}</strong>
                <span>{formatPercent(percent)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="dash-funnel-mobile-steps" aria-label="Funnel step data">
        {activeGoal.steps.map((step, index) => {
          const percent = getStepPercent(step, index);
          const isLeakTarget = biggestLeak?.toStepKey === step.key;

          return (
            <div
              key={step.key}
              className={`dash-funnel-mobile-step ${
                isLeakTarget ? "is-leak-target" : ""
              }`}
            >
              <span className="dash-funnel-mobile-step__index">
                {index + 1}
              </span>

              <div className="dash-funnel-mobile-step__copy">
                <div className="dash-funnel-mobile-step__name">{step.name}</div>
                <div className="dash-funnel-mobile-step__meta">
                  {isLeakTarget ? "Largest leak target" : getStepMeta(index)}
                </div>
              </div>

              <div className="dash-funnel-mobile-step__metric">
                <strong>{formatInteger(step.count)}</strong>
                <span>{formatPercent(percent)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dash-funnel-overall">
        <span>Overall Conversion Rate</span>
        <strong>{formatPercent(activeGoal.conversionRatePct)}</strong>
      </div>

      {biggestLeak ? (
        <div className="dash-funnel-note">
          Biggest leak: {biggestLeak.fromStepName} → {biggestLeak.toStepName} ·{" "}
          {formatPercent(biggestLeak.dropoffPct)} drop-off
        </div>
      ) : null}
    </DashboardPanelShell>
  );
}
