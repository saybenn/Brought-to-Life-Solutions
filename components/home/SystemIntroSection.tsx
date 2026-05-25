// components/home/SystemIntroSection.tsx

export function SystemIntroSection() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg-ivory)] text-[var(--ink-900)]">
      <div className="mx-auto max-w-10/12 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className="eyebrow w-fit border-b border-[var(--border)] pb-2 text-sm font-semibold text-[var(--muted)]">
              03. Choose the Right Build Path
            </p>

            <h2 className="mt-5 font-[var(--font-head)] text-3xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] sm:text-4xl lg:text-5xl">
              Different stages need different systems.
            </h2>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-[var(--ink-700)] sm:text-base">
            <p>
              Some businesses need a credible foundation. Some need a stronger
              website built around leads, tracking, and conversion. Others need
              ongoing structure after launch so the system keeps improving.
            </p>

            <p>
              The options below are organized to help you choose the path that
              fits where your business is now.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-soft)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Start
            </p>
            <h3 className="mt-3 font-[var(--font-head)] text-xl font-semibold text-[var(--ink-900)]">
              Establish the foundation.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">
              For businesses that need to look credible, be understood, and give
              visitors a clear next step.
            </p>
          </article>

          <article className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-soft)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Build
            </p>
            <h3 className="mt-3 font-[var(--font-head)] text-xl font-semibold text-[var(--ink-900)]">
              Install the revenue system.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">
              For businesses ready for stronger pages, clearer conversion paths,
              and visibility into what creates movement.
            </p>
          </article>

          <article className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-soft)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Grow
            </p>
            <h3 className="mt-3 font-[var(--font-head)] text-xl font-semibold text-[var(--ink-900)]">
              Improve what is already live.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">
              For businesses that need ongoing care, visibility, SEO support, or
              structured improvement after launch.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
