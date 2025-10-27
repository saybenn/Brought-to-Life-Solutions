// /pages/shop.tsx
import Head from "next/head";
import { useMemo, useState } from "react";
import SiteContainer from "@/components/layout/SiteContainer";
import { PRODUCTS, STAGES } from "@/lib/catalog/data";
import ShopCard from "@/components/shop/ShopCard";
import StageRow from "@/components/shop/StageRow";

export default function ShopPage() {
  const [q, setQ] = useState("");
  const [stage, setStage] = useState<string>("all");
  const [freeOnly, setFreeOnly] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (stage !== "all" && p.stage !== stage) return false;
      if (freeOnly && p.pricing.minCents !== 0) return false;

      const hay = (
        p.title +
        " " +
        p.blurb +
        " " +
        (p.tags || []).join(" ")
      ).toLowerCase();
      const needle = q.trim().toLowerCase();
      return !needle || hay.includes(needle);
    });
  }, [q, stage, freeOnly]);

  return (
    <>
      <Head>
        <title>Shop — Brought to Life Solutions</title>
        <meta
          name="description"
          content="Practical services, free starters, and clear CTAs."
        />
      </Head>

      <SiteContainer className="py-10">
        {/* Header */}
        <div className="section p-6">
          <div className="eyebrow">Brought to Life Solutions</div>
          <h1 className="h1 mt-1">Shop</h1>
          <p className="subhead mt-2">
            Data-driven grid. Real products. No fluff—just outcomes.
          </p>

          {/* Filters */}
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products (e.g., SEO, website)…"
              className="border border-[var(--border)] rounded-[var(--r-md)] px-3 py-2 w-full"
            />

            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="border border-[var(--border)] rounded-[var(--r-md)] px-3 py-2 w-full bg-white"
              aria-label="Filter by stage"
            >
              <option value="all">All stages</option>
              {STAGES.sort((a, b) => (a.order ?? 99) - (b.order ?? 99)).map(
                (s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                )
              )}
            </select>

            <label className="inline-flex items-center gap-2 text-[var(--ink-700)]">
              <input
                type="checkbox"
                checked={freeOnly}
                onChange={(e) => setFreeOnly(e.target.checked)}
              />
              Show free only
            </label>
          </div>
        </div>

        {/* If no filters, show by stage rows; else show flat grid */}
        {q === "" && stage === "all" && !freeOnly ? (
          <>
            {STAGES.sort((a, b) => (a.order ?? 99) - (b.order ?? 99)).map(
              (s) => (
                <StageRow
                  key={s.id}
                  stage={s}
                  products={PRODUCTS.filter((p) => p.stage === s.id).slice(
                    0,
                    3
                  )}
                />
              )
            )}
          </>
        ) : (
          <section className="section p-6 mt-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="eyebrow">Results</div>
                <h2 className="h2 mt-1">
                  {filtered.length} product{filtered.length === 1 ? "" : "s"}
                </h2>
              </div>
            </div>

            {filtered.length === 0 ? (
              <p className="mt-4 text-[var(--ink-700)]">
                No matches. Try clearing filters.
              </p>
            ) : (
              <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <ShopCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </section>
        )}
      </SiteContainer>
    </>
  );
}
