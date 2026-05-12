import { useState } from "react";

import DashboardPanelShell from "@/components/dashboard/layout/DashboardPanelShell";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import PanelHeader from "@/components/ui/PanelHeader";

import { DASHBOARD_COPY } from "@/lib/dashboard/copy";
import { formatInteger, formatPercent } from "@/lib/dashboard/formatters";
import type { GoalKey } from "@/lib/analytics/config.types";
import type {
  CtaOutcomePerformancePanelProps,
  CtaOutcomeRow,
} from "@/lib/dashboard/payload";

function resolveRows(
  data: CtaOutcomePerformancePanelProps["data"],
  activeGoalKey?: GoalKey,
): CtaOutcomeRow[] {
  if (activeGoalKey) {
    return data[activeGoalKey] ?? [];
  }

  return data.primary ?? data.secondary ?? data.tertiary ?? [];
}

function truncateText(value: string, maxLength = 48): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}…`;
}

function getConversionLabel(row: CtaOutcomeRow): string {
  if (row.conversionRatePct == null) return "—";
  return formatPercent(row.conversionRatePct);
}

function getCompletionLabel(row: CtaOutcomeRow): string {
  if (row.completions == null) return "—";
  return formatInteger(row.completions);
}

function getScoreWidth(row: CtaOutcomeRow, maxClicks: number): string {
  if (maxClicks <= 0) return "0%";
  return `${Math.max((row.clicks / maxClicks) * 100, 6)}%`;
}

type CtaOutcomePerformanceProps = CtaOutcomePerformancePanelProps;

export default function CtaOutcomePerformance({
  data,
  activeGoalKey,
}: CtaOutcomePerformanceProps) {
  const rows = resolveRows(data, activeGoalKey);
  const [showDetails, setShowDetails] = useState(false);

  if (!rows.length) {
    return (
      <DashboardPanelShell surface="base">
        <PanelHeader
          title={DASHBOARD_COPY.ctaOutcomePerformance.title}
          description={DASHBOARD_COPY.ctaOutcomePerformance.description}
          tooltip={DASHBOARD_COPY.ctaOutcomePerformance.tooltip}
        />

        <EmptyState description="CTA performance data is not available for the selected goal." />
      </DashboardPanelShell>
    );
  }

  const sortedRows = [...rows].sort((a, b) => b.clicks - a.clicks);
  const maxClicks = Math.max(...sortedRows.map((row) => row.clicks), 1);
  const allNullConversion = rows.every((row) => row.conversionRatePct == null);
  const topRows = sortedRows.slice(0, 5);

  return (
    <DashboardPanelShell surface="base">
      <PanelHeader
        title={DASHBOARD_COPY.ctaOutcomePerformance.title}
        description={DASHBOARD_COPY.ctaOutcomePerformance.description}
        tooltip={DASHBOARD_COPY.ctaOutcomePerformance.tooltip}
        actions={
          <Badge tone={allNullConversion ? "warning" : "accent"}>
            {allNullConversion ? "Clicks only" : "Estimated outcomes"}
          </Badge>
        }
      />

      <div className="dash-evidence-list">
        {topRows.map((row, index) => (
          <article
            key={`${row.ctaLabel}-${row.ctaLocation}`}
            className="dash-evidence-card"
          >
            <div className="dash-evidence-card__rank">{index + 1}</div>

            <div className="dash-evidence-card__body">
              <div className="dash-evidence-card__top">
                <div className="dash-evidence-card__copy">
                  <h3 title={row.ctaLabel}>{truncateText(row.ctaLabel, 48)}</h3>
                  <p title={row.ctaLocation}>
                    {truncateText(row.ctaLocation, 56)}
                  </p>
                </div>

                <div className="dash-evidence-card__metric">
                  <strong>{formatInteger(row.clicks)}</strong>
                  <span>Clicks</span>
                </div>
              </div>

              <div className="dash-evidence-card__track" aria-hidden="true">
                <div
                  className="dash-evidence-card__bar"
                  style={{ width: getScoreWidth(row, maxClicks) }}
                />
              </div>

              <div className="dash-evidence-card__meta">
                <span>Completions: {getCompletionLabel(row)}</span>
                <span>Conversion: {getConversionLabel(row)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="dash-evidence-footer">
        <button
          type="button"
          className="dash-details-toggle"
          onClick={() => setShowDetails((value) => !value)}
        >
          {showDetails ? "Hide details" : "View details"}
        </button>

        <span className="dash-evidence-footer__meta">
          Showing top {topRows.length} of {sortedRows.length} CTAs
        </span>
      </div>

      {showDetails ? (
        <div className="dash-evidence-table-wrap">
          <table className="dash-evidence-table">
            <thead>
              <tr>
                <th>CTA</th>
                <th>Location</th>
                <th className="is-numeric">Clicks</th>
                <th className="is-numeric">Completions</th>
                <th className="is-numeric">Conversion</th>
              </tr>
            </thead>

            <tbody>
              {sortedRows.map((row) => (
                <tr key={`${row.ctaLabel}-${row.ctaLocation}`}>
                  <td title={row.ctaLabel}>{truncateText(row.ctaLabel, 44)}</td>
                  <td title={row.ctaLocation}>
                    {truncateText(row.ctaLocation, 44)}
                  </td>
                  <td className="is-numeric">{formatInteger(row.clicks)}</td>
                  <td className="is-numeric">{getCompletionLabel(row)}</td>
                  <td className="is-numeric">{getConversionLabel(row)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </DashboardPanelShell>
  );
}
