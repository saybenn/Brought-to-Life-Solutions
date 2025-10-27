import Head from "next/head";
import { Button } from "@/components/ui/Button";
import Hero from "@/components/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Brought to Life Solutions — Outcomes Over Hype</title>
        <meta
          name="description"
          content="Web, SEO, Coaching, Photography. Get backed, seen, heard, and paid."
        />
      </Head>

      <main>
        <Hero
          eyebrow="OUTCOMES OVER HYPE"
          title="Get backed. Get seen. Get heard. Get paid."
          subtitle="Practical websites. Real SEO. Clear coaching. Honest imagery."
          tone="ivory"
          cta={
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/shop"
                className="rounded-xl px-4 py-2 text-sm font-medium"
                style={{ background: "var(--blue-600)", color: "var(--white)" }}
              >
                Shop Now
              </Link>
              <Link
                href="/book/consult"
                className="rounded-xl px-4 py-2 text-sm font-medium border"
                style={{ borderColor: "var(--muted-400)" }}
              >
                Book Consult
              </Link>
            </div>
          }
        />
        {/* HERO SECTION */}
        {/* HERO SECTION (raw) */}
        {/* <section className="relative isolate overflow-hidden bg-[var(--bg-ivory)] p-8 md:p-16 rounded-3xl shadow-lg ">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--sage-200)] via-transparent to-transparent"
          />

          <div className="relative z-10 max-w-3xl">
            <div className="eyebrow text-[var(--muted-400)]">
              Outcomes over hype
            </div>

            <h1 className="h1 mt-2 animate-fadeUp">
              Get <span className="text-[var(--green-forest-700)]">backed</span>
              . Get
              <span className="text-[var(--green-forest-700)]"> seen</span>. Get{" "}
              <span className="text-[var(--green-forest-700)]">heard</span>. Get{" "}
              <span className="text-[var(--green-forest-700)]">paid</span>.
            </h1>

            <p className="subhead mt-4 max-w-2xl animate-fadeUp [animation-delay:150ms]">
              Practical websites. Real SEO. Clear coaching. Honest imagery.
              <br className="hidden md:block" />
              Everything you need to look credible, rank locally, and grow with
              confidence.
            </p>

            <ul className="mt-6 space-y-2 text-[var(--ink-700)] animate-fadeUp [animation-delay:300ms]">
              <li>
                ✔️ Launch a <strong>Lead-Machine Site</strong> in 14 days.
              </li>
              <li>
                ✔️ Kickstart your <strong>Local SEO</strong> and get found on
                Maps.
              </li>
              <li>
                ✔️ Stay <strong>accountable</strong> with coaching and real
                progress.
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3 animate-fadeUp [animation-delay:450ms]">
              <button className="btn btn-primary">Shop Services</button>
              <button className="btn btn-secondary">Visit Free Aisle</button>
            </div>
          </div>
        </section> */}

        {/* Alternating band */}
        <section style={{ background: "var(--cream)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-xl font-semibold">Why we’re different</h2>
            <p className="mt-3 text-[var(--ink-700)]">
              Evidence-minded. Human-first. Clear results.
            </p>
          </div>
        </section>
      </main>

      {/* Inline keyframes to avoid extra file; place this in globals.css later if you like */}
      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 0.6s var(--ease-out) forwards;
          opacity: 0;
        }
        [animation-delay\\: 150ms] {
          animation-delay: 150ms;
        }
        [animation-delay\\: 300ms] {
          animation-delay: 300ms;
        }
        [animation-delay\\: 450ms] {
          animation-delay: 450ms;
        }
      `}</style>
    </>
  );
}

