// components/contact/RoutingForm.tsx
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { cardBase, heading, body, muted, btnPrimary } from "./ui";
import { track } from "@/lib/analytics";
import type { ContactPath } from "@/pages/contact";

type Status = "idle" | "submitting" | "success" | "error";

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[var(--ink-900)]">{label}</span>
      <div className="mt-2">{children}</div>
      {hint ? <p className="mt-2 text-xs text-[var(--muted)]">{hint}</p> : null}
    </label>
  );
}

const inputBase =
  "w-full rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-3 text-sm text-[var(--ink-700)] placeholder:text-[var(--muted-400)] transition-base focus:outline-none";

function getUtmBundle() {
  if (typeof window === "undefined") return null;

  const fromUrl = new URLSearchParams(window.location.search);
  const get = (k: string) => fromUrl.get(k) || "";

  const urlUtm = {
    utm_source: get("utm_source"),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_term: get("utm_term"),
    utm_content: get("utm_content"),
    gclid: get("gclid"),
    fbclid: get("fbclid"),
  };

  const stored = (() => {
    try {
      const raw = sessionStorage.getItem("btl_utms");
      return raw ? (JSON.parse(raw) as Record<string, string>) : {};
    } catch {
      return {};
    }
  })();

  const merged = { ...urlUtm, ...stored };
  const cleaned = Object.fromEntries(
    Object.entries(merged).filter(([, v]) => Boolean(v)),
  );

  return Object.keys(cleaned).length ? cleaned : null;
}

export default function RoutingForm({ path }: { path: ContactPath }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    businessName: "",
    website: "",
    goal: "",
    message: "",
  });

  const isRouting = path === "routing";
  const needsBusiness = path === "routing" || path === "support";

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    if (!form.fullName.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      return "Please enter a valid email.";
    if (needsBusiness && !form.businessName.trim())
      return "Please enter your business name.";
    if (isRouting && !form.goal) return "Please select a primary goal.";
    if (!form.message.trim())
      return "Please add a short note about what prompted you to reach out.";
    return null;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    setError(null);
    const v = validate();
    if (v) {
      setStatus("error");
      setError(v);
      return;
    }

    setStatus("submitting");

    try {
      const utm = getUtmBundle();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path,
          fullName: form.fullName,
          email: form.email,
          businessName: form.businessName,
          website: form.website,
          goal: form.goal,
          message: form.message,
          utm,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      const json = await res.json().catch(() => null);
      const customer_id = json?.customer_id as string | undefined;

      const bookingNotesLines = [
        `Inquiry type: ${path}`,
        needsBusiness ? `Business: ${form.businessName || "—"}` : null,
        isRouting ? `Primary goal: ${form.goal || "—"}` : null,
        form.website ? `Website: ${form.website}` : null,
        form.message ? `Message: ${form.message}` : null,
      ].filter(Boolean) as string[];

      const contactPayload = {
        customer_id,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        contactPath: path,
        intent: isRouting ? "request routing call" : "contact",
        service:
          path === "routing"
            ? "routing call"
            : path === "support"
              ? "client support"
              : "general inquiry",
        notes: bookingNotesLines.join("\n"),
        utm,
        submittedAt: new Date().toISOString(),
        page: "/contact",
      };

      sessionStorage.setItem(
        "btl_contact_payload",
        JSON.stringify(contactPayload),
      );

      track("submit form", {
        location: "/contact",
        intent: contactPayload.intent,
        service: contactPayload.service,
        contact_path: contactPayload.contactPath,
        customer_id,
      });

      router.push(path === "routing" ? "/contact/success" : "/contact/thanks");
    } catch {
      setStatus("error");
      setError(
        "We couldn’t submit your request. Please refresh and try again.",
      );
    }
  }

  return (
    <section id="routing-form">
      <div className={`${cardBase} p-5 sm:p-6`}>
        <h2 className={`${heading} text-xl`}>
          {path === "routing"
            ? "Request Routing Call"
            : path === "support"
              ? "Client Support"
              : "General Inquiry"}
        </h2>

        <p className={`${body} mt-3`}>
          Please complete the form below. Your responses help us prepare and
          route your request correctly.
        </p>

        <p className={`${muted} mt-2 text-sm`}>
          Response time: within one business day.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name">
              <input
                className={inputBase}
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                autoComplete="name"
              />
            </Field>

            <Field label="Email">
              <input
                className={inputBase}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                autoComplete="email"
                inputMode="email"
              />
            </Field>
          </div>

          {needsBusiness ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Business name">
                <input
                  className={inputBase}
                  value={form.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                />
              </Field>

              <Field
                label="Website (optional)"
                hint="If you don’t have one, leave blank."
              >
                <input
                  className={inputBase}
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                  placeholder="https://"
                  inputMode="url"
                />
              </Field>
            </div>
          ) : (
            <Field
              label="Website (optional)"
              hint="If you don’t have one, leave blank."
            >
              <input
                className={inputBase}
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                placeholder="https://"
                inputMode="url"
              />
            </Field>
          )}

          {isRouting ? (
            <Field label="Primary goal">
              <select
                className={inputBase}
                value={form.goal}
                onChange={(e) => update("goal", e.target.value)}
              >
                <option value="">Select one</option>
                <option value="visibility">Visibility</option>
                <option value="proof">Proof</option>
                <option value="conversion">Conversion</option>
                <option value="offer-strength">Offer Strength</option>
                <option value="operations">Operations</option>
                <option value="analytics">Analytics</option>
                <option value="unknown">Not sure yet</option>
              </select>
            </Field>
          ) : null}

          <Field
            label="What prompted you to reach out?"
            hint="One or two short paragraphs is enough."
          >
            <textarea
              className={`${inputBase} min-h-[120px]`}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </Field>

          {status === "error" && error ? (
            <div className="rounded-[var(--r-md)] border border-[var(--error)] bg-[var(--bg-elevated)] p-4 text-sm text-[var(--ink-700)]">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={status === "submitting"}
            className={`${btnPrimary} ${status === "submitting" ? "opacity-80" : ""}`}
          >
            {status === "submitting"
              ? "Submitting…"
              : path === "routing"
                ? "Submit & Schedule Routing Call"
                : "Submit"}
          </button>

          <p className="text-xs text-[var(--muted)]">
            By submitting, you agree we may respond by email regarding your
            request.
          </p>
        </form>
      </div>
    </section>
  );
}
