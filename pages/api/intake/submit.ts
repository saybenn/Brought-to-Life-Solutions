// /pages/api/intake/submit.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { getOrder, setIntakeSubmitted } from "@/lib/ordersTemp";
import { OFFER_DETAILS } from "@/lib/catalog/offerDetails";

type IntakeSubmitResponse =
  | {
      next: string;
    }
  | {
      error: string;
    };

function getString(value: unknown): string {
  return typeof value === "string" ? value : String(value ?? "");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IntakeSubmitResponse>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body || {};
    const { orderId, slug, name, email, company } = body;

    if (!orderId || !slug) {
      return res.status(400).json({ error: "Missing orderId or slug" });
    }

    const order = getOrder(String(orderId));

    const offer = Object.values(OFFER_DETAILS).find(
      (offerDetail) => offerDetail.slug === String(slug),
    );

    if (!offer) {
      return res.status(400).json({ error: "Unknown offer" });
    }

    if (!order) {
      return res
        .status(400)
        .json({ error: "Order not found; make sure you paid first." });
    }

    setIntakeSubmitted(order.id, {
      name,
      email: email || order.email,
      company,
      ...body,
    });

    const needsBooking = Boolean(
      offer.calendlySlug && !order.meetingCompleted,
    );

    if (needsBooking) {
      const qs = new URLSearchParams({
        name: getString(name),
        email: getString(email || order.email),
        company: getString(company),
        utm_slug: getString(offer.slug),
        utm_sku: getString(offer.id),
        utm_tier: getString(order.tier),
      });

      return res
        .status(200)
        .json({ next: `/book/${offer.slug}?${qs.toString()}` });
    }

    return res.status(200).json({ next: `/thanks?order=${order.id}` });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error?.message ?? "Intake submission failed." });
  }
}