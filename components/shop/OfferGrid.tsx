import React, { useEffect } from "react";
import OfferSection from "./OfferSection";
import type { Offer } from "@/lib/catalog/types";
import { trackShopEvent } from "@/lib/catalog/offers";

type Props = { offers: Offer[] };

function byIds(all: Offer[], ids: string[]) {
  const map = new Map(all.map((o) => [o.id, o]));
  return ids.map((id) => map.get(id)).filter(Boolean) as Offer[];
}

export default function OfferGrid({ offers }: Props) {
  useEffect(() => {
    trackShopEvent("shop_view", { count: offers.length });
  }, [offers.length]);

  // Stage ladder — Revenue Engine first (your request)
  const ladder = byIds(offers, [
    "revenue_engine",
    "starter_system",
    "growth_partner",
  ]);

  const care = byIds(offers, ["care_plan"]);
  const growth = byIds(offers, ["seo_maintenance", "seo_momentum"]);
  const assets = byIds(offers, ["revenue_roadmap", "copywriting"]);

  return (
    <div className="pb-(--space-16)">
      <OfferSection
        title="Choose your stage"
        description="A guided ladder. Foundation → measurable lead flow → long-term optimization."
        sectionKey="stage"
        offers={ladder}
        align="left"
        helperLinkText="Not sure? Book a call →"
        helperLinkSection="stage"
      />

      <OfferSection
        title="Keep it healthy"
        description="Reliability is a revenue strategy. Broken pages silently bleed leads."
        sectionKey="care"
        offers={care}
        align="right"
        helperLinkText="Prefer to talk first? Book a call →"
        helperLinkSection="care"
      />

      <OfferSection
        title="Grow it"
        description="Visibility systems that compound once your foundation is solid."
        sectionKey="growth"
        offers={growth}
        align="left"
        helperLinkText="Want a quick recommendation? Book a call →"
        helperLinkSection="growth"
      />

      <OfferSection
        title="Assets"
        description="Messaging upgrades that lift conversion without changing your entire business."
        sectionKey="assets"
        offers={assets}
        align="right"
        helperLinkText="Need help choosing? Book a call →"
        helperLinkSection="assets"
      />
    </div>
  );
}
