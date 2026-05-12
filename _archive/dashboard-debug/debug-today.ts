import type { NextApiRequest, NextApiResponse } from "next";
import { rangeFromPreset } from "@/lib/ga4/types";
import { queryCtaPerformance } from "@/lib/ga4/queries/ctaPerformance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await queryCtaPerformance(rangeFromPreset("7"));
    res.status(200).json({ ok: true, data });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err?.message ?? "Unknown error" });
  }
}
