// /components/products/sections/OfferIncludedSection.tsx

import React from "react";
import type { Offer, OfferDetail } from "@/lib/catalog/types";
import SectionContainer from "@/components/ui/SectionContainer";
import OfferGlassCard from "@/components/ui/OfferGlassCard";

type Props = {
  offer: Offer;
  detail: OfferDetail;
};

type IncludedWithOptionalFlatItems = NonNullable<OfferDetail["included"]> & {
  items?: string[];
};

export default function OfferIncludedSection({ detail }: Props) {
  const { included } = detail;

  if (!included) {
    return null;
  }

  const normalizedIncluded = included as IncludedWithOptionalFlatItems;
  const groups = normalizedIncluded.groups ?? [];
  const items = normalizedIncluded.items ?? [];

  const hasGroupedItems = groups.length > 0;
  const hasFlatItems = items.length > 0;

  return (
    <section
      id="included"
      aria-label="What you get"
      className="min-w-0 scroll-mt-24"
    >
      <SectionContainer className="p-5 sm:p-(--space-10)">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-white/40" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgba(247,243,235,0.62)] sm:text-[12px] sm:tracking-[0.26em]">
            Receipt Test
          </p>
        </div>

        <h2 className="mt-3 break-words font-[var(--font-head)] text-[clamp(22px,7vw,34px)] leading-[1.05] text-[rgba(247,243,235,0.92)]">
          {normalizedIncluded.title}
        </h2>

        {normalizedIncluded.intro ? (
          <p className="mt-4 max-w-[84ch] text-[14px] leading-[1.6] text-[rgba(247,243,235,0.74)]">
            {normalizedIncluded.intro}
          </p>
        ) : null}

        {hasGroupedItems ? (
          <div className="mt-6 grid min-w-0 items-stretch gap-5 sm:mt-(--space-7) sm:gap-(--space-6) lg:grid-cols-3">
            {groups.map((group) => (
              <OfferGlassCard
                key={group.title}
                className="h-full min-h-0 min-w-0 p-5 sm:p-(--space-6)"
              >
                <p className="break-words text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgba(247,243,235,0.62)] sm:text-[12px] sm:tracking-[0.22em]">
                  {group.title}
                </p>

                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-[13px] leading-[1.55] text-[rgba(247,243,235,0.76)]"
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </OfferGlassCard>
            ))}
          </div>
        ) : null}

        {!hasGroupedItems && hasFlatItems ? (
          <div className="mt-6 min-w-0 sm:mt-(--space-7)">
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="text-[13px] leading-[1.55] text-[rgba(247,243,235,0.76)] sm:text-[14px]"
                >
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {normalizedIncluded.effortLine ? (
          <div className="mt-6 border-t border-white/10 pt-5 sm:mt-(--space-7) sm:pt-(--space-5)">
            <p className="max-w-[92ch] text-[13px] font-semibold leading-[1.55] text-[rgba(247,243,235,0.82)]">
              {normalizedIncluded.effortLine}
            </p>
          </div>
        ) : null}

        {normalizedIncluded.note ? (
          <p className="mt-4 max-w-[92ch] text-[12px] leading-[1.6] text-[rgba(247,243,235,0.62)]">
            {normalizedIncluded.note}
          </p>
        ) : null}
      </SectionContainer>
    </section>
  );
}
