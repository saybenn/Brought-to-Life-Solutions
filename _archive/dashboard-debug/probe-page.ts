import type { NextApiRequest, NextApiResponse } from "next";
import { probePageDimension } from "@/lib/ga4/queries/probePageDimension";
import { rangeFromPreset } from "@/lib/ga4/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // hardcode 7 days for testing
    const range = rangeFromPreset("7");

    // THIS is where pagePath is used
    const data = await probePageDimension(range, "pageLocation");

    res.status(200).json({
      ok: true,
      dimensionTested: "pageLocation",
      rows: data,
    });
  } catch (err: any) {
    res.status(500).json({
      ok: false,
      error: err?.message ?? "Unknown error",
    });
  }
}
