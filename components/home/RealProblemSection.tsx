// components/sections/RealProblemSection.tsx

export function RealProblemSection() {
  return (
    <section className="bg-[var(--bg-ivory)] text-[var(--ink-900)]">
      <div className="mx-auto max-w-10/12 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <p className="eyebrow text-[var(--muted)] text-xs sm:text-sm md:border-b md:border-[var(--border)] text-right pb-2 w-fit font-semibold ml-auto">
          01. WHO WE BUILD FOR
        </p>

        <div className="grid gap-10 sm:gap-12 lg:grid-cols-5 lg:gap-16 pt-10 sm:pt-12">
          {/* Left: Pain in their own words + root cause */}
          <div className="lg:order-1 order-2 space-y-6 md:space-y-7 md:pr-10 md:border-r md:border-[var(--border)] lg:col-span-2">
            <div className="space-y-2">
              <p className="eyebrow text-[var(--muted)]">THE ISSUE</p>
              <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                If this feels familiar, it’s not just you.
              </p>
            </div>

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

            <p className="caption text-[var(--muted)] pt-1 text-xs sm:text-sm">
              When your system is disconnected from the science that taps the
              source, your revenue isn&apos;t reliable. When you plug into the
              power, revenue is in your control.
            </p>
          </div>

          {/* Right: Dominant diagnosis headline */}
          <div className="space-y-6 order-1 lg:order-2 text-left lg:text-right lg:ml-auto mt-6 sm:mt-8 lg:mt-0 lg:col-span-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] animate-fadeUp">
              <span className="block mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-body">
                Don&apos;t believe{" "}
                <span className="text-[var(--green-pine-800)]">the lie.</span>
              </span>
              <span className="font-head text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  Websites aren&apos;t digital brochures.{" "}
                </span>
                They are mechanisms that use systems to bring owners{" "}
                <span className="font-semibold text-[var(--pine-tree)]">
                  predictable income.
                </span>
              </span>
            </h2>

            <p className="subhead text-[var(--ink-700)] w-full sm:w-11/12 lg:w-3/4 lg:ml-auto">
              Before anything else, a webpage is a tool, an expensive one at
              that. And no matter how stylish a tool looks, if it doesn&apos;t
              help the owner make money, it&apos;s dead weight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
