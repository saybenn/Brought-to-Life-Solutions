// /components/products/sections/OfferPurchaseSection.tsx
import React from "react";
import type { Offer, OfferCta, OfferDetail } from "@/lib/catalog/types";
import SectionContainer from "@/components/ui/SectionContainer";
import OfferGlassCard from "@/components/ui/OfferGlassCard";
import { getPriceSignal } from "@/lib/catalog/offers";
import Link from "next/link";
import { track } from "@/lib/analytics";

type Props = { offer: Offer; detail: OfferDetail };

function getDirectAnalyticsLabel(offer: Offer): string {
  return `start_${offer.id}`;
}

function getDirectIntent(offer: Offer): string {
  return `Start ${offer.title}`;
}

function getPurchaseRoutingCta(detail: OfferDetail): OfferCta | null {
  return detail.purchase.secondaryCta ?? null;
}

export default function OfferPurchaseSection({ offer, detail }: Props) {
  const { purchase } = detail;
  const priceSignal = purchase.price.display || getPriceSignal(offer);

  const routingCta = getPurchaseRoutingCta(detail);
  const directCta = purchase.primaryCta;

  const primaryCta = routingCta ?? directCta;
  const showDirectAsLink = Boolean(routingCta && directCta);

  return (
    <section
      id="purchase"
      aria-label="Purchase"
      className="min-w-0 scroll-mt-24"
    >
      <SectionContainer variant="alt" className="p-5 sm:p-(--space-10)">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-white/40" />
          <p className="text-[11px] uppercase tracking-[0.22em] text-[rgba(247,243,235,0.62)] sm:text-[12px] sm:tracking-[0.26em]">
            Decision
          </p>
        </div>

        <h2 className="mt-3 break-words font-[var(--font-head)] text-[clamp(22px,7vw,34px)] leading-[1.05] text-[rgba(247,243,235,0.92)]">
          {purchase.title}
        </h2>

        <div className="mt-6 grid min-w-0 gap-5 lg:grid-cols-[1.25fr,0.75fr] lg:gap-(--space-7)">
          <div className="min-w-0 rounded-[var(--r-lg)] border border-white/12 bg-white/5 p-5 sm:p-(--space-7)">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[rgba(247,243,235,0.62)] sm:text-[12px] sm:tracking-[0.26em]">
              {purchase.stepsTitle || "Next steps"}
            </p>

            <ol className="mt-4 list-inside list-decimal space-y-2">
              {purchase.steps.map((s) => (
                <li
                  key={s}
                  className="text-[13px] leading-[1.55] text-[rgba(247,243,235,0.80)] sm:text-[14px]"
                >
                  {s}
                </li>
              ))}
            </ol>

            {purchase.riskRemoval?.length ? (
              <div className="mt-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[rgba(247,243,235,0.56)] sm:text-[12px] sm:tracking-[0.22em]">
                  What you can expect
                </p>

                <ul className="mt-3 space-y-2">
                  {purchase.riskRemoval.map((r) => (
                    <li
                      key={r}
                      className="text-[13px] leading-[1.55] text-[rgba(247,243,235,0.70)]"
                    >
                      • {r}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <OfferGlassCard className="h-fit min-w-0 p-5 sm:p-(--space-6)">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[rgba(247,243,235,0.62)] sm:text-[12px] sm:tracking-[0.26em]">
              Price
            </p>

            <p className="mt-3 break-words font-[var(--font-head)] text-[clamp(24px,8vw,34px)] leading-[1.05] text-[rgba(247,243,235,0.92)]">
              {priceSignal || "—"}
            </p>

            {purchase.scarcityLine ? (
              <p className="mt-4 text-[12px] leading-[1.55] text-[rgba(247,243,235,0.66)]">
                {purchase.scarcityLine}
              </p>
            ) : null}

            <div className="mt-6 flex flex-col gap-3">
              <Link
                className="btn btn-primary w-full justify-center"
                href={primaryCta.href}
                onClick={() =>
                  track("click cta", {
                    location: `product purchase section ${offer.title}`,
                    intent: routingCta
                      ? routingCta.intent || "Request a routing call"
                      : getDirectIntent(offer),
                    label: routingCta
                      ? routingCta.analyticsLabel || "primary_guided_cta"
                      : getDirectAnalyticsLabel(offer),
                    label_display: primaryCta.label,
                  })
                }
              >
                {primaryCta.label}
              </Link>

              {routingCta ? (
                <p className="text-[12px] leading-[1.55] text-[rgba(247,243,235,0.64)]">
                  We&apos;ll confirm fit before any work or payment begins.
                </p>
              ) : null}

              {showDirectAsLink ? (
                <Link
                  onClick={() =>
                    track("click cta", {
                      location: `product purchase section ${offer.title}`,
                      intent: getDirectIntent(offer),
                      label: getDirectAnalyticsLabel(offer),
                      label_display: directCta.label,
                    })
                  }
                  className="text-[13px] text-[rgba(247,243,235,0.66)] underline underline-offset-4 hover:text-[rgba(247,243,235,0.82)]"
                  href={directCta.href}
                >
                  {directCta.label}
                </Link>
              ) : null}
            </div>
          </OfferGlassCard>
        </div>
      </SectionContainer>
    </section>
  );
}
