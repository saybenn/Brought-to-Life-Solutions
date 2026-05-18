// /components/products/sections/OfferShiftSection.tsx
import React from "react";
import type { Offer, OfferDetail } from "@/lib/catalog/types";
import SectionContainer from "@/components/ui/SectionContainer";

type Props = { offer: Offer; detail: OfferDetail };

export default function OfferShiftSection({ detail }: Props) {
  const { shift } = detail;

  if (!shift) {
    return null;
  }

  return (
    <section
      aria-label="Before and after shift"
      className="min-w-0 scroll-mt-24"
    >
      <SectionContainer variant="alt" className="p-5 sm:p-(--space-10)">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-white/40" />
          <p className="text-[11px] uppercase tracking-[0.22em] text-[rgba(247,243,235,0.62)] sm:text-[12px] sm:tracking-[0.26em]">
            Diagnosis
          </p>
        </div>

        <h2 className="mt-3 break-words font-[var(--font-head)] text-[clamp(22px,7vw,34px)] leading-[1.05] text-[rgba(247,243,235,0.92)]">
          {shift.title}
        </h2>

        <div className="mt-6 grid min-w-0 gap-5 lg:grid-cols-2 lg:gap-(--space-7)">
          <div className="min-w-0 rounded-[var(--r-lg)] border border-white/10 bg-black/10 p-5 sm:p-(--space-7)">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[rgba(247,243,235,0.56)] sm:text-[12px] sm:tracking-[0.26em]">
              Before
            </p>

            <ul className="mt-4 space-y-2">
              {shift.before.map((b) => (
                <li
                  key={b}
                  className="text-[13px] leading-[1.55] text-[rgba(247,243,235,0.68)] sm:text-[14px]"
                >
                  • {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 rounded-[var(--r-lg)] border border-white/16 bg-white/6 p-5 sm:p-(--space-7)">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[rgba(247,243,235,0.62)] sm:text-[12px] sm:tracking-[0.26em]">
              After
            </p>

            <ul className="mt-4 space-y-2">
              {shift.after.map((a) => (
                <li
                  key={a}
                  className="text-[13px] leading-[1.55] text-[rgba(247,243,235,0.84)] sm:text-[14px]"
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
