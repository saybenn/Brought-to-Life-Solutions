import Link from "next/link";

import { track } from "@/lib/analytics";

const SOCKETS = [
  {
    title: "Visibility",
    body: "Help the right people find the business when they are already looking.",
    short: "Visibility",
    position: "left-1/2 top-0 -translate-x-1/2",
  },
  {
    title: "Proof",
    body: "Make credibility easier to understand through clear offers, evidence, and positioning.",
    short: "Proof",
    position: "right-0 top-[18%]",
  },
  {
    title: "Conversion",
    body: "Guide visitors toward calls, forms, bookings, purchases, or qualified inquiry.",
    short: "Conversion",
    position: "right-0 bottom-[18%]",
  },
  {
    title: "Offer Strength",
    body: "Clarify what is being offered, who it is for, and why it is worth acting on.",
    short: "Offer Strength",
    position: "left-1/2 bottom-0 -translate-x-1/2",
  },
  {
    title: "Operations",
    body: "Connect the website to the follow-up, maintenance, and support structure behind it.",
    short: "Operations",
    position: "left-0 bottom-[18%]",
  },
  {
    title: "Analytics",
    body: "Show what is working so improvement is based on evidence, not guesswork.",
    short: "Analytics",
    position: "left-0 top-[18%]",
  },
];

