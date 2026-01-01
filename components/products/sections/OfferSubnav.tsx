// /components/products/sections/OfferSubnav.tsx  (optional)
import React from "react";
import { scrollToId } from "@/lib/ui/scrollToId";

type Item = { id: string; label: string };

export default function OfferSubnav({ items }: { items: Item[] }) {
  return (
    <div className="hidden md:block sticky top-[72px] z-30 mt-(--space-6)">
      <div className="rounded-[var(--r-lg)] border border-white/10 bg-black/20 backdrop-blur-[8px] px-(--space-5) py-(--space-3)">
        <div className="flex items-center gap-(--space-4) flex-wrap">
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              onClick={() => scrollToId(it.id)}
              className="text-[12px] tracking-[0.22em] uppercase text-[rgba(247,243,235,0.62)] hover:text-[rgba(247,243,235,0.88)] transition-base"
            >
              {it.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
