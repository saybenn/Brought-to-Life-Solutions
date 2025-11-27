// /pages/thanks.tsx
import { GetServerSideProps } from "next";
import Link from "next/link";
import { getOrder } from "@/lib/ordersTemp";

type ThanksProps = {
  order: any | null;
};

export default function Thanks({ order }: ThanksProps) {
  const sowHref =
    order && order.slug
      ? `/legal/sow/${order.slug}?order=${encodeURIComponent(order.id)}`
      : "/legal/sow/general";

  return (
    <main className="min-h-[60vh] bg-(--sage-100)">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-[var(--r-lg)] border border-(--border) bg-(--white) p-8 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <img src="/images/ui/check.svg" alt="" className="h-8 w-8" />
            <h1 className="h2 text-(--ink-900)">
              Deposit received — you’re in 🎉
            </h1>
          </div>

          <p className="mt-2 text-(--ink-700)">
            We’ve emailed a receipt. Next: review and confirm the Scope of Work
            so we can begin.
          </p>

          {order ? (
            <div className="mt-6 space-y-2">
              <div className="caption">Order ID</div>
              <div className="font-mono text-sm">{order.id}</div>

              <div className="caption mt-4">Status</div>
              <div className="inline-block rounded-[var(--r-sm)] bg-(--sage-200) px-2 py-1 text-(--green-forest-700)">
                {order.status === "paid" ? "Paid (Deposit 50%)" : "Processing"}
              </div>

              {order.tier && (
                <>
                  <div className="caption mt-4">Tier</div>
                  <div className="text-sm">{order.tier}</div>
                </>
              )}
            </div>
          ) : (
            <p className="mt-6 text-(--ink-700)">
              Order details not available, but payment succeeded.
            </p>
          )}

          <ol className="mt-8 list-decimal space-y-3 pl-5 text-(--ink-800)">
            <li>
              <strong>Review SOW:</strong>{" "}
              <Link className="underline" href={sowHref}>
                View Scope of Work
              </Link>{" "}
              (2–3 minutes).
            </li>
            <li>
              <strong>Book Kickoff:</strong>{" "}
              <Link className="underline" href="/book/website-build">
                Schedule your kickoff call
              </Link>
              .
            </li>
            <li>
              <strong>Build → Review:</strong> After SOW confirmation,
              we&apos;ll move into build and send the final 50% invoice at
              completion.
            </li>
          </ol>

          <hr className="my-8 border-(--border)" />

          <p className="text-(--ink-700)">
            Refunds: deposit refundable within 7 days or until work begins
            (whichever is earlier). See{" "}
            <a className="underline" href="/legal/refund">
              Refund Policy
            </a>
            .
          </p>

          <div className="mt-8 flex gap-3">
            <a href="/shop" className="btn btn-secondary">
              Back to shop
            </a>
            <a href="/contact" className="btn btn-primary">
              Questions? Contact us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = String(ctx.query.order || "");
  const order = id ? getOrder(id) : null;
  return { props: { order } };
};
