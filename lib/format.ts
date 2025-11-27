// /lib/format.ts
import type { Pricing } from "@/lib/catalog/types";

/**
 * Format cents → USD string
 */
export const usd = (cents: number = 0, maxFrac = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: maxFrac,
  }).format(cents / 100);

/**
 * Derive min/max range dynamically from tier definitions
 */
export function deriveRangeFromTiers(pricing: Pricing): { minCents?: number; maxCents?: number } {
  if (!pricing?.tiers?.length) return {};
  const values = pricing.tiers.map((t) => t.fullCents).sort((a, b) => a - b);
  return { minCents: values[0], maxCents: values[values.length - 1] };
}

/**
 * Returns a full readable range (e.g., "$1,500–$2,000/mo")
 */
export const formatPriceRange = (p: Pricing) => {
  const { minCents, maxCents } =
    p.tiers?.length ? deriveRangeFromTiers(p) : { minCents: p.minCents, maxCents: p.maxCents };

  if (!minCents) return "";
  const hasRange = maxCents && maxCents > minCents;
  const base = hasRange ? `${usd(minCents)}–${usd(maxCents!)}` : usd(minCents);
  const cadence =
    p.model === "recurring"
      ? p.cadence === "year"
        ? "/yr"
        : "/mo"
      : ""; // one-time
  return `${base}${cadence}`;
};

/**
 * Clamp helper for ratings
 */
export const clamp = (n: number, min = 0, max = 5) => Math.max(min, Math.min(max, n));

/**
 * Converts a numeric rating → { full, half, empty } counts
 */
export const starArray = (rating: number) => {
  const r = clamp(rating);
  const full = Math.floor(r);
  const half = r - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return { full, half, empty };
};

/**
 * Simplify currency output for cards
 */
export const money = (cents?: number) =>
  typeof cents === "number" ? `$${(cents / 100).toLocaleString()}` : "";

/**
 * Min–max short formatter (used in cards)
 */
export const priceRange = (min?: number, max?: number) =>
  min && max && max > min ? `${money(min)}–${money(max)}` : money(min);
