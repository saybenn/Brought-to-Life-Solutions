// pages/approach.tsx

import Head from "next/head";
import Link from "next/link";

import { track } from "@/lib/analytics";

const ISSUES = [
  "Leads feel random — feast or famine.",
  "The site looks acceptable, but it does not create enough movement.",
  "Follow-up depends too much on memory and manual effort.",
  "The business cannot clearly see what is working.",
];

const SYSTEM_OUTCOMES = [
  "Capture interest without letting good leads leak away.",
  "Clarify the offer so the right people understand the next step.",
  "Use proof to reduce hesitation.",
  "Support follow-up instead of leaving everything in the owner’s head.",
  "Track meaningful actions so improvement is not guesswork.",
];

const SOCKETS = [
  {
    title: "Visibility",
    body: "The business needs to be found by people who are already looking for help.",
  },
  {
    title: "Proof",
    body: "The visitor needs enough evidence to trust the business before they take the next step.",
  },
  {
    title: "Conversion",
    body: "The page needs clear paths toward calls, forms, bookings, purchases, or qualified inquiry.",
  },
  {
    title: "Offer Strength",
    body: "The offer needs to be understandable, valuable, and easy to act on.",
  },
  {
    title: "Operations",
    body: "The system behind the website needs to support follow-up, upkeep, and the real way the business works.",
  },
  {
    title: "Measurement",
    body: "The owner needs visibility into what is working so future decisions are not built on guesswork.",
  },
];

