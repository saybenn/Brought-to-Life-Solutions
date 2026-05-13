// /components/shop/OfferCard.tsx

import React from "react";
import Link from "next/link";
import type { Offer } from "@/lib/catalog/types";
import { getPriceSignal } from "@/lib/catalog/offers";
import ShopGlassCard from "@/components/ui/ShopGlassCard";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

type Props = {
  offer: Offer;
  sectionKey: string;
  index: number;
};

type ShopOffer = Offer & {
  cadence?: "application" | "monthly" | "one_time" | "subscription" | string;
  cta?: string;
  outcomeHeadline?: string;
  outcomeNarrative?: string;
  deliverablesIntro?: string;
  deliverables?: string[];
  bestFor?: string;
};

function getIntentFromCadence(offer: ShopOffer) {
  if (offer.cadence === "application") return "apply";
  if (offer.cadence === "monthly" || offer.cadence === "subscription") {
    return "subscribe";
  }

  return "buy";
}

function buildPrimaryHref(offer: ShopOffer) {
  const intent = getIntentFromCadence(offer);

  return `/shop/${offer.slug}?intent=${encodeURIComponent(
    intent,
  )}&offerId=${encodeURIComponent(offer.id)}`;
}

function getTopLabel(offer: ShopOffer) {
  if (offer.badge) return offer.badge.toUpperCase();
  if (offer.stage) return offer.stage.toUpperCase();
  if (offer.category) return offer.category.toUpperCase();

  return "SYSTEM";
}

function getFallbackHeadline(offer: ShopOffer) {
  if (offer.outcomeHeadline) return offer.outcomeHeadline;

  if (offer.stage === "Starter") {
    return "A clean foundation for getting your business online properly.";
  }

  if (offer.stage === "Build") {
    return "A stronger system for turning attention into real inquiries.";
  }

  if (offer.stage === "Growth") {
    return "Ongoing improvement for a business that needs clearer signals.";
  }

  if (offer.stage === "Care") {
    return "Support and maintenance for keeping the system healthy.";
  }

  return "A focused business system built around clarity, trust, and action.";
}

function getFallbackNarrative(offer: ShopOffer) {
  if (offer.outcomeNarrative) return offer.outcomeNarrative;

  return "Built to help visitors understand what you offer, why it matters, and what step to take next.";
}

export default function OfferCard({ offer, sectionKey, index }: Props) {
  const shopOffer = offer as ShopOffer;

  const priceSignal = getPriceSignal(shopOffer);
  const featured = shopOffer.id === "revenue_engine" || shopOffer.isFeatured;

  const headline = getFallbackHeadline(shopOffer);
  const narrative = getFallbackNarrative(shopOffer);
  const deliverables = shopOffer.deliverables ?? [];
  const deliverablesIntro = shopOffer.deliverablesIntro ?? "What this includes";
  const bestFor = shopOffer.bestFor;

  return (
    <ShopGlassCard
      featured={featured}
      className="min-h-[360px] transition-all hover:scale-103"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col items-start gap-1">
          <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.62)]">
            {getTopLabel(shopOffer)}
          </p>

          <h3 className="truncate font-[var(--font-head)] text-lg leading-[1.05] text-[rgba(247,243,235,0.92)] sm:text-xl">
            {shopOffer.title}
          </h3>
        </div>

        {featured && shopOffer.badge ? (
          <span className="xl:inline-flex shrink-0 items-center rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[rgba(247,243,235,0.9)] sm:hidden ">
            {shopOffer.badge}
          </span>
        ) : null}
      </div>

      <div className="mb-4 sm:mb-5">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-[rgba(247,243,235,0.72)]">
          {priceSignal || "—"}
        </p>
      </div>

      <div className="mb-5 space-y-4 sm:mb-6">
        <p className="text-md font-bold text-[rgba(247,243,235,0.94)]">
          {headline}
        </p>

        <p className="text-sm text-[rgba(247,243,235,0.78)]">{narrative}</p>

        {deliverables.length > 0 ? (
          <div className="pt-1">
            <p className="text-xs font-semibold text-[rgba(247,243,235,0.82)]">
              {deliverablesIntro}
            </p>

            <ul className="mt-2 space-y-1.5">
              {deliverables.slice(0, 4).map((deliverable) => (
                <li
                  key={deliverable}
                  className="text-xs leading-[1.35] text-[rgba(247,243,235,0.72)]"
                >
                  • {deliverable}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {bestFor ? (
          <p className="text-sm font-bold text-white">
            Built For: <span className="font-normal">{bestFor}</span>
          </p>
        ) : null}
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-3">
        <Link
          href={buildPrimaryHref(shopOffer)}
          onClick={() =>
            track("click cta", {
              offer: shopOffer.title,
              offer_id: shopOffer.id,
              offer_slug: shopOffer.slug,
              category: shopOffer.category,
              stage: shopOffer.stage,
              section: sectionKey,
              index,
              location: `offer card ${shopOffer.title}`,
              intent: "view product",
              label: "View System",
            })
          }
          className={cn(
            "btn btn-primary w-full justify-center text-sm",
            featured && "shadow-[0_18px_50px_rgba(0,0,0,0.35)]",
          )}
        >
          View System
        </Link>
      </div>
    </ShopGlassCard>
  );
}
