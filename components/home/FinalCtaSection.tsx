// components/FinalCtaSection.tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FinalCtaSection() {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className={cn(
        "border-t border-[var(--border)]",
        "bg-[var(--ink-900)] text-white"
      )}
    >
      <div className="mx-auto max-w-10/12 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/60">
            Ready for a site that behaves like a revenue system?
          </p>

          <h2
            id="final-cta-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Let’s map the money flow through your website.
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
            If you’re serious about predictable income (not random spikes),
            we’ll spend 30 minutes looking at how your current site (or lack of
            one) helps or hurts that. No pitch deck, no fluff—just clarity on
            what would actually move the needle.
          </p>

          <ul className="mt-6 space-y-2 text-sm leading-relaxed text-white/80">
            <li>• A quick look at how you currently get leads and sales</li>
            <li>• A simple map of where your site could support that flow</li>
            <li>
              • A sense of whether BTLS is the right fit—or if you’re better
              served elsewhere
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              data-track="click cta"
              data-location="final cta"
              data-intent="Book a routing call"
              data-label="Start With a Routing"
              href="/contact?intent=system-review"
              className={cn(
                "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
                "bg-white text-[var(--ink-900)] shadow-[var(--shadow-soft)] transition hover:bg-white/90"
              )}
            >
              Start with a routing call
            </Link>

            <Link
              href="/shop"
              data-track="click cta"
              data-location="final cta"
              data-intent="View systems"
              data-label="View systems"
              type="button"
              className={cn(
                "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition",
                "border border-white/30 text-white/90 hover:border-white/55 hover:text-white"
              )}
            >
              View Systems
            </Link>
          </div>

          <p className="mt-4 text-xs text-white/60">
            No pressure, no long funnels—just an honest look at whether a
            revenue-engineered site would pay for itself in your situation.
          </p>
        </div>
      </div>
    </section>
  );
}
