// /pages/checkout/success.tsx
import Link from "next/link";
import { useRouter } from "next/router";

export default function CheckoutSuccess() {
  const router = useRouter();
  const stripeSessionId =
    typeof router.query.session_id === "string" ? router.query.session_id : "";

  return (
    <main className="bg-[var(--bg-ivory)]">
      <section
        className="bg-[var(--bg-ivory)]"
        aria-labelledby="checkout-success-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 sm:py-24">
          <div className="border-l border-[var(--border)] pl-6 sm:pl-8">
            <p className="eyebrow text-[var(--muted)] animate-fadeUp">
              CONFIRMED
            </p>

            <h1
              id="checkout-success-heading"
              className="h2 mt-4 leading-tight animate-fadeUp"
            >
              Payment received.
            </h1>

            <p className="subhead mt-4 text-[var(--ink-700)] animate-fadeUp">
              Your spot is secured. Next, we’ll send your intake link and
              confirm the start window by email.
            </p>

            <div className="mt-10 card p-6 sm:p-8 animate-fadeUp">
              <div className="rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-page)] px-5 py-4">
                <ul className="space-y-2 text-sm leading-relaxed text-[var(--ink-700)]">
                  <li>– Receipt and confirmation email from Stripe</li>
                  <li>– Intake form (business details + assets)</li>
                  <li>– A short kickoff message with next steps</li>
                </ul>
              </div>

              {stripeSessionId ? (
                <p className="caption mt-4 text-[var(--muted)]">
                  Stripe session: {stripeSessionId}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="btn btn-primary" href="/contact">
                  Go to Intake
                </Link>
                <Link className="btn btn-secondary" href="/process">
                  View the process
                </Link>
              </div>

              <p className="caption mt-6 text-[var(--muted)]">
                Note: this page should be upgraded to verify the Stripe session
                before showing “confirmed.”
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
