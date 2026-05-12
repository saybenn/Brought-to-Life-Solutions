import type { NextApiRequest, NextApiResponse } from "next";
import { getGa4Client } from "@/lib/ga4/client"; // whatever you named it
import { EVENT } from "@/lib/ga4/constants";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = getGa4Client();
    const propertyId = process.env.GA4_PROPERTY_ID!;
    const property = `properties/${propertyId}`;

    const [report] = await client.runRealtimeReport({
      property,
      dimensions: [
        { name: "eventName" },
        { name: "customEvent:label" },
        { name: "customEvent:location" },
        { name: "customEvent:intent" },
      ],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          stringFilter: { matchType: "EXACT", value: EVENT.CTA_CLICK }, // "click cta"
        },
      },
      limit: 50,
    });

    const rows =
      report.rows?.map((r) => ({
        eventName: r.dimensionValues?.[0]?.value ?? "",
        label: r.dimensionValues?.[1]?.value ?? "(not set)",
        location: r.dimensionValues?.[2]?.value ?? "(not set)",
        intent: r.dimensionValues?.[3]?.value ?? "(not set)",
        count: Number(r.metricValues?.[0]?.value ?? 0),
      })) ?? [];

    return res.status(200).json({ ok: true, rows });
  } catch (err: any) {
    return res.status(500).json({
      ok: false,
      error: err?.message ?? "Unknown error",
      code: err?.code,
      details: err?.details,
    });
  }
}
