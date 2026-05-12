import type { SupabaseClient } from "@supabase/supabase-js";

export function slugifyTitle(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function ensureUniqueSlug(opts: {
  siteId: string;
  baseSlug: string;
  client: SupabaseClient;
  maxTries?: number;
}): Promise<string> {
  const { siteId, client } = opts;
  const base = opts.baseSlug || "post";
  const maxTries = opts.maxTries ?? 25;

  for (let i = 0; i < maxTries; i++) {
    const candidate = i === 0 ? base : `${base}-${i + 1}`;
    const { data, error } = await client
      .from("posts")
      .select("id")
      .eq("site_id", siteId)
      .eq("slug", candidate)
      .limit(1);

    if (error) throw error;
    if (!data || data.length === 0) return candidate;
  }

  // extremely unlikely unless tons of duplicates
  return `${base}-${Date.now()}`;
}