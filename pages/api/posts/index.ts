import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getSiteConfig } from "@/lib/siteConfig/getSiteConfig";
import { canWrite } from "@/lib/siteConfig/permissions";
import { supabaseServer } from "@/lib/supabase/server";
import { CreatePostSchema } from "@/lib/blog/validators";
import { ensureUniqueSlug, slugifyTitle } from "@/lib/blog/slug";

const ListQuerySchema = z.object({
  q: z.string().optional(),
  status: z.enum(["draft", "published", "all"]).optional(),
  category_id: z.string().uuid().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { siteId, role, config } = await getSiteConfig(req, res);

  if (config.modules.content?.enabled !== true) {
    return res.status(404).json({ ok: false, error: "Not found" });
  }

  const sb = supabaseServer(req, res);

  if (req.method === "GET") {
    const parsed = ListQuerySchema.safeParse(req.query);
    if (!parsed.success) return res.status(400).json({ ok: false, error: "Bad query" });

    const q = (parsed.data.q ?? "").trim();
    const status = parsed.data.status ?? "all";
    const categoryId = parsed.data.category_id;
    const limit = Math.min(Number(parsed.data.limit ?? 50), 200);
    const page = Math.max(Number(parsed.data.page ?? 1), 1);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = sb
      .from("posts")
      .select(
        `
        id, site_id, title, slug, excerpt, status, published_at, updated_at, cover_image_url, category_id, author_id,
        category:categories ( name, slug ),
        author:authors ( name, slug )
      `,
        { count: "exact" }
      )
      .eq("site_id", siteId)
      .order("updated_at", { ascending: false })
      .range(from, to);

    if (status !== "all") query = query.eq("status", status);
    if (categoryId) query = query.eq("category_id", categoryId);

    // Title + excerpt search only (locked)
    if (q) {
      const safe = q.replace(/%/g, "\\%").replace(/_/g, "\\_");
      query = query.or(`title.ilike.%${safe}%,excerpt.ilike.%${safe}%`);
    }

    const { data, error, count } = await query;
    if (error) return res.status(500).json({ ok: false, error: error.message });

    return res.status(200).json({
      ok: true,
      posts: data ?? [],
      pagination: { page, limit, total: count ?? 0 },
    });
  }

  if (req.method === "POST") {
    if (!canWrite(role)) return res.status(403).json({ ok: false, error: "Forbidden" });

    const parsed = CreatePostSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ ok: false, error: "Invalid payload" });

    const payload = parsed.data;

    const baseSlug = slugifyTitle(payload.title);
    const slug = await ensureUniqueSlug({ siteId, baseSlug, client: sb });

    const isPublishing = payload.status === "published";
    const published_at =
      isPublishing ? payload.published_at ?? new Date().toISOString() : null;

    const { data, error } = await sb
      .from("posts")
      .insert({
        site_id: siteId,
        title: payload.title,
        slug,
        content: payload.content,
        excerpt: payload.excerpt ?? null,
        status: payload.status ?? "draft",
        published_at,
        category_id: payload.category_id ?? null,
        author_id: payload.author_id ?? null,
        cover_image_url: payload.cover_image_url ?? null,
        cover_image_path: payload.cover_image_path ?? null,
        meta_title: payload.meta_title ?? null,
        meta_description: payload.meta_description ?? null,
        canonical_url: payload.canonical_url ?? null,
      })
      .select("id")
      .single();

    if (error) return res.status(500).json({ ok: false, error: error.message });
    return res.status(201).json({ ok: true, id: data.id, slug });
  }

  res.setHeader("Allow", "GET,POST");
  return res.status(405).json({ ok: false, error: "Method not allowed" });
}