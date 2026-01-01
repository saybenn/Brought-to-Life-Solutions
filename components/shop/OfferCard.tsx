// /components/shop/OfferCard.tsx
// Proper fix: no runtime string replacements. Card just renders the truth-model fields cleanly.

import React from "react";
import Link from "next/link";
import type { Offer } from "@/lib/catalog/types";
import {
  trackShopEvent,
  getPrimaryCtaLabel,
  getPriceSignal,
} from "@/lib/catalog/offers";
import ShopGlassCard from "@/components/ui/ShopGlassCard";
import { cn } from "@/lib/utils";

type Props = { offer: Offer; sectionKey: string; index: number };

function getIntentFromCadence(offer: Offer) {
  if (offer.cadence === "application") return "apply";
  if (offer.cadence === "monthly") return "subscribe";
  return "buy";
}

function buildPrimaryHref(offer: Offer) {
  const intent = getIntentFromCadence(offer);
  return `/products/${offer.slug}?intent=${encodeURIComponent(
    intent
  )}&offerId=${encodeURIComponent(offer.id)}`;
}

function getTopLabel(offer: Offer) {
  // Prefer badge if present, else stage, else category
  if (offer.badge) return offer.badge.toUpperCase();
  return offer.stage.toUpperCase();
}

export default function OfferCard({ offer, sectionKey, index }: Props) {
  const priceSignal = getPriceSignal(offer);
  const primaryLabel = getPrimaryCtaLabel(offer);

  const featured = offer.id === "revenue_engine";

  const onPrimary = () => {
    trackShopEvent("shop_offer_click", {
      offerId: offer.id,
      slug: offer.slug,
      title: offer.title,
      category: offer.category,
      stage: offer.stage,
      cadence: offer.cadence,
      cta: offer.cta,
      section: sectionKey,
      index,
      action: "primary",
    });
  };

  // Truth-model fields are required by your type. Use them directly.
  const headline = offer.outcomeHeadline;
  const narrative = offer.outcomeNarrative;
  const deliverables = offer.deliverables;
  const deliverablesIntro = offer.deliverablesIntro;

  return (
    <ShopGlassCard
      featured={featured}
      className="min-h-[360px] hover:scale-103 transition-all"
    >
      {/* Tag / badge row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex flex-col items-start gap-1 min-w-0">
          <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.62)]">
            {getTopLabel(offer)}
          </p>

          <h3 className="font-[var(--font-head)] text-[rgba(247,243,235,0.92)] text-lg sm:text-xl leading-[1.05] truncate">
            {offer.title}
          </h3>
        </div>

        {featured && (
          <span className="shrink-0 inline-flex items-center rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[0.68rem] font-medium tracking-[0.18em] uppercase text-[rgba(247,243,235,0.9)]">
            {offer.badge}
          </span>
        )}
      </div>

      {/* Price */}
      <div className="mb-4 sm:mb-5">
        <p className="text-sm font-medium tracking-[0.16em] uppercase text-[rgba(247,243,235,0.72)]">
          {priceSignal || "—"}
        </p>
      </div>

      {/* Copy */}
      <div className="space-y-2.5 mb-5 sm:mb-6">
        <p className="text-sm font-semibold text-[rgba(247,243,235,0.94)]">
          {headline}
        </p>

        <p className="text-sm text-[rgba(247,243,235,0.78)]">{narrative}</p>

        {/* Deliverables (max 4 on card; full list on detail page) */}
        {deliverables.length > 0 ? (
          <div className="pt-1">
            <p className="text-xs font-semibold text-[rgba(247,243,235,0.82)]">
              {deliverablesIntro}
            </p>
            <ul className="mt-2 space-y-1.5">
              {deliverables.slice(0, 4).map((d) => (
                <li
                  key={d}
                  className="text-xs text-[rgba(247,243,235,0.72)] leading-[1.35]"
                >
                  • {d}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="text-xs text-[rgba(247,243,235,0.70)] italic">
          Best for: {offer.bestFor}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-auto pt-3 flex flex-col gap-2">
        <Link
          href={buildPrimaryHref(offer)}
          onClick={onPrimary}
          className={cn(
            "btn btn-primary w-full justify-center text-sm",
            featured && "shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
          )}
        >
          {primaryLabel}
        </Link>
      </div>
    </ShopGlassCard>
  );
}
