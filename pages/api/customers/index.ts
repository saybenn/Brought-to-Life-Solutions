// pages/api/customers/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import { getSiteConfig } from "@/lib/siteConfig/getSiteConfig";
import type { SiteConfig } from "@/lib/siteConfig/schema";

/**
 * DEBUG SWITCH
 * - Set to false after you finish diagnosing.
 * - This will expose Supabase/Postgres error details to the client.
 */
const DEBUG = true;

function isModuleEnabled(config: SiteConfig) {
  return config.modules?.customer_management?.enabled === true;
}

// NOTE: if you updated your shared permissions to include owner, mirror it here too.
// Better: import canWrite() from /lib/siteConfig/permissions instead of redefining.
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

function parseTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((x) => (typeof x === "string" ? x.trim() : ""))
    .filter(Boolean)
    .slice(0, 25)
    .map((t) => (t.length > 32 ? t.slice(0, 32) : t));
}

// Safe to return in JSON
function serializeSupabaseError(err: any) {
  if (!err) return undefined;
  return {
    message: err.message,
    code: err.code,
    details: err.details,
    hint: err.hint,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = supabaseServer(req, res);

  // Lightweight request id for correlating server logs with client
  const reqId =
    typeof req.headers["x-request-id"] === "string"
      ? req.headers["x-request-id"]
      : Math.random().toString(36).slice(2);

  try {
    const { siteId, role, config } = await getSiteConfig(req, res);

    if (DEBUG) {
      console.log("[customers/index] ctx", {
        reqId,
        method: req.method,
        siteId,
        role,
        moduleEnabled: isModuleEnabled(config),
      });
    }

    // Module gate
    if (!isModuleEnabled(config)) {
      return res.status(404).json({ ok: false, error: "Module disabled" });
    }

    if (req.method === "GET") {
      const q = clamp(asString(req.query.q), 120);

      let query = supabase
        .from("customers")
        .select(
          "id, site_id, name, email, phone, notes, tags, created_at, updated_at"
        )
        .eq("site_id", siteId)
        .order("updated_at", { ascending: false })
        .limit(200);

      if (q) {
        const esc = q.replaceAll('"', '\\"');
        query = query.or(
          `name.ilike."%${esc}%",email.ilike."%${esc}%",phone.ilike."%${esc}%",notes.ilike."%${esc}%"`
        );
      }

      const { data, error } = await query;

      if (error) {
        if (DEBUG) {
          console.error("[customers/index] GET error", {
            reqId,
            supabaseError: serializeSupabaseError(error),
          });
        }
        return res.status(500).json({
          ok: false,
          error: "Failed to load customers",
          ...(DEBUG ? { debug: serializeSupabaseError(error) } : {}),
        });
      }

      return res.status(200).json({ ok: true, customers: data ?? [] });
    }

    if (req.method === "POST") {
      const writable = canWrite(role);

      if (DEBUG) {
        console.log("[customers/index] POST writable", { reqId, role, writable });
      }

      if (!writable) {
        return res.status(403).json({
          ok: false,
          error: "Forbidden",
          ...(DEBUG ? { debug: { reqId, role, writable } } : {}),
        });
      }

      const body = req.body ?? {};

      const name = clamp(asString(body.name), 120);
      const email = clamp(asString(body.email), 160);
      const phone = clamp(asString(body.phone), 40);
      const notes = clamp(asString(body.notes), 4000);
      const tags = parseTags(body.tags);

      if (!name) {
        return res.status(400).json({ ok: false, error: "name is required" });
      }

      const insertPayload = {
        site_id: siteId, // never trust client
        name,
        email: email || null,
        phone: phone || null,
        notes: notes || null,
        tags: tags,
      };

      if (DEBUG) {
        console.log("[customers/index] POST payload", {
          reqId,
          siteId,
          role,
          // Avoid logging notes content; show length only
          payload: { ...insertPayload, notes: `len:${(insertPayload.notes ?? "").length}` },
        });
      }

      const { data, error } = await supabase
        .from("customers")
        .insert(insertPayload)
        .select(
          "id, site_id, name, email, phone, notes, tags, created_at, updated_at"
        )
        .single();

      if (error) {
        /**
         * This is the money shot.
         * If this is RLS, you’ll usually see something like:
         * - message: "new row violates row-level security policy for table customers"
         *
         * If this is privileges/GRANT, you’ll see:
         * - message: "permission denied for table customers"
         *
         * If this is type mismatch, you’ll see:
         * - code + details indicating operator/type issues
         */
        if (DEBUG) {
          console.error("[customers/index] POST insert error", {
            reqId,
            supabaseError: serializeSupabaseError(error),
            ctx: { siteId, role },
          });
        }

        // Most "RLS denies" surface as 403-ish; Supabase often returns 403 for policy failures.
        // Return 403 + debug so you can see what it actually is.
        return res.status(403).json({
          ok: false,
          error: "Insert failed",
          ...(DEBUG ? { debug: serializeSupabaseError(error), reqId } : {}),
        });
      }

      return res.status(200).json({ ok: true, customer: data });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (err: any) {
    const status =
      err?.message === "Unauthorized" || err?.code === "401" ? 401 : 500;

    if (DEBUG) {
      console.error("[customers/index] handler exception", {
        reqId,
        status,
        message: err?.message,
        code: err?.code,
        details: err?.details,
      });
    }

    return res.status(status).json({
      ok: false,
      error: err?.message ?? "Unknown error",
      details: err?.details,
      code: err?.code,
      ...(DEBUG ? { reqId } : {}),
    });
  }
}
