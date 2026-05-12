import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  cardBase,
  heading,
  body,
  muted,
  btnOutline,
} from "@/components/contact/ui";
import { track } from "@/lib/analytics";

type Payload = {
  customer_id?: string;
  fullName?: string;
  email?: string;
  contactPath?: "routing" | "support" | "general";
  notes?: string;
};

function safeGetPayload(): Payload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem("btl_contact_payload");
    return raw ? (JSON.parse(raw) as Payload) : null;
  } catch {
    return null;
  }
}

export default function BookingConfirmedPage() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const p = safeGetPayload();
    setName(p?.fullName?.trim() || null);

    track("confirmed booking", {
      location: "/book/confirmed",
      intent: "routing call booked",
      service: "routing call",
      contact_path: "routing",
      customer_id: p?.customer_id,
    });
  }, []);
  return (
    <>
      <Head>
        <title>Booked | Brought to Life Solutions</title>
        <meta name="description" content="Your routing call is booked." />
      </Head>

      <main className="min-h-screen pt-16 bg-[var(--bg-page)] text-[var(--ink-700)]">
        <div className="px-4 pt-12 pb-16">
          <div className="mx-auto max-w-3xl">
            <section className={`${cardBase} p-5 sm:p-6`}>
              <p className="text-sm font-semibold text-[var(--muted)]">
                BOOKING CONFIRMED
              </p>

              <h1 className={`${heading} mt-2 text-2xl sm:text-3xl`}>
                {name ? `Thanks, ${name}.` : "Thanks."} Your call is booked.
              </h1>

              <p className={`${body} mt-3`}>
                You&apos;ll receive a calendar confirmation by email. This call
                is used to confirm fit and determine the cleanest next step.
              </p>

              <div className="mt-5 rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
                <p className="text-sm font-semibold text-[var(--ink-900)]">
                  Please come prepared with:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-[var(--ink-700)]">
                  <li>• Your primary goal</li>
                  <li>• Your current website status (or lack of one)</li>
                  <li>• Any constraints (timeline, budget range, capacity)</li>
                </ul>
                <p className={`${muted} mt-3 text-sm`}>
                  Calls are time-bound and structured. They are not audits or
                  consulting sessions.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/" className={btnOutline}>
                  Return Home
                </Link>

                <Link
                  href="/process"
                  className={btnOutline}
                  onClick={() =>
                    track("click cta", {
                      location: "booking confirmed",
                      intent: "review process",
                      label: "Review Process",
                    })
                  }
                >
                  Review the Process
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
