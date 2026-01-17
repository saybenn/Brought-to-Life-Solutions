// components/sections/SixSocketsIntro.tsx
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type SocketId =
  | "visibility"
  | "proof"
  | "conversion"
  | "offer"
  | "operations"
  | "analytics";

const DEFAULT_COPY =
  "Most owners don't need more hustle or hacks—they need a calm system that quietly handles visibility, proof, conversion, offers, operations, and analytics. When those six sockets are wired together, income stops feeling random and starts feeling repeatable.";

const SOCKETS: {
  id: SocketId;
  label: string;
  pos: string;
  copy: string;
  delay: string;
  duration: string;
}[] = [
  {
    id: "visibility",
    label: "Visibility",
    pos: "top-3 left-1/2 -translate-x-1/2 -translate-y-1/2",
    copy: "Be found consistently by the people already looking for you.",
    delay: "0s",
    duration: "4.6s",
  },
  {
    id: "proof",
    label: "Proof",
    pos: "top-1/3 right-3 -translate-y-1/2 translate-x-1/2",
    copy: "Build instant trust so buyers choose you with confidence.",
    delay: "0.7s",
    duration: "5.1s",
  },
  {
    id: "conversion",
    label: "Conversion",
    pos: "bottom-1/3 right-0 translate-y-1/2 translate-x-1/2",
    copy: "Turn quiet interest into booked calls and sales.",
    delay: "0.2s",
    duration: "4.9s",
  },
  {
    id: "offer",
    label: "Offer Strength",
    pos: "bottom-4.5 left-1/2 -translate-x-1/2 translate-y-1/2",
    copy: "Make what you sell feel obvious, valuable, and worth paying for.",
    delay: "1s",
    duration: "5.4s",
  },
  {
    id: "operations",
    label: "Operations",
    pos: "bottom-1/3 left-0 translate-y-1/2 -translate-x-1/2",
    copy: "Stop drowning in manual tasks—let systems carry the load.",
    delay: "0.4s",
    duration: "4.8s",
  },
  {
    id: "analytics",
    label: "Analytics",
    pos: "top-1/3 left-0 -translate-y-1/2 -translate-x-1/2",
    copy: "Know what’s working so you can scale on purpose.",
    delay: "1.3s",
    duration: "5.2s",
  },
];

export function SixSocketsIntro() {
  const [activeId, setActiveId] = useState<SocketId | null>(null);

  const activeCopy =
    SOCKETS.find((s) => s.id === activeId)?.copy ?? DEFAULT_COPY;

  return (
    <section className="relative isolate overflow-hidden bg-[var(--ink-900)] text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/sockets-hero.jpg"
          alt="Calm workspace where systems quietly run in the background"
          fill
          priority={false}
          className="object-cover"
        />
        {/* Dark pine overlay – mixed green + black */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 15% 0%, rgba(4,24,16,0.95) 0%, rgba(2,8,6,0.96) 40%, rgba(1,4,3,0.98) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-10/12 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16 text-center">
          {/* Copy block */}
          <div className="max-w-xl space-y-5 animate-fadeUp">
            <p className="eyebrow mx-auto text-[var(--muted)] text-sm  w-fit">
              03. THE SIX SOCKETS
            </p>

            <h2 className="h2 on-dark text-3xl sm:text-4xl lg:text-5xl leading-tight">
              When a website is built as a complete system, it becomes an
              asset—not an expense.
            </h2>

            <p className="subhead on-dark-sub">{activeCopy}</p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                data-track="click cta"
                data-location="six sockets"
                data-intent="request a review"
                data-label="Request a review of your system"
                href="/contact?intent=system-review"
                className={cn(
                  "inline-flex items-center justify-center rounded-full px-5 py-2.5",
                  "text-sm font-medium transition-colors",
                  "bg-white text-[var(--ink-900)] hover:bg-white/90"
                )}
              >
                Request a review of your system
              </Link>
            </div>
          </div>

          {/* Circular sockets visual */}
          <div className="w-full max-w-xs sm:max-w-sm mx-auto lg:mx-0">
            <div className="relative aspect-square">
              {/* Outer ring */}
              <div className="absolute inset-4 rounded-full border border-white/25" />
              {/* Inner ring */}
              <div className="absolute inset-16 rounded-full border border-white/15" />

              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="eyebrow on-dark-muted mb-1">REVENUE FRAMEWORK</p>
                <p className="font-body text-xs sm:text-sm leading-snug on-dark-sub">
                  The six sockets your website must plug into for predictable
                  income.
                </p>
              </div>

              {/* Socket labels sitting on the orbit */}
              {SOCKETS.map((socket) => {
                const isActive = activeId === socket.id;

                return (
                  <button
                    key={socket.id}
                    type="button"
                    onMouseEnter={() => setActiveId(socket.id)}
                    onFocus={() => setActiveId(socket.id)}
                    className={cn(
                      "group absolute transform cursor-pointer",
                      socket.pos
                    )}
                    aria-label={socket.label}
                  >
                    <span
                      className={cn(
                        "socket-float inline-flex items-center justify-center rounded-full px-3 py-1",
                        "backdrop-blur-3xl",
                        "text-[0.6rem] sm:text-[0.7rem] font-medium tracking-[0.22em] uppercase whitespace-nowrap",
                        "transition-all duration-300 border",

                        // ✅ PERSISTENT ACTIVE STATE
                        isActive
                          ? "text-white border-white/80 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.25)]"
                          : "on-dark-muted border-transparent",

                        // ✅ SOFT HOVER STATE (doesn't fight with active, just boosts it)
                        "group-hover:text-white group-hover:border-white/60 group-hover:bg-white/5"
                      )}
                      style={{
                        animationDelay: socket.delay,
                        animationDuration: socket.duration,
                      }}
                    >
                      {socket.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
