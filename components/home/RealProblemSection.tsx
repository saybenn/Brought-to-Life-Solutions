// components/sections/RealProblemSection.tsx

export function RealProblemSection() {
  return (
    <section className="bg-[var(--bg-ivory)] text-[var(--ink-900)]">
      <div className="mx-auto max-w-10/12 px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left: Who + pain + root cause */}
          <div className="order-2 space-y-5 border-[var(--border)] lg:order-1 lg:col-span-2 lg:border-r lg:pr-10">
            <div className="space-y-2">
              <h2 className="font-head text-2xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] sm:text-3xl">
                We build for businesses that know the internet should be doing
                more for them.
              </h2>

              <p className="subhead leading-relaxed text-[var(--ink-700)] sm:text-sm">
                Whether you&apos;re establishing your first real web presence,
                fixing a site that doesn&apos;t convert, or trying to capture
                more of the opportunity already available online — the problem
                is usually the same.
              </p>
            </div>

            <div className="pt-2">
              <p className="eyebrow mb-3 text-[var(--ink-700)] font-bold border-b border-[var(--border)]">
                IF THIS IS YOUR ISSUE
              </p>

              <ul className="space-y-2 text-sm leading-relaxed text-[var(--ink-700)] sm:text-base">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted)]" />
                  <span>Leads feel random — feast or famine.</span>
                </li>

                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted)]" />
                  <span>Your site looks fine, but it doesn&apos;t book.</span>
                </li>

                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted)]" />
                  <span>Follow-up relies on memory and manual effort.</span>
                </li>

                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted)]" />
                  <span>You can&apos;t see what&apos;s working.</span>
                </li>
              </ul>
            </div>
            <div className="pt-2">
              <p className="eyebrow mb-3 text-[var(--ink-700)] font-bold border-b border-[var(--border)]">
                THIS IS YOUR SOLUTION
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-[var(--ink-700)] sm:text-base">
                <li>• Capture leads without leaking interest</li>
                <li>• Qualify visitors before they waste your time</li>
                <li>• Follow up without relying on memory</li>
                <li>• Use proof to reduce hesitation</li>
                <li>• Make the offer obvious and easy to act on</li>
                <li>• Track what is working so improvement is not guesswork</li>
              </ul>
            </div>

            <h2 className="font-head text-2xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] sm:text-3xl">
              Systems are the difference between a handsome site that simply
              exists and{" "}
              <span className="font-bold text-[var(--green-pine-800)]">
                infrastructure that moves the needle.
              </span>
            </h2>
          </div>

          {/* Right: Diagnosis + philosophy */}
          <div className="order-1 mt-6 space-y-7 text-left sm:mt-0 lg:order-2 lg:col-span-3 lg:ml-auto lg:mt-0 lg:text-right">
            <div className="ml-auto w-fit">
              <p className="eyebrow border-b border-[var(--border)] pb-2 text-xs font-semibold text-[var(--muted)] sm:text-sm">
                01. THE REAL PROBLEM
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] animate-fadeUp sm:text-4xl md:text-5xl lg:text-7xl">
                <span className="mb-3 block text-2xl font-body sm:mb-4 sm:text-3xl md:text-4xl">
                  Many have bought {""}
                  <span className="text-[var(--green-pine-800)]">the lie.</span>
                </span>

                <span className="font-head text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="block text-5xl sm:text-5xl md:text-6xl lg:text-7xl">
                    Websites are not{" "}
                    <span className="text-[var(--green-pine-800)]">
                      digital brochures.
                    </span>
                  </span>
                  They are supposed to be mechanisms that bring owners{" "}
                  <span className="font-semibold text-[var(--pine-tree)]">
                    predictable income.
                  </span>
                </span>
              </h2>

              <p className="subhead w-full text-[var(--ink-700)] sm:w-11/12 lg:ml-auto lg:w-3/4">
                If it doesn&apos;t help you get seen, trusted, followed up with,
                and booked, it&apos;s dead weight.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
