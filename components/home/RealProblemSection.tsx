// components/sections/RealProblemSection.tsx

export function RealProblemSection() {
  return (
    <section className="bg-[var(--bg-ivory)] text-[var(--ink-900)]">
      <div className="mx-auto max-w-10/12 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          {/* Left: Core argument */}
          <div className="space-y-5">
            <p className="eyebrow w-fit border-b border-[var(--border)] pb-2 text-xs font-semibold text-[var(--muted)] sm:text-sm">
              01. The Problem
            </p>

            <h2 className="font-head text-3xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] sm:text-4xl lg:text-5xl">
              Many businesses were sold websites as{" "}
              <span className="text-[var(--green-pine-800)]">
                static brochures.
              </span>
            </h2>

            <p className="max-w-2xl text-sm leading-relaxed text-[var(--ink-700)] sm:text-base">
              The stronger path is a system built to support visibility, trust,
              conversion, follow-up, and measurement. If the site does not help
              people find you, trust you, contact you, and move forward, it is
              not carrying enough of the business load.
            </p>
          </div>

          {/* Right: Fast diagnosis */}
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-soft)] sm:p-6 lg:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              What the system is built to solve
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-head text-xl font-semibold text-[var(--ink-900)]">
                  When the pieces are scattered
                </h3>

                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--ink-700)]">
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted)]" />
                    <span>Leads feel random.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted)]" />
                    <span>The site looks fine, but does not book.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted)]" />
                    <span>Follow-up relies on memory.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted)]" />
                    <span>You cannot see what is working.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-head text-xl font-semibold text-[var(--ink-900)]">
                  When the system is connected
                </h3>

                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--ink-700)]">
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--green-pine-800)]" />
                    <span>Interest is easier to capture.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--green-pine-800)]" />
                    <span>The offer is easier to understand.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--green-pine-800)]" />
                    <span>Proof reduces hesitation.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--green-pine-800)]" />
                    <span>Improvement is based on evidence.</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-5 border-t border-[var(--border)] pt-4 font-head text-xl font-semibold leading-snug text-[var(--ink-900)]">
              Systems are the difference between a handsome site that simply
              exists and{" "}
              <span className="text-[var(--green-pine-800)]">
                infrastructure that supports the business.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
