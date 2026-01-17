import { Meta } from "@/lib/seo";
import SiteContainer from "@/components/layout/SiteContainer";

export default function Privacy() {
  const updated = "2026-01-04";

  return (
    <>
      <Meta
        title="Privacy Policy"
        description="How we collect, use, and protect your data."
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
            <h1 className="h1">Privacy Policy</h1>
            <p className="text-sm text-ink-muted mt-2">
              Last updated: {updated}
            </p>
            <p className="subhead mt-4 max-w-2xl">
              A plain-English summary of what we collect, why we collect it, and
              how it&apos;s handled.
            </p>
          </div>
        </SiteContainer>
      </section>

      {/* Body */}
      <section className="section">
        <SiteContainer>
          <div className="card p-6 md:p-8 space-y-8">
            <section>
              <h2 className="h2">What we collect</h2>
              <p className="mt-2 text-ink-muted">
                We collect information you choose to provide, such as your name,
                email address, business details, and responses submitted through
                our forms. If you engage in a project, this may also include
                files, content, and access credentials you share with us.
              </p>
              <p className="mt-3 text-ink-muted">
                We also collect limited technical data, such as basic usage
                analytics (e.g., page views and general location) to understand
                how our site is used. This data does not identify you
                personally.
              </p>
            </section>

            <section>
              <h2 className="h2">How we use your information</h2>
              <p className="mt-2 text-ink-muted">
                We use your information to respond to inquiries, route requests
                appropriately, deliver services, communicate during active
                engagements, and improve how our site and systems function.
              </p>
              <p className="mt-3 text-ink-muted">
                We do not use your data for advertising purposes, and we do not
                sell personal information.
              </p>
            </section>

            <section>
              <h2 className="h2">Service providers</h2>
              <p className="mt-2 text-ink-muted">
                We rely on a small number of trusted third-party providers to
                operate our business, such as website hosting, analytics, email
                delivery, and payment processing (when applicable).
              </p>
              <p className="mt-3 text-ink-muted">
                These providers only receive information necessary to perform
                their services and are responsible for securing their own
                systems.
              </p>
            </section>

            <section>
              <h2 className="h2">Security</h2>
              <p className="mt-2 text-ink-muted">
                We take reasonable steps to protect the information you share
                with us. However, no system or transmission method is completely
                secure, and we cannot guarantee absolute security.
              </p>
              <p className="mt-3 text-ink-muted">
                Payment details are handled by third-party processors and are
                never stored directly on our servers.
              </p>
            </section>

            <section>
              <h2 className="h2">Your choices</h2>
              <p className="mt-2 text-ink-muted">
                You may request access to, correction of, or deletion of your
                personal information by contacting us. We&apos;ll respond within
                a reasonable timeframe, subject to any legal or operational
                requirements.
              </p>
            </section>

            <section>
              <h2 className="h2">Contact</h2>
              <p className="mt-2 text-ink-muted">
                Questions about this policy? Email{" "}
                <a className="underline" href="mailto:hello@broughttolife.co">
                  hello@broughttolife.co
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
