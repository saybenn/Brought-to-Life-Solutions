import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { cardBase, heading, body, muted, btnPrimary } from "./ui";

type ContactPath = "routing" | "support" | "general";
type Status = "idle" | "submitting" | "success" | "error";

function getInitialPath(): ContactPath {
  if (typeof window === "undefined") return "routing";
  const el = document.getElementById("contact-path") as HTMLInputElement | null;
  const v = (el?.value || "routing") as ContactPath;
  return v === "support" || v === "general" || v === "routing" ? v : "routing";
}

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

export default function RoutingForm() {
  const router = useRouter();
  const [path, setPath] = useState<ContactPath>("routing");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    businessName: "",
    role: "",
    website: "",
    goal: "",
    revenueRange: "",
    urgency: "",
    referral: "",
    message: "",
  });

  // Sync path from the pills above on first client render
  useMemo(() => {
    if (typeof window === "undefined") return;
    const p = getInitialPath();
    setPath(p);
  }, []);

  const isRouting = path === "routing";

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    if (!form.fullName.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      return "Please enter a valid email.";
    if (!form.businessName.trim()) return "Please enter your business name.";
    if (isRouting) {
      if (!form.goal) return "Please select a primary goal.";
      if (!form.urgency) return "Please select an urgency level.";
    }
    return null;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const v = validate();
    if (v) {
      setStatus("error");
      setError(v);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, ...form }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");

      // MVP gating: schedule only after submission, and only for routing calls
      if (path === "routing") {
        router.push("/schedule-routing-call");
      }
    } catch (err) {
      setStatus("error");
      setError(
        "We couldn’t submit your request. Please refresh and try again."
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
          determine alignment before scheduling.
        </p>

        <p className={`${muted} mt-2 text-sm`}>
          Response time: within one business day.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <Field
            label="Inquiry type"
            hint="Choose the path you want. Routing Calls are scheduled after submission."
          >
            <select
              className={inputBase}
              value={path}
              onChange={(e) => setPath(e.target.value as ContactPath)}
            >
              <option value="routing">Routing Call</option>
              <option value="support">Existing Client / Support</option>
              <option value="general">General / Partnerships</option>
            </select>
          </Field>

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

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Business name">
              <input
                className={inputBase}
                value={form.businessName}
                onChange={(e) => update("businessName", e.target.value)}
              />
            </Field>

            <Field label="Your role (optional)">
              <input
                className={inputBase}
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
                placeholder="Owner, operator, marketing, etc."
              />
            </Field>
          </div>

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

          {isRouting ? (
            <>
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

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Monthly revenue range (optional)">
                  <select
                    className={inputBase}
                    value={form.revenueRange}
                    onChange={(e) => update("revenueRange", e.target.value)}
                  >
                    <option value="">Prefer not to say</option>
                    <option value="pre-revenue">Pre-revenue</option>
                    <option value="0-5k">$0–$5k</option>
                    <option value="5-20k">$5k–$20k</option>
                    <option value="20-50k">$20k–$50k</option>
                    <option value="50-100k">$50k–$100k</option>
                    <option value="100k+">$100k+</option>
                  </select>
                </Field>

                <Field label="Urgency">
                  <select
                    className={inputBase}
                    value={form.urgency}
                    onChange={(e) => update("urgency", e.target.value)}
                  >
                    <option value="">Select one</option>
                    <option value="soon">Soon (2–4 weeks)</option>
                    <option value="near">Near-term (1–3 months)</option>
                    <option value="later">Later (3+ months)</option>
                  </select>
                </Field>
              </div>
            </>
          ) : null}

          <Field label="How did you hear about us? (optional)">
            <input
              className={inputBase}
              value={form.referral}
              onChange={(e) => update("referral", e.target.value)}
              placeholder="Referral, Google, social, etc."
            />
          </Field>

          <Field
            label="Briefly describe what prompted you to reach out"
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
            className={`${btnPrimary} ${
              status === "submitting" ? "opacity-80" : ""
            }`}
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
