import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { PRODUCTS } from "@/lib/catalog/data";
import type { Product } from "@/lib/catalog/types";
import HeroProduct from "@/components/product/HeroProduct";
import ProductTabs from "@/components/product/ProductTabs";
import BundleStrip from "@/components/product/BundleStrip";
import InquiryForm from "@/components/product/InquiryForm";

type Props = { product: Product };

export default function ProductPage({ product }: Props) {
  const router = useRouter();

  // controlled fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [goal, setGoal] = useState("");

  // hidden fields from sessionStorage (kept in state so they render SSR-safe)
  const [lead, setLead] = useState<{ slug: string; sku: string; tier: string }>(
    {
      slug: product.slug,
      sku: product.id,
      tier: "",
    }
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLead({
        slug: sessionStorage.getItem("lead:productSlug") || product.slug,
        sku: sessionStorage.getItem("lead:productId") || product.id,
        tier: sessionStorage.getItem("lead:tierKey") || "",
      });
    }
  }, [product.slug, product.id]);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Build query params for the Calendly page
      const params = new URLSearchParams({
        name,
        email,
        business,
        goal,
        sku: lead.sku || "",
        slug: lead.slug || product.slug,
        tier: lead.tier || "",
      });

      // Go to embedded Calendly page carrying the context
      await router.push(`/book/${product.slug}?${params.toString()}`);
    },
    [
      name,
      email,
      business,
      goal,
      lead.sku,
      lead.slug,
      lead.tier,
      product.slug,
      router,
    ]
  );
  return (
    <>
      <Head>
        <title>{product.title} | Brought to Life</title>
        <meta name="description" content={product.blurb} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.blurb} />
      </Head>

      <main className="bg-(--bg-ivory)">
        <HeroProduct product={product} />
        <ProductTabs product={product} />
        <BundleStrip product={product} />

        {/* Simple lead block (replace with real form when ready) */}
        <div
          id="contact-start"
          className="mx-auto my-16 max-w-3xl rounded-[var(--r-lg)] border border-(--border) bg-(--white) p-6 shadow-[var(--shadow-card)]"
        >
          <h3 className="h2 text-(--ink-900)">Ready to start?</h3>
          <p className="mt-2 text-(--ink-700)">
            Tell us your goals and we’ll propose the simplest path.
          </p>
          <InquiryForm slug={product.slug} sku={product.id} />
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: PRODUCTS.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = String(ctx.params?.slug || "");
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { notFound: true };
  return { props: { product } };
};
