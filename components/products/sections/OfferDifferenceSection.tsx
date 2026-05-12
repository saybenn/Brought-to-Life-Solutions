// /components/products/sections/OfferDifferenceSection.tsx

import React from "react";
import type { Offer, OfferDetail } from "@/lib/catalog/types";
import SectionContainer from "@/components/ui/SectionContainer";

type Props = {
  offer: Offer;
  detail: OfferDetail;
};

export default function OfferDifferenceSection({ detail }: Props) {
  const { difference } = detail;

  if (!difference) {
    return null;
  }

  return (
    <section
      id="difference"
      aria-label="How this is different"
      className="scroll-mt-24"
    >
      <SectionContainer
        variant="alt"
        className="p-(--space-9) sm:p-(--space-10)"
      >
        <div className="flex items-center gap-(--space-3)">
          <span className="inline-flex h-2 w-2 rounded-full bg-white/40" />
          <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.62)]">
            DIFFERENCE
          </p>
        </div>

        <h2 className="mt-3 max-w-[50ch] font-[var(--font-head)] text-[clamp(22px,2.2vw,34px)] leading-[1.05] text-[rgba(247,243,235,0.92)]">
          {difference.title}
        </h2>

        <div className="mt-(--space-7) grid gap-(--space-7) lg:grid-cols-2">
          <div className="rounded-[var(--r-lg)] border border-white/10 bg-black/10 p-(--space-7)">
            <p className="text-[12px] uppercase tracking-[0.26em] text-[rgba(247,243,235,0.60)]">
              Not this
            </p>

            <ul className="mt-4 space-y-2">
              {difference.notThis.map((item) => (
                <li
                  key={item}
                  className="text-[14px] leading-[1.5] text-[rgba(247,243,235,0.72)]"
                >
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--r-lg)] border border-white/16 bg-white/5 p-(--space-7)">
            <p className="text-[12px] uppercase tracking-[0.26em] text-[rgba(247,243,235,0.62)]">
              This is
            </p>

            <ul className="mt-4 space-y-2">
              {difference.thisIs.map((item) => (
                <li
                  key={item}
                  className="text-[14px] leading-[1.5] text-[rgba(247,243,235,0.84)]"
                >
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
