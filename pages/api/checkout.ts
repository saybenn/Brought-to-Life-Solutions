// /pages/api/checkout.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
import { PRODUCTS } from "@/lib/catalog/data";
import { putOrder } from "@/lib/ordersTemp";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const {
      slug,
      quantity = 1,
      customerEmail,
      // OPTIONAL selectors (from UI):
      priceId,               // explicit Stripe Price ID (tier.deposit)
      tierKey,               // if you want to log which tier
      totalAmountCents,      // if you want dynamic 50%: pass the full amount in cents
      agreement,             // { version, url, timestamp }
    } = req.body || {};

    const product = (slug && PRODUCTS.find((p) => p.slug === slug)) || null;
    if (!product) return res.status(400).json({ error: "Unknown product" });

    const origin = process.env.NEXT_PUBLIC_SITE_URL!;
    const isRecurring = product.pricing.model === "recurring";
    const mode: "payment" | "subscription" = isRecurring ? "subscription" : "payment";

    // Assemble line_items
    let line_items: any[] = [];

    if (isRecurring) {
      // Subscriptions must use a saved recurring price
      if (!product.stripePriceId) {
        return res.status(400).json({ error: "Missing subscription priceId" });
      }
      line_items = [{ price: product.stripePriceId, quantity }];
    } else {
      // One-time: deposit (50%)
      if (priceId) {
        // Use a saved deposit price from the selected tier
 line_items.push({
          price: priceId,
          quantity,
        });      } else if (typeof totalAmountCents === "number" && totalAmountCents > 0){
        // Compute a 50% deposit dynamically
         const depositCents = Math.round(totalAmountCents / 2);
        if (depositCents <= 0) {
          return res
            .status(400)
            .json({ error: "Deposit amount is invalid (<= 0)" });
        }
        
        const tierLabel =
          tierKey &&
          product.pricing.tiers?.find((t: any) => t.key === tierKey)?.label;
       line_items.push({
          price_data: {
            currency: "usd",
            unit_amount: depositCents,
            product_data: {
              name: `${product.title}${
                tierLabel ? ` — ${tierLabel}` : ""
              } (50% deposit)`,
            },
          },
          quantity,
        });
      } else if ((product as any).stripeDepositPriceId) {
        // Legacy: product-level deposit price (if you kept it)
        line_items = [{ price: (product as any).stripeDepositPriceId, quantity }];
      } else {
        return res.status(400).json({ error: "Missing price selection for deposit" });
      }
    }

    const session = await stripe.checkout.sessions.create({
       mode,
  line_items:line_items,
  success_url: `${origin}/intake/${slug}?order={CHECKOUT_SESSION_ID}`,
  cancel_url: `${origin}/product/${slug}`,
  customer_creation: "always",
  customer_email: customerEmail,
  allow_promotion_codes: true,
  metadata: {
    slug, sku: product.id, tier: tierKey || "",
    msa_version: agreement?.version || "v1",
    sow_version: agreement?.sowVersion || "v1",
  },
    });

    // temp order memory (dev-only)
    putOrder({
      id: session.id,
      slug,
      mode,
            sku: product.id,
      tier: tierKey,
           meetingCompleted: false,
      intakeSubmitted: false,
      status: "created",
      email: customerEmail,
      quantity,
      // If you used a saved Price for deposit, store it; if dynamic, leave undefined
      depositPriceId: !isRecurring ? (priceId || (product as any).stripeDepositPriceId) : undefined,
      remainderPriceId: !isRecurring ? (findRemainderPriceId(product, tierKey) || (product as any).stripeRemainderPriceId) : undefined,
      agreement: agreement
        ? {
            version: agreement.version,
            url: agreement.url,
            timestamp: agreement.timestamp,
            ip: req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress || "",
            ua: req.headers["user-agent"] || "",
          }
        : undefined,
      createdAt: Date.now(),
    });

    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}

// helper to look up a tier's remainder price (if you saved them)
function findRemainderPriceId(product: any, tierKey?: string) {
  const tiers = product?.pricing?.tiers || [];
  const tier = tiers.find((t: any) => t.key === tierKey);
  return tier?.stripeRemainderPriceId;
}
