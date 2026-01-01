// /components/products/sections/OfferFitSection.tsx
import React from "react";
import type { Offer, OfferDetail } from "@/lib/catalog/types";
import SectionContainer from "@/components/ui/SectionContainer";

type Props = { offer: Offer; detail: OfferDetail };

export default function OfferFitSection({ detail }: Props) {
  const { fit } = detail;

  return (
    <section id="fit" aria-label="Fit" className="scroll-mt-24">
      <SectionContainer className="p-(--space-9) sm:p-(--space-10)">
        <div className="flex items-center gap-(--space-3)">
          <span className="inline-flex h-2 w-2 rounded-full bg-white/40" />
          <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.62)]">
            FIT
          </p>
        </div>

        <h2 className="mt-3 font-[var(--font-head)] text-[rgba(247,243,235,0.92)] text-[clamp(22px,2.2vw,34px)] leading-[1.05]">
          {fit.title}
        </h2>

        <div className="mt-(--space-7) grid gap-(--space-7) lg:grid-cols-2">
          <div className="rounded-[var(--r-lg)] border border-white/16 bg-white/5 p-(--space-7)">
            <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.62)] uppercase">
              Good for
            </p>
            <ul className="mt-4 space-y-2">
              {fit.goodFor.map((g) => (
                <li
                  key={g}
                  className="text-[rgba(247,243,235,0.84)] text-[14px] leading-[1.5]"
                >
                  • {g}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--r-lg)] border border-white/10 bg-black/10 p-(--space-7)">
            <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.60)] uppercase">
              Not for
            </p>
            <ul className="mt-4 space-y-2">
              {fit.notFor.map((n) => (
                <li
                  key={n}
                  className="text-[rgba(247,243,235,0.72)] text-[14px] leading-[1.5]"
                >
                  • {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
