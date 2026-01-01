import type { NextApiRequest, NextApiResponse } from "next";

type Payload = {
  path: "routing" | "support" | "general";
  fullName: string;
  email: string;
  businessName: string;
  role?: string;
  website?: string;
  goal?: string;
  revenueRange?: string;
  urgency?: string;
  referral?: string;
  message?: string;
};

async function postToZapier(payload: Payload) {
  const url = process.env.ZAPIER_WEBHOOK_URL;
  if (!url) return;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const payload = req.body as Payload;

  // Minimal sanity checks (client validates too)
  if (!payload?.fullName || !payload?.email || !payload?.businessName) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  // MVP: log + optional Zapier webhook
  console.log("[BTLS CONTACT]", payload);

  try {
    await postToZapier(payload);
  } catch (e) {
    // Don’t fail the user if automation fails
    console.warn("[BTLS CONTACT] Zapier webhook failed");
  }

  return res.status(200).json({ ok: true });
}
