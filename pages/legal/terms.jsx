import { Meta } from "@/lib/seo";
import SiteContainer from "@/components/layout/SiteContainer";

export default function Terms() {
  const updated = "2026-01-04";
  return (
    <>
      <Meta
        title="Terms of Service"
        description="Readable Terms for Brought to Life Solutions."
      />

      {/* Hero */}
      <section className="bg-ivory pt-16">
        <SiteContainer>
          <div
            className="mt-6 rounded-[var(--r-lg)] border border-[var(--border)] p-8 md:p-12"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--white) 96%, var(--green-500)) 0%, var(--white) 100%)",
            }}
          >
            <div className="eyebrow mb-2">Legal</div>
            <h1 className="h1">Terms of Service</h1>
            <p className="text-sm text-ink-muted mt-2">
              Last updated: {updated}
            </p>
            <p className="subhead mt-4 max-w-2xl">
              Productized systems with clear scope, timelines, and fair
              policies.
            </p>
          </div>
        </SiteContainer>
      </section>

      {/* Body */}
      <section className="section">
        <SiteContainer>
          <div className="card p-6 md:p-8 space-y-8">
            <section>
              <h2 className="h2">Scope</h2>
              <p className="mt-2 text-ink-muted">
                Brought to Life Solutions provides productized website and
                revenue-system services. Each product page (or written scope)
                defines what is included and what is not included.
              </p>
              <p className="mt-3 text-ink-muted">
                We do not provide open-ended consulting. Introductory calls are
                used for routing and fit, not audits or troubleshooting.
              </p>
            </section>

            <section>
              <h2 className="h2">Purchases, invoices, and payment</h2>
              <p className="mt-2 text-ink-muted">
                Payments are processed through Stripe (Checkout or invoice),
                unless otherwise agreed in writing. Work is scheduled only after
                payment requirements and intake steps are completed.
              </p>
              <p className="mt-3 text-ink-muted">
                If a payment fails or is reversed, delivery may pause until the
                account is brought current.
              </p>
            </section>

            <section>
              <h2 className="h2">
                Scheduling, timelines, and client responsibilities
              </h2>
              <p className="mt-2 text-ink-muted">
                Timelines vary by product and are confirmed after intake.
                Delivery depends on timely access to required materials (e.g.,
                copy approvals, brand assets, hosting/domain access, third-party
                logins).
              </p>
              <p className="mt-3 text-ink-muted">
                If required inputs are delayed, timelines pause until the
                missing items are received.
              </p>
            </section>

            <section>
              <h2 className="h2">Revisions</h2>
              <p className="mt-2 text-ink-muted">
                Revisions are limited to the number and type listed on the
                product page or written scope. Requests outside scope may
                require a change order or a separate purchase.
              </p>
            </section>

            <section>
              <h2 className="h2">Cancellations & refunds</h2>
              <p className="mt-2 text-ink-muted">
                Refund eligibility depends on whether work has started. “Work
                started” means we have begun producing deliverables or completed
                setup tasks beyond intake (e.g., technical configuration,
                drafts, builds, or implementation).
              </p>

              <ul className="mt-3 list-disc pl-6 text-ink-muted space-y-1">
                <li>
                  <strong>Full refund</strong> if canceled within 48 hours of
                  purchase <em>and</em> before work has started.
                </li>
                <li>
                  <strong>Partial refund</strong> if work has started, based on
                  completed milestones or work delivered.
                </li>
                <li>
                  <strong>No refund</strong> after final delivery or once the
                  system has been deployed, whichever applies.
                </li>
              </ul>

              <p className="mt-3 text-ink-muted">
                If a product includes third-party costs (domains, hosting, paid
                plugins, ads, or subscriptions), those charges are
                non-refundable.
              </p>
            </section>

            <section>
              <h2 className="h2">Intellectual property</h2>
              <p className="mt-2 text-ink-muted">
                Upon full payment, you receive the right to use the delivered
                work for your business. You retain ownership of content you
                provide. We retain ownership of our underlying frameworks,
                templates, and internal tooling used to produce the
                deliverables.
              </p>
              <p className="mt-3 text-ink-muted">
                Third-party assets and software remain subject to their original
                licenses.
              </p>
            </section>

            <section>
              <h2 className="h2">Limitation of liability</h2>
              <p className="mt-2 text-ink-muted">
                We are not liable for indirect or consequential losses. Our
                total liability for any claim is limited to the amount paid for
                the specific product or service giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="h2">Privacy</h2>
              <p className="mt-2 text-ink-muted">
                See our{" "}
                <a className="underline" href="/legal/privacy">
                  Privacy Policy
                </a>{" "}
                for data practices.
              </p>
            </section>

            <section>
              <h2 className="h2">Contact</h2>
              <p className="mt-2 text-ink-muted">
                Questions? Email{" "}
                <a
                  className="underline"
                  href="mailto:hello@broughttolife.studio"
                >
                  hello@broughttolife.studio
                </a>
                .
              </p>
            </section>
          </div>
        </SiteContainer>
      </section>
    </>
  );
}
