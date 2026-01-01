// /components/products/sections/OfferIncludedSection.tsx
import React from "react";
import type { Offer, OfferDetail } from "@/lib/catalog/types";
import SectionContainer from "@/components/ui/SectionContainer";
import OfferGlassCard from "@/components/ui/OfferGlassCard";

type Props = { offer: Offer; detail: OfferDetail };

export default function OfferIncludedSection({ detail }: Props) {
  const { included } = detail;

  return (
    <section id="included" aria-label="What you get" className="scroll-mt-24">
      <SectionContainer className="p-(--space-9) sm:p-(--space-10)">
        <div className="flex items-center gap-(--space-3)">
          <span className="inline-flex h-2 w-2 rounded-full bg-white/40" />
          <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.62)]">
            RECEIPT TEST
          </p>
        </div>

        <h2 className="mt-3 font-[var(--font-head)] text-[rgba(247,243,235,0.92)] text-[clamp(22px,2.2vw,34px)] leading-[1.05]">
          {included.title}
        </h2>

        {included.intro ? (
          <p className="mt-4 text-[rgba(247,243,235,0.74)] text-[14px] leading-[1.6] max-w-[84ch]">
            {included.intro}
          </p>
        ) : null}

        {/* Groups */}
        {included.groups?.length ? (
          <div className="mt-(--space-7) grid gap-(--space-6) lg:grid-cols-3 items-stretch">
            {included.groups.map((g) => (
              <OfferGlassCard
                key={g.title}
                className="h-full min-h-0 p-(--space-6)"
              >
                <p className="text-[12px] tracking-[0.22em] uppercase text-[rgba(247,243,235,0.62)]">
                  {g.title}
                </p>
                <ul className="mt-4 space-y-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="text-[rgba(247,243,235,0.76)] text-[13px] leading-[1.5]"
                    >
                      • {it}
                    </li>
                  ))}
                </ul>
              </OfferGlassCard>
            ))}
          </div>
        ) : null}

        {/* Flat fallback */}
        {!included.groups?.length && included.items?.length ? (
          <div className="mt-(--space-7)">
            <ul className="space-y-2">
              {included.items.map((it) => (
                <li
                  key={it}
                  className="text-[rgba(247,243,235,0.76)] text-[14px] leading-[1.5]"
                >
                  • {it}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {included.effortLine ? (
          <div className="mt-(--space-7) border-t border-white/10 pt-(--space-5)">
            <p className="text-[rgba(247,243,235,0.82)] text-[13px] font-semibold leading-[1.55] max-w-[92ch]">
              {included.effortLine}
            </p>
          </div>
        ) : null}

        {included.note ? (
          <p className="mt-4 text-[rgba(247,243,235,0.62)] text-[12px] leading-[1.6] max-w-[92ch]">
            {included.note}
          </p>
        ) : null}
      </SectionContainer>
    </section>
  );
}
