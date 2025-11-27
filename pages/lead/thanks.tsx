// /pages/thanks.tsx
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getOrder } from "@/lib/ordersTemp";
import { PRODUCTS } from "@/lib/catalog/data";

export default function Thanks({
  order,
  product,
}: {
  order: any;
  product: any;
}) {
  const showBook = Boolean(product?.calendlySlug && !order?.meetingCompleted);

  return (
    <>
      <Head>
        <title>Thanks — Payment received</title>
      </Head>
      <main className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-[var(--r-lg)] border border-(--border) bg-(--white) p-8 shadow-[var(--shadow-card)]">
          <h1 className="h2 text-(--ink-900)">Payment received</h1>
          <p className="mt-2 text-(--ink-700)">
            You’ll get an email receipt. Next, we’ll finalize timeline and
            assets.
          </p>
          <div className="mt-4 text-sm text-(--ink-700)">
            <div>
              <strong>Order:</strong> {order?.id || "—"}
            </div>
            <div>
              <strong>Status:</strong> {order?.status || "—"}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {showBook ? (
              <a
                className="btn btn-primary"
                href={`/book/${product.slug}?email=${encodeURIComponent(
                  order?.email || ""
                )}&utm_slug=${product.slug}&utm_sku=${product.id}&utm_tier=${
                  order?.tier || ""
                }`}
              >
                Book kickoff call
              </a>
            ) : (
              <a className="btn btn-primary" href="/resources/kickoff">
                View what’s next
              </a>
            )}
            {order?.receiptUrl && (
              <a
                className="btn"
                target="_blank"
                rel="noreferrer"
                href={order.receiptUrl}
              >
                View payment receipt
              </a>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = String(ctx.query.order || "");
  const order = id ? getOrder(id) : null;
  const product = order
    ? PRODUCTS.find((p) => p.slug === order.slug) || null
    : null;
  return { props: { order, product } };
};
