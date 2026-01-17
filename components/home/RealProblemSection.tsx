// components/sections/RealProblemSection.tsx

export function RealProblemSection() {
  return (
    <section className="bg-[var(--bg-ivory)] text-[var(--ink-900)]">
      <div className="mx-auto max-w-10/12 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <p className="eyebrow text-[var(--muted)] text-xs sm:text-sm md:border-b md:border-[var(--border)] text-right pb-2 w-fit font-semibold ml-auto">
          01. WHO WE BUILD FOR
        </p>

        <div className="grid gap-10 sm:gap-12 lg:grid-cols-5 lg:gap-16 pt-10 sm:pt-12">
          {/* Left: Pain + root cause */}
          <div className="lg:order-1 order-2 space-y-7 md:pr-10 md:border-r md:border-[var(--border)] lg:col-span-2">
            <div className="space-y-2">
              <p className="eyebrow text-[var(--muted)]">THE ISSUE</p>
            </div>

            <ul className="space-y-2 text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
                <span>Leads feel random — feast or famine.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
                <span>Your site looks fine, but it doesn&apos;t book.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
                <span>Follow-up relies on memory and manual effort.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
                <span>You can&apos;t see what&apos;s working.</span>
              </li>
            </ul>

            <p className="caption text-[var(--muted)] pt-1 text-xs sm:text-sm">
              It&apos;s not a design problem. It&apos;s missing infrastructure.{" "}
            </p>
            {/* Translation block */}
            <div className="lg:mr-auto w-full sm:w-11/12  rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.35)] backdrop-blur-sm p-5 sm:p-6">
              <p className="font-bold eyebrow text-[var(--ink-900)] mb-3">
                WHEN WE SAY “SYSTEMS,” WE MEAN:
              </p>

              <ul className="grid gap-2 text-sm sm:text-base text-[var(--ink-700)]">
                <li>• Lead capture that doesn’t leak</li>
                <li>• Qualification that filters bad fits</li>
                <li>• Follow-up that runs without chasing</li>
                <li>• Proof that reduces hesitation</li>
                <li>• Offers that feel obvious</li>
                <li>• Analytics that show what’s working</li>
              </ul>

              <p className="mt-4 text-xs sm:text-sm text-[var(--muted)]">
                Each piece reinforces the others. That’s how revenue becomes
                predictable.
              </p>
            </div>
          </div>

          {/* Right: Diagnosis + explicit systems translation */}
          <div className="space-y-7 order-1 lg:order-2 text-left lg:text-right lg:ml-auto mt-6 sm:mt-0 lg:mt-0 lg:col-span-3">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] animate-fadeUp">
                <span className="block mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-body">
                  Don&apos;t believe{" "}
                  <span className="text-[var(--green-pine-800)]">the lie.</span>
                </span>

                <span className="font-head text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    Websites aren&apos;t digital brochures.
                  </span>
                  They&apos;re mechanisms that bring owners{" "}
                  <span className="font-semibold text-[var(--pine-tree)]">
                    predictable income.
                  </span>
                </span>
              </h2>

              <p className="subhead text-[var(--ink-700)] w-full sm:w-11/12 lg:w-3/4 lg:ml-auto">
                A website is a tool. If it doesn’t help you get seen, trusted,
                and booked, it’s dead weight.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
