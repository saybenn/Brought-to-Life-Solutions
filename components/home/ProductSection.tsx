// components/sections/ProductSection.tsx
// Fix: remove hardcoded TIERS. Render truth-model Offer objects.
// Uses the same OfferCard used on /shop so content stays consistent.

import React from "react";
import type { Offer } from "@/lib/catalog/types";
import { OFFERS } from "@/lib/catalog/offers";
import OfferCard from "@/components/shop/OfferCard";

export function ProductSection() {
  // Home section is "Your System options" → this is the 3-lane ladder:
  // Starter System (Foundation) → Revenue Engine (Most Chosen) → Growth Partner (Ongoing)
  const SYSTEM_IDS: Offer["id"][] = [
    "starter_system",
    "revenue_engine",
    "growth_partner",
  ];

  const systems = SYSTEM_IDS.map((id) =>
    OFFERS.find((o) => o.id === id)
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

      {/* Ambient glow behind featured card (Revenue Engine) */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full blur-3xl opacity-30 bg-[var(--olive-mist)]" />

      <div className="relative z-10 mx-auto max-w-10/12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 lg:mb-16">
          <p className="eyebrow text-[var(--muted)] text-sm md:border-b md:border-[var(--border)] pb-2 w-fit font-semibold mx-auto">
            04. Your System options
          </p>

          <h2 className="h2 on-dark text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Choose the system that makes earning feel predictable.
          </h2>

          <p className="subhead on-dark-sub mt-4">
            Each option installs a calm, revenue-first system around your
            website—so it stops acting like a brochure and starts behaving like
            an engine.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3 items-stretch">
          {systems.map((offer, index) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              sectionKey="home_system_options"
              index={index}
            />
          ))}
        </div>

        {/* Safety / reassurance line */}
        <p className="mt-8 sm:mt-10 text-center text-[0.78rem] text-[rgba(255,255,255,0.65)] max-w-xl mx-auto">
          Not sure which system fits? Start with a routing call—no pressure,
          just clear answers and a recommendation based on where your revenue is
          stuck today.
        </p>
      </div>
    </section>
  );
}