const METHOD_STEPS = [
  {
    title: "Clarify",
    body: "We begin by understanding the business, the offer, the buyer, and the constraint that needs attention.",
  },
  {
    title: "Structure",
    body: "We shape the pages, calls to action, proof, tracking, and supporting systems before the build becomes decoration.",
  },
  {
    title: "Build",
    body: "We install the system with the right level of design, copy, development, and measurement for the chosen path.",
  },
  {
    title: "Measure",
    body: "After launch, the system should leave a trail. Calls, forms, clicks, sources, and pages become easier to read.",
  },
  {
    title: "Improve",
    body: "The next move becomes clearer when the system shows where attention, trust, or conversion needs work.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <Head>
        <title>Approach — Brought to Life Solutions</title>
        <meta
          name="description"
          content="How Brought to Life Solutions builds web systems for service businesses through clarity, structure, visibility, proof, conversion, operations, and measurement."
        />
      </Head>

      <main className="bg-[var(--bg-ivory)] text-[var(--ink-900)]">
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-[var(--border)]">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 18% 16%, rgba(214,185,138,0.22) 0%, rgba(247,243,235,0) 34%), radial-gradient(circle at 82% 12%, rgba(35,67,46,0.14) 0%, rgba(247,243,235,0) 36%)",
            }}
          />

          <div className="relative mx-auto max-w-10/12 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <div className="max-w-4xl">
              <p className="eyebrow w-fit border-b border-[var(--border)] pb-2 text-sm font-semibold text-[var(--muted)]">
                The BTLS Approach
              </p>

              <h1 className="mt-6 font-[var(--font-head)] text-4xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] sm:text-5xl lg:text-7xl">
                Web systems built with enough structure to hold real business
                weight.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink-700)] sm:text-lg">
                Brought to Life Solutions works with owners who are skilled at
                what they do, but tired of everything depending on them. We
                build clear, reliable systems that help the business receive
                attention, create trust, guide action, and make improvement
                easier to see.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/shop"
                  onClick={() =>
                    track("click cta", {
                      location: "approach hero",
                      intent: "View systems",
                      label: "View Systems",
                    })
                  }
                  className="btn btn-primary w-full justify-center sm:w-auto"
                >
                  View Systems
                </Link>

                <Link
                  href="/contact?intent=routing-call"
                  onClick={() =>
                    track("click cta", {
                      location: "approach hero",
                      intent: "Request routing call",
                      label: "Start With a Routing Call",
                    })
                  }
                  className="btn btn-secondary w-full justify-center sm:w-auto"
                >
                  Start With a Routing Call
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The Real Problem */}
        <section className="border-b border-[var(--border)] bg-[var(--bg-ivory)]">
          <div className="mx-auto max-w-10/12 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.25fr] lg:gap-16">
              <div className="space-y-5">
                <p className="eyebrow w-fit border-b border-[var(--border)] pb-2 text-sm font-semibold text-[var(--muted)]">
                  01. The Real Problem
                </p>

                <h2 className="font-[var(--font-head)] text-3xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] sm:text-4xl lg:text-5xl">
                  Many businesses were sold websites as static brochures.
                </h2>

                <p className="text-sm leading-relaxed text-[var(--ink-700)] sm:text-base">
                  The stronger path is a system built to support visibility,
                  trust, conversion, follow-up, and measurement. If the site
                  does not help people find you, trust you, contact you, and
                  move forward, it is not carrying enough of the business load.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <article className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-soft)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                    What usually shows up
                  </p>

                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[var(--ink-700)] sm:text-base">
                    {ISSUES.map((issue) => (
                      <li key={issue} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted)]" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-soft)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                    What the system is built to support
                  </p>

                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[var(--ink-700)] sm:text-base">
                    {SYSTEM_OUTCOMES.map((outcome) => (
                      <li key={outcome} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--green-pine-800)]" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="border-b border-[var(--border)] bg-[var(--bg-elevated)]">
          <div className="mx-auto max-w-10/12 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow mx-auto w-fit border-b border-[var(--border)] pb-2 text-sm font-semibold text-[var(--muted)]">
                02. Who We Are
              </p>

              <h2 className="mt-6 font-[var(--font-head)] text-3xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] sm:text-4xl lg:text-6xl">
                A steady partner for integrating systems
                <span className="mt-1 block font-normal text-[var(--green-pine-800)]">
                  that make business feel manageable again.
                </span>
              </h2>

              <div className="mx-auto mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-[var(--ink-700)] sm:text-base">
                <p>
                  BTLS is not built around noise, pressure, or scattered
                  deliverables. The work is meant to bring definition to the
                  parts of the business that touch the internet.
                </p>

                <p>
                  The goal is not to impress people with a website. The goal is
                  to create a system that helps the business present clearly,
                  receive opportunities, follow up with less friction, and make
                  better decisions over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Six Sockets */}
        <section className="relative isolate overflow-hidden bg-[var(--ink-900)] text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.2]"
            style={{
              background:
                "radial-gradient(circle at 14% 10%, rgba(214,185,138,0.28) 0%, rgba(5,14,10,0) 38%), radial-gradient(circle at 86% 78%, rgba(77,117,86,0.24) 0%, rgba(5,14,10,0) 42%)",
            }}
          />

          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.08]"
            style={{
              backgroundImage: "url('/textures/grain.png')",
              backgroundSize: "320px",
            }}
          />

          <div className="relative mx-auto max-w-10/12 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow w-fit border-b border-white/20 pb-2 text-sm font-semibold text-[rgba(255,255,255,0.58)]">
                03. The Six Sockets
              </p>

              <h2 className="h2 on-dark mt-6 text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Six parts of one working system.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[rgba(255,255,255,0.72)] sm:text-base">
                When web presence is approached with structure, the website
                becomes more than a page people visit. It becomes part of how
                the business is found, trusted, contacted, followed up with, and
                improved.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {SOCKETS.map((socket) => (
                <article
                  key={socket.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(255,255,255,0.52)]">
                    {socket.title}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-[rgba(255,255,255,0.72)]">
                    {socket.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Method */}
        <section className="border-b border-[var(--border)] bg-[var(--bg-ivory)]">
          <div className="mx-auto max-w-10/12 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.3fr] lg:gap-16">
              <div>
                <p className="eyebrow w-fit border-b border-[var(--border)] pb-2 text-sm font-semibold text-[var(--muted)]">
                  04. Method
                </p>

                <h2 className="mt-6 font-[var(--font-head)] text-3xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] sm:text-4xl lg:text-5xl">
                  Confidence comes from sequence, not noise.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--ink-700)] sm:text-base">
                  BTLS does not begin by adding more pieces. We begin by
                  clarifying what the system needs to support, then build the
                  structure in the right order.
                </p>
              </div>

              <div className="space-y-4">
                {METHOD_STEPS.map((step, index) => (
                  <article
                    key={step.title}
                    className="grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-soft)] sm:grid-cols-[auto_1fr] sm:items-start"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--green-pine-800)] text-sm font-semibold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <h3 className="font-[var(--font-head)] text-xl font-semibold text-[var(--ink-900)]">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)] sm:text-base">
                        {step.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Boundary / Fit */}
        <section className="bg-[var(--bg-elevated)]">
          <div className="mx-auto max-w-10/12 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
              <article className="rounded-[2rem] border border-[var(--border)] bg-[var(--bg-ivory)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  What this protects
                </p>

                <h2 className="mt-4 font-[var(--font-head)] text-3xl font-semibold leading-tight text-[var(--ink-900)] sm:text-4xl">
                  Less babysitting. More definition.
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-[var(--ink-700)] sm:text-base">
                  A business owner should not have to keep every moving part in
                  their head. The system should make the important things easier
                  to see, easier to maintain, and easier to improve.
                </p>
              </article>

              <article className="rounded-[2rem] border border-[var(--border)] bg-[var(--bg-ivory)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  What this is not
                </p>

                <h2 className="mt-4 font-[var(--font-head)] text-3xl font-semibold leading-tight text-[var(--ink-900)] sm:text-4xl">
                  Not decoration dressed up as strategy.
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-[var(--ink-700)] sm:text-base">
                  Design matters. But design alone is not the full answer. The
                  stronger path connects presentation, offer clarity, tracking,
                  follow-up, and ongoing support into one business-facing
                  structure.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[var(--ink-900)] text-white">
          <div className="mx-auto max-w-10/12 px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <p className="eyebrow mx-auto w-fit border-b border-white/20 pb-2 text-sm font-semibold text-[rgba(255,255,255,0.58)]">
              Begin With the Right Path
            </p>

            <h2 className="mx-auto mt-6 max-w-3xl font-[var(--font-head)] text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Choose the system that fits where the business is now.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[rgba(255,255,255,0.72)] sm:text-base">
              If the next step is clear, view the systems. If it needs
              definition, start with a Routing Call.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/shop"
                onClick={() =>
                  track("click cta", {
                    location: "approach final cta",
                    intent: "View systems",
                    label: "View Systems",
                  })
                }
                className="btn btn-primary w-full justify-center sm:w-auto"
              >
                View Systems
              </Link>

              <Link
                href="/contact?intent=routing-call"
                onClick={() =>
                  track("click cta", {
                    location: "approach final cta",
                    intent: "Request routing call",
                    label: "Start With a Routing Call",
                  })
                }
                className="btn btn-free w-full justify-center sm:w-auto"
              >
                Start With a Routing Call
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
