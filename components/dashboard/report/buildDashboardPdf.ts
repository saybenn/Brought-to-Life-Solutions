import { jsPDF } from "jspdf";

import type { GoalKey } from "@/lib/analytics/config.types";
import type { DashboardRangeKey } from "@/lib/dashboard/dateRanges";
import type { DashboardPayload } from "@/lib/dashboard/payload";
import { formatInteger, formatPercent } from "@/lib/dashboard/formatters";

type BuildDashboardPdfInput = {
  payload: DashboardPayload;
  siteId?: string;
  range: DashboardRangeKey;
  activeGoalKey?: GoalKey;
};

type TableColumn<T> = {
  label: string;
  width: number;
  align?: "left" | "right";
  value: (row: T) => string;
};

const PAGE = {
  width: 595.28,
  height: 841.89,
  margin: 42,
};

const COLOR = {
  ink: "#151f18",
  muted: "#566159",
  faint: "#8a948d",
  border: "#dce3dc",
  soft: "#f4f7f2",
  accent: "#1f7a4f",
  warning: "#a8742f",
};

function cleanText(value: unknown): string {
  return String(value ?? "—")
    .replace(/\s+/g, " ")
    .trim();
}

function getSafePart(value?: string | number | null): string {
  return cleanText(value || "dashboard")
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function getRangeLabel(payload: DashboardPayload, fallback: DashboardRangeKey) {
  return payload.meta.range.label ?? fallback;
}

function getSelectedGoal(payload: DashboardPayload, activeGoalKey?: GoalKey) {
  if (activeGoalKey) {
    return payload.funnelProgression.find(
      (goal) => goal.goalKey === activeGoalKey,
    );
  }

  return payload.funnelProgression[0];
}

function getGoalLabel(payload: DashboardPayload, activeGoalKey?: GoalKey) {
  return getSelectedGoal(payload, activeGoalKey)?.goalName ?? "Primary Goal";
}

function getFilename(input: BuildDashboardPdfInput): string {
  const { payload, siteId, range, activeGoalKey } = input;
  const date = new Date().toISOString().slice(0, 10);
  const site = getSafePart(siteId ?? payload.meta.siteId);
  const rangePart = getSafePart(range);
  const goalPart = getSafePart(getGoalLabel(payload, activeGoalKey));

  return `${site}-dashboard-report-${rangePart}-${goalPart}-${date}.pdf`;
}

function resolveGoalRecord<T>(
  record: Partial<Record<GoalKey, T[]>>,
  activeGoalKey?: GoalKey,
): T[] {
  if (activeGoalKey) return record[activeGoalKey] ?? [];
  return record.primary ?? record.secondary ?? record.tertiary ?? [];
}

function addPageIfNeeded(pdf: jsPDF, y: number, needed = 80): number {
  if (y + needed <= PAGE.height - PAGE.margin) return y;

  pdf.addPage();
  pdf.setFillColor("#ffffff");
  pdf.rect(0, 0, PAGE.width, PAGE.height, "F");

  return PAGE.margin;
}

function addTitle(pdf: jsPDF, title: string, y: number): number {
  y = addPageIfNeeded(pdf, y, 56);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(15);
  pdf.setTextColor(COLOR.ink);
  pdf.text(cleanText(title), PAGE.margin, y);

  return y + 18;
}

function addBodyText(pdf: jsPDF, text: string, y: number): number {
  y = addPageIfNeeded(pdf, y, 34);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9.5);
  pdf.setTextColor(COLOR.muted);

  const lines = pdf.splitTextToSize(
    cleanText(text),
    PAGE.width - PAGE.margin * 2,
  );

  pdf.text(lines, PAGE.margin, y);

  return y + lines.length * 12 + 8;
}

function addDivider(pdf: jsPDF, y: number): number {
  y = addPageIfNeeded(pdf, y, 18);

  pdf.setDrawColor(COLOR.border);
  pdf.line(PAGE.margin, y, PAGE.width - PAGE.margin, y);

  return y + 16;
}

