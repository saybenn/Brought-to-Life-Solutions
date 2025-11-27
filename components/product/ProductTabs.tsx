import { useState } from "react";
import type { Product } from "@/lib/catalog/types";
import ReviewList from "./ReviewList";

const TABS = [
  "Includes",
  "Doesn’t include",
  "Timeline",
  "What we need from you",
  "FAQ",
  "Reviews",
] as const;
type TabKey = (typeof TABS)[number];

export default function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<TabKey>("Includes");

  return (
    <section id="tabs" className="mt-10">
      {/* Sticky tab bar on scroll */}
      <div className="sticky top-0 z-10 bg-(--bg-ivory) border-b border-(--border)">
        <div className="mx-auto max-w-5xl px-4 flex flex-wrap gap-2 py-3">
          {TABS.map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={[
                  "transition-base rounded-[var(--r-md)] px-3 py-2 border hover:cursor-pointer",
                  active
                    ? "bg-(--white) border-(--green-forest-700) text-(--ink-900)"
                    : "bg-(--bg-ivory) border-(--border) text-(--ink-700) hover:bg-(--sage-100)",
                ].join(" ")}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        {tab === "Includes" && (
          <ul className="list-disc pl-5 space-y-2 text-(--ink-700)">
            {product.includes?.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}

        {tab === "Doesn’t include" && (
          <ul className="list-disc pl-5 space-y-2 text-(--ink-700)">
            {(
              product.excludes ?? [
                "Custom software/web-app features",
                "Ad spend budget",
                "Large content/copywriting projects",
              ]
            ).map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}

        {tab === "Timeline" && (
          <div className="text-(--ink-700)">
            <p className="mb-2">
              {product.timeline ??
                "Typical delivery matches the listed duration with scheduled approvals to keep momentum."}
            </p>
            {product.duration && (
              <p className="italic">Expected window: {product.duration}</p>
            )}
          </div>
        )}

        {tab === "What we need from you" && (
          <ul className="list-disc pl-5 space-y-2 text-(--ink-700)">
            {(
              product.requirements ?? [
                "Logo/brand files",
                "Business/services details",
                "Primary contact for approvals",
              ]
            ).map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}

        {tab === "FAQ" && (
          <div className="space-y-4">
            {(product.faq ?? []).map((qa) => (
              <details
                key={qa.q}
                className="rounded-[var(--r-md)] border border-(--border) bg-(--white) p-4"
              >
                <summary className="cursor-pointer font-medium text-(--ink-900)">
                  {qa.q}
                </summary>
                <p className="mt-2 text-(--ink-700)">{qa.a}</p>
              </details>
            ))}
            {!product.faq?.length && (
              <p className="text-(--ink-700)">No FAQs yet for this product.</p>
            )}
          </div>
        )}

        {tab === "Reviews" && <ReviewList reviews={product.reviews ?? []} />}
      </div>
    </section>
  );
}
