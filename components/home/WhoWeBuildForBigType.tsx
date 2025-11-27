// /components/WhoWeBuildForBigType.tsx
export function WhoWeBuildForBigType() {
  return (
    <section
      id="for-owners-predictable-revenue"
      className="bg-[var(--bg-ivory)]"
      aria-labelledby="for-owners-heading"
    >
      <div className="mx-auto max-w-10/12 px-4 sm:px-6 py-24 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-start">
          {/* Big type block */}
          <div className="lg:col-span-7">
            <p className="eyebrow text-[var(--muted)] mb-4 animate-fadeUp">
              WHO THIS IS FOR
            </p>

            <h2
              id="for-owners-heading"
              className="font-body text-4xl sm:text-5xl lg:text-6xl font-semibold leading-none tracking-tight text-[var(--ink-900)] animate-fadeUp"
            >
              For owners who want{" "}
              <span className="font-semibold text-[var(--pine-tree)]">
                predictable
              </span>{" "}
              revenue.
            </h2>

            {/* Thin baseline accent */}
            <div className="mt-6 h-[2px] w-16 rounded-full bg-[var(--pine-tree)] animate-fadeUp" />
          </div>

          {/* Explanatory copy + profiles */}
          <div className="lg:col-span-5 lg:pt-4 space-y-6 animate-fadeUp">
            <p className="subhead text-[var(--ink-700)] max-w-md">
              BTLS is for people who treat their website like infrastructure,
              not decoration. You care about leads, credibility, and operational
              sanity — not just how your homepage looks in a screenshot.
            </p>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
              <div className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--pine-tree)]" />
                <p>
                  You want your calendar and inbox to reflect your actual
                  potential, not the leftovers from word-of-mouth.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--pine-tree)]" />
                <p>
                  You’re done gambling on random tactics, one-off “pretty
                  sites,” and campaigns you can’t measure.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--pine-tree)]" />
                <p>
                  You’re ready to install a calm, durable system wired into
                  Visibility, Proof, Conversion, Offer Strength, Operations, and
                  Analytics.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--pine-tree)]" />
                <p>
                  You prefer clear numbers and honest conversations over hype,
                  trends, and guesswork.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--pine-tree)]" />
                <p>
                  You’re a new or growing business that needs a website
                  engineered to scale with you — not something you’ll outgrow in
                  six months.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
