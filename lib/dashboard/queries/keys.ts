import type { DashboardRangeKey } from "@/lib/dashboard/dateRanges";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  summary: () => [...dashboardKeys.all, "summary"] as const,
  summaryByRange: (range: DashboardRangeKey) =>
    [...dashboardKeys.summary(), range] as const,
};