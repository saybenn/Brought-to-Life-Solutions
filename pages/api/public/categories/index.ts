import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rateLimit";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const rl = rateLimit({
    req,
    res,
    keyPrefix: "public-categories",
    limit: 120,
    windowMs: 60_000,
  });
  if (!rl.ok) return res.status(429).json({ ok: false, error: "Too many requests" });

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const siteId = process.env.DEFAULT_SITE_ID;
  if (!siteId) return res.status(500).json({ ok: false, error: "DEFAULT_SITE_ID missing" });

  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("id, name, slug, sort_order")
    .eq("site_id", siteId)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true })
    .limit(500);

  if (error) return res.status(500).json({ ok: false, error: error.message });
  return res.status(200).json({ ok: true, categories: data ?? [] });
}