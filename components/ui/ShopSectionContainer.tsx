// /components/ui/surfaces/shop/ShopSectionContainer.tsx
import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function ShopSectionContainer({ children, className }: Props) {
  return (
    <div
      className={cn(
        // Shop slab: beige faint plate feel (no blur)
        "border border-white/10 bg-white/[0.03]",
        "shadow-[0_20px_70px_rgba(0,0,0,0.35)]",
        "p-(--space-9) p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
