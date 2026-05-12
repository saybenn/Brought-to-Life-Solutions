// pages/api/dashboard/test-ga4.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getGa4Client, getGa4PropertyId } from "@/lib/ga4/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = getGa4Client();
    const propertyId = getGa4PropertyId();

    // Minimal “does it work” query:
    // Count events for the last 7 days grouped by eventName
    const [report] = await client.runGa4Report({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      limit: 10,
    });

    res.status(200).json({
      ok: true,
      propertyId,
      rows: report.rows?.map((r) => ({
        eventName: r.dimensionValues?.[0]?.value,
        eventCount: r.metricValues?.[0]?.value,
      })) ?? [],
    });
  } catch (err: any) {
    res.status(500).json({
      ok: false,
      error: err?.message ?? "Unknown error",
    });
  }
}