export function WhySystemsSection() {
  return (
    <section
      id="why-systems"
      aria-labelledby="why-systems-heading"
      className="relative isolate overflow-hidden border-y border-[rgba(214,185,138,0.18)] bg-[var(--bg-deep)] text-white"
    >
      {/* Deep green atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background: `
            radial-gradient(circle at 18% 16%, rgba(214,185,138,0.16) 0%, rgba(15,20,17,0) 34%),
            radial-gradient(circle at 82% 28%, rgba(35,67,46,0.34) 0%, rgba(15,20,17,0) 38%),
            linear-gradient(135deg, #07110c 0%, #0f1a14 42%, #050907 100%)
          `,
        }}
      />

      {/* Soft background texture / image wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(rgba(5, 14, 10, 0.86), rgba(5, 14, 10, 0.94)), url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage: "url('/textures/grain.png')",
          backgroundSize: "320px",
        }}
      />

      {/* Gold thread line */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[rgba(214,185,138,0.42)] to-transparent" />

      <div className="relative z-10 mx-auto max-w-10/12 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.25fr] lg:items-center lg:gap-16">
          {/* Copy */}
          <div className="max-w-xl space-y-6">
            <p className="eyebrow w-fit border-b border-[rgba(214,185,138,0.32)] pb-2 text-sm font-semibold text-[rgba(247,243,235,0.56)]">
              05. Why systems, not just sites
            </p>

            <h2
              id="why-systems-heading"
              className="font-[var(--font-head)] text-4xl font-semibold leading-[0.98] tracking-tight text-[var(--bg-page)] sm:text-5xl lg:text-6xl"
            >
              A good-looking website is only useful when the business behind it
              is connected.
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-[rgba(247,243,235,0.74)] sm:text-base">
              <p>
                Most service businesses do not need more scattered marketing
                pieces. They need a clear structure that helps people find them,
                trust them, contact them, and leave a trail the owner can
                actually read.
              </p>

              <p>
                That is the difference between a website that exists online and
                a system that supports the business after launch.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about#six-sockets"
                onClick={() =>
                  track("click cta", {
                    location: "why systems section",
                    intent: "View BTLS framework",
                    label: "View the Framework",
                  })
                }
                className="inline-flex w-full items-center justify-center rounded-full border border-[rgba(214,185,138,0.36)] bg-[rgba(247,243,235,0.08)] px-5 py-3 text-sm font-semibold text-[var(--bg-page)] shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[rgba(214,185,138,0.58)] hover:bg-[rgba(247,243,235,0.13)] sm:w-auto"
              >
                View the Framework
              </Link>
            </div>
          </div>

          {/* Diagram Card */}
          <div
            id="six-sockets"
            className="relative overflow-hidden rounded-[2rem] border border-[rgba(214,185,138,0.22)] bg-[rgba(5,14,10,0.48)] p-5 shadow-[0_26px_90px_rgba(0,0,0,0.38)] backdrop-blur sm:p-6 lg:p-7"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `
                  radial-gradient(circle at 50% 45%, rgba(214,185,138,0.12) 0%, rgba(214,185,138,0) 36%),
                  linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))
                `,
              }}
            />

            <div className="relative z-10 mb-6 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[rgba(247,243,235,0.48)]">
                The Six Sockets
              </p>

              <h3 className="mt-2 font-[var(--font-head)] text-3xl font-semibold leading-tight text-[var(--bg-page)] sm:text-4xl">
                Six parts of one working system.
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[rgba(247,243,235,0.68)]">
                Each BTLS system is shaped around these parts, so the work does
                more than look finished. It has a job to perform.
              </p>
            </div>

            {/* Desktop / tablet orbital diagram */}
            <div className="relative z-10 hidden min-h-[600px] sm:block">
              {/* outer glow */}
              <div className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(214,185,138,0.05)] blur-xl" />

              {/* orbit rings */}
              <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(247,243,235,0.22)]" />
              <div className="absolute left-1/2 top-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(214,185,138,0.22)]" />

              {/* axis lines */}
              <div className="absolute left-1/2 top-[84px] h-[432px] w-px -translate-x-1/2 bg-[rgba(247,243,235,0.13)]" />
              <div className="absolute left-[calc(50%-216px)] top-1/2 h-px w-[432px] -translate-y-1/2 bg-[rgba(247,243,235,0.13)]" />
              <div className="absolute left-1/2 top-1/2 h-px w-[432px] -translate-x-1/2 -translate-y-1/2 rotate-[30deg] bg-[rgba(247,243,235,0.13)]" />
              <div className="absolute left-1/2 top-1/2 h-px w-[432px] -translate-x-1/2 -translate-y-1/2 -rotate-[30deg] bg-[rgba(247,243,235,0.13)]" />

              {/* center */}
              <div className="absolute left-1/2 top-1/2 z-20 flex h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[rgba(214,185,138,0.46)] bg-[rgba(5,14,10,0.82)] p-5 text-center shadow-[0_20px_70px_rgba(0,0,0,0.42)] backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(214,185,138,0.74)]">
                  Revenue Framework
                </p>
                <p className="mt-2 font-[var(--font-head)] text-2xl font-semibold leading-tight text-[var(--bg-page)]">
                  Web System
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[rgba(247,243,235,0.68)]">
                  Built to support the business after launch.
                </p>
              </div>

              {SOCKETS.map((socket) => (
                <article
                  key={socket.title}
                  className={`absolute z-10 w-[215px] rounded-2xl border border-[rgba(214,185,138,0.26)] bg-[rgba(247,243,235,0.08)] p-4 shadow-[0_18px_44px_rgba(0,0,0,0.3)] backdrop-blur-md transition duration-200 hover:-translate-y-1 hover:border-[rgba(214,185,138,0.48)] hover:bg-[rgba(247,243,235,0.12)] ${socket.position}`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(214,185,138,0.72)]">
                    {socket.title}
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-[rgba(247,243,235,0.72)]">
                    {socket.body}
                  </p>
                </article>
              ))}
            </div>

            {/* Mobile stacked fallback */}
            <div className="relative z-10 grid gap-4 sm:hidden">
              <div className="rounded-2xl border border-[rgba(214,185,138,0.42)] bg-[rgba(247,243,235,0.08)] p-5 text-center shadow-[0_18px_44px_rgba(0,0,0,0.3)] backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(214,185,138,0.72)]">
                  Revenue Framework
                </p>
                <p className="mt-2 font-[var(--font-head)] text-2xl font-semibold leading-tight text-[var(--bg-page)]">
                  Web System
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[rgba(247,243,235,0.68)]">
                  Built to support the business after launch.
                </p>
              </div>

              {SOCKETS.map((socket) => (
                <article
                  key={socket.title}
                  className="rounded-2xl border border-[rgba(214,185,138,0.24)] bg-[rgba(247,243,235,0.08)] p-5 shadow-[0_16px_36px_rgba(0,0,0,0.24)] backdrop-blur"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(214,185,138,0.72)]">
                    {socket.title}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-[rgba(247,243,235,0.72)]">
                    {socket.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="relative z-10 mt-6 border-t border-[rgba(214,185,138,0.2)] pt-5">
              <p className="text-sm leading-relaxed text-[rgba(247,243,235,0.64)]">
                The full framework belongs on the About page. The homepage only
                needs the door.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
