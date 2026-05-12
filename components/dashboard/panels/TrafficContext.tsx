import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
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
  TrafficContextPanelProps,
  TrafficContextPoint,
} from "@/lib/dashboard/payload";

type ChartRow = TrafficContextPoint & {
  shortDate: string;
  fullDate: string;
};

type TrafficContextProps = TrafficContextPanelProps;

const CHART_MARGIN = { top: 8, right: 12, left: -22, bottom: 0 };
const SPARKLINE_MARGIN = { top: 4, right: 0, left: 0, bottom: 4 };

function buildChartRows(rows: TrafficContextPoint[]): ChartRow[] {
  return rows.map((row) => ({
    ...row,
    shortDate: formatShortUiDate(row.date),
    fullDate: formatUiDate(row.date),
  }));
}

function getAveragePageViews(rows: TrafficContextPoint[]): number {
  if (!rows.length) return 0;

  const total = rows.reduce((sum, row) => sum + row.pageViews, 0);
  return Math.round(total / rows.length);
}

function getPeakRow(rows: TrafficContextPoint[]): TrafficContextPoint | null {
  if (!rows.length) return null;

  return rows.reduce((peak, row) =>
    row.pageViews > peak.pageViews ? row : peak,
  );
}

function getLatestRow(rows: TrafficContextPoint[]): TrafficContextPoint | null {
  if (!rows.length) return null;
  return rows[rows.length - 1] ?? null;
}

function TrafficTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
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
          <span>Page Views</span>
          <strong>{formatInteger(row?.pageViews ?? 0)}</strong>
        </div>
      </div>
    </div>
  );
}

function MiniSparkline({ data }: { data: ChartRow[] }) {
  return (
    <div className="dash-sparkline" aria-hidden="true">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={SPARKLINE_MARGIN}>
          <Line
            type="monotone"
            dataKey="pageViews"
            stroke="var(--dash-chart-line-1)"
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function TrafficContext({ data }: TrafficContextProps) {
  const rows = useMemo(() => data ?? [], [data]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const desktop = typeof window !== "undefined" && window.innerWidth >= 1024;
    setShowDetails(desktop);
  }, []);

  const chartRows = useMemo(() => buildChartRows(rows), [rows]);

  if (!rows.length) {
    return (
      <DashboardPanelShell surface="muted" className="dash-support-panel">
        <PanelHeader
          title={DASHBOARD_COPY.trafficContext.title}
          description={DASHBOARD_COPY.trafficContext.description}
          tooltip={DASHBOARD_COPY.trafficContext.tooltip}
        />

        <EmptyState description="Traffic context data is not available." />
      </DashboardPanelShell>
    );
  }

  const totalPageViews = rows.reduce((sum, row) => sum + row.pageViews, 0);
  const averagePageViews = getAveragePageViews(rows);
  const peakRow = getPeakRow(rows);
  const latestRow = getLatestRow(rows);

  return (
    <DashboardPanelShell surface="muted" className="dash-support-panel">
      <PanelHeader
        title={DASHBOARD_COPY.trafficContext.title}
        description={DASHBOARD_COPY.trafficContext.description}
        tooltip={DASHBOARD_COPY.trafficContext.tooltip}
      />

      <div className="dash-traffic-metric-grid">
        <div className="dash-traffic-metric-card">
          <span>Total Page Views</span>
          <strong>{formatInteger(totalPageViews)}</strong>
          <MiniSparkline data={chartRows} />
        </div>

        <div className="dash-traffic-metric-card">
          <span>Daily Average</span>
          <strong>{formatInteger(averagePageViews)}</strong>
          <MiniSparkline data={chartRows} />
        </div>

        <div className="dash-traffic-metric-card">
          <span>Peak Day</span>
          <strong>{formatInteger(peakRow?.pageViews ?? 0)}</strong>
          <small>{peakRow ? formatUiDate(peakRow.date) : "—"}</small>
        </div>

        <div className="dash-traffic-metric-card">
          <span>Latest Day</span>
          <strong>{formatInteger(latestRow?.pageViews ?? 0)}</strong>
          <small>{latestRow ? formatUiDate(latestRow.date) : "—"}</small>
        </div>
      </div>

      <div className="dash-traffic-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartRows} margin={CHART_MARGIN}>
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
              content={<TrafficTooltip />}
              cursor={{ stroke: "rgba(21, 31, 24, 0.14)" }}
            />

            <Line
              type="monotone"
              dataKey="pageViews"
              stroke="var(--dash-chart-line-1)"
              strokeWidth={2.25}
              dot={false}
              activeDot={{
                r: 4,
                fill: "var(--dash-chart-line-1)",
                stroke: "var(--dash-surface-0)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="dash-evidence-footer">
        <button
          type="button"
          className="dash-details-toggle"
          onClick={() => setShowDetails((prev) => !prev)}
        >
          {showDetails ? "Hide details" : "View details"}
        </button>
      </div>

      {showDetails ? (
        <div className="dash-evidence-table-wrap">
          <table className="dash-evidence-table">
            <thead>
              <tr>
                <th>Date</th>
                <th className="is-numeric">Page Views</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.date}>
                  <td>{formatUiDate(row.date)}</td>
                  <td className="is-numeric">{formatInteger(row.pageViews)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </DashboardPanelShell>
  );
}
