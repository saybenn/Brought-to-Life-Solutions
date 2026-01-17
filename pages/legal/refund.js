import { Meta } from "@/lib/seo";
import SiteContainer from "@/components/layout/SiteContainer";

export default function Refund() {
  const updated = "2026-01-04";

  return (
    <>
      <Meta
        title="Refund Policy"
        description="Clear and fair refund rules for productized services."
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
            <h1 className="h1">Refund Policy</h1>
            <p className="text-sm text-ink-muted mt-2">
              Last updated: {updated}
            </p>
            <p className="subhead mt-4 max-w-2xl">
              Clear, productized services with predictable refund rules.
            </p>
          </div>
        </SiteContainer>
      </section>

      {/* Body */}
      <section className="section">
        <SiteContainer>
          <div className="card p-6 md:p-8 space-y-8">
            <section>
              <h2 className="h2">Before work begins</h2>
              <p className="mt-2 text-ink-muted">
                You may request a full refund if you cancel within 48 hours of
                purchase <em>and</em> before work has started.
              </p>
              <p className="mt-3 text-ink-muted">
                “Work started” means we have begun producing deliverables or
                completed setup tasks beyond intake (such as technical
                configuration, drafts, builds, or implementation).
              </p>
            </section>

            <section>
              <h2 className="h2">After work has started</h2>
              <p className="mt-2 text-ink-muted">
                If work has started, you may be eligible for a partial refund.
                Partial refunds are calculated based on completed milestones or
                work delivered at the time of cancellation.
              </p>
              <p className="mt-3 text-ink-muted">
                Once a system has been fully delivered or deployed, no refunds
                are available.
              </p>
            </section>

            <section>
              <h2 className="h2">Non-refundable costs</h2>
              <p className="mt-2 text-ink-muted">
                Any third-party costs incurred on your behalf are
                non-refundable. This includes, but is not limited to, domains,
                hosting, paid plugins, subscriptions, advertising spend, or
                transaction fees.
              </p>
            </section>

            <section>
              <h2 className="h2">How refunds are issued</h2>
              <p className="mt-2 text-ink-muted">
                Approved refunds are issued to the original payment method.
                Processing times depend on the payment provider.
              </p>
            </section>

            <section>
              <h2 className="h2">Contact</h2>
              <p className="mt-2 text-ink-muted">
                Questions about this policy? Email{" "}
                <a className="underline" href="mailto:broughttolife.co">
                  broughttolife.co
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
