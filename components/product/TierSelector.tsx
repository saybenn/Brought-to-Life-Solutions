// /components/product/TierSelector.tsx
import { useState, useEffect } from "react";

export default function TierSelector({
  product,
  onChange,
}: {
  product: any,
  onChange: (
    tier: { key: string, label: string, fullCents: number } | null
  ) => void,
}) {
  const tiers = product?.pricing?.tiers || [];
  const [selected, setSelected] = useState(tiers[0] ?? null);

  useEffect(() => {
    onChange(selected);
  }, [selected]); // report upward

  if (!tiers.length) return null;
  return (
    <div className="mt-4 grid gap-2 sm:grid-cols-3">
      {tiers.map((t: any) => (
        <button
          key={t.key}
          type="button"
          onClick={() => setSelected(t)}
          className={`rounded-[var(--r-md)] border p-3 text-left ${
            selected?.key === t.key
              ? "border-(--blue-600)"
              : "border-(--border)"
          }`}
        >
          <div className="font-medium">{t.label}</div>
          <div className="text-(--ink-700)">
            ${(t.fullCents / 100).toLocaleString()}
          </div>
        </button>
      ))}
    </div>
  );
}
