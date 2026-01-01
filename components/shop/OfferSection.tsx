import React, { useEffect, useRef } from "react";
import type { Offer } from "@/lib/catalog/types";

import OfferCard from "./OfferCard";
import Link from "next/link";
import { trackShopEvent } from "@/lib/catalog/offers";
import ShopSectionContainer from "@/components/ui/ShopSectionContainer";

type Props = {
  title: string;
  description?: string;
  sectionKey: string;
  offers: Offer[];
  align?: "left" | "right";
  helperLinkText?: string;
  helperLinkSection?: string;
};

export default function OfferSection({
  title,
  description,
  sectionKey,
  offers,
  align = "left",
  helperLinkText = "Book a call →",
  helperLinkSection = sectionKey,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          trackShopEvent("shop_section_view", {
            section: sectionKey,
            title,
            count: offers.length,
          });
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [offers.length, sectionKey, title]);

  const headerAlign =
    align === "right"
      ? "ml-auto text-right items-end"
      : "mr-auto text-left items-start";

  return (
    <section ref={ref as any} className="py-(--space-12)">
      <div className="mx-auto max-w-10/12">
        <ShopSectionContainer>
          <div
            className={[
              "flex flex-col gap-(--space-3) max-w-[76ch]",
              headerAlign,
            ].join(" ")}
          >
            <div
              className={[
                "flex items-center gap-(--space-3)",
                align === "right" ? "justify-end" : "justify-start",
              ].join(" ")}
            >
              <span className="inline-flex h-2 w-2 rounded-full bg-(--gold-400)" />
              <p className="text-[12px] tracking-[0.28em] font-semibold text-[rgba(247,243,235,0.65)]">
                {sectionKey.toUpperCase()}
              </p>
            </div>

            <h2 className="font-[var(--font-head)] text-[rgba(247,243,235,0.92)] text-[clamp(30px,2.8vw,46px)] leading-[0.98] tracking-[-0.01em]">
              {title}
            </h2>

            {description ? (
              <p className="text-[rgba(247,243,235,0.72)] leading-[var(--leading-relaxed)] text-[16px]">
                {description}
              </p>
            ) : null}
          </div>

          <div className="mt-(--space-8) grid gap-(--space-7) sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {offers.map((offer, idx) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                sectionKey={sectionKey}
                index={idx}
              />
            ))}
          </div>

          <div
            className={[
              "mt-(--space-7)",
              align === "right" ? "text-right" : "text-left",
            ].join(" ")}
          >
            <Link
              href={`/booking?section=${encodeURIComponent(
                helperLinkSection
              )}&intent=talk`}
              className="text-[13px] underline underline-offset-4 transition-base text-[rgba(247,243,235,0.60)] hover:text-[rgba(247,243,235,0.92)]"
            >
              {helperLinkText}
            </Link>
          </div>
        </ShopSectionContainer>
      </div>
    </section>
  );
}
