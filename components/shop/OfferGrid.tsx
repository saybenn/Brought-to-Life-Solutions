import React, { useEffect } from "react";
import OfferSection from "./OfferSection";
import type { Offer } from "@/lib/catalog/types";
import { trackShopEvent } from "@/lib/catalog/offers";
import Link from "next/link";

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
    "starter_system",
    "revenue_engine",
    "growth_partner",
  ]);

  const care = byIds(offers, ["care_plan"]);
  const growth = byIds(offers, ["seo_maintenance", "seo_momentum"]);
  const assets = byIds(offers, [
    "revenue_roadmap",
    "copywriting",
    "trust_asset_photography",
  ]);

  return (
    <div className="pb-(--space-16)">
      <OfferSection
        title="Business Systems"
        description="Orient, capture, and convert inbound visitors into clients on different levels."
        sectionKey="stage"
        offers={ladder}
        align="left"
        helperLinkSection="stage"
      />
      <OfferSection
        title="Maintain"
        description="Hosting, monitoring, updates, load speed, broken pages, downtime."
        sectionKey="care"
        offers={care}
        align="left"
      />
      <OfferSection
        title="Increase"
        description="Visibility improvements that compound once your foundation is solid."
        sectionKey="growth"
        offers={growth}
        align="left"
      />
      <OfferSection
        title="Advantages"
        description="Messaging upgrades that lift conversion without changing your entire business."
        sectionKey="assets"
        offers={assets}
        align="left"
      />
      <div className="mx-auto w-full text-center">
        <Link
          href="/contact"
          className=" items-center gap-2 font-semibold hover:underline underline-offset-4 hover:scale-[101%] opacity-70 hover:opacity-100 flex flex-col"
        >
          Not sure? Talk first.
          <span className="no-underline ">
            We&apos;ll route you correctly before anything is built.
          </span>
        </Link>
      </div>
    </div>
  );
}
