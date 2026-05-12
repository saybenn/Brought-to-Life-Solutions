import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
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
  formatPercent,
  formatShortUiDate,
  formatUiDate,
} from "@/lib/dashboard/formatters";
import type { GoalKey } from "@/lib/analytics/config.types";
import type {
  ConversionTrendPanelProps,
  TrendPoint,
} from "@/lib/dashboard/payload";

type ChartRow = TrendPoint & {
  shortDate: string;
  fullDate: string;
};

const CHART_MARGIN = { top: 6, right: 8, left: -24, bottom: 0 };

function resolveRows(
  data: ConversionTrendPanelProps["data"],
  activeGoalKey?: GoalKey,
): TrendPoint[] {
  if (activeGoalKey) {
    return data[activeGoalKey] ?? [];
  }

  return data.primary ?? data.secondary ?? data.tertiary ?? [];
}

function buildChartRows(rows: TrendPoint[]): ChartRow[] {
  return rows.map((row) => ({
    ...row,
    shortDate: formatShortUiDate(row.date),
    fullDate: formatUiDate(row.date),
  }));
}

function getAverageConversion(rows: TrendPoint[]): number | null {
  const totalEntries = rows.reduce((sum, row) => sum + row.entries, 0);
  const totalCompletions = rows.reduce((sum, row) => sum + row.completions, 0);

  return totalEntries > 0 ? (totalCompletions / totalEntries) * 100 : null;
}

function TrendTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    dataKey?: string | number;
    value?: number | string;
    payload?: ChartRow;
  }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  const row = payload[0]?.payload;
  const title = row?.fullDate ?? label ?? "Selected day";

  return (
    <div className="dash-chart-tooltip">
      <div className="dash-chart-tooltip__title">{title}</div>

      <div className="dash-chart-tooltip__rows">
        <div className="dash-chart-tooltip__row">
          <span>Entries</span>
          <strong>{formatInteger(row?.entries ?? 0)}</strong>
        </div>

        <div className="dash-chart-tooltip__row">
          <span>Completions</span>
          <strong>{formatInteger(row?.completions ?? 0)}</strong>
        </div>

        <div className="dash-chart-tooltip__row">
          <span>Conversion</span>
          <strong>{formatPercent(row?.conversionRatePct ?? null)}</strong>
        </div>
      </div>
    </div>
  );
}

type ConversionTrendV2Props = ConversionTrendPanelProps;

export default function ConversionTrendV2({
  data,
  activeGoalKey,
}: ConversionTrendV2Props) {
  const rows = resolveRows(data, activeGoalKey);

  if (!rows.length) {
    return (
      <DashboardPanelShell surface="base" className="dash-anchor-panel">
        <PanelHeader
          title={DASHBOARD_COPY.conversionTrend.title}
          description={DASHBOARD_COPY.conversionTrend.description}
          tooltip={DASHBOARD_COPY.conversionTrend.tooltip}
        />

        <EmptyState description="Trend data is not available for the selected goal." />
      </DashboardPanelShell>
    );
  }

  const chartRows = buildChartRows(rows);
  const avgRate = getAverageConversion(rows);

  return (
    <DashboardPanelShell surface="base" className="dash-anchor-panel">
      <PanelHeader
        title={DASHBOARD_COPY.conversionTrend.title}
        description={DASHBOARD_COPY.conversionTrend.description}
        tooltip={DASHBOARD_COPY.conversionTrend.tooltip}
        actions={
          <div className="dash-chart-header-actions">
            <div className="dash-chart-legend" aria-label="Chart legend">
              <span className="dash-chart-legend__item">
                <span className="dash-chart-legend__dot dash-chart-legend__dot--entries" />
                Entries
              </span>
              <span className="dash-chart-legend__item">
                <span className="dash-chart-legend__dot dash-chart-legend__dot--completions" />
                Completions
              </span>
            </div>

            <span className="dash-chart-control">Daily</span>
          </div>
        }
      />

      <div className="dash-trend-chart" aria-label="Conversion trend chart">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartRows} margin={CHART_MARGIN}>
            <defs>
              <linearGradient
                id="conversionTrendEntriesArea"
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--dash-chart-line-1)"
                  stopOpacity={0.14}
                />
                <stop
                  offset="58%"
                  stopColor="var(--dash-chart-line-1)"
                  stopOpacity={0.06}
                />
                <stop
                  offset="100%"
                  stopColor="var(--dash-chart-line-1)"
                  stopOpacity={0.01}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="var(--dash-chart-grid)"
              strokeDasharray="3 7"
              vertical={false}
            />

            <XAxis
              dataKey="shortDate"
              tick={{ fill: "var(--dash-chart-axis)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              minTickGap={18}
            />

            <YAxis
              tick={{ fill: "var(--dash-chart-axis)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              width={36}
            />

            <Tooltip
              content={<TrendTooltip />}
              cursor={{ stroke: "rgba(21, 31, 24, 0.14)" }}
            />

            <Area
              type="monotone"
              dataKey="entries"
              stroke="none"
              fill="url(#conversionTrendEntriesArea)"
              activeDot={false}
              isAnimationActive={false}
            />

            <Line
              type="monotone"
              dataKey="entries"
              stroke="var(--dash-chart-line-1)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                fill: "var(--dash-chart-line-1)",
                stroke: "var(--dash-surface-0)",
                strokeWidth: 2,
              }}
              isAnimationActive={false}
            />

            <Line
              type="monotone"
              dataKey="completions"
              stroke="var(--dash-chart-line-2)"
              strokeWidth={2.35}
              dot={false}
              activeDot={{
                r: 5,
                fill: "var(--dash-chart-line-2)",
                stroke: "var(--dash-surface-0)",
                strokeWidth: 2,
              }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="dash-trend-footer">
        <span>Average conversion</span>
        <strong>{formatPercent(avgRate)}</strong>
      </div>
    </DashboardPanelShell>
  );
}
