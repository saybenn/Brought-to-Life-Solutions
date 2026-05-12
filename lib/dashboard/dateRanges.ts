import type { DashboardRange, IsoDateString } from "@/lib/ga4/types";
import {
  getCurrentQuarterRange,
  getPreviousQuarterRange,
  getRollingRange,
} from "@/lib/dashboard/utils/dates";

export type DashboardRangeKey =
  | "7"
  | "30"
  | "90"
  | "current_quarter"
  | "previous_quarter";

export type ResolvedDashboardRange = {
  rangeKey: DashboardRangeKey;
  label: string;
  startDate: IsoDateString;
  endDate: IsoDateString;
  rangeDays?: DashboardRange;
};

export function normalizeDashboardRangeKey(
  value: string | number | null | undefined
): DashboardRangeKey {
  if (value === 7 || value === "7") return "7";
  if (value === 30 || value === "30") return "30";
  if (value === 90 || value === "90") return "90";
  if (value === "current_quarter") return "current_quarter";
  if (value === "previous_quarter") return "previous_quarter";
  return "30";
}

function resolveRollingRange(days: DashboardRange): ResolvedDashboardRange {
  const { startDate, endDate } = getRollingRange(days);

  return {
    rangeKey: String(days) as "7" | "30" | "90",
    label: `${days} Days`,
    startDate,
    endDate,
    rangeDays: days,
  };
}

function resolveCurrentQuarter(): ResolvedDashboardRange {
  const { startDate, endDate, quarterLabel } = getCurrentQuarterRange();

  return {
    rangeKey: "current_quarter",
    label: quarterLabel,
    startDate,
    endDate,
  };
}

function resolvePreviousQuarter(): ResolvedDashboardRange {
  const { startDate, endDate, quarterLabel } = getPreviousQuarterRange();

  return {
    rangeKey: "previous_quarter",
    label: quarterLabel,
    startDate,
    endDate,
  };
}

export function resolveDashboardRange(
  rangeKey: DashboardRangeKey
): ResolvedDashboardRange {
  if (rangeKey === "7") return resolveRollingRange(7);
  if (rangeKey === "30") return resolveRollingRange(30);
  if (rangeKey === "90") return resolveRollingRange(90);
  if (rangeKey === "current_quarter") return resolveCurrentQuarter();
  return resolvePreviousQuarter();
}

export function toQueryDateInput(resolved: ResolvedDashboardRange): {
  startDate: IsoDateString;
  endDate: IsoDateString;
} {
  return {
    startDate: resolved.startDate,
    endDate: resolved.endDate,
  };
}