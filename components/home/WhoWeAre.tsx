// components/sections/WhoWeAre.tsx

import { track } from "@/lib/analytics";
import Link from "next/link";

export default function WhoWeAre() {
  return (
    <section className="bg-[var(--bg-ivory)] py-20 text-[var(--ink-900)] sm:py-24">
      <div className="mx-auto max-w-3xl space-y-6 px-4 text-center sm:px-6">
        <p className="eyebrow mx-auto w-fit border-b border-[var(--border)] pb-2 text-sm font-semibold text-[var(--muted)]">
          02. WHO WE ARE
        </p>

        <h2 className="font-head text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          A steady partner for integrating systems
          <span className="mt-1 block font-normal text-[var(--green-pine-800)]">
            that make business feel manageable again.
          </span>
        </h2>

        <div className="mx-auto max-w-xl space-y-4 text-[var(--ink-700)]">
          <p>
            Brought to Life Solutions works with owners who are skilled at what
            they do, but tired of everything depending on them.
          </p>

          <p>
            We design and build clear, reliable solutions that maximize a
            business's ability to leverage the internet to increase revenue and
            reduce operational friction.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-pine-800)] underline-offset-4 hover:underline"
            onClick={() =>
              track("click cta", {
                location: "who we are",
                intent: "learn about us",
                label: "Learn how we think about structure and systems",
              })
            }
          >
            Learn how we think about structure and systems
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
