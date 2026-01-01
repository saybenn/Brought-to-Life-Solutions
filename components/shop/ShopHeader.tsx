import React from "react";

type Props = {
  eyebrow?: string;
  headline: string;
  subhead: string;
  bullets?: string[];
};

export default function ShopHeader({
  eyebrow = "SHOP",
  headline,
  subhead,
  bullets = [
    "Outcome-first.",
    "Built for service operators.",
    "Calm systems—not hype.",
  ],
}: Props) {
  return (
    <header className="pt-(--space-12) pb-(--space-10)">
      <div className="mx-auto max-w-10/12">
        <div className="flex items-center gap-(--space-3)">
          <span className="inline-flex h-2 w-2 rounded-full bg-(--brand-600)" />
          <p className="text-(--muted) tracking-[0.26em] text-[12px] font-semibold">
            {eyebrow}
          </p>
        </div>

        <h1 className="mt-(--space-4) font-[var(--font-head)] leading-[0.98] tracking-[-0.01em] text-[clamp(34px,4.4vw,64px)] text-(--ink-900)">
          {headline}
        </h1>

        <p className="mt-(--space-4) max-w-[76ch] text-(--ink-700) leading-[var(--leading-relaxed)] text-[18px]">
          {subhead}
        </p>

        <div className="mt-(--space-7) flex flex-wrap gap-(--space-3)">
          {bullets.map((b) => (
            <span
              key={b}
              className="rounded-[999px] border border-(--border) bg-(--bg-elevated) px-(--space-4) py-(--space-2) text-(--ink-700) text-[13px] shadow-[var(--shadow-soft)]"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
