// components/sections/WhoWeAre.tsx

import Link from "next/link";

export default function WhoWeAre() {
  return (
    <section className="bg-[var(--bg-ivory)] text-[var(--ink-900)] py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center space-y-6">
        {/* Eyebrow */}
        <p className="eyebrow text-[var(--muted)] text-sm md:border-b md:border-[var(--border)] pb-2 w-fit font-semibold mx-auto">
          .02 WHO WE ARE
        </p>

        {/* Headline */}
        <h2 className="font-head text-4xl leading-tight sm:text-5xl lg:text-6xl">
          Systems take the stress out of operating,
          <span className="block mt-1 text-[var(--green-pine-800)]">
            so you can enjoy your craft again.
          </span>
        </h2>

        {/* Subhead */}
        <p className="text-[var(--ink-700)] max-w-xl mx-auto">
          Many small businesses don’t struggle because of a lack of skill — they
          struggle because everything depends on them. We design clear, reliable
          systems that reduce friction, remove guesswork, and make growth feel
          manageable again.
        </p>

        {/* About link */}
        <div className="pt-4">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-pine-800)] hover:underline underline-offset-4"
          >
            Learn how we think about structure and systems
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
