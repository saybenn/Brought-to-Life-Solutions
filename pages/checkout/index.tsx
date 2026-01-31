// /pages/checkout.tsx
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { PRICING_CLIENT } from "@/lib/stripe/pricing.client";
import { OFFER_DETAILS } from "@/lib/catalog/offerDetails"; // adjust if your path/case differs
import { track } from "@/lib/analytics";

type PaymentMode = "full" | "plan";

function getUTMFromQuery(q: Record<string, any>) {
  return {
    utm_source: typeof q.utm_source === "string" ? q.utm_source : undefined,
    utm_medium: typeof q.utm_medium === "string" ? q.utm_medium : undefined,
    utm_campaign:
      typeof q.utm_campaign === "string" ? q.utm_campaign : undefined,
    utm_content: typeof q.utm_content === "string" ? q.utm_content : undefined,
    utm_term: typeof q.utm_term === "string" ? q.utm_term : undefined,
  };
}

function humanizeOfferId(id: string) {
  return id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CheckoutPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const offerId = useMemo(() => {
    const v = router.query.offerId;
    return typeof v === "string" ? v : "";
  }, [router.query.offerId]);

  const intent = useMemo(() => {
    const v = router.query.intent;
    return typeof v === "string" ? v : "";
  }, [router.query.intent]);

  // PRICING_CLIENT is ONLY for plan UI affordances (label/helper + hasPlan),
  // NOT for determining whether an offer is valid.
  const offerClient =
    offerId && offerId in PRICING_CLIENT
      ? PRICING_CLIENT[offerId as keyof typeof PRICING_CLIENT]
      : null;

  const offerTitle =
    (offerId && (OFFER_DETAILS as any)?.[offerId]?.title) ||
    offerClient?.title ||
    (offerId ? humanizeOfferId(offerId) : "");

  const canBuy = intent === "buy";
  const hasPlan = Boolean(offerClient?.hasPlan);

  async function startCheckout(paymentMode: PaymentMode) {
    try {
      if (!offerId) {
        setStatus("error");
        setError("Missing offerId.");
        return;
      }

      setStatus("loading");
      setError("");

      const session_id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : String(Date.now());

      const utm = getUTMFromQuery(router.query as any);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId,
          paymentMode,
          session_id,
          cta_location: "checkout_page",
          entry_path: router.asPath,
          referrer: typeof document !== "undefined" ? document.referrer : "",
          utm,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Checkout failed");

      if (!data?.url || typeof data.url !== "string") {
        throw new Error("Checkout failed: missing redirect URL.");
      }
      track("start checkout", {
        offer: offerId,
        location,
      });
      window.location.href = data.url;
    } catch (e: any) {
      setStatus("error");
      setError(e?.message || "Something went wrong");
    }
  }

  return (
    <main className="bg-[var(--bg-ivory)]">
      <section
        className="bg-[var(--bg-ivory)]"
        aria-labelledby="checkout-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 sm:py-24">
          <div className="border-l border-[var(--border)] pl-6 sm:pl-8">
            <p className="eyebrow text-[var(--muted)] animate-fadeUp">
              CHECKOUT
            </p>

            <h1
              id="checkout-heading"
              className="h2 mt-4 leading-tight animate-fadeUp"
            >
              Commit, calmly.
            </h1>

            <p className="subhead mt-4 text-[var(--ink-700)] animate-fadeUp">
              We normally start with a routing call to confirm fit and scope.
              This page exists for cases where you&apos;ve already been
              prescribed a next step.
            </p>

            <div className="mt-10 card p-6 sm:p-8 animate-fadeUp">
              {!offerId ? (
                <>
                  <p className="eyebrow text-[var(--muted)]">MISSING OFFER</p>
                  <p className="subhead mt-3 text-[var(--ink-700)]">
                    No offer was specified.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link className="btn btn-primary" href="/contact">
                      Start with Intake
                    </Link>
                    <Link className="btn btn-secondary" href="/process">
                      View the process
                    </Link>
                  </div>
                </>
              ) : !canBuy ? (
                <>
                  <p className="eyebrow text-[var(--muted)]">NEXT STEP</p>
                  <h2 className="h3 mt-3">Start with a routing call.</h2>
                  <p className="subhead mt-3 text-[var(--ink-700)]">
                    We&apos;ll confirm fit and route you into the right product.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link className="btn btn-primary" href="/contact">
                      Start with Intake
                    </Link>
                    <Link className="btn btn-secondary" href="/process">
                      View the process
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="eyebrow text-[var(--muted)]">
                    YOU&apos;RE BUYING
                  </p>
                  <h2 className="h3 mt-3">{offerTitle}</h2>

                  <p className="subhead mt-3 text-[var(--ink-700)]">
                    You&apos;ll be redirected to Stripe Checkout. Choose a
                    payment option below.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      className="btn btn-primary"
                      disabled={status === "loading"}
                      onClick={() => startCheckout("full")}
                    >
                      Pay in full
                    </button>

                    {hasPlan ? (
                      <button
                        className="btn btn-secondary"
                        disabled={status === "loading"}
                        onClick={() => startCheckout("plan")}
                      >
                        {offerClient?.planLabel || "Payment plan"}
                      </button>
                    ) : null}
                  </div>

                  {hasPlan && offerClient?.planHelperText ? (
                    <div className="mt-4 rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-page)] px-4 py-3">
                      <p className="caption text-[var(--ink-700)]">
                        {offerClient.planHelperText}
                      </p>
                    </div>
                  ) : null}

                  {status === "error" ? (
                    <div className="mt-4 rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-page)] px-4 py-3">
                      <p className="caption text-[var(--error)]">{error}</p>
                    </div>
                  ) : null}

                  <div className="mt-8">
                    <p className="caption text-[var(--muted)]">
                      If you haven’t had a routing call yet, start with intake.
                    </p>
                    <div className="mt-3">
                      <Link className="btn btn-secondary" href="/contact">
                        Start with Intake
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
