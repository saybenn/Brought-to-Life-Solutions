// /components/products/OfferDetailPage.tsx
import React from "react";
import type { Offer, OfferDetail } from "@/lib/catalog/types";
import OfferHeroSection from "@/components/products/sections/OfferHeroSection";
import OfferSubnav from "./sections/OfferSubnav";
import OfferShiftSection from "@/components/products/sections/OfferShiftSection";
import OfferIncludedSection from "@/components/products/sections/OfferIncludedSection";
import OfferDifferenceSection from "@/components/products/sections/OfferDifferenceSection";
import OfferFitSection from "@/components/products/sections/OfferFitSection";
import OfferPurchaseSection from "@/components/products/sections/OfferPurchaseSection";

type Props = {
  offer: Offer;
  detail: OfferDetail;
};

export default function OfferDetailPage({ offer, detail }: Props) {
  return (
    <main className="py-(--space-16)">
      <div className="mx-auto max-w-10/12 pt-(--space-12)">
        <OfferHeroSection offer={offer} detail={detail} />

        {/* Optional: sticky section nav for skimmers */}
        <OfferSubnav
          items={[
            { id: "included", label: "Included" },
            { id: "difference", label: "Difference" },
            { id: "fit", label: "Fit" },
            { id: "purchase", label: "Pricing" },
          ]}
        />

        <div className="mt-(--space-10) space-y-(--space-10)">
          <OfferShiftSection offer={offer} detail={detail} />
          <OfferIncludedSection offer={offer} detail={detail} />
          <OfferDifferenceSection offer={offer} detail={detail} />
          <OfferFitSection offer={offer} detail={detail} />
          <OfferPurchaseSection offer={offer} detail={detail} />
        </div>
      </div>
    </main>
  );
}
