// /pages/api/admin/create-final-invoice.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
import { getOrder } from "@/lib/ordersTemp";

/**
 * Admin-only: create & send hosted invoice for the final 50%.
 * Body: { orderId: string, daysUntilDue?: number }
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { orderId, daysUntilDue = 7 } = req.body || {};
  const order = getOrder(String(orderId || ""));
  if (!order) return res.status(400).json({ error: "Unknown order" });
  if (!order.customerId) return res.status(400).json({ error: "Missing customer on order (did webhook run?)" });
  if (!order.remainderPriceId) return res.status(400).json({ error: "No remainder price configured" });

  try {
    // 1) Retrieve the remainder Price so we can construct price_data (works across API versions)
    const price = await stripe.prices.retrieve(order.remainderPriceId);

    if (!price.unit_amount || !price.currency) {
      return res.status(400).json({ error: "Remainder Price must have unit_amount and currency." });
    }

    // 2) Create the invoice item using price_data (NOT `price:`) to satisfy newer Stripe typings
    await stripe.invoiceItems.create({
      customer: order.customerId,
      quantity: order.quantity || 1,
      price_data: {
        currency: price.currency,
        unit_amount: price.unit_amount,
        // price.product can be string or object; normalize to string id
        product: typeof price.product === "string" ? price.product : price.product.id,
      },
      metadata: {
        initial_order_id: order.id,
        project_slug: order.slug || "",
        type: "final_50",
      },
    });

    // 3) Create the invoice and send it
    const invoice = await stripe.invoices.create({
      customer: order.customerId,
      collection_method: "send_invoice",
      days_until_due: Number(daysUntilDue),
      metadata: {
        initial_order_id: order.id,
        project_slug: order.slug || "",
      },
    });

    const sent = await stripe.invoices.sendInvoice(invoice.id);

    return res.status(200).json({
      invoiceId: sent.id,
      hosted_invoice_url: sent.hosted_invoice_url,
      status: sent.status,
    });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
