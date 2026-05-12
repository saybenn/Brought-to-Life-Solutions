// pages/book/index.tsx
import Head from "next/head";
import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  cardBase,
  heading,
  body,
  muted,
  btnOutline,
} from "@/components/contact/ui";
import { track } from "@/lib/analytics";
import Link from "next/link";

const CALENDLY_ROUTING_URL = "https://calendly.com/sabin-broughttolife/30min";

type Payload = {
  customer_id?: string;
  fullName: string;
  email: string;
  contactPath: "routing" | "support" | "general";
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

export default function BookPage() {
  const router = useRouter();
  const [payload, setPayload] = useState<Payload | null>(null);

  const viewedRef = useRef(false);

  useEffect(() => {
    const p = safeGetPayload();
    if (!p || p.contactPath !== "routing") {
      router.replace("/contact");
      return;
    }
    setPayload(p);
  }, [router]);

  const calendlyUrl = useMemo(() => {
    if (!payload) return null;
    const u = new URL(CALENDLY_ROUTING_URL);
    u.searchParams.set("name", payload.fullName || "");
    u.searchParams.set("email", payload.email || "");
    if (payload.notes) u.searchParams.set("a1", payload.notes);
    return u.toString();
  }, [payload]);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data: any = e.data;
      if (!data || typeof data !== "object") return;

      if (data.event === "calendly.profile_page_viewed") {
        if (viewedRef.current) return;
        viewedRef.current = true;

        track("view booking", {
          location: "/book",
          intent: "schedule routing call",
          service: "routing call",
          contact_path: "routing",
          customer_id: payload?.customer_id,
        });
      }

      if (data.event === "calendly.event_scheduled") {
        track("complete booking", {
          location: "/book",
          intent: "schedule routing call",
          service: "routing call",
          contact_path: "routing",
          customer_id: payload?.customer_id,
          calendly_event_uri: data?.payload?.event?.uri,
          calendly_invitee_uri: data?.payload?.invitee?.uri,
        });

        // Prefer Calendly redirect setting to /book/confirmed
        // If you *don’t* use Calendly redirect, you can redirect here:
        // window.location.href = "/book/confirmed";
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [payload]);

  if (!payload || !calendlyUrl) return null;

  return (
    <>
      <Head>
        <title>Book | Brought to Life Solutions</title>
        <meta name="description" content="Schedule your routing call." />
      </Head>

      <main className="min-h-screen pt-16 bg-[var(--bg-page)] text-[var(--ink-700)]">
        <div className="px-4 pt-12 pb-16">
          <div className="mx-auto max-w-3xl space-y-6">
            <section className={`${cardBase} p-5 sm:p-6`}>
              <h1 className={`${heading} text-2xl`}>Book a Routing Call</h1>
              <p className={`${body} mt-3`}>
                Routing Calls exist to confirm fit and determine direction. They
                are not audits or consulting sessions.
              </p>
              <p className={`${muted} mt-2 text-sm`}>
                If you haven’t submitted the routing form, start on the contact
                page.
              </p>

              <div className="mt-5">
                <Link href="/contact" className={btnOutline}>
                  Go to Contact Form
                </Link>
              </div>
            </section>

            <section className={`${cardBase} p-2 sm:p-3`}>
              <div
                className="calendly-inline-widget"
                data-url={calendlyUrl}
                style={{ minWidth: 320, height: 760 }}
              />
            </section>
          </div>
        </div>

        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
          onLoad={() => {
            // Fallback only. Prefer the postMessage event above.
            if (viewedRef.current) return;
            viewedRef.current = true;

            track("view booking", {
              location: "/book",
              intent: "schedule routing call",
              service: "routing call",
              contact_path: "routing",
              customer_id: payload?.customer_id,
            });
          }}
        />
      </main>
    </>
  );
}
