import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
};

export default function OfferGlassCard({
  children,
  className,
  featured,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-[var(--r-lg)] border bg-white/[0.06] backdrop-blur-[10px] shadow-[0_22px_70px_rgba(0,0,0,0.45)]",
        "border-white/16",
        featured && "border-white/28 bg-white/[0.08]",
        "min-h-0", // critical: prevents nested-card cropping interactions
        className
      )}
    >
      {children}
    </div>
  );
}
