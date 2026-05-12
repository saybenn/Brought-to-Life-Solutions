import type { NextApiRequest, NextApiResponse } from "next";
import { runGa4Report } from "@/lib/ga4/queryBase";
import { rangeFromPreset } from "@/lib/ga4/types";
import { EVENT } from "@/lib/ga4/constants";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const range = rangeFromPreset("30");
    const report = await runGa4Report({
      range,
      dimensions: ["customEvent:label", "customEvent:location"],
      metrics: ["eventCount"],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          stringFilter: { matchType: "EXACT", value: EVENT.CTA_CLICK },
        },
      },
      limit: 10000,
    });

    const rows = (report.rows ?? []).map((r) => ({
      label: r.dimensionValues?.[0]?.value ?? "(not set)",
      location: r.dimensionValues?.[1]?.value ?? "(not set)",
      count: Number(r.metricValues?.[0]?.value ?? 0),
    }));

    const total = rows.reduce((sum, r) => sum + r.count, 0);
    const notSet = rows
      .filter((r) => r.label === "(not set)" || r.location === "(not set)")
      .reduce((sum, r) => sum + r.count, 0);

    res.status(200).json({
      ok: true,
      totalClickCtaEvents: total,
      missingParamEvents: notSet,
      missingParamPct: total ? Math.round((notSet / total) * 100) : 0,
      topRows: rows.slice(0, 20),
    });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err?.message ?? "Unknown error" });
  }
}
