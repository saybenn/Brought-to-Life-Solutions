// components/Footer.tsx
import Link from "next/link";

const SERVICES = [
  { href: "/products/revenue-engine", label: "Lead-Machine Websites" },
  { href: "/products/local-seo-maintenance", label: "Local SEO Kickstart" },
] as const;

const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/case-studies/bold-city-iaq", label: "Results" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
] as const;

// MVP note: keep Refund Policy only if you take payment on-site / via checkout.
// If you’re not collecting payment yet, set to false for now.
const SHOW_REFUND_POLICY = true;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-slate-200 bg-slate-50"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand / posture */}
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
              Built to remove guesswork and make growth feel predictable.
            </p>

            {/* Optional: keep only if you’re actively publishing */}
            {/* <p className="text-xs text-slate-500">
              Occasional, no-fluff breakdowns on turning sites into revenue systems.
            </p> */}
          </div>

          {/* Services */}
          <nav className="text-sm" aria-label="Services">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Services
            </h3>
            <ul className="mt-4 space-y-2 text-slate-700">
              {SERVICES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:underline underline-offset-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav className="text-sm" aria-label="Company">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Company
            </h3>
            <ul className="mt-4 space-y-2 text-slate-700">
              {COMPANY.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:underline underline-offset-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact (single action; no email intake in MVP) */}
          <div className="space-y-4 text-sm">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Contact
            </h3>

            <div>
              <Link
                data-track="click cta"
                data-location="footer"
                data-intent="Request a routing call"
                data-label="Request a routing call"
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-emerald-900 px-5 py-2.5 text-xs font-semibold text-slate-50 shadow-sm transition hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
              >
                Request routing call
              </Link>
              <p className="mt-2 text-xs text-slate-500">
                30-minute routing call. No pressure.
              </p>
            </div>
          </div>
        </div>

        {/* Divider + legal */}
        <div className="mt-10 border-t border-slate-200 pt-6">
          <div className="flex flex-col gap-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} Brought to Life Solutions. All rights reserved.</p>

            <nav aria-label="Legal">
              <ul className="flex flex-wrap gap-4">
                <li>
                  <Link
                    href="/legal/privacy"
                    className="hover:underline underline-offset-2"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/terms"
                    className="hover:underline underline-offset-2"
                  >
                    Terms
                  </Link>
                </li>
                {SHOW_REFUND_POLICY && (
                  <li>
                    <Link
                      href="/legal/refund"
                      className="hover:underline underline-offset-2"
                    >
                      Refunds
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
