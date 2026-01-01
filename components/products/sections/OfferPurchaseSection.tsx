// /components/products/sections/OfferPurchaseSection.tsx
import React from "react";
import type { Offer, OfferDetail } from "@/lib/catalog/types";
import SectionContainer from "@/components/ui/SectionContainer";
import OfferGlassCard from "@/components/ui/OfferGlassCard";
import { getPriceSignal } from "@/lib/catalog/offers";

type Props = { offer: Offer; detail: OfferDetail };

export default function OfferPurchaseSection({ offer, detail }: Props) {
  const { purchase } = detail;
  const priceSignal = purchase.price.display || getPriceSignal(offer);

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
              {purchase.stepsTitle || "After purchase"}
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

            {/* Risk removal is supportive, not competing */}
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
              <a
                className="btn btn-primary w-full"
                href={purchase.primaryCta.href}
              >
                {purchase.primaryCta.label}
              </a>

              {purchase.secondaryCta ? (
                <a
                  className="btn btn-secondary w-full"
                  href={purchase.secondaryCta.href}
                >
                  {purchase.secondaryCta.label}
                </a>
              ) : null}
            </div>
          </OfferGlassCard>
        </div>
      </SectionContainer>
    </section>
  );
}
