// /components/products/sections/OfferShiftSection.tsx
import React from "react";
import type { Offer, OfferDetail } from "@/lib/catalog/types";
import SectionContainer from "@/components/ui/SectionContainer";

type Props = { offer: Offer; detail: OfferDetail };

export default function OfferShiftSection({ detail }: Props) {
  const { shift } = detail;

  return (
    <section aria-label="Before and after shift" className="scroll-mt-24">
      <SectionContainer
        variant="alt"
        className="p-(--space-9) sm:p-(--space-10)"
      >
        <div className="flex items-center gap-(--space-3)">
          <span className="inline-flex h-2 w-2 rounded-full bg-white/40" />
          <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.62)]">
            DIAGNOSIS
          </p>
        </div>

        <h2 className="mt-3 font-[var(--font-head)] text-[rgba(247,243,235,0.92)] text-[clamp(22px,2.2vw,34px)] leading-[1.05]">
          {shift.title}
        </h2>

        <div className="mt-(--space-7) grid gap-(--space-7) lg:grid-cols-2">
          {/* BEFORE slightly dimmer */}
          <div className="rounded-[var(--r-lg)] border border-white/10 bg-black/10 p-(--space-7)">
            <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.56)] uppercase">
              Before
            </p>
            <ul className="mt-4 space-y-2">
              {shift.before.map((b) => (
                <li
                  key={b}
                  className="text-[rgba(247,243,235,0.68)] text-[14px] leading-[1.5]"
                >
                  • {b}
                </li>
              ))}
            </ul>
          </div>

          {/* AFTER slightly brighter */}
          <div className="rounded-[var(--r-lg)] border border-white/16 bg-white/6 p-(--space-7)">
            <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.62)] uppercase">
              After
            </p>
            <ul className="mt-4 space-y-2">
              {shift.after.map((a) => (
                <li
                  key={a}
                  className="text-[rgba(247,243,235,0.84)] text-[14px] leading-[1.5]"
                >
                  • {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
