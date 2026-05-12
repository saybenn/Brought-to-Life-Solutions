import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";

import DashboardPanelShell from "@/components/dashboard/layout/DashboardPanelShell";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import PanelHeader from "@/components/ui/PanelHeader";

import { DASHBOARD_COPY } from "@/lib/dashboard/copy";
import { formatInteger, formatPercent } from "@/lib/dashboard/formatters";
import type { GoalKey } from "@/lib/analytics/config.types";
import type {
  LeadSourceConversionPanelProps,
  LeadSourceDiagnostics,
  LeadSourceRow,
} from "@/lib/dashboard/payload";

const SOURCE_COLORS = [
  "var(--dash-chart-bar-1)",
  "var(--dash-chart-line-2)",
  "var(--dash-chart-bar-2)",
  "var(--dash-chart-bar-3)",
  "var(--dash-chart-line-3)",
];

function resolveRows(
  data: LeadSourceConversionPanelProps["data"],
  activeGoalKey?: GoalKey,
): LeadSourceRow[] {
  if (activeGoalKey) {
    return data[activeGoalKey] ?? [];
  }

  return data.primary ?? data.secondary ?? data.tertiary ?? [];
}

function resolveDiagnostics(
  diagnostics: LeadSourceConversionPanelProps["diagnostics"],
  activeGoalKey?: GoalKey,
): LeadSourceDiagnostics | undefined {
  if (!diagnostics) return undefined;

  if (activeGoalKey) {
    return diagnostics[activeGoalKey];
  }

  return diagnostics.primary ?? diagnostics.secondary ?? diagnostics.tertiary;
}

