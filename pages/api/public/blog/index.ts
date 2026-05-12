import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rateLimit";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const rl = rateLimit({ req, res, keyPrefix: "public-blog-list", limit: 120, windowMs: 60_000 });
  if (!rl.ok) return res.status(429).json({ ok: false, error: "Too many requests" });

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const siteId = process.env.DEFAULT_SITE_ID;
  if (!siteId) return res.status(500).json({ ok: false, error: "DEFAULT_SITE_ID missing" });

  const { data, error } = await supabaseAdmin
    .from("posts")
    .select(
      `
      title, slug, excerpt, cover_image_url, published_at,
      category:categories ( name, slug ), author:authors ( name, slug )
    `
    )
    .eq("site_id", siteId)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(200);

  if (error) return res.status(500).json({ ok: false, error: error.message });

  return res.status(200).json({ ok: true, posts: data ?? [] });
}