import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import { getSiteConfig } from "@/lib/siteConfig/getSiteConfig";
import type { SiteConfig } from "@/lib/siteConfig/schema";

function isModuleEnabled(config: SiteConfig) {
  return config.modules?.customer_management?.enabled === true;
}

// NOTE: include owner if your permission model includes it
function canWrite(role: string) {
  const r = String(role ?? "").toLowerCase();
  return r === "editor" || r === "admin" || r === "owner";
}

function asString(v: unknown) {
  return typeof v === "string" ? v : "";
}

function clamp(s: string, max: number) {
  const t = s.trim();
  return t.length > max ? t.slice(0, max) : t;
}

function parseTags(raw: unknown): string[] | undefined {
  // For PATCH:
  // - undefined => "not provided" (do not change)
  // - null => explicit clear
  if (raw === undefined) return undefined;
  if (raw === null) return [];

  if (!Array.isArray(raw)) return [];

  // Normalize + caps
  const out: string[] = [];
  for (const x of raw) {
    if (typeof x !== "string") continue;
    const t = x.trim();
    if (!t) continue;
    const clipped = t.length > 32 ? t.slice(0, 32) : t;
    if (!out.includes(clipped)) out.push(clipped);
    if (out.length >= 25) break;
  }
  return out;
}

function isUuid(s: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    s
  );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = supabaseServer(req, res);

  try {
    const { siteId, role, config } = await getSiteConfig(req, res);

    // Module gate
    if (!isModuleEnabled(config)) {
      return res.status(404).json({ ok: false, error: "Module disabled" });
    }

    const idRaw = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    const id = asString(idRaw);

    if (!id || !isUuid(id)) {
      return res.status(400).json({ ok: false, error: "Invalid id" });
    }

    if (req.method === "PATCH") {
      if (!canWrite(role)) {
        return res.status(403).json({ ok: false, error: "Forbidden" });
      }

      const body = req.body ?? {};

      // Allowlist patch fields only
      const name =
        body.name !== undefined ? clamp(asString(body.name), 120) : undefined;
      const email =
        body.email !== undefined ? clamp(asString(body.email), 160) : undefined;
      const phone =
        body.phone !== undefined ? clamp(asString(body.phone), 40) : undefined;
      const notes =
        body.notes !== undefined ? clamp(asString(body.notes), 4000) : undefined;

      const tagsArr = parseTags((body as any).tags);

      const patch: Record<string, any> = {};

      // Keep name required semantics if you want; otherwise allow null/empty
      if (name !== undefined) patch.name = name || null;
      if (email !== undefined) patch.email = email || null;
      if (phone !== undefined) patch.phone = phone || null;
      if (notes !== undefined) patch.notes = notes || null;

      // IMPORTANT: tags is text[] in DB — store arrays, never comma strings, never null
      if (tagsArr !== undefined) patch.tags = tagsArr;

      if (Object.keys(patch).length === 0) {
        return res.status(400).json({ ok: false, error: "No fields to update" });
      }

      const { data, error } = await supabase
        .from("customers")
        .update(patch)
        .eq("id", id)
        .eq("site_id", siteId) // critical tenant gate
        .select("id, site_id, name, email, phone, notes, tags, created_at, updated_at")
        .single();

      if (error) throw error;

      return res.status(200).json({ ok: true, customer: data });
    }

    if (req.method === "DELETE") {
      if (!canWrite(role)) {
        return res.status(403).json({ ok: false, error: "Forbidden" });
      }

      const { error } = await supabase
        .from("customers")
        .delete()
        .eq("id", id)
        .eq("site_id", siteId);

      if (error) throw error;

      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (err: any) {
    const status =
      err?.message === "Unauthorized" || err?.code === "401" ? 401 : 500;

    return res.status(status).json({
      ok: false,
      error: err?.message ?? "Unknown error",
      details: err?.details,
      code: err?.code,
    });
  }
}
