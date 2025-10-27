import { Meta } from "@/lib/seo";
import SiteContainer from "@/components/layout/SiteContainer";

export default function Privacy() {
  const updated = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Meta
        title="Privacy Policy"
        description="How we collect, use, and protect your data."
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
            <h1 className="h1">Privacy Policy</h1>
            <p className="text-sm text-ink-muted mt-2">
              Last updated: {updated}
            </p>
            <p className="subhead mt-4 max-w-2xl">
              A plain-English summary of what we collect, why we collect it, and
              how you can control it.
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
                Contact details you provide, project inputs, files you upload,
                and basic usage analytics (GA4).
              </p>
            </section>

            <section>
              <h2 className="h2">How we use it</h2>
              <p className="mt-2 text-ink-muted">
                To deliver services, support you, improve our site, and comply
                with the law.
              </p>
            </section>

            <section>
              <h2 className="h2">Sharing</h2>
              <p className="mt-2 text-ink-muted">
                We use trusted processors such as Stripe (payments) and Resend
                (email). We don’t sell your data.
              </p>
            </section>

            <section>
              <h2 className="h2">Security</h2>
              <p className="mt-2 text-ink-muted">
                We take reasonable measures to protect your data—but no method
                is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="h2">Your rights</h2>
              <p className="mt-2 text-ink-muted">
                You can request access, correction, or deletion of your data at{" "}
                <a
                  className="underline"
                  href="mailto:broughttolife.solutions@gmail.com"
                >
                  broughttolife.solutions@gmail.com
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
