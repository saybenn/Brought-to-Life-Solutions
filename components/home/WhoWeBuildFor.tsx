// /components/WhoWeBuildFor.tsx
export function WhoWeBuildFor() {
  return (
    <section
      id="who-we-build-for"
      className="bg-[var(--bg-ivory)]"
      aria-labelledby="who-we-build-for-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 sm:py-24">
        <div className="border-l border-[var(--border)] pl-6 sm:pl-8">
          {/* Eyebrow */}
          <p className="eyebrow text-[var(--muted)] animate-fadeUp">
            WHO BTLS IS BUILT FOR
          </p>

          {/* Headline */}
          <h2
            id="who-we-build-for-heading"
            className="h2 mt-4 leading-tight animate-fadeUp"
          >
            Serious owners who want their site to behave like a revenue system.
          </h2>

          {/* Supporting sentence */}
          <p className="subhead mt-4 text-[var(--ink-700)] animate-fadeUp">
            We work with people who care more about clarity, credibility, and
            predictable income than trends, design drama, or one-off “pretty”
            sites.
          </p>

          {/* Identity bullets */}
          <ul className="mt-8 space-y-3 text-sm sm:text-base leading-relaxed text-[var(--ink-700)] animate-fadeUp">
            <li>
              – Local trades and home-service owners who need reliable leads,
              not random spikes.
            </li>
            <li>
              – Solo founders, consultants, and specialists whose offers are
              strong but whose sites feel DIY or disconnected.
            </li>
            <li>
              – Small teams whose business has outgrown the starter website they
              threw together years ago.
            </li>
            <li>
              – Established businesses that want their site, calendar, and inbox
              to finally reflect their real reputation.
            </li>
            <li>
              – Owners who want a calm, measurable system they can trust — not
              another experiment they have to babysit.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
