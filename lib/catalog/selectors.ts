// /lib/catalog/selectors.ts
import type { Offer } from "@/lib/catalog/types";
import { OFFERS } from "@/lib/catalog/offers";
import { OFFER_DETAILS_BY_SLUG } from "@/lib/catalog/offerDetails";

export function getOfferBySlug(slug: string): Offer | undefined {
  return OFFERS.find((o) => o.slug === slug);
}

export function getOfferDetailBySlug(slug: string) {
  return OFFER_DETAILS_BY_SLUG[slug];
}
