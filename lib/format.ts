// /lib/format.ts
import type { Pricing } from "@/lib/catalog/types";

export const usd = (cents: number, maxFrac = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: maxFrac,
  }).format(cents / 100);

export const formatPriceRange = (p: Pricing) => {
  const hasRange = p.maxCents && p.maxCents > p.minCents;
  const base = hasRange ? `${usd(p.minCents)}–${usd(p.maxCents!)}` : `From ${usd(p.minCents)}`;
  const cadence =
    p.model === "recurring"
      ? p.cadence === "year"
        ? "/yr"
        : "/mo"
      : ""; // one-time
  return `${base}${cadence ? cadence : ""}`;
};

export const clamp = (n: number, min = 0, max = 5) => Math.max(min, Math.min(max, n));

export const starArray = (rating: number) => {
  const r = clamp(rating);
  const full = Math.floor(r);
  const half = r - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return { full, half, empty };
};
