// /pages/checkout/canceled.tsx
import Link from "next/link";
import { useRouter } from "next/router";

export default function CheckoutCanceled() {
  const router = useRouter();
  const offerId =
    typeof router.query.offer_id === "string" ? router.query.offer_id : "";

  return (
    <main className="bg-[var(--bg-ivory)]">
      <section
        className="bg-[var(--bg-ivory)]"
        aria-labelledby="checkout-canceled-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 sm:py-24">
          <div className="border-l border-[var(--border)] pl-6 sm:pl-8">
            <p className="eyebrow text-[var(--muted)] animate-fadeUp">
              CHECKOUT
            </p>

            <h1
              id="checkout-canceled-heading"
              className="h2 mt-4 leading-tight animate-fadeUp"
            >
              Checkout canceled.
            </h1>

            <p className="subhead mt-4 text-[var(--ink-700)] animate-fadeUp">
              No problem. If you want to proceed later, start with intake and
              we&apos;ll route you.
            </p>

            <div className="mt-10 card p-6 sm:p-8 animate-fadeUp">
              {offerId ? (
                <div className="rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-page)] px-4 py-3">
                  <p className="caption text-[var(--muted)]">
                    Offer: {offerId}
                  </p>
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="btn btn-primary" href="/contact">
                  Start with Intake
                </Link>
                <Link className="btn btn-secondary" href="/process">
                  View the process
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
