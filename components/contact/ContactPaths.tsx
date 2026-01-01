import { useState } from "react";
import {
  cardBase,
  cardSoft,
  heading,
  body,
  pillBase,
  pillActive,
  pillIdle,
  btnPrimary,
  btnOutline,
  muted,
} from "./ui";

type Path = "routing" | "support" | "general";

function Pill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${pillBase} ${active ? pillActive : pillIdle}`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function Card({
  title,
  subtitle,
  bullets,
  cta,
  recommended,
}: {
  title: string;
  subtitle: string;
  bullets?: string[];
  cta: React.ReactNode;
  recommended?: boolean;
}) {
  return (
    <div className={`${recommended ? cardSoft : cardBase} p-5 sm:p-6`}>
      <div className="flex items-start justify-between gap-4">
        <h3 className={`${heading} text-base sm:text-lg`}>{title}</h3>
        {recommended ? (
          <span className="rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-1 text-xs text-[var(--ink-700)]">
            Recommended
          </span>
        ) : null}
      </div>

      <p className={`${body} mt-2`}>{subtitle}</p>

      {bullets?.length ? (
        <ul className="mt-4 space-y-2 text-sm text-[var(--ink-700)]">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--thread-gold)]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5">{cta}</div>

      {recommended ? (
        <p className={`${muted} mt-3 text-xs`}>
          Routing Calls are scheduled after submission.
        </p>
      ) : null}
    </div>
  );
}

export default function ContactPaths() {
  const [active, setActive] = useState<Path>("routing");

  return (
    <section>
      <h2 className={`${heading} text-xl`}>Choose Your Path</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        <Pill
          active={active === "routing"}
          label="Routing Call"
          onClick={() => setActive("routing")}
        />
        <Pill
          active={active === "support"}
          label="Client Support"
          onClick={() => setActive("support")}
        />
        <Pill
          active={active === "general"}
          label="General Inquiry"
          onClick={() => setActive("general")}
        />
      </div>

      <div className="mt-5 space-y-4">
        {active === "routing" ? (
          <Card
            recommended
            title="Routing Call"
            subtitle="For business owners seeking a clear direction forward—without guesswork."
            bullets={[
              "A short, focused conversation",
              "Alignment on goals and context",
              "Guidance into the appropriate BTLS system",
              "Not: audits, critiques, troubleshooting, or consulting",
            ]}
            cta={
              <a href="#routing-form" className={btnPrimary}>
                Request Routing Call
              </a>
            }
          />
        ) : null}

        {active === "support" ? (
          <Card
            title="Existing Client / Support"
            subtitle="For active projects, ongoing support, or operational questions."
            cta={
              <a
                href="#routing-form"
                onClick={() => {
                  const el = document.getElementById(
                    "contact-path"
                  ) as HTMLInputElement | null;
                  if (el) el.value = "support";
                }}
                className={btnOutline}
              >
                Client Support
              </a>
            }
          />
        ) : null}

        {active === "general" ? (
          <Card
            title="General / Partnerships"
            subtitle="For referrals, collaborations, or media inquiries."
            cta={
              <a
                href="#routing-form"
                onClick={() => {
                  const el = document.getElementById(
                    "contact-path"
                  ) as HTMLInputElement | null;
                  if (el) el.value = "general";
                }}
                className={btnOutline}
              >
                General Inquiry
              </a>
            }
          />
        ) : null}
      </div>

      <input type="hidden" id="contact-path" value={active} readOnly />
    </section>
  );
}
