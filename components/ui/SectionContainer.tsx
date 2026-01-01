// /components/ui/SectionContainer.tsx
import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "alt";
};

/**
 * Faint slab container primitive.
 * - Tint + hairline border
 * - Minimal shadow
 * - No blur (keep performance predictable)
 *
 * Variants allow alternating rhythm across sections.
 */
export default function SectionContainer({
  children,
  className,
  variant = "default",
}: Props) {
  const base =
    "rounded-[var(--r-lg)] border shadow-[0_18px_60px_rgba(0,0,0,0.35)]";
  const surface =
    variant === "alt"
      ? "border-white/14 bg-white/[0.06]"
      : "border-white/12 bg-white/5";

  return <div className={cn(base, surface, className)}>{children}</div>;
}
