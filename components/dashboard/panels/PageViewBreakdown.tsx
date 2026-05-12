import { useState } from "react";

import DashboardPanelShell from "@/components/dashboard/layout/DashboardPanelShell";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import PanelHeader from "@/components/ui/PanelHeader";
import { formatInteger, formatPercent } from "@/lib/dashboard/formatters";
import type {
  PageViewBreakdownPanelProps,
  PageViewRow,
} from "@/lib/dashboard/payload";

function truncateText(value: string, maxLength = 54): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}…`;
}

function getPageLabel(path: string): string {
  if (path === "/") return "Homepage";

  const clean = path
    .split("?")[0]
    .split("#")[0]
    .replace(/^\/+|\/+$/g, "");

  if (!clean) return "Homepage";

  return clean
    .split("/")
    .filter(Boolean)
    .slice(-1)[0]
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getBarWidth(row: PageViewRow, maxViews: number): string {
  if (maxViews <= 0) return "0%";
  return `${Math.max((row.views / maxViews) * 100, 5)}%`;
}

export default function PageViewBreakdown({
  data,
}: PageViewBreakdownPanelProps) {
  const rows = data ?? [];
  const [showDetails, setShowDetails] = useState(false);

  if (!rows.length) {
    return (
      <DashboardPanelShell surface="base">
        <PanelHeader
          title="Page View Breakdown"
          description="See which pages are getting viewed most often."
          tooltip="Page-level traffic helps reveal where attention is concentrating across the site."
        />

        <EmptyState description="No page view data is available for the selected range." />
      </DashboardPanelShell>
    );
  }

  const sortedRows = [...rows].sort((a, b) => b.views - a.views);
  const topRows = sortedRows.slice(0, 6);
  const topPage = sortedRows[0];
  const totalViews = sortedRows.reduce((sum, row) => sum + row.views, 0);
  const maxViews = Math.max(...sortedRows.map((row) => row.views), 1);

  return (
    <DashboardPanelShell surface="base">
      <PanelHeader
        title="Page View Breakdown"
        description="See which pages are getting viewed most often."
        tooltip="Page-level traffic helps reveal where attention is concentrating across the site."
        actions={<Badge tone="muted">{rows.length} pages</Badge>}
      />

      {topPage ? (
        <div className="dash-source-highlight">
          <div>
            <span>Top Page</span>
            <strong title={topPage.pagePath}>
              {truncateText(getPageLabel(topPage.pagePath), 42)}
            </strong>
          </div>

          <div className="dash-source-highlight__metrics">
            <span title={topPage.pagePath}>
              Path: {truncateText(topPage.pagePath, 38)}
            </span>
            <span>Views: {formatInteger(topPage.views)}</span>
            <span>Share: {formatPercent(topPage.sharePct ?? 0)}</span>
          </div>
        </div>
      ) : null}

      <div className="dash-evidence-list">
        {topRows.map((row, index) => {
          const pageLabel = getPageLabel(row.pagePath);

          return (
            <article key={row.pagePath} className="dash-evidence-card">
              <div className="dash-evidence-card__rank">{index + 1}</div>

              <div className="dash-evidence-card__body">
                <div className="dash-evidence-card__top">
                  <div className="dash-evidence-card__copy">
                    <h3 title={row.pagePath}>{truncateText(pageLabel, 48)}</h3>
                    <p title={row.pagePath}>{truncateText(row.pagePath, 64)}</p>
                  </div>

                  <div className="dash-evidence-card__metric">
                    <strong>{formatInteger(row.views)}</strong>
                    <span>Views</span>
                  </div>
                </div>

                <div className="dash-evidence-card__track" aria-hidden="true">
                  <div
                    className="dash-evidence-card__bar"
                    style={{ width: getBarWidth(row, maxViews) }}
                  />
                </div>

                <div className="dash-evidence-card__meta">
                  <span>Share: {formatPercent(row.sharePct ?? 0)}</span>
                  <span>{formatInteger(totalViews)} total views</span>
                </div>
              </div>
            </article>
          );
        })}
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
          Total views in range: {formatInteger(totalViews)}
        </span>
      </div>

      {showDetails ? (
        <div className="dash-evidence-table-wrap">
          <table className="dash-evidence-table">
            <thead>
              <tr>
                <th>Page</th>
                <th className="is-numeric">Views</th>
                <th className="is-numeric">Share</th>
              </tr>
            </thead>

            <tbody>
              {sortedRows.map((row) => (
                <tr key={row.pagePath}>
                  <td title={row.pagePath}>{truncateText(row.pagePath, 76)}</td>
                  <td className="is-numeric">{formatInteger(row.views)}</td>
                  <td className="is-numeric">
                    {formatPercent(row.sharePct ?? 0)}
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
