export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg-ivory)] border-t border-[var(--border)] mt-24">
      <div className=" mx-auto ">
        {/* Inner elevated panel */}
        <div className="rounded-t-[var(--r-lg)] bg-[var(--bg-elevated)] shadow-[var(--shadow-soft)] px-6 py-10 md:px-10 md:py-12">
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
            {/* Brand + Mission */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[var(--green-forest-700)] flex items-center justify-center text-xs font-semibold text-white">
                  BLS
                </div>
                <span className="text-sm tracking-[0.18em] uppercase font-semibold text-[var(--pine-tree)]">
                  Brought to Life Solutions
                </span>
              </div>

              <p className="text-sm text-[var(--ink-700)] leading-relaxed">
                Calm, crafted websites and systems for serious small businesses.
                Practical builds, honest guidance, and visuals that feel like
                you — just sharper.
              </p>

              <p className="text-xs text-[var(--muted-400)]">
                Built for founders, local pros, and owners who care about their
                craft as much as their growth.
              </p>
            </div>

            {/* Services */}
            <div className="space-y-3 text-sm">
              <h3 className="text-xs tracking-[0.18em] uppercase text-[var(--pine-tree)] font-bold">
                Services
              </h3>

              <ul className="space-y-2 text-[var(--ink-700)]">
                <li>
                  <a
                    href="/shop"
                    className="hover:text-[var(--green-forest-700)] transition-colors"
                  >
                    Lead-Machine Websites
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="hover:text-[var(--green-forest-700)] transition-colors"
                  >
                    Local SEO Kickstart
                  </a>
                </li>
                <li>
                  <a
                    href="/bundles"
                    className="hover:text-[var(--green-forest-700)] transition-colors"
                  >
                    Site + SEO Bundles
                  </a>
                </li>
                <li>
                  <a
                    href="/collections/coaching"
                    className="hover:text-[var(--green-forest-700)] transition-colors"
                  >
                    1:1 Coaching
                  </a>
                </li>
                <li>
                  <a
                    href="/resources"
                    className="hover:text-[var(--green-forest-700)] transition-colors"
                  >
                    Resources
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-3 text-sm">
              <h3 className="text-xs tracking-[0.18em] uppercase text-[var(--pine-tree)] font-bold">
                Company
              </h3>

              <ul className="space-y-2 text-[var(--ink-700)]">
                <li>
                  <a
                    href="/about"
                    className="hover:text-[var(--green-forest-700)] transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/results"
                    className="hover:text-[var(--green-forest-700)] transition-colors"
                  >
                    Results
                  </a>
                </li>
                <li>
                  <a
                    href="/resources"
                    className="hover:text-[var(--green-forest-700)] transition-colors"
                  >
                    Resources
                  </a>
                </li>
                <li>
                  <a
                    href="/legal/faq"
                    className="hover:text-[var(--green-forest-700)] transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-[var(--green-forest-700)] transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-3 text-sm">
              <h3 className="text-xs tracking-[0.18em] uppercase text-[var(--pine-tree)] font-bold">
                Contact
              </h3>

              <p className="text-[var(--ink-700)]">
                Email:
                <a
                  href="mailto:hello@broughttolifesolutions.com"
                  className="ml-1 underline decoration-[var(--green-forest-700)]/40 hover:text-[var(--green-forest-700)]"
                >
                  hello@broughttolifesolutions.com
                </a>
              </p>

              {/* Optional button — or remove if not needed */}
              <a
                href="/book"
                className="inline-flex items-center justify-center px-4 py-2 rounded-[999px] bg-[var(--green-forest-700)] text-xs font-medium text-white shadow-[var(--shadow-soft)] hover:bg-[var(--green-pine-800)] transition-colors"
              >
                Book a call
              </a>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-xs text-[var(--muted-400)]">
              © {year} Brought to Life Solutions. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-[var(--muted-400)]">
              <a
                href="/legal/privacy"
                className="hover:text-[var(--green-forest-700)]"
              >
                Privacy Policy
              </a>
              <a
                href="/legal/terms"
                className="hover:text-[var(--green-forest-700)]"
              >
                Terms of Service
              </a>
              <a
                href="/legal/refunds"
                className="hover:text-[var(--green-forest-700)]"
              >
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
