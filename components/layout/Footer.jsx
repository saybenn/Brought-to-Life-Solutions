// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand / intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900 text-xs font-semibold tracking-wide text-slate-50">
                BLS
              </div>
              <div className="text-sm font-semibold tracking-[0.22em] text-slate-900 uppercase">
                Brought to Life
                <br />
                Solutions
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-600">
              Calm, crafted websites and systems for serious small businesses.
              Practical builds, honest guidance, and visuals that feel like you
              — just sharper.
            </p>
            <p className="text-xs text-slate-500">
              Built for founders, local pros, and owners who care about their
              craft as much as their growth.
            </p>

            {/* Optional newsletter */}
            <form
              className="mt-4 space-y-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <p className="text-xs font-medium text-slate-700">
                Get occasional, no-fluff breakdowns on turning sites into
                revenue systems.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="h-9 flex-1 rounded-full border border-slate-300 bg-white px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-900 px-4 py-2 text-xs font-semibold text-slate-50 shadow-sm transition hover:bg-emerald-800"
                >
                  Get updates
                </button>
              </div>
            </form>
          </div>

          {/* Services */}
          <div className="text-sm">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Services
            </h3>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li>
                <Link href="/services/lead-machine" className="hover:underline">
                  Lead-Machine Websites
                </Link>
              </li>
              <li>
                <Link href="/services/local-seo" className="hover:underline">
                  Local SEO Kickstart
                </Link>
              </li>
              <li>
                <Link
                  href="/services/site-seo-bundles"
                  className="hover:underline"
                >
                  Site + SEO Bundles
                </Link>
              </li>
              <li>
                <Link href="/coaching" className="hover:underline">
                  1:1 Coaching
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:underline">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="text-sm">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Company
            </h3>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:underline">
                  Results
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:underline">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-sm space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Contact
            </h3>
            <div className="space-y-1 text-slate-700">
              <p className="text-xs font-medium text-slate-500">Email</p>
              <a
                href="mailto:hello@broughttolife.studio"
                className="text-sm text-emerald-900 underline-offset-2 hover:underline"
              >
                hello@broughttolife.studio
              </a>
            </div>

            <div>
              <Link
                href="/contact#book"
                className="inline-flex items-center justify-center rounded-full bg-emerald-900 px-5 py-2.5 text-xs font-semibold text-slate-50 shadow-sm transition hover:bg-emerald-800"
              >
                Book a call
              </Link>
              <p className="mt-2 text-xs text-slate-500">
                30-minute revenue call, no pressure.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-slate-200 pt-6">
          <div className="flex flex-col gap-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} Brought to Life Solutions. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/legal/privacy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="hover:underline">
                Terms of Service
              </Link>
              <Link href="/legal/refund" className="hover:underline">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
