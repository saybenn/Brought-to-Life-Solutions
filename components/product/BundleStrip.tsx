import Link from "next/link";
import { PRODUCTS } from "@/lib/catalog/data";
import type { Product } from "@/lib/catalog/types";

export default function BundleStrip({ product }: { product: Product }) {
  const picks = (product.upsell ?? [])
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];

  if (!picks.length) return null;

  return (
    <section className="mt-10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="h2 text-(--ink-900)">Recommended next steps</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {picks.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              className="group rounded-[var(--r-md)] border border-(--border) bg-(--white) p-4 hover:bg-(--sage-100) transition-base"
            >
              <div className="font-semibold text-(--ink-900)">{p.title}</div>
              <p className="mt-1 text-sm text-(--ink-700)">{p.blurb}</p>
              <div className="mt-3 inline-block btn btn-primary">View</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
