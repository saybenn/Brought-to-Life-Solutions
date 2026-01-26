import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  res.status(200).json({
    ok: true,
    hasStripeSecretKey: Boolean(secretKey && secretKey.startsWith("sk_")),
    hasWebhookSecret: Boolean(webhookSecret && webhookSecret.startsWith("whsec_")),
    siteUrl: siteUrl || null,
  });
}
