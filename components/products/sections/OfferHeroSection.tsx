// /components/products/sections/OfferHeroSection.tsx
import React from "react";
import type { Offer, OfferDetail } from "@/lib/catalog/types";
import SectionContainer from "@/components/ui/SectionContainer";
import { scrollToId } from "@/lib/ui/scrollToId";

type Props = { offer: Offer; detail: OfferDetail };

export default function OfferHeroSection({ offer, detail }: Props) {
  const { hero } = detail;

  const featured =
    offer.id === "revenue_engine" ||
    !!offer.isFeatured ||
    offer.badge === "Most Chosen" ||
    offer.stage === "MostChosen";

  // Reduce redundancy: eyebrow is NOT the badge; use category/stage.
  const eyebrow = (offer.category ?? offer.stage).toUpperCase();

  return (
    <section aria-label="Product outcome" className="scroll-mt-24">
      <SectionContainer className="p-(--space-9) sm:p-(--space-10)">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.62)]">
              {eyebrow}
            </p>

            <h1 className="mt-3 font-[var(--font-head)] text-[rgba(247,243,235,0.92)] text-[clamp(30px,3.1vw,52px)] leading-[1.02] tracking-[-0.01em] max-w-[18ch]">
              {hero.headline}
            </h1>

            <p className="mt-4 text-[rgba(247,243,235,0.78)] text-[16px] leading-[1.55] max-w-[60ch]">
              {hero.subhead}
            </p>

            {hero.proofLine ? (
              <p className="mt-3 text-[rgba(247,243,235,0.84)] text-[14px] font-semibold max-w-[60ch]">
                {hero.proofLine}
              </p>
            ) : null}

            {hero.proofCue ? (
              <p className="mt-3 text-[12px] tracking-[0.22em] uppercase text-[rgba(247,243,235,0.58)] max-w-[70ch]">
                {hero.proofCue}
              </p>
            ) : null}

            <div className="mt-(--space-7) flex flex-col sm:flex-row gap-(--space-3)">
              <button
                type="button"
                className="btn btn-primary w-full sm:w-auto"
                onClick={() => scrollToId(hero.primaryActionTargetId)}
              >
                {hero.primaryActionLabel}
              </button>

              {detail.purchase.secondaryCta ? (
                <a
                  className="btn btn-secondary w-full sm:w-auto"
                  href={detail.purchase.secondaryCta.href}
                >
                  {detail.purchase.secondaryCta.label}
                </a>
              ) : null}
            </div>

            {/* Perspective lock: single calm line, no divider */}
            {hero.perspectiveLock ? (
              <p className="mt-5 text-[rgba(247,243,235,0.62)] text-[13px] leading-[1.6] max-w-[70ch]">
                {hero.perspectiveLock}
              </p>
            ) : null}
          </div>

          {/* Keep pill as the one "Most chosen" indicator */}
          {featured ? (
            <span className="shrink-0 inline-flex items-center rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[0.68rem] font-medium tracking-[0.18em] uppercase text-[rgba(247,243,235,0.9)]">
              Most chosen
            </span>
          ) : null}
        </div>
      </SectionContainer>
    </section>
  );
}
