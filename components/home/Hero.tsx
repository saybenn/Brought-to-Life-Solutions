import Image from "next/image";
import {
  LineChart,
  LucideEye,
  Handshake,
  Workflow,
  DollarSignIcon,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { track } from "@/lib/analytics";

export function Hero() {
  const ITEMS = [
    { icon: LucideEye, label: "Visibility" },
    { icon: Handshake, label: "Credibility" },
    { icon: Workflow, label: "Conversion" },
    { icon: DollarSignIcon, label: "Offer Strength" },
    { icon: Wrench, label: "Operations" },
    { icon: LineChart, label: "Analytics" },
  ];

  return (
    <section className="relative isolate min-h-[70vh] overflow-hidden bg-[var(--ink-900)] text-white sm:min-h-[75vh] md:min-h-[78vh] lg:min-h-[90vh]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero2.webp"
          alt="Founder working in a calm, focused studio space"
          fill
          priority
          className="object-cover md:object-[60%_center] lg:object-right"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/60 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[70vh] w-11/12 max-w-[88rem] flex-col px-4 pt-20 sm:min-h-[75vh] sm:px-6 sm:pt-24 md:min-h-[78vh] md:pt-24 lg:min-h-[90vh] lg:px-8 lg:pt-32">
        {/* Main hero copy */}
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-3xl leading-relaxed">
            <div className="space-y-6 sm:space-y-7 lg:space-y-8">
              <div className="space-y-3">
                <p className="eyebrow on-dark-muted pt-4">
                  Refined and designed around how businesses actually operate.
                </p>

                <h1 className="h1 on-dark max-w-4xl text-3xl leading-snug sm:text-4xl md:text-5xl lg:text-6xl">
                  Web systems that create predictable income.
                </h1>
              </div>

              <p className="subhead on-dark-sub hidden md:block">
                For business operators tired of random leads and fragile
                websites.
              </p>

              <div className="hidden flex-wrap items-center gap-3 md:flex">
                <Link
                  onClick={() =>
                    track("click cta", {
                      location: "hero",
                      intent: "start routing call",
                      label: "Start With a Routing Call",
                    })
                  }
                  href="/contact"
                  className="btn btn-primary px-4 py-1"
                >
                  Start With a Routing Call
                </Link>

                <Link
                  onClick={() =>
                    track("click cta", {
                      location: "hero",
                      intent: "view systems",
                      label: "View our Systems",
                    })
                  }
                  href="/shop"
                  className="btn btn-free px-4 py-1"
                >
                  View Our Systems
                </Link>
              </div>
            </div>

            {/* Mobile CTAs */}
            <div className="mt-6 flex items-center gap-3 md:hidden">
              <Link
                onClick={() =>
                  track("click cta", {
                    location: "hero",
                    intent: "start routing call",
                    label: "Start With a Routing Call",
                  })
                }
                href="/contact"
                className="btn btn-primary px-4 py-2 text-center text-sm leading-none"
              >
                Start With a Routing Call
              </Link>

              <Link
                onClick={() =>
                  track("click cta", {
                    location: "hero",
                    intent: "view systems",
                    label: "View our Systems",
                  })
                }
                href="/shop"
                className="btn btn-free mx-auto flex px-4 py-2 text-center text-sm leading-none"
              >
                View Systems
              </Link>
            </div>
          </div>
        </div>

        {/* Sockets strip */}
        <div className="w-11/12 pb-8 pt-6 sm:pb-9 md:pb-10 lg:pb-12">
          <div className=" grid w-full max-w-5xl grid-cols-3 items-center gap-x-6 gap-y-4 text-xs text-[var(--ink-700)] sm:text-sm md:grid-cols-6">
            {ITEMS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="relative flex min-w-0 items-center gap-2 whitespace-nowrap"
              >
                <div className="flex w-full items-center justify-center gap-x-2 md:justify-start">
                  <Icon
                    size={18}
                    className="hidden shrink-0 text-[var(--bg-page)]/80 lg:block"
                  />

                  <span className="eyebrow truncate text-[0.62rem] uppercase tracking-[0.18em] text-white/80 sm:text-[0.68rem] lg:text-[0.7rem]">
                    {label}
                  </span>
                </div>

                <span
                  className={cn(
                    "pointer-events-none absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-[var(--bg-elevated)]/80",
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
