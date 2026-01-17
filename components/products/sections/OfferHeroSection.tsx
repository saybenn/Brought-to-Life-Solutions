// /components/products/sections/OfferHeroSection.tsx
import React from "react";
import type { Offer, OfferDetail } from "@/lib/catalog/types";
import SectionContainer from "@/components/ui/SectionContainer";
import Link from "next/link";

type Props = { offer: Offer; detail: OfferDetail };

export default function OfferHeroSection({ offer, detail }: Props) {
  const { hero } = detail;

  const featured =
    offer.id === "revenue_engine" ||
    !!offer.isFeatured ||
    offer.badge === "Most Chosen" ||
    offer.stage === "MostChosen";

  const eyebrow = (offer.category ?? offer.stage).toUpperCase();

  // Prefer routing call as the primary action when present
  const routingHref =
    detail.purchase?.secondaryCta?.href || hero.secondaryActionHref;
  const routingLabel =
    detail.purchase?.secondaryCta?.label ||
    hero.secondaryActionLabel ||
    "Start with a routing call";

  return (
    <section aria-label="Product outcome" className="scroll-mt-24">
      <SectionContainer className="p-(--space-9) sm:p-(--space-10)">
        {/* Split layout: stack on mobile, 2-col on desktop */}
        <div className="grid gap-(--space-8) lg:grid-cols-[1.35fr,0.65fr] lg:items-start">
          {/* LEFT: Meaning / orientation */}
          <div className="min-w-0">
            <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.62)]">
              {eyebrow}
            </p>

            <h1 className="mt-3 font-[var(--font-head)] text-[rgba(247,243,235,0.92)] text-[clamp(30px,3.1vw,52px)] leading-[1.02] tracking-[-0.01em] max-w-[20ch]">
              {hero.headline}
            </h1>

            {/* Why it exists (new attribute) */}
            {hero.whyItExists ? (
              <p className="mt-4 text-[rgba(247,243,235,0.80)] text-[15px] leading-[1.6] max-w-[68ch]">
                <span className="font-semibold text-[rgba(247,243,235,0.88)]">
                  What this solves:
                </span>{" "}
                {hero.whyItExists}
              </p>
            ) : null}

            <p className="mt-4 text-[rgba(247,243,235,0.74)] text-[16px] leading-[1.55] max-w-[70ch]">
              {hero.subhead}
            </p>

            {hero.proofLine ? (
              <p className="mt-3 text-[rgba(247,243,235,0.84)] text-[14px] font-semibold max-w-[70ch]">
                {hero.proofLine}
              </p>
            ) : null}

            {/* Perspective lock */}
            {hero.perspectiveLock ? (
              <p className="mt-5 text-[rgba(247,243,235,0.62)] text-[13px] leading-[1.6] max-w-[72ch]">
                {hero.perspectiveLock}
              </p>
            ) : null}
          </div>

          {/* RIGHT: Validation + routing */}
          <div className="rounded-[var(--r-lg)] border border-white/12 bg-white/5 p-(--space-7)">
            <div className="flex items-start justify-between gap-4">
              <p className="text-[12px] tracking-[0.22em] uppercase text-[rgba(247,243,235,0.62)]">
                Next step
              </p>

              {featured ? (
                <span className="shrink-0 inline-flex items-center rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[0.68rem] font-medium tracking-[0.18em] uppercase text-[rgba(247,243,235,0.9)]">
                  Most chosen
                </span>
              ) : null}
            </div>

            {hero.proofCue ? (
              <p className="mt-3 text-[12px] tracking-[0.22em] uppercase text-[rgba(247,243,235,0.56)] leading-[1.6]">
                {hero.proofCue}
              </p>
            ) : null}

            <div className="mt-(--space-6) flex flex-col gap-(--space-3)">
              {routingHref ? (
                <Link
                  data-track="click cta"
                  data-location={`product hero ${offer.title}`}
                  data-intent="Request a routing call"
                  data-label="Start with a routing call"
                  className="btn btn-primary w-full"
                  href="/contact"
                >
                  {routingLabel}
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className="btn btn-primary w-full"
                  type="button"
                >
                  {routingLabel}
                </Link>
              )}

              {/* Micro reassurance (no pressure, risk control) */}
              <p className="text-[12px] text-[rgba(247,243,235,0.64)] leading-[1.55]">
                We&apos;ll confirm fit before any work or payment begins.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
