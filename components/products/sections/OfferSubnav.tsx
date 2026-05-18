// /components/products/sections/OfferSubnav.tsx

import React from "react";
import { scrollToId } from "@/lib/ui/scrollToId";

type Item = {
  id: string;
  label: string;
};

export default function OfferSubnav({ items }: { items: Item[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="sticky top-[72px] z-30 mt-5 hidden min-w-0 md:block sm:mt-(--space-6)">
      <div className="max-w-full overflow-hidden rounded-[var(--r-lg)] border border-white/10 bg-black/20 px-5 py-3 backdrop-blur-[8px]">
        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              onClick={() => scrollToId(it.id)}
              className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(247,243,235,0.62)] transition-base hover:text-[rgba(247,243,235,0.88)] lg:text-[12px] lg:tracking-[0.22em]"
            >
              {it.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
