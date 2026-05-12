import { useState } from "react";

import DashboardPanelShell from "@/components/dashboard/layout/DashboardPanelShell";
import EmptyState from "@/components/ui/EmptyState";
import PanelHeader from "@/components/ui/PanelHeader";

import { DASHBOARD_COPY } from "@/lib/dashboard/copy";
import { formatInteger, formatPercent } from "@/lib/dashboard/formatters";
import type {
  GoalHealthPanelProps,
  GoalHealthRow,
} from "@/lib/dashboard/payload";

type GoalHealthProps = GoalHealthPanelProps;

function getGoalRank(data: GoalHealthRow[], goalKey: string): number {
  const sorted = [...data].sort(
    (a, b) => b.conversionRatePct - a.conversionRatePct,
  );

  return sorted.findIndex((goal) => goal.goalKey === goalKey) + 1;
}

function getConversionBarWidth(goal: GoalHealthRow): string {
  if (goal.conversionRatePct <= 0) return "0%";

  return `${Math.min(Math.max(goal.conversionRatePct, 3), 100)}%`;
}

export default function GoalHealth({ data }: GoalHealthProps) {
  const [showDetails, setShowDetails] = useState(false);

  if (!data.length) {
    return (
      <DashboardPanelShell surface="muted">
        <PanelHeader
          title={DASHBOARD_COPY.goalHealth.title}
          description={DASHBOARD_COPY.goalHealth.description}
          tooltip={DASHBOARD_COPY.goalHealth.tooltip}
        />

        <EmptyState description="Goal comparison data is not available." />
      </DashboardPanelShell>
    );
  }

  const sortedByConversion = [...data].sort(
    (a, b) => b.conversionRatePct - a.conversionRatePct,
  );

  return (
    <DashboardPanelShell surface="muted">
      <PanelHeader
        title={DASHBOARD_COPY.goalHealth.title}
        description={DASHBOARD_COPY.goalHealth.description}
        tooltip={DASHBOARD_COPY.goalHealth.tooltip}
      />

      <div className="dash-evidence-list">
        {sortedByConversion.map((goal) => (
          <article key={goal.goalKey} className="dash-evidence-card">
            <div className="dash-evidence-card__rank">
              {getGoalRank(data, goal.goalKey)}
            </div>

            <div className="dash-evidence-card__body">
              <div className="dash-evidence-card__top">
                <div className="dash-evidence-card__copy">
                  <h3 title={goal.goalName}>{goal.goalName}</h3>
                  <p>
                    {formatInteger(goal.entryCount)} entries ·{" "}
                    {formatInteger(goal.completionCount)} completions
                  </p>
                </div>

                <div className="dash-evidence-card__metric">
                  <strong>{formatPercent(goal.conversionRatePct)}</strong>
                  <span>Conversion</span>
                </div>
              </div>

              <div
                className="dash-evidence-card__track"
                aria-label={`${goal.goalName} conversion rate ${formatPercent(
                  goal.conversionRatePct,
                )}`}
              >
                <div
                  className="dash-evidence-card__bar dash-evidence-card__bar--conversion"
                  style={{ width: getConversionBarWidth(goal) }}
                />
              </div>

              <div className="dash-evidence-card__meta">
                <span>Entries: {formatInteger(goal.entryCount)}</span>
                <span>Completions: {formatInteger(goal.completionCount)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="dash-evidence-footer">
        <button
          type="button"
          className="dash-details-toggle"
          onClick={() => setShowDetails((prev) => !prev)}
        >
          {showDetails ? "Hide details" : "View details"}
        </button>

        <span className="dash-evidence-footer__meta">
          {data.length} configured goals
        </span>
      </div>

      {showDetails ? (
        <div className="dash-evidence-table-wrap">
          <table className="dash-evidence-table">
            <thead>
              <tr>
                <th>Goal</th>
                <th className="is-numeric">Entries</th>
                <th className="is-numeric">Completions</th>
                <th className="is-numeric">Conversion</th>
              </tr>
            </thead>

            <tbody>
              {sortedByConversion.map((goal) => (
                <tr key={goal.goalKey}>
                  <td title={goal.goalName}>{goal.goalName}</td>
                  <td className="is-numeric">
                    {formatInteger(goal.entryCount)}
                  </td>
                  <td className="is-numeric">
                    {formatInteger(goal.completionCount)}
                  </td>
                  <td className="is-numeric">
                    {formatPercent(goal.conversionRatePct)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </DashboardPanelShell>
  );
}
