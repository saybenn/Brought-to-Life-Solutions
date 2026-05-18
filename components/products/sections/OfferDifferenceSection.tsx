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
      className="min-w-0 scroll-mt-24"
    >
      <SectionContainer variant="alt" className="p-5 sm:p-(--space-10)">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-white/40" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgba(247,243,235,0.62)] sm:text-[12px] sm:tracking-[0.26em]">
            Difference
          </p>
        </div>

        <h2 className="mt-3 max-w-[50ch] break-words font-[var(--font-head)] text-[clamp(22px,7vw,34px)] leading-[1.05] text-[rgba(247,243,235,0.92)]">
          {difference.title}
        </h2>

        <div className="mt-6 grid min-w-0 gap-5 sm:mt-(--space-7) lg:grid-cols-2 lg:gap-(--space-7)">
          <div className="min-w-0 rounded-[var(--r-lg)] border border-white/10 bg-black/10 p-5 sm:p-(--space-7)">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgba(247,243,235,0.60)] sm:text-[12px] sm:tracking-[0.26em]">
              Not this
            </p>

            <ul className="mt-4 space-y-2">
              {difference.notThis.map((item) => (
                <li
                  key={item}
                  className="text-[13px] leading-[1.55] text-[rgba(247,243,235,0.72)] sm:text-[14px]"
                >
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 rounded-[var(--r-lg)] border border-white/16 bg-white/5 p-5 sm:p-(--space-7)">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgba(247,243,235,0.62)] sm:text-[12px] sm:tracking-[0.26em]">
              This is
            </p>

            <ul className="mt-4 space-y-2">
              {difference.thisIs.map((item) => (
                <li
                  key={item}
                  className="text-[13px] leading-[1.55] text-[rgba(247,243,235,0.84)] sm:text-[14px]"
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
