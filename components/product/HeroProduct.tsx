// /components/product/HeroProduct.tsx
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/catalog/types";
import { priceRange } from "@/lib/format";
import { track } from "@/lib/analytics";
import TierSelector from "@/components/product/TierSelector";
import { toast } from "@/components/ui/Toast";

export default function HeroProduct({ product }: { product: Product }) {
  const { title, blurb, image, pricing } = product;
  const tiers = pricing?.tiers || [];

  // Selected tier state (for one_time products with tiers)
  const [selectedTier, setSelectedTier] = useState<any>(tiers[0] ?? null);
  const [agreed, setAgreed] = useState(false);
  const isRecurring = pricing.model === "recurring";

  // Derived price text for header bar
  const headerPriceText = useMemo(() => {
    if (isRecurring) {
      return `${priceRange(pricing.minCents, pricing.maxCents)}/${
        pricing.cadence
      }${(pricing as any).note ? ` (${(pricing as any).note})` : ""}`;
    }
    // One-time: if tier selected, show that; else show range
    if (selectedTier)
      return `$${(selectedTier.fullCents / 100).toLocaleString()}`;
    return priceRange(pricing.minCents, pricing.maxCents);
  }, [isRecurring, pricing, selectedTier]);

  // GTM view event
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).dataLayer?.push({
        event: "view_item",
        item_id: product.slug,
        item_name: product.title,
        price: (pricing.minCents ?? 0) / 100,
      });
    }
  }, [product, pricing]);
  useEffect(() => {
    // seed product id/slug for the lead flow
    if (typeof window !== "undefined") {
      sessionStorage.setItem("lead:productId", product.id || "");
      sessionStorage.setItem("lead:productSlug", product.slug || "");
    }
  }, [product.id, product.slug]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("lead:tierKey", selectedTier?.key || "");
      sessionStorage.setItem("lead:tierLabel", selectedTier?.label || "");
    }
  }, [selectedTier]);

  // Flow 1 — Start Project → Stripe Checkout (50% deposit)
  const startCheckout = useCallback(async () => {
    if (!agreed) return toast("Please agree to the MSA & SOW to continue.");
    if (!isRecurring && tiers.length && !selectedTier)
      return toast("Choose a tier first.");

    try {
      track({
        event: "begin_checkout",
        method: "stripe",
        item_id: product.slug,
        item_name: product.title,
      });

      // Build body:
      // Priority 1: use tier.stripeDepositPriceId if present
      // Else: pass totalAmountCents for dynamic 50% on server
      const body: any = {
        slug: product.slug,
        quantity: 1,
        agreement: {
          version: "v1",
          url: `/legal/sow/${product.slug}`,
          timestamp: Date.now(),
        },
      };

      if (!isRecurring) {
        if (selectedTier?.stripeDepositPriceId) {
          body.priceId = selectedTier.stripeDepositPriceId;
          body.tierKey = selectedTier.key;
        } else if (selectedTier?.fullCents) {
          body.totalAmountCents = selectedTier.fullCents;
          body.tierKey = selectedTier.key;
        } else if (!tiers.length && pricing?.minCents) {
          // Fallback: no tiers; if you want to allow quick pay at min
          body.totalAmountCents = pricing.minCents;
        }
      }

      toast("Taking you to secure checkout…");

      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Checkout failed");

      if (!j.url) throw new Error("Missing Checkout URL from server");
      window.location.assign(j.url);
    } catch (err: any) {
      console.error(err);
      toast(err.message || "Unable to start checkout");
    }
  }, [
    agreed,
    isRecurring,
    tiers.length,
    selectedTier,
    pricing?.minCents,
    product.slug,
    product.title,
  ]);

  return (
    <section className="relative">
      {/* Editorial image with dark gradient under text */}
      <div className="relative h-[44vh] min-h-[320px] w-full overflow-hidden rounded-b-[var(--r-lg)]">
        <Image src={image} alt={title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <h1 className="h1 text-(--white)">{title}</h1>
          <p className="subhead mt-2 text-(--white) opacity-90">{blurb}</p>

          {/* Price and CTAs */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-lg font-semibold text-(--white)">
              {headerPriceText}
            </span>

            {/* Flow 1 — Start Project (Checkout) */}
            <button
              onClick={startCheckout}
              className="btn btn-primary"
              aria-label="Start Project — 50% Deposit"
            >
              Start Project — 50% Deposit
            </button>

            {/* Flow 2 — Book Meeting (to embedded calendly page) */}
            <a
              href={`/book/${product.slug}`}
              className="btn btn-secondary"
              aria-label="Book a meeting"
            >
              Book Meeting
            </a>

            {/* Flow 3 — scroll to on-page form */}
            <button
              onClick={() => {
                (window as any).dataLayer?.push({
                  event: "lead_form_scroll",
                  item_id: product.slug,
                });
                document
                  .getElementById("contact-start")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn"
              aria-label="Ready to start"
            >
              Ready to Start (Invoice)
            </button>
          </div>

          {/* Agreement gate */}
          <label className="mt-3 flex items-center gap-2 text-(--white) opacity-95">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span className="text-sm">
              I agree to the{" "}
              <a href="/legal/msa" className="underline">
                MSA
              </a>{" "}
              &{" "}
              <a href={`/legal/sow/${product.slug}`} className="underline">
                SOW
              </a>
              .
            </span>
          </label>
        </div>
      </div>

      {/* Tier selector (only for one_time products that define tiers) */}
      {!isRecurring && tiers.length > 0 && (
        <div className="mx-auto max-w-5xl px-4 py-6">
          <TierSelector product={product} onChange={setSelectedTier} />
          {/* Tier detail panel */}
          {selectedTier && (
            <div className="mt-4 rounded-[var(--r-md)] border border-(--border) bg-(--white) p-4">
              {selectedTier.blurb && (
                <p className="text-(--ink-800)">{selectedTier.blurb}</p>
              )}
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                {!!selectedTier.includes?.length && (
                  <div>
                    <div className="font-medium text-(--ink-900)">Includes</div>
                    <ul className="mt-2 list-disc pl-5 text-(--ink-700)">
                      {selectedTier.includes.map((s: string, i: number) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {!!selectedTier.excludes?.length && (
                  <div>
                    <div className="font-medium text-(--ink-900)">Excludes</div>
                    <ul className="mt-2 list-disc pl-5 text-(--ink-700)">
                      {selectedTier.excludes.map((s: string, i: number) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile sticky CTA bar */}
      <div className="fixed bottom-3 left-0 right-0 z-40 px-4 md:hidden">
        <div className="mx-auto max-w-screen-sm rounded-[var(--r-md)] border border-(--border) bg-(--white) p-3 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm text-(--ink-700)">{title}</div>
              <div className="text-base font-semibold text-(--ink-900)">
                {headerPriceText}
              </div>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <button onClick={startCheckout} className="btn btn-primary">
                Start
              </button>
              <a href={`/book/${product.slug}`} className="btn btn-secondary">
                Book
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
