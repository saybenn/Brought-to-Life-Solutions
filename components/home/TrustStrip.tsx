// components/TrustStrip.tsx

type TrustItem = {
  label: string;
  sublabel?: string;
};

const TRUST_ITEMS: TrustItem[] = [
  { label: "SEO-ready foundation" },
  { label: "Analytics installed" },
  { label: "48-hour onboarding" },
  { label: "Revenue-first wireframes" },
  { label: "Conversion psychology built in" },
  { label: "Clear, predictable timelines" },
];

/* Simple inline icon – no extra deps */
function BulletIcon() {
  return (
    <span
      aria-hidden="true"
      className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--sage-200)]"
    >
      <span className="block h-2 w-2 rounded-full bg-[var(--green-forest-700)]" />
    </span>
  );
}

/* ===========================
 *  OPTION A – Editorial Strip
 *  (Moonsync-style: icons + labels)
 * =========================== */

export function TrustStripA() {
  return (
    <section
      aria-label="Why clients trust Brought to Life Solutions"
      className="bg-[var(--bg-ivory)]"
    >
      <div className="mx-auto max-w-5xl border-t border-[var(--border)]/70">
        <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-4 py-4 sm:py-5">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-center text-xs sm:text-sm text-[var(--ink-700)]"
            >
              <BulletIcon />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================
 *  OPTION B – Minimal Stripe
 *  (Text only, ultra-clean)
 * =========================== */

export function TrustStripB() {
  return (
    <section
      aria-label="Why clients trust Brought to Life Solutions"
      className="bg-[var(--bg-ivory)]"
    >
      <div className="mx-auto max-w-10/12 border-y border-dotted border-[var(--border)]/80">
        <div className="py-4 sm:py-5 text-center text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[var(--ink-900)]/80 font-semibold">
          SEO-ready foundation
          <span className="mx-3 text-[var(--muted-400)]">•</span>
          Analytics installed
          <span className="mx-3 text-[var(--muted-400)]">•</span>
          48-hour onboarding
          <span className="mx-3 text-[var(--muted-400)]">•</span>
          Revenue-first wireframes
          <span className="mx-3 text-[var(--muted-400)]">•</span>
          Clear, predictable timelines
        </div>
      </div>
    </section>
  );
}

/* ===========================
 *  OPTION C – Carded Microproof
 *  (Soft cards in a grid)
 * =========================== */

export function TrustStripC() {
  return (
    <section
      aria-label="Why clients trust Brought to Life Solutions"
      className="bg-[var(--bg-ivory)]"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-0 py-6 sm:py-8">
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
          {TRUST_ITEMS.slice(0, 6).map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-[14px] border border-[var(--border)] bg-[var(--bg-elevated)]/90 px-3 py-3 shadow-sm"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--sage-100)]">
                <span className="block h-2.5 w-2.5 rounded-full bg-[var(--green-forest-700)]" />
              </span>
              <span className="text-xs sm:text-sm text-[var(--ink-700)]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
