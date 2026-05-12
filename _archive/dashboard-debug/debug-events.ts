import type { NextApiRequest, NextApiResponse } from "next";
import { getGa4Client, getGa4PropertyId } from "@/lib/ga4/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = getGa4Client();
    const propertyId = getGa4PropertyId();

    const [report] = await client.runGa4Report({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      limit: 50,
    });

    res.status(200).json({
      ok: true,
      propertyId,
      events: (report.rows ?? []).map((r) => ({
        eventName: r.dimensionValues?.[0]?.value,
        eventCount: r.metricValues?.[0]?.value,
      })),
    });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err?.message ?? "Unknown error" });
  }
}
