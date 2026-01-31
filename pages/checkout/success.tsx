// /pages/checkout/success.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { track } from "@/lib/analytics"; // adjust path if needed
import { OFFER_DETAILS_BY_ID } from "@/lib/catalog/offerDetails";

type VerifyResponse = {
  verified: boolean;
  error?: string;
  mode?: string | null;
  payment_status?: string | null;
  offer_id?: string | null;
  offer_category?: string | null;
  cta_location?: string | null;
  session_id?: string | null; // your internal uuid stored in Stripe metadata
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  payment_plan?: string | null;
  installments?: string | null;
};

export default function CheckoutSuccess() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "verified" | "unverified">(
    "loading",
  );
  const [verifiedOfferId, setVerifiedOfferId] = useState<string | null>(null);

  const [message, setMessage] = useState<string>("");

  const stripeSessionId = useMemo(() => {
    const v = router.query.session_id;
    return typeof v === "string" ? v : "";
  }, [router.query.session_id]);

  useEffect(() => {
    if (!router.isReady) return;
    if (!stripeSessionId) {
      setStatus("unverified");
      setMessage("Missing session reference.");
      return;
    }

    let didFire = false;

    (async () => {
      try {
        const res = await fetch(
          `/api/orders/verify?session_id=${encodeURIComponent(stripeSessionId)}`,
        );
        const data = (await res.json()) as VerifyResponse;

        if (data.verified) {
          setStatus("verified");
          setMessage("");
          setVerifiedOfferId(data.offer_id || null);

          if (!didFire) {
            didFire = true;
            track("checkout_completed", {
              offer_id: data.offer_id || undefined,
              offer_category: data.offer_category || undefined,
              cta_location: data.cta_location || "checkout_success",
              payment_mode: data.payment_plan === "true" ? "plan" : "full",
              session_id: data.session_id || undefined, // internal uuid
              utm_source: data.utm_source || undefined,
              utm_medium: data.utm_medium || undefined,
              utm_campaign: data.utm_campaign || undefined,
              utm_content: data.utm_content || undefined,
              utm_term: data.utm_term || undefined,
              stripe_session_id: stripeSessionId,
            });
          }
        } else {
          setStatus("unverified");
          setMessage(data.error || "Payment could not be verified yet.");
        }
      } catch (e: any) {
        setStatus("unverified");
        setMessage(e?.message || "Verification failed.");
      }
    })();
  }, [router.isReady, stripeSessionId]);

  const purchasedOffer = useMemo(() => {
    if (!verifiedOfferId) return null;
    return OFFER_DETAILS_BY_ID[verifiedOfferId] || null;
  }, [verifiedOfferId]);

  const nextSteps = purchasedOffer?.purchase?.steps || [];

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
              Your spot is secured. Next, we&apos;ll send your intake link and
              confirm the start window by email.
            </p>

            <div className="mt-10 card p-6 sm:p-8 animate-fadeUp">
              {nextSteps.length > 0 ? (
                <div className="rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-page)] px-5 py-4">
                  <p className="eyebrow text-[var(--muted)]">
                    WHAT HAPPENS NEXT
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--ink-700)]">
                    {nextSteps.map((step, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 flex-none rounded-full bg-[var(--brand-600)]" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

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
