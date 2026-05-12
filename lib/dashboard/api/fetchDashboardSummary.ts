import type { DashboardPayload } from "@/lib/dashboard/payload";
import type { DashboardRangeKey } from "@/lib/dashboard/dateRanges";

export async function fetchDashboardSummary(
  range: DashboardRangeKey,
): Promise<DashboardPayload> {
  const response = await fetch(`/api/dashboard/summary?rangeKey=${range}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let message = "Failed to fetch dashboard summary.";

    try {
      const body = await response.json();
      if (typeof body?.details === "string" && body.details.trim()) {
        message = body.details;
      } else if (typeof body?.error === "string" && body.error.trim()) {
        message = body.error;
      }
    } catch {
      // noop
    }

    throw new Error(message);
  }

  return response.json();
}