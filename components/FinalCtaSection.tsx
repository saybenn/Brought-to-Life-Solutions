// components/FinalCtaSection.tsx
export default function FinalCtaSection() {
  return (
    <section
      id="final-cta"
      className="border-t border-slate-200 bg-slate-900"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
            Ready for a site that behaves like a revenue system?
          </p>
          <h2
            id="final-cta-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl"
          >
            Let’s map the money flow through your website.
          </h2>
          <p className="mt-4 text-sm text-slate-200 sm:text-base">
            If you’re serious about predictable income, not random spikes, we’ll
            spend 30 minutes looking at how your current site (or lack of one)
            helps or hurts that. No pitch deck, no fluff—just clarity on what
            would actually move the needle.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-slate-200">
            <li>• A quick look at how you currently get leads and sales</li>
            <li>• A simple map of where your site could support that flow</li>
            <li>
              • A sense of whether BTLS is the right fit—or if you’re better
              served elsewhere
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-200"
            >
              Book a 30-minute call
            </a>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-300 hover:text-slate-50"
            >
              Not ready yet? Get the summary
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            No pressure, no long funnels—just an honest look at whether a
            revenue-engineered site would pay for itself in your situation.
          </p>
        </div>
      </div>
    </section>
  );
}
