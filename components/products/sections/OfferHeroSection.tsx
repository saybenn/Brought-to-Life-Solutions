// /components/products/sections/OfferHeroSection.tsx
import React from "react";
import type { Offer, OfferCta, OfferDetail } from "@/lib/catalog/types";
import SectionContainer from "@/components/ui/SectionContainer";
import Link from "next/link";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Props = { offer: Offer; detail: OfferDetail };

function getHeroSecondaryCta(detail: OfferDetail): OfferCta | null {
  return detail.hero.secondaryCta ?? null;
}

export default function OfferHeroSection({ offer, detail }: Props) {
  const { hero } = detail;
  const heroCta = getHeroSecondaryCta(detail);

  const featured =
    offer.id === "revenue_engine" ||
    !!offer.isFeatured ||
    offer.badge === "Most Chosen" ||
    offer.stage === "MostChosen";

  const eyebrow = (offer.category ?? offer.stage ?? "").toUpperCase();

  return (
    <section aria-label="Product outcome" className="min-w-0 scroll-mt-24">
      <SectionContainer className="p-5 sm:p-(--space-10)">
        <div className="grid min-w-0 gap-7 lg:grid-cols-[1.35fr,0.65fr] lg:items-start">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgba(247,243,235,0.62)] sm:text-[12px] sm:tracking-[0.26em]">
              {eyebrow}
            </p>

            <h1
              className={cn(
                "mt-3 max-w-[18ch] break-words font-[var(--font-head)]",
                "text-[rgba(247,243,235,0.92)]",
                "text-[clamp(25px,8vw,52px)] leading-[0.98] tracking-[-0.02em]",
                "sm:max-w-[20ch] sm:text-[clamp(34px,3.1vw,52px)]",
              )}
            >
              {hero.headline}
            </h1>

            {hero.whyItExists ? (
              <p className="mt-4 max-w-[68ch] text-[14px] leading-[1.6] text-[rgba(247,243,235,0.80)] sm:text-[15px]">
                <span className="font-semibold text-[rgba(247,243,235,0.88)]">
                  What this solves:
                </span>{" "}
                {hero.whyItExists}
              </p>
            ) : null}

            <p className="mt-4 max-w-[70ch] text-[14px] leading-[1.6] text-[rgba(247,243,235,0.74)] sm:text-[16px] sm:leading-[1.55]">
              {hero.subhead}
            </p>

            {hero.proofLine ? (
              <p className="mt-3 max-w-[70ch] text-[13px] font-semibold leading-[1.55] text-[rgba(247,243,235,0.84)] sm:text-[14px]">
                {hero.proofLine}
              </p>
            ) : null}

            {hero.perspectiveLock ? (
              <p className="mt-5 max-w-[72ch] text-[12px] leading-[1.6] text-[rgba(247,243,235,0.62)] sm:text-[13px]">
                {hero.perspectiveLock}
              </p>
            ) : null}
          </div>

          <div className="min-w-0 rounded-[var(--r-lg)] border border-white/12 bg-white/5 p-5 sm:p-(--space-7)">
            <div className="flex min-w-0 items-start justify-between gap-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[rgba(247,243,235,0.62)] sm:text-[12px] sm:tracking-[0.22em]">
                Next step
              </p>

              {featured ? (
                <span className="inline-flex shrink-0 items-center rounded-full border border-white/35 bg-white/10 px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.14em] text-[rgba(247,243,235,0.9)] sm:px-3 sm:text-[0.68rem] sm:tracking-[0.18em]">
                  Most chosen
                </span>
              ) : null}
            </div>

            {hero.proofCue ? (
              <p className="mt-3 text-[11px] uppercase leading-[1.6] tracking-[0.18em] text-[rgba(247,243,235,0.56)] sm:text-[12px] sm:tracking-[0.22em]">
                {hero.proofCue}
              </p>
            ) : null}

            {heroCta ? (
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  onClick={() =>
                    track("click cta", {
                      location: `product hero ${offer.title}`,
                      intent: heroCta.intent || "Request a routing call",
                      label: heroCta.analyticsLabel || "primary_guided_cta",
                      label_display: heroCta.label,
                    })
                  }
                  className="btn btn-primary w-full justify-center"
                  href={heroCta.href}
                >
                  {heroCta.label}
                </Link>

                <p className="text-[12px] leading-[1.55] text-[rgba(247,243,235,0.64)]">
                  We&apos;ll confirm fit before any work or payment begins.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
