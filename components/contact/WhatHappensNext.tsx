import { cardSoft, heading, body, muted } from "./ui";

export default function WhatHappensNext() {
  return (
    <section className={`${cardSoft} p-5 sm:p-6`}>
      <h2 className={`${heading} text-xl`}>What Happens Next</h2>

      <ol className="mt-4 space-y-3 text-sm text-[var(--ink-700)]">
        {[
          "You submit the form",
          "You’re guided to schedule a Routing Call (Routing path only)",
          "Alignment is confirmed and the right system is identified",
          "If appropriate, next steps are outlined clearly",
        ].map((t, i) => (
          <li key={t} className="flex gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-xs text-[var(--ink-900)]">
              {i + 1}
            </span>
            <span className="leading-[var(--leading-normal)]">{t}</span>
          </li>
        ))}
      </ol>

      <p className={`${body} mt-4`}>No pressure. No ambiguity.</p>
      <p className={`${muted} mt-1 text-sm`}>Clear steps, calm pacing.</p>
    </section>
  );
}
