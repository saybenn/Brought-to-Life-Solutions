import React from "react";
import Link from "next/link";

import type { Offer } from "@/lib/catalog/types";
import { OFFERS } from "@/lib/catalog/offers";
import OfferCard from "@/components/shop/OfferCard";
import { track } from "@/lib/analytics";

const PRIMARY_SYSTEM_IDS: Offer["id"][] = [
  "starter_system",
  "revenue_engine",
  "growth_partner",
];

const SUPPORT_SYSTEM_IDS: Offer["id"][] = [
  "seo_maintenance",
  "btls_dashboard",
  "care_plan",
];

function getOffersByIds(ids: Offer["id"][]) {
  return ids
    .map((id) => OFFERS.find((offer) => offer.id === id))
    .filter(Boolean) as Offer[];
}

export function ProductSection() {
  const primarySystems = getOffersByIds(PRIMARY_SYSTEM_IDS);
  const supportSystems = getOffersByIds(SUPPORT_SYSTEM_IDS);

  return (
    <section
      id="systems"
      className="relative isolate py-24 sm:py-32"
      style={{
        background: `
          linear-gradient(
            to bottom,
            #050e0a 0%,
            #050e0a 26%,
            #071812 54%,
            #0b1813 76%,
            #0e1412ff 100%
          )
        `,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage: "url('/textures/grain.png')",
          backgroundSize: "320px",
        }}
      />

      <div className="pointer-events-none absolute left-1/2 top-[32%] h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-[var(--olive-mist)] opacity-25 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-10/12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl space-y-6 text-center sm:mb-14 lg:mb-16">
          <p className="eyebrow mx-auto w-fit border-b border-[var(--border)] pb-2 text-sm font-semibold text-[var(--muted)]">
            02. Options We Offer
          </p>

          <h2 className="h2 on-dark text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Choose the system that fits where your business is now.
          </h2>
        </div>

        <div className="space-y-14">
          <div>
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(247,243,235,0.58)]">
                  Main build paths
                </p>
                <h3 className="mt-2 font-[var(--font-head)] text-2xl leading-tight text-[rgba(247,243,235,0.94)] sm:text-3xl">
                  Start, build, or grow with a defined path.
                </h3>
              </div>

              <p className="max-w-xl text-sm leading-relaxed text-[rgba(255,255,255,0.62)]">
                These are the primary systems most service businesses choose
                from first.
              </p>
            </div>

            <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
              {primarySystems.map((offer, index) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  sectionKey="home_primary_system_options"
                  index={index}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(247,243,235,0.58)]">
                  Supporting systems
                </p>
                <h3 className="mt-2 font-[var(--font-head)] text-2xl leading-tight text-[rgba(247,243,235,0.94)] sm:text-3xl">
                  Keep the system visible, maintained, and improving.
                </h3>
              </div>

              <p className="max-w-xl text-sm leading-relaxed text-[rgba(255,255,255,0.62)]">
                These support the work after launch or strengthen a system that
                is already in motion.
              </p>
            </div>

            <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
              {supportSystems.map((offer, index) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  sectionKey="home_support_system_options"
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center sm:mt-14">
          <p className="text-sm leading-relaxed text-[rgba(255,255,255,0.68)] sm:text-base">
            Not sure which path fits? Start with a Routing Call, or view the
            full shop to compare every system.
          </p>

          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact?intent=routing-call"
              onClick={() =>
                track("click cta", {
                  location: "home system options",
                  intent: "Request a routing call",
                  label: "Start with a Routing Call",
                })
              }
              className="btn btn-primary w-full justify-center sm:w-auto"
            >
              Start With a Routing Call
            </Link>

            <Link
              href="/shop"
              onClick={() =>
                track("click cta", {
                  location: "home system options",
                  intent: "View all systems",
                  label: "View All Systems",
                })
              }
              className="btn btn-free w-full justify-center sm:w-auto"
            >
              View All Systems
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
