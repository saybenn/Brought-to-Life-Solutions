// /components/shop/StageRow.tsx
import Link from "next/link";
import type { Product, Stage } from "@/lib/catalog/types";
import ShopCard from "./ShopCard";

export default function StageRow({
  stage,
  products,
}: {
  stage: Stage;
  products: Product[];
}) {
  if (!products.length) return null;
  return (
    <section className="section p-6 mt-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="eyebrow">Stage</div>
          <h2 className="h2 mt-1">{stage.label}</h2>
          {stage.blurb && (
            <p className="mt-1 text-[var(--ink-700)]">{stage.blurb}</p>
          )}
        </div>
        <Link href={`/collections/${stage.id}`} className="btn btn-ghost">
          View all
        </Link>
      </div>

      <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ShopCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
