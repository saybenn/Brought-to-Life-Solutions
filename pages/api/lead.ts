// /pages/api/lead.ts
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Lightweight lead handler for Flow 3.
 * In production: send to your CRM / email (Resend) and return a redirect hint.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const body = req.body || {};
    const { slug, sku, tier, name, email, company, message } = body;

    // TODO: send to CRM / Email. For now, just log.
    console.log("LEAD", { slug, sku, tier, name, email, company, message });

    const qs = new URLSearchParams({
      slug: String(slug || ""),
      tier: String(tier || ""),
      name: String(name || ""),
      email: String(email || ""),
      company: String(company || ""),
    });
    return res.status(200).json({ next: `/lead/thanks?${qs.toString()}` });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
