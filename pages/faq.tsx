import Head from "next/head";
import Link from "next/link";

import FullFaqSection from "@/components/faq/FullFaqSection";
import { track } from "@/lib/analytics";

export default function FaqPage() {
  return (
    <>
      <Head>
        <title>FAQ — Brought to Life Solutions</title>
        <meta
          name="description"
          content="Answers about BTLS systems, process, pricing, ownership, timelines, dashboard visibility, and ongoing support."
        />
      </Head>

      <main className="bg-[var(--bg-ivory)] text-[var(--ink-900)]">
        <section className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-10/12 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <p className="eyebrow w-fit border-b border-[var(--border)] pb-2 text-sm font-semibold text-[var(--muted)]">
                Frequently Asked Questions
              </p>

              <h1 className="mt-5 font-[var(--font-head)] text-4xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] sm:text-5xl lg:text-6xl">
                Clear answers before the work begins.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--ink-700)] sm:text-lg">
                This page gives more detail on process, pricing, ownership,
                dashboard visibility, and what it is like to work with Brought
                to Life Solutions.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/shop"
                  onClick={() =>
                    track("click cta", {
                      location: "faq hero",
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
                      location: "faq hero",
                      intent: "Request a routing call",
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

        <FullFaqSection />
      </main>
    </>
  );
}
