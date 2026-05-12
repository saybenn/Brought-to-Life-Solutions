import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import DashboardPanelShell from "@/components/dashboard/layout/DashboardPanelShell";
import EmptyState from "@/components/ui/EmptyState";
import PanelHeader from "@/components/ui/PanelHeader";
import { DASHBOARD_COPY } from "@/lib/dashboard/copy";
import {
  formatInteger,
  formatShortUiDate,
  formatUiDate,
} from "@/lib/dashboard/formatters";
import type {
  GoalCompletionPoint,
  GoalCompletionTrendPanelProps,
} from "@/lib/dashboard/payload";

type ChartRow = GoalCompletionPoint & {
  shortDate: string;
  fullDate: string;
  forms: number;
  calls: number;
  bookings: number;
};

type GoalLabels = {
  primary: string;
  secondary: string;
  tertiary: string;
};

type GoalCompletionTrendV2Props = GoalCompletionTrendPanelProps;

const CHART_MARGIN = { top: 8, right: 10, left: -22, bottom: 0 };

function buildChartRows(data: GoalCompletionPoint[]): ChartRow[] {
  return data.map((row) => ({
    ...row,
    shortDate: formatShortUiDate(row.date),
    fullDate: formatUiDate(row.date),
    forms: row.forms ?? 0,
    calls: row.calls ?? 0,
    bookings: row.bookings ?? 0,
  }));
}

function CompletionTooltip({
  active,
  payload,
  label,
  labels,
}: {
  active?: boolean;
  payload?: Array<{
    dataKey?: string | number;
    value?: number | string;
    payload?: ChartRow;
  }>;
  label?: string;
  labels: GoalLabels;
}) {
  if (!active || !payload?.length) return null;

  const row = payload[0]?.payload;
  const title = row?.fullDate ?? label ?? "Selected day";

  return (
    <div className="dash-chart-tooltip">
      <div className="dash-chart-tooltip__title">{title}</div>

      <div className="dash-chart-tooltip__rows">
        <div className="dash-chart-tooltip__row">
          <span>{labels.primary}</span>
          <strong>{formatInteger(row?.forms ?? 0)}</strong>
        </div>

        <div className="dash-chart-tooltip__row">
          <span>{labels.secondary}</span>
          <strong>{formatInteger(row?.calls ?? 0)}</strong>
        </div>

        <div className="dash-chart-tooltip__row">
          <span>{labels.tertiary}</span>
          <strong>{formatInteger(row?.bookings ?? 0)}</strong>
        </div>
      </div>
    </div>
  );
}

export default function GoalCompletionTrendV2({
  data,
  labels,
}: GoalCompletionTrendV2Props) {
  if (!data.length) {
    return (
      <DashboardPanelShell surface="base" className="dash-support-panel">
        <PanelHeader
          title={DASHBOARD_COPY.goalCompletionTrend.title}
          description={DASHBOARD_COPY.goalCompletionTrend.description}
          tooltip={DASHBOARD_COPY.goalCompletionTrend.tooltip}
        />

        <EmptyState description="Completion trend data is not available." />
      </DashboardPanelShell>
    );
  }

  const chartRows = buildChartRows(data);

  const primaryTotal = chartRows.reduce((sum, row) => sum + row.forms, 0);
  const secondaryTotal = chartRows.reduce((sum, row) => sum + row.calls, 0);
  const tertiaryTotal = chartRows.reduce((sum, row) => sum + row.bookings, 0);

  const resolvedLabels: GoalLabels = {
    primary: labels?.primary ?? "Primary Goal",
    secondary: labels?.secondary ?? "Secondary Goal",
    tertiary: labels?.tertiary ?? "Tertiary Goal",
  };

  return (
    <DashboardPanelShell surface="base" className="dash-support-panel">
      <PanelHeader
        title={DASHBOARD_COPY.goalCompletionTrend.title}
        description={DASHBOARD_COPY.goalCompletionTrend.description}
        tooltip={DASHBOARD_COPY.goalCompletionTrend.tooltip}
        actions={
          <div className="dash-chart-header-actions">
            <div className="dash-chart-legend" aria-label="Chart legend">
              <span className="dash-chart-legend__item">
                <span className="dash-chart-legend__dot dash-chart-legend__dot--entries" />
                {resolvedLabels.primary}
              </span>
              <span className="dash-chart-legend__item">
                <span className="dash-chart-legend__dot dash-chart-legend__dot--completions" />
                {resolvedLabels.secondary}
              </span>
            </div>

            <span className="dash-chart-control">Weekly</span>
          </div>
        }
      />

      <div className="dash-support-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartRows} margin={CHART_MARGIN}>
            <CartesianGrid stroke="var(--dash-chart-grid)" vertical={false} />

            <XAxis
              dataKey="shortDate"
              tick={{ fill: "var(--dash-chart-axis)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              minTickGap={14}
            />

            <YAxis
              tick={{ fill: "var(--dash-chart-axis)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />

            <Tooltip
              content={<CompletionTooltip labels={resolvedLabels} />}
              cursor={{ fill: "rgba(21, 31, 24, 0.035)" }}
            />

            <Bar
              dataKey="forms"
              fill="var(--dash-chart-bar-1)"
              radius={[7, 7, 0, 0]}
              maxBarSize={28}
            />

            <Bar
              dataKey="calls"
              fill="var(--dash-chart-bar-2)"
              radius={[7, 7, 0, 0]}
              maxBarSize={28}
            />

            <Bar
              dataKey="bookings"
              fill="var(--dash-chart-bar-3)"
              radius={[7, 7, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="dash-support-metric-grid">
        <div className="dash-support-metric-card">
          <span>{resolvedLabels.primary}</span>
          <strong>{formatInteger(primaryTotal)}</strong>
        </div>

        <div className="dash-support-metric-card">
          <span>{resolvedLabels.secondary}</span>
          <strong>{formatInteger(secondaryTotal)}</strong>
        </div>

        <div className="dash-support-metric-card">
          <span>{resolvedLabels.tertiary}</span>
          <strong>{formatInteger(tertiaryTotal)}</strong>
        </div>
      </div>
    </DashboardPanelShell>
  );
}
