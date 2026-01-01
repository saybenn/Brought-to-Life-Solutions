// /components/ui/surfaces/shop/ShopGlassCard.tsx
import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
};

export default function ShopGlassCard({
  children,
  className,
  featured,
}: Props) {
  return (
    <div
      className={cn(
        // Shop look: crisp, less fog, less blur, cleaner shadow
        " border bg-white/[0.04] shadow-[0_18px_55px_rgba(0,0,0,0.35)]",
        "border-white/10",
        featured && "border-white/22 bg-white/[0.055] scale-103",
        // important: shop cards are often same height; keep this here if you had it before
        "min-h-[360px] flex flex-col p-(--space-7)",
        className
      )}
    >
      {children}
    </div>
  );
}
