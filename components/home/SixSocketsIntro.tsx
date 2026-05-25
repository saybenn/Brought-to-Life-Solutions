// components/sections/SixSocketsIntro.tsx
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { track } from "@/lib/analytics";

type SocketId =
  | "visibility"
  | "proof"
  | "conversion"
  | "offer"
  | "operations"
  | "analytics";

const DEFAULT_COPY =
  "Most owners do not need more hustle or more tools. They need a clear structure that helps the business receive, qualify, and follow up with real opportunities.";

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

  const activeSocket = SOCKETS.find((socket) => socket.id === activeId);
  const activeCopy = activeSocket?.copy ?? DEFAULT_COPY;

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

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 15% 0%, rgba(4,24,16,0.95) 0%, rgba(2,8,6,0.96) 40%, rgba(1,4,3,0.98) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-10/12 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-12 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* Copy block */}
          <div className="mx-auto max-w-xl space-y-5 animate-fadeUp lg:mx-0">
            <p className="eyebrow mx-auto w-fit border-b border-[var(--border)] text-sm text-[var(--muted)] lg:mx-0">
              04. THE SIX SOCKETS
            </p>

            <h2 className="h2 on-dark text-3xl leading-tight sm:text-4xl lg:text-5xl">
              When web presence is approached as a science, a website becomes an
              asset—not an expense.
            </h2>

            {/* Stable copy well prevents layout jump */}
            <div className="mx-auto flex min-h-[132px] max-w-xl items-center justify-center lg:mx-0 lg:min-h-[120px] lg:justify-start">
              <p
                key={activeId ?? "default"}
                className="subhead on-dark-sub animate-fadeUp"
              >
                {activeCopy}
              </p>
            </div>
          </div>

          {/* Circular sockets visual */}
          <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:mx-0">
            <div
              className="relative aspect-square"
              onMouseLeave={() => setActiveId(null)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setActiveId(null);
                }
              }}
            >
              {/* Outer ring */}
              <div className="absolute inset-4 rounded-full border border-white/25" />

              {/* Inner ring */}
              <div className="absolute inset-16 rounded-full border border-white/15" />

              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <p className="eyebrow on-dark-muted mb-1">REVENUE FRAMEWORK</p>
                <p className="font-body text-xs leading-snug on-dark-sub sm:text-sm">
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
                    onClick={() => setActiveId(socket.id)}
                    className={cn(
                      "group absolute transform cursor-pointer",
                      socket.pos,
                    )}
                    aria-label={socket.label}
                    aria-pressed={isActive}
                  >
                    <span
                      className={cn(
                        "socket-float inline-flex items-center justify-center rounded-full px-3 py-1",
                        "backdrop-blur-3xl",
                        "whitespace-nowrap text-[0.6rem] font-medium uppercase tracking-[0.22em] sm:text-[0.7rem]",
                        "border transition-all duration-300",
                        isActive
                          ? "border-white/80 bg-white/5 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.25)]"
                          : "border-transparent on-dark-muted",
                        "group-hover:border-white/60 group-hover:bg-white/5 group-hover:text-white",
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
        <div className="flex flex-col items-center justify-center gap-3 pt-12 sm:flex-row lg:justify-start ">
          <Link
            onClick={() =>
              track("click cta", {
                location: "home/six sockets",
                intent: "request review",
                label: "Request a review of your system",
              })
            }
            href="/contact?intent=system-review"
            className={cn(
              "inline-flex items-center justify-center rounded-full px-5 py-2.5 mx-auto",
              "text-sm font-medium transition-colors",
              "bg-white text-[var(--ink-900)] hover:bg-white/90",
            )}
          >
            Request a review of your system
          </Link>
        </div>
      </div>
    </section>
  );
}
