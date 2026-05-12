// lib/ga4/range.ts
import type { DashboardRange } from "./types";

export function toGa4DateRange(range: DashboardRange) {
  return {
    startDate: `${range}daysAgo`,
    endDate: "today",
  };
}