function truncateValue(value: string, maxLength = 44): string {
  const clean = cleanText(value);
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1)}…`;
}

function addMetricCard(
  pdf: jsPDF,
  x: number,
  y: number,
  width: number,
  label: string,
  value: string,
): void {
  pdf.setDrawColor(COLOR.border);
  pdf.setFillColor(COLOR.soft);
  pdf.roundedRect(x, y, width, 54, 8, 8, "FD");

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  pdf.setTextColor(COLOR.faint);
  pdf.text(cleanText(label).toUpperCase(), x + 10, y + 17);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor(COLOR.ink);
  pdf.text(truncateValue(value, 18), x + 10, y + 39);
}

function addEmptySection(pdf: jsPDF, title: string, y: number): number {
  y = addTitle(pdf, title, y);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(COLOR.faint);
  pdf.text("No reportable rows for this section.", PAGE.margin, y);

  return y + 22;
}

function addTable<T>(
  pdf: jsPDF,
  title: string,
  rows: T[],
  columns: TableColumn<T>[],
  y: number,
  maxRows = 8,
  showEmpty = false,
): number {
  if (!rows.length) {
    return showEmpty ? addEmptySection(pdf, title, y) : y;
  }

  y = addTitle(pdf, title, y);

  const tableWidth = PAGE.width - PAGE.margin * 2;
  const rowHeight = 22;
  const headerHeight = 24;
  const visibleRows = rows.slice(0, maxRows);

  y = addPageIfNeeded(pdf, y, headerHeight + visibleRows.length * rowHeight);

  pdf.setFillColor(COLOR.soft);
  pdf.setDrawColor(COLOR.border);
  pdf.roundedRect(PAGE.margin, y, tableWidth, headerHeight, 6, 6, "FD");

  let x = PAGE.margin;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  pdf.setTextColor(COLOR.faint);

  columns.forEach((column) => {
    const textX = column.align === "right" ? x + column.width - 8 : x + 8;

    pdf.text(cleanText(column.label).toUpperCase(), textX, y + 15, {
      align: column.align ?? "left",
    });

    x += column.width;
  });

  y += headerHeight;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8.5);

  visibleRows.forEach((row) => {
    y = addPageIfNeeded(pdf, y, rowHeight + 20);

    pdf.setDrawColor(COLOR.border);
    pdf.line(PAGE.margin, y, PAGE.width - PAGE.margin, y);

    x = PAGE.margin;

    columns.forEach((column) => {
      const value = truncateValue(column.value(row));
      const textX = column.align === "right" ? x + column.width - 8 : x + 8;

      pdf.setTextColor(COLOR.ink);
      pdf.text(value, textX, y + 15, {
        align: column.align ?? "left",
      });

      x += column.width;
    });

    y += rowHeight;
  });

  if (rows.length > maxRows) {
    pdf.setTextColor(COLOR.faint);
    pdf.setFontSize(8);
    pdf.text(
      `Showing top ${maxRows} of ${rows.length} rows.`,
      PAGE.margin,
      y + 12,
    );
    y += 22;
  }

  return y + 8;
}

function addHeader(pdf: jsPDF, input: BuildDashboardPdfInput): number {
  const { payload, siteId, range, activeGoalKey } = input;

  pdf.setFillColor("#ffffff");
  pdf.rect(0, 0, PAGE.width, PAGE.height, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(COLOR.ink);
  pdf.text("BTLS Dashboard Report", PAGE.margin, PAGE.margin);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(COLOR.muted);

  const metaLine = `Site: ${
    siteId ?? payload.meta.siteId
  } · Range: ${getRangeLabel(payload, range)} · Focus: ${getGoalLabel(
    payload,
    activeGoalKey,
  )}`;

  const metaLines = pdf.splitTextToSize(metaLine, PAGE.width - PAGE.margin * 2);
  pdf.text(metaLines, PAGE.margin, PAGE.margin + 20);

  pdf.setTextColor(COLOR.faint);
  pdf.text(
    `Generated: ${new Date().toLocaleString()}`,
    PAGE.margin,
    PAGE.margin + 38,
  );

  return PAGE.margin + 64;
}

function addReportNotes(pdf: jsPDF, payload: DashboardPayload, y: number) {
  const notes = payload.meta.notes ?? [];
  if (!notes.length) return y;

  y = addTitle(pdf, "Report Notes", y);

  notes.slice(0, 4).forEach((note) => {
    y = addBodyText(pdf, `• ${note}`, y);
  });

  return y;
}

function addExecutiveSummary(
  pdf: jsPDF,
  payload: DashboardPayload,
  activeGoalKey?: GoalKey,
  y = PAGE.margin,
): number {
  const selectedGoal = getSelectedGoal(payload, activeGoalKey);
  const snapshot = payload.executiveSnapshot;

  const entries = selectedGoal?.entryCount ?? snapshot.funnelEntries;
  const completions =
    selectedGoal?.completionCount ?? snapshot.primaryCompletions;
  const conversion =
    selectedGoal?.conversionRatePct ?? snapshot.primaryConversionRatePct;
  const leak = selectedGoal?.biggestLeak
    ? `${selectedGoal.biggestLeak.fromStepName} → ${selectedGoal.biggestLeak.toStepName}`
    : snapshot.biggestLeakLabel || "No major leak";

  y = addTitle(pdf, "Executive Summary", y);

  const gap = 10;
  const cardWidth = (PAGE.width - PAGE.margin * 2 - gap * 3) / 4;

  addMetricCard(
    pdf,
    PAGE.margin,
    y,
    cardWidth,
    "Entries",
    formatInteger(entries),
  );
  addMetricCard(
    pdf,
    PAGE.margin + (cardWidth + gap),
    y,
    cardWidth,
    "Completions",
    formatInteger(completions),
  );
  addMetricCard(
    pdf,
    PAGE.margin + (cardWidth + gap) * 2,
    y,
    cardWidth,
    "Conversion",
    formatPercent(conversion),
  );
  addMetricCard(
    pdf,
    PAGE.margin + (cardWidth + gap) * 3,
    y,
    cardWidth,
    "Biggest Leak",
    leak,
  );

  return y + 72;
}

function addFunnelSummary(
  pdf: jsPDF,
  payload: DashboardPayload,
  activeGoalKey?: GoalKey,
  y = PAGE.margin,
): number {
  const goal = getSelectedGoal(payload, activeGoalKey);

  return addTable(
    pdf,
    "Funnel Progression",
    goal?.steps ?? [],
    [
      { label: "Step", width: 230, value: (row) => row.name },
      {
        label: "Count",
        width: 90,
        align: "right",
        value: (row) => formatInteger(row.count),
      },
      {
        label: "From Entry",
        width: 105,
        align: "right",
        value: (row) => formatPercent(row.conversionFromEntryPct),
      },
      {
        label: "Drop-Off",
        width: 86,
        align: "right",
        value: (row) => formatPercent(row.dropoffFromPreviousPct),
      },
    ],
    y,
    8,
    true,
  );
}

function addTrendSummary(
  pdf: jsPDF,
  payload: DashboardPayload,
  activeGoalKey: GoalKey | undefined,
  y: number,
): number {
  const trendRows = resolveGoalRecord(payload.conversionTrend, activeGoalKey);
  const totalEntries = trendRows.reduce((sum, row) => sum + row.entries, 0);
  const totalCompletions = trendRows.reduce(
    (sum, row) => sum + row.completions,
    0,
  );
  const avgRate =
    totalEntries > 0 ? (totalCompletions / totalEntries) * 100 : null;

  y = addTitle(pdf, "Conversion Trend Summary", y);
  y = addBodyText(
    pdf,
    `Entries: ${formatInteger(totalEntries)} · Completions: ${formatInteger(
      totalCompletions,
    )} · Average conversion: ${formatPercent(avgRate)}`,
    y,
  );

  return addTable(
    pdf,
    "Recent Trend Points",
    trendRows.slice(-8),
    [
      { label: "Date", width: 180, value: (row) => row.date },
      {
        label: "Entries",
        width: 100,
        align: "right",
        value: (row) => formatInteger(row.entries),
      },
      {
        label: "Completions",
        width: 120,
        align: "right",
        value: (row) => formatInteger(row.completions),
      },
      {
        label: "Rate",
        width: 111,
        align: "right",
        value: (row) => formatPercent(row.conversionRatePct),
      },
    ],
    y,
    8,
  );
}

function addGoalCompletionSummary(
  pdf: jsPDF,
  payload: DashboardPayload,
  y: number,
): number {
  const rows = payload.goalCompletionTrend ?? [];

  return addTable(
    pdf,
    "Goal Completion Trend",
    rows.slice(-8),
    [
      { label: "Date", width: 170, value: (row) => row.date },
      {
        label: "Forms",
        width: 110,
        align: "right",
        value: (row) => formatInteger(row.forms ?? 0),
      },
      {
        label: "Calls",
        width: 110,
        align: "right",
        value: (row) => formatInteger(row.calls ?? 0),
      },
      {
        label: "Bookings",
        width: 121,
        align: "right",
        value: (row) => formatInteger(row.bookings ?? 0),
      },
    ],
    y,
    8,
  );
}

function addTrafficContextSummary(
  pdf: jsPDF,
  payload: DashboardPayload,
  y: number,
): number {
  const rows = payload.trafficContext ?? [];
  if (!rows.length) return y;

  const totalPageViews = rows.reduce((sum, row) => sum + row.pageViews, 0);
  const peak = rows.reduce((currentPeak, row) =>
    row.pageViews > currentPeak.pageViews ? row : currentPeak,
  );

  y = addTitle(pdf, "Traffic Context", y);

  return addBodyText(
    pdf,
    `Total page views: ${formatInteger(
      totalPageViews,
    )} · Peak day: ${peak.date} with ${formatInteger(peak.pageViews)} views.`,
    y,
  );
}

function addNextActions(
  pdf: jsPDF,
  payload: DashboardPayload,
  y: number,
): number {
  const next = payload.nextActions;

  y = addTitle(pdf, "Insights & Next Actions", y);

  if (!next.autoDiagnosis && !next.topWinner && !next.underperformer && !next.nextStep && !next.manual) {
    return addBodyText(pdf, "No next actions are available for this report.", y);
  }

  if (next.autoDiagnosis) {
    y = addBodyText(
      pdf,
      `Diagnosis: ${next.autoDiagnosis.diagnosisType}. ${next.autoDiagnosis.reason} ${next.autoDiagnosis.recommendation}`,
      y,
    );
  }

  if (next.topWinner) y = addBodyText(pdf, `Top winner: ${next.topWinner}`, y);
  if (next.underperformer) {
    y = addBodyText(pdf, `Underperformer: ${next.underperformer}`, y);
  }
  if (next.nextStep) y = addBodyText(pdf, `Next step: ${next.nextStep}`, y);
  if (next.manual) y = addBodyText(pdf, `Manual note: ${next.manual}`, y);

  return y + 4;
}

function addFooter(pdf: jsPDF) {
  const pageCount = pdf.getNumberOfPages();

  for (let page = 1; page <= pageCount; page += 1) {
    pdf.setPage(page);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(COLOR.faint);
    pdf.text(
      `BTLS Dashboard Report · Page ${page} of ${pageCount}`,
      PAGE.margin,
      PAGE.height - 24,
    );
  }
}

export function buildDashboardPdf(input: BuildDashboardPdfInput): void {
  const { payload, activeGoalKey } = input;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
    compress: true,
  });

  let y = addHeader(pdf, input);
  y = addExecutiveSummary(pdf, payload, activeGoalKey, y);
  y = addDivider(pdf, y);
  y = addReportNotes(pdf, payload, y);
  y = addFunnelSummary(pdf, payload, activeGoalKey, y);
  y = addTrendSummary(pdf, payload, activeGoalKey, y);

  const pageRows = payload.pageViewBreakdown ?? [];
  y = addTable(
    pdf,
    "Page View Breakdown",
    [...pageRows].sort((a, b) => b.views - a.views),
    [
      { label: "Page", width: 315, value: (row) => row.pagePath },
      {
        label: "Views",
        width: 95,
        align: "right",
        value: (row) => formatInteger(row.views),
      },
      {
        label: "Share",
        width: 101,
        align: "right",
        value: (row) => formatPercent(row.sharePct ?? 0),
      },
    ],
    y,
    10,
    true,
  );

  const leadRows = resolveGoalRecord(
    payload.leadSourceConversion,
    activeGoalKey,
  );
  y = addTable(
    pdf,
    "Lead Source Conversion",
    [...leadRows].sort((a, b) => b.completions - a.completions),
    [
      { label: "Source", width: 255, value: (row) => row.sourceMedium },
      {
        label: "Entries",
        width: 82,
        align: "right",
        value: (row) => formatInteger(row.entries),
      },
      {
        label: "Done",
        width: 82,
        align: "right",
        value: (row) => formatInteger(row.completions),
      },
      {
        label: "Rate",
        width: 92,
        align: "right",
        value: (row) => formatPercent(row.conversionRatePct),
      },
    ],
    y,
    8,
    true,
  );

  const ctaRows = resolveGoalRecord(
    payload.ctaOutcomePerformance,
    activeGoalKey,
  );
  y = addTable(
    pdf,
    "CTA Outcome Performance",
    [...ctaRows].sort((a, b) => b.clicks - a.clicks),
    [
      { label: "CTA", width: 210, value: (row) => row.ctaLabel },
      { label: "Location", width: 170, value: (row) => row.ctaLocation },
      {
        label: "Clicks",
        width: 66,
        align: "right",
        value: (row) => formatInteger(row.clicks),
      },
      {
        label: "Rate",
        width: 65,
        align: "right",
        value: (row) =>
          row.conversionRatePct == null
            ? "—"
            : formatPercent(row.conversionRatePct),
      },
    ],
    y,
    8,
    true,
  );

  y = addTable(
    pdf,
    "Goal Health",
    payload.goalHealth,
    [
      { label: "Goal", width: 245, value: (row) => row.goalName },
      {
        label: "Entries",
        width: 82,
        align: "right",
        value: (row) => formatInteger(row.entryCount),
      },
      {
        label: "Done",
        width: 82,
        align: "right",
        value: (row) => formatInteger(row.completionCount),
      },
      {
        label: "Rate",
        width: 102,
        align: "right",
        value: (row) => formatPercent(row.conversionRatePct),
      },
    ],
    y,
    6,
    true,
  );

  y = addGoalCompletionSummary(pdf, payload, y);
  y = addTrafficContextSummary(pdf, payload, y);
  y = addNextActions(pdf, payload, y);

  addFooter(pdf);

  pdf.save(getFilename(input));
}