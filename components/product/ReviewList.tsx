import type { Review } from "@/lib/catalog/types";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="rounded-[var(--r-lg)] border border-(--border) bg-(--bg-sand) p-5">
      {reviews.length === 0 && (
        <p className="text-(--ink-700)">Reviews coming soon.</p>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="rounded-[var(--r-md)] border border-(--border) bg-(--white) p-4 shadow-[var(--shadow-soft)]"
          >
            <div className="font-medium text-(--ink-900)">{r.author}</div>
            {r.rating ? (
              <div className="text-sm text-(--ink-700)">
                Rating: {r.rating} / 5
              </div>
            ) : null}
            <p className="mt-2 text-(--ink-700)">“{r.quote}”</p>
            {r.date && (
              <div className="mt-2 text-xs text-(--muted-400)">{r.date}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
