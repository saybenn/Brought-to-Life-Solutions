// /components/ui/GlassCard.tsx
import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
};

/**
 * Glass product card:
 * - stronger tint than SectionContainer
 * - subtle blur
 * - stronger border highlight
 * - constrained element (safe for performance)
 */
export default function GlassCard({ children, className, featured }: Props) {
  const base =
    "relative overflow-hidden rounded-[var(--r-lg)] border transition-base hover-raise";
  const surface =
    "bg-[color-mix(in_oklab,var(--bg-elevated)_62%,transparent)] backdrop-blur-[10px]";
  const border = featured
    ? "border-(--brand-600) shadow-[var(--shadow-card)]"
    : "border-[color-mix(in_oklab,var(--border)_70%,transparent)] shadow-[var(--shadow-soft)]";

  return (
    <article className={cn(base, surface, border, className)}>
      {children}
    </article>
  );
}
