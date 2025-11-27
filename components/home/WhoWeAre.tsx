// components/home/WhoWeAre.tsx
import Image from "next/image";

const PRINCIPLES = [
  {
    eyebrow: "Stewardship over hype",
    title: "We treat your site like a revenue asset, not a design toy.",
    body: "Every decision has to answer one question: does this make it easier for the right person to find you, trust you, and take the next step?",
  },
  {
    eyebrow: "Clarity over cleverness",
    title: "Plain language beats clever slogans every time.",
    body: "Your visitors should know who you are, what you do, and why it matters in under six seconds — no decoding, no guessing.",
  },
  {
    eyebrow: "Systems over one-offs",
    title: "We build repeatable mechanics, not one-time launches.",
    body: "Your site plugs into six money sockets — Visibility, Proof, Conversion, Offer, Operations, and Analytics — so it can keep working long after launch.",
  },
];

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="section-pad bg-[var(--bg-ivory)]">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 lg:gap-16 items-center">
        {/* LEFT: COPY */}
        <div>
          <p className="eyebrow text-[var(--muted)] mb-2">
            Who we are &amp; how we think
          </p>
          <h2 className="h2 text-ink">
            Calm, revenue-minded builders — not hype merchants.
          </h2>

          <p className="subhead mt-4 max-w-xl text-ink-muted">
            Brought to Life Solutions exists to give serious owners a clear,
            honest online backbone — websites that are engineered to earn, not
            just exist.
          </p>

          <div className="mt-8 space-y-6">
            {PRINCIPLES.map((item) => (
              <article
                key={item.eyebrow}
                className="border-l border-[color-mix(in_oklab,var(--border)_80%,transparent)] pl-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  {item.eyebrow}
                </p>
                <h3 className="mt-1 text-base md:text-lg font-semibold text-[var(--ink-900)]">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm md:text-base text-[var(--ink-700)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <p className="caption mt-6 text-[var(--muted)]">
            Translation: we don&apos;t chase trends. We build quiet, durable
            systems that plug into the same forces every successful business
            obeys.
          </p>
        </div>

        {/* RIGHT: IMAGERY */}
        <div className="relative">
          {/* Main portrait */}
          <div className="glass relative h-[320px] md:h-[420px] lg:h-[460px] w-full rounded-[var(--r-lg)] overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
            <Image
              src="/images/philosophy-portrait.jpg"
              alt="Founder thinking through revenue-first web strategy at a calm, crafted workspace"
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Detail inset – hands / craft shot */}
          <div className="hidden md:block absolute -bottom-6 -left-6 w-[180px] h-[130px] rounded-[var(--r-md)] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.18)] border border-[color-mix(in_oklab,var(--border)_90%,transparent)] bg-[var(--bg-elevated)]">
            <Image
              src="/images/philosophy-detail.jpg"
              alt="Hands refining a site build — code, plants, and camera on the desk"
              fill
              sizes="180px"
              className="object-cover object-center"
            />
          </div>

          {/* Label chip */}
          <div className="hidden md:inline-flex absolute top-4 right-4 rounded-full bg-[color-mix(in_oklab,var(--pine-tree)_8%,var(--bg-elevated)_92%)] px-3 py-1 text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--ink-700)]">
            Revenue-first philosophy
          </div>
        </div>
      </div>
    </section>
  );
}
