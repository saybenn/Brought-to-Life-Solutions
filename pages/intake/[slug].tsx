// /pages/intake/[slug].tsx
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { getOrder } from "@/lib/ordersTemp";
import { PRODUCTS } from "@/lib/catalog/data";
import type { Product } from "@/lib/catalog/types";

function ProgressBar({ step = 2 }: { step?: 1 | 2 | 3 }) {
  const cls = (i: number) =>
    i < step
      ? "bg-(--green-500)"
      : i === step
      ? "bg-(--green-500)/80"
      : "bg-(--muted-400)";
  return (
    <div className="mb-6 flex items-center gap-2">
      <span className={`h-2 w-20 rounded-full ${cls(1)}`} title="Checkout" />
      <span className={`h-2 w-20 rounded-full ${cls(2)}`} title="Intake" />
      <span className={`h-2 w-20 rounded-full ${cls(3)}`} title="Booking" />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue = "",
  required = false,
}: any) {
  return (
    <label className="mb-3 block">
      <div className="mb-1 text-sm text-(--ink-800)">
        {label}
        {required && " *"}
      </div>
      {type === "textarea" ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          required={required}
          rows={4}
          className="w-full rounded-[var(--r-md)] border border-(--border) bg-(--white) p-3 outline-[#8ED1BE] focus:ring-2 focus:ring-[#8ED1BE]"
        />
      ) : (
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          required={required}
          className="w-full rounded-[var(--r-md)] border border-(--border) bg-(--white) p-3 outline-[#8ED1BE] focus:ring-2 focus:ring-[#8ED1BE]"
        />
      )}
    </label>
  );
}

function WebIntakeForm({ order, product }: { order: any; product: Product }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const r = await fetch("/api/intake/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const j = await r.json();
    setBusy(false);
    if (!r.ok) return alert(j.error || "Submission failed");
    router.replace(j.next);
  }

  return (
    <form onSubmit={onSubmit}>
      {/* Required hidden continuity */}
      <input type="hidden" name="orderId" value={order.id} />
      <input type="hidden" name="slug" value={product.slug} />
      <input type="hidden" name="sku" value={product.id} />
      <input type="hidden" name="tier" value={order.tier || ""} />
      <input type="hidden" name="category" value="web" />

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Contact name" name="name" required defaultValue="" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          defaultValue={order.email || ""}
        />
        <Field label="Company / Brand" name="company" required />
        <Field label="Domain (current or desired)" name="domain" required />
        <Field label="Primary service(s)" name="services" />
        <Field label="Primary location(s)" name="locations" />
      </div>
      <Field label="Goals & constraints" name="notes" type="textarea" />

      <div className="mt-4 flex items-center gap-2">
        <input id="ack" type="checkbox" required />
        <label htmlFor="ack" className="text-sm">
          I confirm I’ve reviewed what’s included/excluded and will provide
          required assets on time.
        </label>
      </div>

      <button disabled={busy} className="btn btn-primary mt-4">
        {busy ? "Submitting…" : "Submit intake"}
      </button>
    </form>
  );
}

function SEOIntakeForm(props: any) {
  return (
    <div className="text-(--ink-700)">
      SEO intake coming soon — reuse Web form fields + SEO specifics (keywords,
      competitors, GA4/GSC access).
    </div>
  );
}
function CoachingIntakeForm(props: any) {
  return (
    <div className="text-(--ink-700)">
      Coaching intake coming soon — pick focus area, availability, desired
      outcomes.
    </div>
  );
}
function PhotoIntakeForm(props: any) {
  return (
    <div className="text-(--ink-700)">
      Photo intake coming soon — shoot type, location, date window, usage
      rights.
    </div>
  );
}

function IntakeFormSwitcher({
  product,
  order,
}: {
  product: Product;
  order: any;
}) {
  // you can switch by product.stage or a category field you add
  const stage = product.stage; // "websites" | "seo" | "care" | "maintenance" | "ads"
  if (stage === "websites")
    return <WebIntakeForm product={product} order={order} />;
  if (stage === "seo") return <SEOIntakeForm product={product} order={order} />;
  if (stage === "care")
    return <WebIntakeForm product={product} order={order} />;
  if (stage === "ads") return <SEOIntakeForm product={product} order={order} />;
  return <WebIntakeForm product={product} order={order} />;
}

export default function IntakePage({
  product,
  order,
}: {
  product: Product;
  order: any;
}) {
  const showBookingCTA = Boolean(
    product.calendlySlug && !order?.meetingCompleted
  );

  return (
    <>
      <Head>
        <title>Intake — {product.title} | Brought to Life</title>
      </Head>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <ProgressBar step={2} />
        <h1 className="h2 text-(--ink-900)">
          Project intake — {product.title}
        </h1>
        <p className="mt-2 text-(--ink-700)">
          Thanks for your payment. This intake locks timeline and requirements.
        </p>

        <div className="mt-6 rounded-[var(--r-lg)] border border-(--border) bg-(--white) p-6 shadow-[var(--shadow-card)]">
          <IntakeFormSwitcher product={product} order={order} />
        </div>

        <div className="mt-6 flex items-center gap-3">
          {showBookingCTA ? (
            <a
              className="btn btn-secondary"
              href={`/book/${product.slug}?name=${encodeURIComponent(
                order.intake?.name || ""
              )}&email=${encodeURIComponent(
                order.email || ""
              )}&company=${encodeURIComponent(
                order.intake?.company || ""
              )}&utm_slug=${product.slug}&utm_sku=${product.id}&utm_tier=${
                order.tier || ""
              }`}
            >
              Book kickoff call
            </a>
          ) : (
            <a className="btn btn-secondary" href="/resources/kickoff">
              View what’s next
            </a>
          )}
          {order?.receiptUrl ? (
            <a
              className="btn"
              target="_blank"
              rel="noreferrer"
              href={order.receiptUrl}
            >
              View payment receipt
            </a>
          ) : null}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = String(ctx.params?.slug || "");
  const orderId = String(ctx.query.order || "");
  const order = orderId ? getOrder(orderId) : null;
  const product = PRODUCTS.find((p) => p.slug === slug) as Product | undefined;

  if (!product) return { notFound: true };
  // If no order, we still render, but we’ll have fewer prefilled fields
  const safeOrder = order || {
    id: orderId || "",
    slug,
    sku: product.id,
    status: "created",
    meetingCompleted: false,
    intakeSubmitted: false,
    createdAt: Date.now(),
  };

  return { props: { product, order: safeOrder } };
};
