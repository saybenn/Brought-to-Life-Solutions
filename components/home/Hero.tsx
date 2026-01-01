import Image from "next/image";
import {
  CheckCircle,
  LineChart,
  FileCog,
  Timer,
  Brain,
  Workflow,
  LucideEye,
  Handshake,
  DollarSign,
  Package,
  Package2,
  DollarSignIcon,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

export function Hero() {
  const router = useRouter();
  const ITEMS = [
    { icon: LucideEye, label: "Visibility" },
    { icon: Handshake, label: "Credibility" },
    { icon: Workflow, label: "Conversion" },
    { icon: DollarSignIcon, label: "Offer Strength" },
    { icon: Wrench, label: "Operations" },
    { icon: LineChart, label: "Analytics" },
  ];
  const handleStartProject = () => {
    router.push("/start"); // intake → checkout
  };

  const handleBookCall = () => {
    router.push("/call"); // strategy call / Calendly wrapper
  };

  return (
    <section className="relative isolate overflow-hidden bg-[var(--ink-900)] text-white min-h-[70vh] sm:min-h-[75vh] md:min-h-[70vh] lg:min-h-[90vh]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero2.png" // replace with your final photo
          alt="Founder working in a calm, focused studio space"
          fill
          priority
          className="object-cover md:object-[60%_center] lg:object-right"
        />
        {/* Dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/60 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative flex h-full w-full flex-col justify-between">
        <div className="mx-auto flex h-full w-full max-w-10/12 flex-col items-start justify-center px-4 pt-20 pb-8 sm:px-6 sm:pt-24 md:pt-24 lg:px-8 lg:pt-32">
          <div className="max-w-3/4 leading-relaxed">
            <div className="space-y-6 sm:space-y-7 lg:space-y-8">
              <div className="space-y-3">
                <p className="eyebrow on-dark-muted">
                  Science Over Trends—Outcomes Over Hype
                </p>
                <h1 className="h1 on-dark text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug">
                  Revenue-engineered web systems that generate predictable
                  income.
                </h1>
              </div>

              <p className="subhead on-dark-sub hidden md:block">
                No more guessing games, plug your business into the six power
                that make earnings you can count on.
              </p>

              <div className="hidden flex-wrap items-center gap-3 md:flex">
                <button className="btn btn-primary py-1 px-4">
                  Start your project
                </button>
                <button className="btn btn-free py-1 px-4">Get Strategy</button>
              </div>
            </div>

            {/* Mobile CTAs */}
            <div className="mt-6 flex items-center gap-3 md:hidden">
              <button
                type="button"
                className="btn btn-primary px-4 py-2 text-sm leading-none"
                onClick={handleStartProject}
              >
                Start a Project
              </button>
              <button
                type="button"
                className="btn btn-free px-4 py-2 text-sm leading-none"
                onClick={handleBookCall}
              >
                Get Strategy
              </button>
            </div>
          </div>
        </div>

        {/* Sockets strip */}
        <div className="w-full py-3 sm:py-4">
          <div className="mx-auto grid w-11/12 max-w-5xl grid-cols-3 items-center gap-x-6 gap-y-3 text-xs text-[var(--ink-700)] sm:text-sm md:grid-cols-6">
            {ITEMS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="relative flex flex-1 items-center gap-2 whitespace-nowrap"
              >
                <div className="flex w-full items-center gap-x-2">
                  <Icon
                    size={18}
                    className="hidden text-[var(--bg-page)]/80 lg:block"
                  />
                  <span className="eyebrow text-[0.7rem] uppercase tracking-[0.18em] text-white/80 sm:text-[0.72rem]">
                    {label}
                  </span>
                </div>

                <span
                  className={cn(
                    "pointer-events-none absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-[var(--bg-elevated)]/80"
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
