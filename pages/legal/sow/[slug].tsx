// /pages/legal/sow/[slug].tsx
import { GetServerSideProps } from "next";
import Head from "next/head";
import { PRODUCTS } from "@/lib/catalog/data";
import type { Product } from "@/lib/catalog/types";
import { getOrder } from "@/lib/ordersTemp";
import { usd } from "@/lib/format";

type Props = {
  product: Product;
  order: any | null;
};

export default function SowPage({ product, order }: Props) {
  const tierKey = order?.tier;
  const tier =
    tierKey && product.pricing?.tiers
      ? product.pricing.tiers.find((t: any) => t.key === tierKey)
      : null;

  const fullPriceCents =
    tier?.fullCents ?? product.pricing.minCents ?? undefined;
  const depositCents =
    typeof fullPriceCents === "number"
      ? Math.round(fullPriceCents / 2)
      : undefined;

  return (
    <>
      <Head>
        <title>Scope of Work — {product.title} | Brought to Life</title>
      </Head>
      <main className="bg-(--bg-ivory)">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="h1 text-(--ink-900)">Scope of Work</h1>
          <p className="mt-2 text-(--ink-700)">
            Project: <strong>{product.title}</strong>
            {tier && (
              <>
                {" "}
                — <span>{tier.label}</span>
              </>
            )}
          </p>
          {order && (
            <p className="mt-1 text-sm text-(--ink-600)">
              Order ID: <span className="font-mono">{order.id}</span>
            </p>
          )}

          <section className="mt-8 space-y-3">
            <h2 className="h3 text-(--ink-900)">1. Deliverables</h2>
            <p className="text-(--ink-700)">
              This engagement covers the following deliverables:
            </p>
            <ul className="list-disc pl-5 text-(--ink-800)">
              {tier?.includes?.length
                ? tier.includes.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))
                : product.includes.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="h3 text-(--ink-900)">2. Out of Scope</h2>
            <p className="text-(--ink-700)">
              The following items are <strong>not</strong> included unless
              explicitly added in a separate agreement:
            </p>
            <ul className="list-disc pl-5 text-(--ink-800)">
              {(tier?.excludes || product.excludes || []).map(
                (item: string, i: number) => (
                  <li key={i}>{item}</li>
                )
              )}
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="h3 text-(--ink-900)">3. Timeline</h2>
            <p className="text-(--ink-700)">{product.timeline}</p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="h3 text-(--ink-900)">4. Investment</h2>
            {typeof fullPriceCents === "number" ? (
              <ul className="list-disc pl-5 text-(--ink-800)">
                <li>
                  Project total: <strong>{usd(fullPriceCents)}</strong>
                </li>
                {typeof depositCents === "number" && (
                  <li>
                    Deposit (50%): <strong>{usd(depositCents)}</strong> —
                    already paid via Checkout.
                  </li>
                )}
                {typeof depositCents === "number" && (
                  <li>
                    Remaining 50% due at completion, prior to launch and
                    transfer.
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-(--ink-700)">
                Project pricing to be confirmed in a separate written estimate.
              </p>
            )}
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="h3 text-(--ink-900)">5. Assumptions</h2>
            <ul className="list-disc pl-5 text-(--ink-800)">
              {product.requirements?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
              <li>
                Client provides approvals and feedback within 2–3 business days.
              </li>
              <li>
                Changes beyond this scope may require a change order and
                additional fees.
              </li>
            </ul>
          </section>

          <section className="mt-10 border-t border-(--border) pt-6 text-(--ink-700)">
            <p className="text-sm">
              This Scope of Work is governed by the{" "}
              <a href="/legal/msa" className="underline">
                Master Services Agreement (MSA)
              </a>
              . By paying the project deposit, you acknowledge that you have
              read and agree to the MSA and this SOW.
            </p>
          </section>

          <div className="mt-8 flex gap-3">
            <a href="/shop" className="btn btn-secondary">
              Back to shop
            </a>
            <a href={`/book/${product.slug}`} className="btn btn-primary">
              Book kickoff call
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = String(ctx.params?.slug || "");
  const product = PRODUCTS.find((p) => p.slug === slug) as Product | undefined;
  if (!product) return { notFound: true };

  const orderId = ctx.query.order ? String(ctx.query.order) : "";
  const order = orderId ? getOrder(orderId) : null;

  return {
    props: {
      product,
      order,
    },
  };
};
