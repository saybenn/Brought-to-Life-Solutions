// /pages/book/[slug].tsx
import Head from "next/head";
import type { GetServerSideProps } from "next";
import { PRODUCTS } from "@/lib/catalog/data";
import type { Product } from "@/lib/catalog/types";

type Props = {
  product: Product;
  url: string;
};

export default function BookPage({ product, url }: Props) {
  return (
    <>
      <Head>
        <title>Book — {product.title} | Brought to Life</title>
      </Head>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="h2 text-(--ink-900)">Book your kickoff call</h1>
        <p className="mt-2 text-(--ink-700)">
          We&apos;ll align on goals, scope, and timeline (~25 minutes).
        </p>

        <div className="mt-6 rounded-[var(--r-lg)] border border-(--border) bg-(--white) p-2 shadow-[var(--shadow-card)]">
          <iframe
            title="Calendly"
            src={url}
            className="h-[800px] w-full rounded-[var(--r-md)]"
            frameBorder="0"
          />
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = String(ctx.params?.slug || "");
  const product = PRODUCTS.find((p) => p.slug === slug) as Product | undefined;
  if (!product) return { notFound: true };

  const base = process.env.NEXT_PUBLIC_CALENDLY_URL;
  if (!base) {
    throw new Error("Missing NEXT_PUBLIC_CALENDLY_URL");
  }

  // No query params for now – Calendly is fragile about them
  const url = base;

  return {
    props: {
      product,
      url,
    },
  };
};
