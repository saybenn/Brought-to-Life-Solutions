// /components/products/sections/OfferPurchaseSection.tsx
import React from "react";
import type { Offer, OfferDetail } from "@/lib/catalog/types";
import SectionContainer from "@/components/ui/SectionContainer";
import OfferGlassCard from "@/components/ui/OfferGlassCard";
import { getPriceSignal } from "@/lib/catalog/offers";
import Link from "next/link";

type Props = { offer: Offer; detail: OfferDetail };

export default function OfferPurchaseSection({ offer, detail }: Props) {
  const { purchase } = detail;
  const priceSignal = purchase.price.display || getPriceSignal(offer);

  // Routing-first: if a secondary CTA exists, treat it as the primary action.
  const routingCta = purchase.secondaryCta;
  const directCta = purchase.primaryCta;

  const primaryCta = routingCta ?? directCta;
  const showDirectAsLink = !!routingCta && !!directCta;

  return (
    <section id="purchase" aria-label="Purchase" className="scroll-mt-24">
      <SectionContainer
        variant="alt"
        className="p-(--space-9) sm:p-(--space-10)"
      >
        <div className="flex items-center gap-(--space-3)">
          <span className="inline-flex h-2 w-2 rounded-full bg-white/40" />
          <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.62)]">
            DECISION
          </p>
        </div>

        <h2 className="mt-3 font-[var(--font-head)] text-[rgba(247,243,235,0.92)] text-[clamp(22px,2.2vw,34px)] leading-[1.05]">
          {purchase.title}
        </h2>

        <div className="mt-(--space-7) grid gap-(--space-7) lg:grid-cols-[1.25fr,0.75fr]">
          {/* Steps */}
          <div className="rounded-[var(--r-lg)] border border-white/12 bg-white/5 p-(--space-7)">
            <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.62)] uppercase">
              {purchase.stepsTitle || "Next steps"}
            </p>

            <ol className="mt-4 space-y-2 list-decimal list-inside">
              {purchase.steps.map((s) => (
                <li
                  key={s}
                  className="text-[rgba(247,243,235,0.80)] text-[14px] leading-[1.55]"
                >
                  {s}
                </li>
              ))}
            </ol>

            {purchase.riskRemoval?.length ? (
              <div className="mt-(--space-6)">
                <p className="text-[12px] tracking-[0.22em] uppercase text-[rgba(247,243,235,0.56)]">
                  What you can expect
                </p>
                <ul className="mt-3 space-y-2">
                  {purchase.riskRemoval.map((r) => (
                    <li
                      key={r}
                      className="text-[rgba(247,243,235,0.70)] text-[13px] leading-[1.55]"
                    >
                      • {r}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {/* Pricing card */}
          <OfferGlassCard className="h-fit p-(--space-6)">
            <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.62)] uppercase">
              Price
            </p>

            <p className="mt-3 font-[var(--font-head)] text-[rgba(247,243,235,0.92)] text-[clamp(24px,2.4vw,34px)] leading-[1.05]">
              {priceSignal || "—"}
            </p>

            {purchase.scarcityLine ? (
              <p className="mt-4 text-[12px] text-[rgba(247,243,235,0.66)] leading-[1.55]">
                {purchase.scarcityLine}
              </p>
            ) : null}

            <div className="mt-(--space-6) flex flex-col gap-(--space-3)">
              <a className="btn btn-primary w-full" href={primaryCta.href}>
                {primaryCta.label}
              </a>

              {/* Inline reassurance: supportive, not competing */}
              {routingCta ? (
                <p className="text-[12px] text-[rgba(247,243,235,0.64)] leading-[1.55]">
                  We’ll confirm fit before any work or payment begins.
                </p>
              ) : null}

              {/* Optional: if routing is primary, demote direct checkout to a quiet link */}
              {showDirectAsLink ? (
                <Link
                  data-track="click cta"
                  data-location={`product/offer page final ${offer.title}`}
                  data-intent="Start a routing call"
                  data-label="Start a routing call"
                  className="text-[13px] text-[rgba(247,243,235,0.66)] underline underline-offset-4 hover:text-[rgba(247,243,235,0.82)]"
                  href={directCta.href}
                >
                  {directCta.label}
                </Link>
              ) : purchase.secondaryCta ? (
                <Link
                  data-track="click cta"
                  data-location={`product/offer page final ${offer.title}`}
                  data-intent={`Start ${offer.title}`}
                  data-label={`Start ${offer.title}`}
                  className="btn btn-secondary w-full"
                  href={purchase.secondaryCta.href}
                >
                  {purchase.secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </OfferGlassCard>
        </div>
      </SectionContainer>
    </section>
  );
}
