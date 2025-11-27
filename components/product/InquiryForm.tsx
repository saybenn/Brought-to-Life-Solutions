// /components/product/InquiryForm.tsx
import { useState } from "react";

export default function InquiryForm({
  slug,
  sku,
  tier,
}: {
  slug: string;
  sku: string;
  tier?: string;
}) {
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const r = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const j = await r.json();
    setBusy(false);
    if (!r.ok) return alert(j.error || "Failed to submit");
    window.location.assign(j.next);
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-3 md:grid-cols-2">
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="sku" value={sku} />
      <input type="hidden" name="tier" value={tier || ""} />
      <input
        className="rounded-[var(--r-md)] border border-(--border) bg-(--white) p-3 md:col-span-1"
        placeholder="Name"
        name="name"
        required
      />
      <input
        className="rounded-[var(--r-md)] border border-(--border) bg-(--white) p-3 md:col-span-1"
        placeholder="Email"
        name="email"
        type="email"
        required
      />
      <input
        className="rounded-[var(--r-md)] border border-(--border) bg-(--white) p-3 md:col-span-2"
        placeholder="Business / URL"
        name="company"
      />
      <textarea
        className="rounded-[var(--r-md)] border border-(--border) bg-(--white) p-3 md:col-span-2"
        placeholder="What are you trying to accomplish?"
        rows={4}
        name="message"
      />
      <label className="md:col-span-2 flex items-center gap-2 text-sm">
        <input type="checkbox" required />
        <span>
          I understand this starts a consult. Work begins after deposit and SOW
          approval.
        </span>
      </label>
      <button
        type="submit"
        disabled={busy}
        className="btn btn-primary md:col-span-2"
      >
        {busy ? "Sending…" : "Send & Book Option"}
      </button>
    </form>
  );
}