function truncateText(value: string, maxLength = 44): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}…`;
}

function getEmptyStateCopy(diagnostics?: LeadSourceDiagnostics): {
  title: string;
  description: string;
} {
  if (!diagnostics) {
    return {
      title: "No source data available",
      description:
        "Source conversion data is not available for the selected goal.",
    };
  }

  if (diagnostics.reason === "noise_only") {
    const examples = diagnostics.droppedExamples?.length
      ? ` Filtered rows: ${diagnostics.droppedExamples.join(", ")}.`
      : "";

    return {
      title: "Only test or internal traffic detected",
      description:
        "Traffic was detected for this goal, but it was filtered because the source attribution appears to be test or internal traffic." +
        examples,
    };
  }

  if (diagnostics.reason === "unattributed_only") {
    const examples = diagnostics.droppedExamples?.length
      ? ` Examples: ${diagnostics.droppedExamples.join(", ")}.`
      : "";

    return {
      title: "Traffic detected, but attribution is missing",
      description:
        "Traffic was detected for this goal, but the available source rows were unattributed and not useful for reporting." +
        examples,
    };
  }

  if (diagnostics.reason === "no_data") {
    return {
      title: "No source activity detected",
      description:
        "No source-attributed entry or completion rows were detected for the selected goal in this range.",
    };
  }

  return {
    title: "No source data available",
    description:
      "Source conversion data is not available for the selected goal.",
  };
}

function buildDonutRows(rows: LeadSourceRow[]) {
  return rows
    .filter((row) => row.completions > 0 || row.entries > 0)
    .slice(0, 5)
    .map((row) => ({
      ...row,
      value: row.completions || row.entries,
    }));
}

function SourceTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload?: LeadSourceRow & { value: number };
  }>;
}) {
  if (!active || !payload?.length) return null;

  const row = payload[0]?.payload;
  if (!row) return null;

  return (
    <div className="dash-chart-tooltip">
      <div className="dash-chart-tooltip__title">{row.sourceMedium}</div>

      <div className="dash-chart-tooltip__rows">
        <div className="dash-chart-tooltip__row">
          <span>Entries</span>
          <strong>{formatInteger(row.entries)}</strong>
        </div>

        <div className="dash-chart-tooltip__row">
          <span>Completions</span>
          <strong>{formatInteger(row.completions)}</strong>
        </div>

        <div className="dash-chart-tooltip__row">
          <span>Conversion</span>
          <strong>{formatPercent(row.conversionRatePct)}</strong>
        </div>
      </div>
    </div>
  );
}

type LeadSourceConversionProps = LeadSourceConversionPanelProps;

export default function LeadSourceConversion({
  data,
  diagnostics,
  activeGoalKey,
}: LeadSourceConversionProps) {
  const rows = resolveRows(data, activeGoalKey);
  const sourceDiagnostics = resolveDiagnostics(diagnostics, activeGoalKey);
  const [showDetails, setShowDetails] = useState(false);

  if (!rows.length) {
    const emptyCopy = getEmptyStateCopy(sourceDiagnostics);

    return (
      <DashboardPanelShell surface="base">
        <PanelHeader
          title={DASHBOARD_COPY.leadSourceConversion.title}
          description={DASHBOARD_COPY.leadSourceConversion.description}
          tooltip={DASHBOARD_COPY.leadSourceConversion.tooltip}
        />

        <EmptyState
          title={emptyCopy.title}
          description={emptyCopy.description}
        />
      </DashboardPanelShell>
    );
  }

  const sortedRows = [...rows].sort((a, b) => b.completions - a.completions);
  const donutRows = buildDonutRows(sortedRows);
  const topSource = sortedRows[0];
  const totalCompletions = rows.reduce((sum, row) => sum + row.completions, 0);
  const totalEntries = rows.reduce((sum, row) => sum + row.entries, 0);

  return (
    <DashboardPanelShell surface="base">
      <PanelHeader
        title={DASHBOARD_COPY.leadSourceConversion.title}
        description={DASHBOARD_COPY.leadSourceConversion.description}
        tooltip={DASHBOARD_COPY.leadSourceConversion.tooltip}
        actions={<Badge tone="accent">Estimated</Badge>}
      />

      <div className="dash-source-layout">
        <div className="dash-source-donut-card">
          <div className="dash-source-donut">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutRows}
                  dataKey="value"
                  nameKey="sourceMedium"
                  innerRadius="64%"
                  outerRadius="88%"
                  paddingAngle={3}
                  stroke="rgba(255, 255, 255, 0.92)"
                  strokeWidth={2}
                >
                  {donutRows.map((row, index) => (
                    <Cell
                      key={row.sourceMedium}
                      fill={SOURCE_COLORS[index % SOURCE_COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip content={<SourceTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="dash-source-donut__center">
              <strong>{formatInteger(totalCompletions)}</strong>
              <span>Completions</span>
            </div>
          </div>
        </div>

        <div className="dash-source-legend">
          {donutRows.map((row, index) => (
            <div key={row.sourceMedium} className="dash-source-legend__row">
              <span
                className="dash-source-legend__dot"
                style={{
                  background: SOURCE_COLORS[index % SOURCE_COLORS.length],
                }}
                aria-hidden="true"
              />

              <div className="dash-source-legend__copy">
                <strong title={row.sourceMedium}>
                  {truncateText(row.sourceMedium, 44)}
                </strong>
                <span>
                  {formatInteger(row.entries)} entries ·{" "}
                  {formatPercent(row.conversionRatePct)}
                </span>
              </div>

              <div className="dash-source-legend__metric">
                {formatInteger(row.completions)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {topSource ? (
        <div className="dash-source-highlight">
          <div>
            <span>Top Source</span>
            <strong title={topSource.sourceMedium}>
              {truncateText(topSource.sourceMedium, 52)}
            </strong>
          </div>

          <div className="dash-source-highlight__metrics">
            <span>Entries: {formatInteger(topSource.entries)}</span>
            <span>Completions: {formatInteger(topSource.completions)}</span>
            <span>
              Conversion: {formatPercent(topSource.conversionRatePct)}
            </span>
          </div>
        </div>
      ) : null}

      <div className="dash-evidence-footer">
        <button
          type="button"
          className="dash-details-toggle"
          onClick={() => setShowDetails((value) => !value)}
        >
          {showDetails ? "Hide details" : "View details"}
        </button>

        <span className="dash-evidence-footer__meta">
          {formatInteger(totalEntries)} source-attributed entries
        </span>
      </div>

      {showDetails ? (
        <div className="dash-evidence-table-wrap">
          <table className="dash-evidence-table">
            <thead>
              <tr>
                <th>Source</th>
                <th className="is-numeric">Entries</th>
                <th className="is-numeric">Completions</th>
                <th className="is-numeric">Conversion</th>
              </tr>
            </thead>

            <tbody>
              {sortedRows.map((row) => (
                <tr key={row.sourceMedium}>
                  <td title={row.sourceMedium}>
                    {truncateText(row.sourceMedium, 64)}
                  </td>
                  <td className="is-numeric">{formatInteger(row.entries)}</td>
                  <td className="is-numeric">
                    {formatInteger(row.completions)}
                  </td>
                  <td className="is-numeric">
                    {formatPercent(row.conversionRatePct)}
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
