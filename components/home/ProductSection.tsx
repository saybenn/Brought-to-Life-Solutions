// components/sections/ProductSection.tsx
// Fix: remove hardcoded TIERS. Render truth-model Offer objects.
// Uses the same OfferCard used on /shop so content stays consistent.

import React from "react";
import Link from "next/link";
import type { Offer } from "@/lib/catalog/types";
import { OFFERS } from "@/lib/catalog/offers";
import OfferCard from "@/components/shop/OfferCard";
import { track } from "@/lib/analytics";

export function ProductSection() {
  // Home section is a curated preview, not the full shop.
  const SYSTEM_IDS: Offer["id"][] = [
    "seo_maintenance",
    "revenue_engine",
    "btls_dashboard",
  ];

  const systems = SYSTEM_IDS.map((id) =>
    OFFERS.find((o) => o.id === id),
  ).filter(Boolean) as Offer[];

  return (
    <section
      className="relative isolate py-24 sm:py-32"
      style={{
        background: `
          linear-gradient(
            to bottom,
            #050e0a 0%,
            #050e0a 30%,
            #071812 55%,
            #0b1813 75%,
            #0e1412ff 100%
          )
        `,
      }}
    >
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage: "url('/textures/grain.png')",
          backgroundSize: "320px",
        }}
      />

      {/* Ambient glow behind featured card */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[var(--olive-mist)] opacity-30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-10/12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl space-y-6 text-center sm:mb-14 lg:mb-16">
          <p className="eyebrow mx-auto w-fit border-b border-[var(--border)] pb-2 text-sm font-semibold text-[var(--muted)]">
            04. Your System Options
          </p>

          <h2 className="h2 on-dark text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Install a system for your business that does more than just exist
            online.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
          {systems.map((offer, index) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              sectionKey="home_system_options"
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTAs */}
        <div className="mx-auto mt-10 max-w-2xl text-center sm:mt-12">
          <p className="text-sm leading-relaxed text-[rgba(255,255,255,0.68)] sm:text-base">
            Not sure which system fits? Start with a Routing Call, or browse the
            full shop if you do not see what you need here.
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
                  label: "See the Rest of Our Systems",
                })
              }
              className="btn btn-free w-full justify-center sm:w-auto"
            >
              See the Rest of Our Systems
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
