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
const ITEMS = [
  { icon: LucideEye, label: "Visibility" },
  { icon: Handshake, label: "Credibility" },
  { icon: Workflow, label: "Conversion" },
  { icon: DollarSignIcon, label: "Offer Strength" },
  { icon: Wrench, label: "Operations" },
  { icon: LineChart, label: "Analytics" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--ink-900)] text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png" // replace with your final photo
          alt="Founder working in a calm, focused studio space"
          fill
          priority
          className="object-cover object-right"
        />
        {/* Dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/45 to-black/15" />
      </div>

      {/* Content */}
      <div className="relative h-[90vh]">
        <div className="mx-auto flex flex-col h-full max-w-10/12 items-start justify-between px-4 sm:px-6 lg:px-8 pt-24 lg:pt-36 ">
          <div className="max-w-xl space-y-8 leading-loose">
            <div className="space-y-3">
              <p className="eyebrow on-dark-muted">Outcomes Over Hype</p>

              <h1 className="h1 on-dark leading-snug">
                Revenue-engineered web systems built for local service
                businesses & solo operators.
              </h1>

              <p className="subhead on-dark-sub">
                Stop the guessing games, plug into the six powers that generate
                predictable income.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="btn btn-primary">Start your project</button>
              <button className="btn btn-free">Get Strategy</button>
            </div>

            {/* <p className="caption on-dark-muted">
              Clear pricing. Predictable timelines. Built for revenue, not
              vibes.
            </p> */}
          </div>
          <section className="w-full py-3 md:py-4">
            <div className="mx-auto px-4 md:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-3 text-[var(--ink-700)] text-sm bg-red-900/30">
                {ITEMS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 whitespace-nowrap relative"
                  >
                    <div className="flex items-center w-full justify-between">
                      <Icon
                        size={20}
                        className="text-[var(--bg-page)] opacity-90"
                      />
                      <span className="eyebrow text-white text-shadow-lg">
                        {label}
                      </span>
                    </div>

                    <span
                      className={cn(
                        "absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-[var(--bg-elevated)] "
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
