// /components/WhoWeBuildForShelf.tsx
export function WhoWeBuildForShelf() {
  return (
    <section
      id="who-we-build-for"
      className="bg-[var(--bg-ivory)]"
      aria-labelledby="who-we-build-for-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-20 sm:py-24">
        {/* Eyebrow */}
        <p className="eyebrow text-[var(--muted)] mb-4 animate-fadeUp">
          WHO BTLS IS BUILT FOR
        </p>

        {/* Color “shelf” with headline */}
        <div className="relative animate-fadeUp">
          <div className="absolute inset-0 -z-10 rounded-full bg-[var(--sage-soft)]" />
          <div className="px-5 sm:px-8 py-3 sm:py-4 rounded-full">
            <h2
              id="who-we-build-for-heading"
              className="font-body text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[var(--ink-900)]"
            >
              Built for owners who treat their website like infrastructure, not
              a logo holder.
            </h2>
          </div>
        </div>

        {/* Supporting sentence */}
        <p className="subhead mt-6 text-[var(--ink-700)] max-w-2xl animate-fadeUp">
          We partner with people who want calm, measurable revenue systems — not
          design experiments, random spikes, or campaigns they have to babysit.
        </p>

        {/* Optional small accent rule echoing the shelf */}
        <div className="mt-8 h-[3px] w-10 rounded-full bg-[var(--pine-tree)] animate-fadeUp" />

        {/* Identity archetypes */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm sm:text-base leading-relaxed text-[var(--ink-700)] animate-fadeUp">
          <div>
            <p className="font-semibold text-[var(--ink-900)]">
              The Local Operator
            </p>
            <p>
              Trades and home-service owners who need a steady, trackable
              pipeline of jobs — not feast-or-famine referrals.
            </p>
          </div>

          <div>
            <p className="font-semibold text-[var(--ink-900)]">
              The Solo Specialist
            </p>
            <p>
              Consultants, coaches, and experts whose offers are strong, but
              whose current site feels DIY and undersells their value.
            </p>
          </div>

          <div>
            <p className="font-semibold text-[var(--ink-900)]">
              The Growing Practice
            </p>
            <p>
              Small teams with more demand, more services, and more moving parts
              than their starter website can handle.
            </p>
          </div>

          <div>
            <p className="font-semibold text-[var(--ink-900)]">
              The Systems-Minded Founder
            </p>
            <p>
              Owners who want their site plugged into Visibility, Proof,
              Conversion, Offer Strength, Operations, and Analytics — so
              attention reliably turns into income.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
