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
              WHO WE BUILD FOR
            </p>

            <h2 className="font-body text-4xl sm:text-5xl lg:text-6xl font-semibold leading-none tracking-tight text-[var(--ink-900)] animate-fadeUp">
              <span className="block mb-4 lg:text-4xl">
                Tired of income feeling{" "}
                <span className="text-[var(--green-pine-800)]">random?</span>
              </span>
              Websites aren&apos;t digital brochures. They're mechanisms
              designed to bring owners{" "}
              <span className="font-semibold text-[var(--pine-tree)]">
                predictable income.
              </span>{" "}
              <br className="hidden sm:block" />
            </h2>

            {/* Thin baseline accent */}
            <div className="mt-6 h-[2px] w-16 rounded-full bg-[var(--pine-tree)] animate-fadeUp" />
          </div>

          {/* Explanatory copy + profiles */}
          <div className="lg:col-span-5 lg:pt-4 space-y-6 animate-fadeUp">
            <p className="subhead text-[var(--ink-700)] max-w-md">
              A webpage is a tool before anything else, and no matter how
              stylish a tool looks, if it doesn&apos;t help the owner, it&apos;s
              dead weight.
            </p>

            <ul className="space-y-2 text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
                <span>
                  Leads show up at random — some weeks slammed, other weeks
                  crickets.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
                <span>
                  Your website looks nice, but it doesn’t reliably bring in
                  sales.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
                <span>
                  You don’t really know what’s working — everything feels like
                  guesswork.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
                <span>
                  Marketing feels like gambling instead of something you can
                  plan around.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
                <span>
                  You’re constantly tweaking things manually instead of growing
                  with a system.
                </span>
              </li>
            </ul>

            <div className="space-y-3 pt-2">
              <p className="eyebrow text-[var(--muted)]">
                UNDER THE SURFACE, THE REAL CAUSE
              </p>
              <ul className="space-y-1.5 text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
                <li>
                  • <span>No visibility you can rely on.</span>
                </li>
                <li>
                  • <span>No proof that builds instant trust.</span>
                </li>
                <li>
                  •{" "}
                  <span>
                    No conversion path that turns visitors into buyers.
                  </span>
                </li>
                <li>
                  • <span>Offers that haven’t really been tested.</span>
                </li>
                <li>
                  • <span>Operations that slow everything down.</span>
                </li>
                <li>
                  • <span>Zero analytics to show what’s actually working.</span>
                </li>
              </ul>
            </div>
            {/* <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
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
                  You&apos;re done gambling on random tactics, one-off “pretty
                  sites,” and campaigns you can&apos;t measure.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--pine-tree)]" />
                <p>
                  You&apos;re ready to install a calm, durable system wired into
                  science, not vibes.
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
                  You&apos;re a new or growing business that needs a website
                  engineered to scale with you — not something you&apos;ll
                  outgrow in six months.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
