import type { NextApiRequest, NextApiResponse } from "next";
import { getSiteConfig } from "@/lib/siteConfig/getSiteConfig";
import { supabaseServer } from "@/lib/supabase/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { siteId, config } = await getSiteConfig(req, res);

  if (config.modules.content?.enabled !== true) {
    return res.status(404).json({ ok: false, error: "Not found" });
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const sb = supabaseServer(req, res);
  const { data, error } = await sb
    .from("categories")
    .select("id, site_id, name, slug, sort_order, created_at, updated_at")
    .eq("site_id", siteId)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) return res.status(500).json({ ok: false, error: error.message });
  return res.status(200).json({ ok: true, categories: data ?? [] });
}