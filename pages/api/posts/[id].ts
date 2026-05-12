import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getSiteConfig } from "@/lib/siteConfig/getSiteConfig";
import { canWrite } from "@/lib/siteConfig/permissions";
import { supabaseServer } from "@/lib/supabase/server";
import { UpdatePostSchema } from "@/lib/blog/validators";

const IdSchema = z.object({ id: z.string().uuid() });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { siteId, role, config } = await getSiteConfig(req, res);

  if (config.modules.content?.enabled !== true) {
    return res.status(404).json({ ok: false, error: "Not found" });
  }

  const idParsed = IdSchema.safeParse(req.query);
  if (!idParsed.success) return res.status(400).json({ ok: false, error: "Bad id" });
  const postId = idParsed.data.id;

  const sb = supabaseServer(req, res);

  if (req.method === "GET") {
    const { data, error } = await sb
      .from("posts")
      .select(
        `
        id, site_id, title, slug, content, excerpt, status, published_at, updated_at,
        category_id, author_id, cover_image_url, cover_image_path,
        meta_title, meta_description, canonical_url
      `
      )
      .eq("site_id", siteId)
      .eq("id", postId)
      .single();

    if (error) return res.status(404).json({ ok: false, error: "Not found" });
    return res.status(200).json({ ok: true, post: data });
  }

  if (req.method === "PATCH") {
    if (!canWrite(role)) return res.status(403).json({ ok: false, error: "Forbidden" });

    const parsed = UpdatePostSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ ok: false, error: "Invalid payload" });

    const body = parsed.data;

    const update: Record<string, any> = {};
    const allow: (keyof typeof body)[] = [
      "title",
      "content",
      "excerpt",
      "status",
      "author_id",
      "published_at",
      "category_id",
      "cover_image_url",
      "cover_image_path",
      "meta_title",
      "meta_description",
      "canonical_url",
    ];

    for (const key of allow) {
      if (key in body) update[key] = (body as any)[key] ?? null;
    }

    if (update.status === "published" && !("published_at" in update)) {
      update.published_at = new Date().toISOString();
    }

    const { error } = await sb
      .from("posts")
      .update(update)
      .eq("site_id", siteId)
      .eq("id", postId);

    if (error) return res.status(500).json({ ok: false, error: error.message });
    return res.status(200).json({ ok: true });
  }

  if (req.method === "DELETE") {
    if (!canWrite(role)) return res.status(403).json({ ok: false, error: "Forbidden" });

    const { error } = await sb.from("posts").delete().eq("site_id", siteId).eq("id", postId);
    if (error) return res.status(500).json({ ok: false, error: error.message });
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", "GET,PATCH,DELETE");
  return res.status(405).json({ ok: false, error: "Method not allowed" });
}