// pages/contact/success.tsx
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { track } from "@/lib/analytics";

type ContactPath = "routing" | "support" | "general";

type ContactPayload = {
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
  const [payload, setPayload] = useState<ContactPayload | null>(null);

  useEffect(() => {
    const p = safeParse<ContactPayload>(
      typeof window !== "undefined"
        ? sessionStorage.getItem("btl_contact_payload")
        : null
    );
    setPayload(p);

    track("View | ContactSuccess | MessageSent", {
      location: "/contact/success",
      intent: p?.intent || "contact",
      service: p?.service || undefined,
      contact_path: p?.contactPath || "routing",
      utm: p?.utm || undefined,
    });
  }, []);

  const calendlyUrl = useMemo(() => {
    // Keep this simple for MVP: always use routing event type.
    // If you later split support/general, branch by payload?.contactPath here.
    const url = process.env.NEXT_PUBLIC_CALENDLY_ROUTING_URL;
    return url || "";
  }, []);

  const prefill = useMemo(() => {
    const name = payload?.fullName?.trim() || "";
    const email = payload?.email?.trim() || "";
    const notes = payload?.notes || "";

    return {
      name,
      email,
      customAnswers: {
        // Requires your Calendly event type to have invitee question #1 as “Notes”
        a1: notes,
      },
    };
  }, [payload]);

  // Calendly embed events → analytics
  useCalendlyEventListener({
    onProfilePageViewed: () => {
      track("View | BookingEmbed | RoutingCall", {
        location: "/contact/success",
        intent: "schedule routing call",
        utm: payload?.utm || undefined,
      });
    },
    onEventScheduled: (e) => {
      track("Complete | Booking | RoutingCall", {
        location: "/contact/success",
        intent: "schedule routing call",
        utm: payload?.utm || undefined,
        calendly_event_uri: e?.data?.payload?.event?.uri,
        calendly_invitee_uri: e?.data?.payload?.invitee?.uri,
      });
    },
  });

  return (
    <section className="bg-[var(--bg-ivory)] text-[var(--ink-900)] py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center space-y-6">
        {/* Eyebrow */}
        <p className="eyebrow text-[var(--muted)] text-sm md:border-b md:border-[var(--border)] pb-2 w-fit font-semibold mx-auto">
          MESSAGE RECEIVED
        </p>

        {/* Headline */}
        <h1 className="font-head font-bold text-4xl leading-tight sm:text-5xl lg:text-6xl">
          You’re in.
          <span className="block font-normal mt-1 text-[var(--green-pine-800)]">
            If you want to move faster, book the routing call now.
          </span>
        </h1>

        {/* Subhead */}
        <p className="text-[var(--ink-700)] max-w-xl mx-auto">
          We’ve received your request. Scheduling is optional — it just helps us
          confirm fit and next steps without back-and-forth.
        </p>

        {/* Calendly Card */}
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

            {/* Optional: “skip” link */}
            <Link
              href="/"
              className="shrink-0 text-sm font-semibold text-[var(--green-pine-800)] hover:underline underline-offset-4"
              data-track="click cta"
              data-location="contact success"
              data-intent="skip scheduling"
              data-label="Skip scheduling and return home"
              onClick={() =>
                track("Click | ContactSuccess | SkipScheduling", {
                  location: "/contact/success",
                  intent: "skip scheduling",
                  utm: payload?.utm || undefined,
                })
              }
            >
              Skip for now →
            </Link>
          </div>

          <div className="mt-5 overflow-hidden rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-elevated)]">
            {/* Inline Calendly Embed */}
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
                    NEXT_PUBLIC_CALENDLY_ROUTING_URL
                  </code>
                  .
                </div>
              )}
            </div>
          </div>

          {/* Posture + expectations */}
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
              <p className="text-sm font-semibold text-[var(--ink-900)]">
                No sales script
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                We’ll confirm fit, urgency, and the cleanest next step.
              </p>
            </div>

            <div className="rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
              <p className="text-sm font-semibold text-[var(--ink-900)]">
                15 minutes
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Short, direct, and useful — even if we’re not a match.
              </p>
            </div>

            <div className="rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
              <p className="text-sm font-semibold text-[var(--ink-900)]">
                Email still works
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                If you don’t schedule, we’ll reply within one business day.
              </p>
            </div>
          </div>
        </div>

        {/* Optional: About link in the same style as WhoWeAre */}
        <div className="pt-4">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-pine-800)] hover:underline underline-offset-4"
            data-track="click cta"
            data-location="contact success"
            data-intent="learn about us"
            data-label="Learn how we think about structure and systems"
            onClick={() =>
              track("Click | ContactSuccess | About", {
                location: "/contact/success",
                intent: "learn about us",
                utm: payload?.utm || undefined,
              })
            }
          >
            Learn how we think about structure and systems
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
