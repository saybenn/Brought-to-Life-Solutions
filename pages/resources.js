import { Meta } from "@/lib/seo";

export default function Resources() {
  return (
    <>
      <Meta title="Resources" />
      <section className="bg-cream pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 rounded-[var(--r-lg)] border border-[var(--border)] p-8 md:p-12">
            <div className="eyebrow mb-2">Free Aisle</div>
            <h1 className="h1">Tools that make you better</h1>
            <p className="subhead mt-3">
              Scorecards, checklists, and teardowns—no fluff.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
