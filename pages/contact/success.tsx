// pages/contact/success.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { track } from "@/lib/analytics";

type ContactPath = "routing" | "support" | "general";

type ContactPayload = {
  customer_id?: string;
  fullName?: string;
  email?: string;
  contactPath?: ContactPath;
  intent?: string;
  service?: string;
  notes?: string;
  utm?: Record<string, string> | null;
  submittedAt?: string;
  page?: string;
};

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export default function ContactSuccessPage() {
  const router = useRouter();
  const [payload, setPayload] = useState<ContactPayload | null>(null);
  const [checked, setChecked] = useState(false);

  const viewedRef = useRef(false);

  // Pattern A guard: require a routing form submission
  useEffect(() => {
    const p = safeParse<ContactPayload>(
      typeof window !== "undefined"
        ? sessionStorage.getItem("btl_contact_payload")
        : null,
    );

    const isValidRouting =
      Boolean(p) && (p?.contactPath ?? "routing") === "routing";

    if (!isValidRouting) {
      router.replace("/contact");
      return;
    }

    setPayload(p);
    setChecked(true);
  }, [router]);

  const calendlyUrl = useMemo(() => {
    return process.env.NEXT_PUBLIC_CALENDLY_URL || "";
  }, []);

  const prefill = useMemo(() => {
    const name = payload?.fullName?.trim() || "";
    const email = payload?.email?.trim() || "";
    const notes = payload?.notes || "";

    return {
      name,
      email,
      customAnswers: { a1: notes },
      a2: (payload as any)?.customerId || "", // requires Calendly question #2
    };
  }, [payload]);

  useCalendlyEventListener({
    onProfilePageViewed: () => {
      if (viewedRef.current) return;
      viewedRef.current = true;

      track("view booking", {
        location: "/contact/success",
        intent: "schedule routing call",
        service: "routing call",
        contact_path: "routing",
        customer_id: payload?.customer_id,
      });
    },
    onEventScheduled: (e) => {
      track("complete booking", {
        location: "/contact/success",
        intent: "schedule routing call",
        service: "routing call",
        contact_path: "routing",
        customer_id: payload?.customer_id,
        calendly_event_uri: e?.data?.payload?.event?.uri,
        calendly_invitee_uri: e?.data?.payload?.invitee?.uri,
      });
    },
  });

  if (!checked) return null;

  return (
    <section className="bg-[var(--bg-ivory)] text-[var(--ink-900)] py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center space-y-6">
        <p className="eyebrow text-[var(--muted)] text-sm md:border-b md:border-[var(--border)] pb-2 w-fit font-semibold mx-auto">
          MESSAGE RECEIVED
        </p>

        <h1 className="font-head font-bold text-4xl leading-tight sm:text-5xl lg:text-6xl">
          Thank you.
          <span className="block font-normal mt-1 text-[var(--green-pine-800)]">
            If you want to move faster, book the routing call now.
          </span>
        </h1>

        <p className="text-[var(--ink-700)] max-w-xl mx-auto">
          We&apos;ve received your request. Scheduling is optional — it simply
          helps us confirm fit and outline next steps without back-and-forth.
        </p>

        <div
          className="mt-8 rounded-[var(--r-lg)] border border-[var(--border)] p-5 sm:p-6 text-left"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--white) 96%, var(--green-500)) 0%, var(--white) 100%)",
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--ink-900)]">
                Routing Call Scheduler
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Choose a time that works. Your form details will carry into the
                booking notes.
              </p>
            </div>

            <Link
              href="/"
              className="shrink-0 text-sm font-semibold text-[var(--green-pine-800)] hover:underline underline-offset-4"
              onClick={() =>
                track("click cta", {
                  location: "contact success",
                  intent: "skip scheduling",
                  label: "Skip scheduling and return home",
                })
              }
            >
              Skip for now →
            </Link>
          </div>

          <div className="mt-5 overflow-hidden rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-elevated)]">
            <div style={{ height: 820 }}>
              {calendlyUrl ? (
                <InlineWidget
                  url={calendlyUrl}
                  styles={{ height: "820px" }}
                  prefill={prefill}
                />
              ) : (
                <div className="p-4 text-sm text-[var(--ink-700)]">
                  Calendly link missing. Set{" "}
                  <code className="rounded bg-[var(--bg-ivory)] px-1 py-0.5">
                    NEXT_PUBLIC_CALENDLY_URL
                  </code>
                  .
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
              <p className="text-sm font-semibold text-[var(--ink-900)]">
                No sales script
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                We&apos;ll confirm fit and the cleanest next step.
              </p>
            </div>

            <div className="rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
              <p className="text-sm font-semibold text-[var(--ink-900)]">
                15 minutes
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Short, direct, useful — even if we&apos;re not a match.
              </p>
            </div>

            <div className="rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
              <p className="text-sm font-semibold text-[var(--ink-900)]">
                Email still works
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                If you don&apos;t schedule, we&apos;ll reply within one business
                day.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-pine-800)] hover:underline underline-offset-4"
            onClick={() =>
              track("click cta", {
                location: "contact success",
                intent: "learn about us",
                label: "Learn how we think about structure and systems",
              })
            }
          >
            Learn how we think about structure and systems{" "}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
