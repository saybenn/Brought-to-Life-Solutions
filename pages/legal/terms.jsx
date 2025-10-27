import { Meta } from "@/lib/seo";
import SiteContainer from "@/components/layout/SiteContainer";

export default function Terms() {
  const updated = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Meta
        title="Terms of Service"
        description="Readable Terms for Brought to Life Solutions."
      />

      {/* Hero */}
      <section className="bg-ivory pt-6">
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
              Productized services with clear scope, timelines, and fair
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
                We provide productized services (Web, SEO, Coaching,
                Photography). Each product page lists what’s included and not
                included.
              </p>
            </section>

            <section>
              <h2 className="h2">Payments & subscriptions</h2>
              <p className="mt-2 text-ink-muted">
                One-time purchases run via Stripe Checkout. Monthly plans renew
                until canceled. Failed payments may pause delivery.
              </p>
            </section>

            <section>
              <h2 className="h2">Timelines & client responsibilities</h2>
              <p className="mt-2 text-ink-muted">
                Lead-Machine Sites launch in 14 days from completed intake &
                assets. If inputs are late, timelines pause.
              </p>
            </section>

            <section>
              <h2 className="h2">Revisions & refunds</h2>
              <ul className="mt-2 list-disc pl-6 text-ink-muted space-y-1">
                <li>
                  Revisions: as listed on each product page (e.g., 2 rounds for
                  sites).
                </li>
                <li>
                  Refunds:
                  <ul className="list-disc pl-6 mt-1 space-y-1">
                    <li>
                      Full if cancelled within 48 hours before work begins.
                    </li>
                    <li>
                      Partial if work has started, proportional to work
                      delivered.
                    </li>
                    <li>None after final delivery.</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="h2">Intellectual property</h2>
              <p className="mt-2 text-ink-muted">
                Upon full payment, you receive a license to use deliverables for
                your business. Third-party assets keep their original licenses.
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
                <a className="underline" href="mailto:hello@example.com">
                  hello@example.com
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
