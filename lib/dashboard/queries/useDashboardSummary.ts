import { useEffect } from "react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type { DashboardRangeKey } from "@/lib/dashboard/dateRanges";
import { fetchDashboardSummary } from "@/lib/dashboard/api/fetchDashboardSummary";
import { dashboardKeys } from "@/lib/dashboard/queries/keys";

const ALL_RANGES: DashboardRangeKey[] = [
  "7",
  "30",
  "90",
  "current_quarter",
  "previous_quarter",
];

function getPrefetchTargets(activeRange: DashboardRangeKey): DashboardRangeKey[] {
  return ALL_RANGES.filter((range) => range !== activeRange);
}

export function useDashboardSummary(range: DashboardRangeKey) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: dashboardKeys.summaryByRange(range),
    queryFn: () => fetchDashboardSummary(range),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 1,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!query.data) return;

    const targets = getPrefetchTargets(range);

    for (const targetRange of targets) {
      queryClient.prefetchQuery({
        queryKey: dashboardKeys.summaryByRange(targetRange),
        queryFn: () => fetchDashboardSummary(targetRange),
        staleTime: 1000 * 60 * 5,
      });
    }
  }, [query.data, queryClient, range]);

  return query;
}