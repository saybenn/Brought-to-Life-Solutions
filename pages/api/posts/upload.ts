import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getSiteConfig } from "@/lib/siteConfig/getSiteConfig";
import { canWrite } from "@/lib/siteConfig/permissions";
import { supabaseAdmin } from "@/lib/supabase/admin";

const BodySchema = z.object({
  dataUrl: z.string().min(10),
  filename: z.string().optional(),
});

function parseDataUrl(dataUrl: string): { contentType: string; buffer: Buffer } {
  const match = dataUrl.match(/^data:(.+);base64,(.*)$/);
  if (!match) throw new Error("Invalid dataUrl");
  const contentType = match[1];
  const base64 = match[2];
  const buffer = Buffer.from(base64, "base64");
  return { contentType, buffer };
}

function safeFilename(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || "image";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { siteId, role, config } = await getSiteConfig(req, res);

  if (config.modules.content?.enabled !== true) {
    return res.status(404).json({ ok: false, error: "Not found" });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }
  if (!canWrite(role)) return res.status(403).json({ ok: false, error: "Forbidden" });

  const parsed = BodySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: "Invalid payload" });

  try {
    const { contentType, buffer } = parseDataUrl(parsed.data.dataUrl);
    const filename = safeFilename(parsed.data.filename ?? "cover");

    const ext = filename.includes(".") ? filename.split(".").pop() : undefined;
    const finalName = ext ? filename : `${filename}.${contentType.split("/")[1] ?? "png"}`;

    const path = `${siteId}/covers/${Date.now()}-${finalName}`;

    const { error: upErr } = await supabaseAdmin.storage
      .from("blog")
      .upload(path, buffer, { contentType, upsert: true });

    if (upErr) return res.status(500).json({ ok: false, error: upErr.message });

    const { data } = supabaseAdmin.storage.from("blog").getPublicUrl(path);
    return res.status(200).json({ ok: true, publicUrl: data.publicUrl, path });
  } catch (e: any) {
    return res.status(400).json({ ok: false, error: e?.message ?? "Upload failed" });
  }
}