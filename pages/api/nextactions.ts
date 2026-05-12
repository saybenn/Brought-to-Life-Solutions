import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import { getSiteConfig } from "@/lib/siteConfig/getSiteConfig";

const MAX_LEN = 200;

function cleanOptionalString(v: unknown, field: string): string | undefined {
  if (v == null) return undefined;
  if (typeof v !== "string") {
    throw new Error(`${field} must be a string`);
  }
  const s = v.trim();
  if (!s) return undefined;
  if (s.length > MAX_LEN) {
    throw new Error(`${field} must be <= ${MAX_LEN} characters`);
  }
  return s;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    // 1) Derive site from cookie membership (no trusting client payload)
    const { siteId /*, role */ } = await getSiteConfig(req, res);

    // If later you want to restrict writes:
    // if (role === "viewer") return res.status(403).json({ ok:false, error:"Forbidden" });

    // 2) Validate body (only allow these 3 fields)
    const body = req.body ?? {};
    if (typeof body !== "object") {
      return res.status(400).json({ ok: false, error: "Invalid JSON body" });
    }

    const topWinner = cleanOptionalString((body as any).topWinner, "topWinner");
    const underperformer = cleanOptionalString(
      (body as any).underperformer,
      "underperformer"
    );
    const nextStep = cleanOptionalString((body as any).nextStep, "nextStep");

    const safeNextActions = { topWinner, underperformer, nextStep };

    // 3) Read existing config_json (so we only change nextActions)
    const supabase = supabaseServer(req, res);

    const { data: existing, error: readErr } = await supabase
      .from("site_config")
      .select("config_json")
      .eq("site_id", siteId)
      .single();

    if (readErr) {
      return res.status(403).json({ ok: false, error: "Access denied" });
    }

    const existingJson = (existing?.config_json ?? {}) as Record<string, any>;

    // 4) Update ONLY config_json.nextActions
    const updatedConfig = {
      ...existingJson,
      nextActions: safeNextActions,
    };

    const { error: updateErr } = await supabase
      .from("site_config")
      .update({ config_json: updatedConfig })
      .eq("site_id", siteId);

    if (updateErr) {
      return res.status(403).json({ ok: false, error: "Update denied" });
    }

    return res.status(200).json({ ok: true, nextActions: safeNextActions });
  } catch (err: any) {
    // Validation errors land here too
    return res.status(400).json({
      ok: false,
      error: err?.message ?? "Bad request",
    });
  }
}
