// /pages/api/intake/submit.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getOrder, setIntakeSubmitted } from "@/lib/ordersTemp";
import { PRODUCTS } from "@/lib/catalog/data";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const body = req.body || {};
    const { orderId, slug, name, email, company } = body;

    if (!orderId || !slug) return res.status(400).json({ error: "Missing orderId or slug" });

    const order = getOrder(String(orderId));
    const product = PRODUCTS.find(p => p.slug === String(slug));
    if (!product) return res.status(400).json({ error: "Unknown product" });
    if (!order) return res.status(400).json({ error: "Order not found; make sure you paid first." });

    setIntakeSubmitted(order.id, {
      name, email: email || order.email, company, ...body,
    });

    const needsBooking = Boolean(product.calendlySlug && !order.meetingCompleted);
    if (needsBooking) {
      const qs = new URLSearchParams({
        name: String(name || ""),
        email: String(email || order.email || ""),
        company: String(company || ""),
        utm_slug: product.slug,
        utm_sku: product.id,
        utm_tier: String(order.tier || ""),
      });
      return res.status(200).json({ next: `/book/${product.slug}?${qs.toString()}` });
    }

    return res.status(200).json({ next: `/thanks?order=${order.id}` });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
