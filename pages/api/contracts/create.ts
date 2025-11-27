// /pages/api/contracts/create.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getOrder } from "@/lib/ordersTemp";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orderId = String(req.query.order || "");
  const order = orderId ? getOrder(orderId) : null;
  if (!order) return res.status(400).json({ error: "Unknown order" });

  // TODO: replace with Dropbox Sign / DocuSign API to create embedded signing URL
  const signUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/legal/sow/${order.slug}?order=${encodeURIComponent(orderId)}&sign=demo`;

  // For now, redirect user to the “sign” page
  res.redirect(302, signUrl);
}
