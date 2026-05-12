import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sanitizePostHtml } from "@/lib/blog/sanitize";
import { rateLimit } from "@/lib/rateLimit";

const ParamsSchema = z.object({ slug: z.string().min(1) });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const rl = rateLimit({ req, res, keyPrefix: "public-blog-post", limit: 240, windowMs: 60_000 });
  if (!rl.ok) return res.status(429).json({ ok: false, error: "Too many requests" });

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const siteId = process.env.DEFAULT_SITE_ID;
  if (!siteId) return res.status(500).json({ ok: false, error: "DEFAULT_SITE_ID missing" });

  const parsed = ParamsSchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ ok: false, error: "Bad slug" });

  const slug = parsed.data.slug;

  const { data, error } = await supabaseAdmin
    .from("posts")
    .select(
      `
      title, slug, content, excerpt, cover_image_url, published_at,
      meta_title, meta_description, canonical_url, author_id,
      category:categories ( name, slug ), author:authors ( name, slug )
    `
    )
    .eq("site_id", siteId)
    .eq("status", "published")
    .eq("slug", slug)
    .limit(1)
    .single();

  if (error) return res.status(404).json({ ok: false, error: "Not found" });

  const safeContent = sanitizePostHtml(data.content ?? "");

  return res.status(200).json({
    ok: true,
    post: {
      ...data,
      content: safeContent,
    },
  });
}