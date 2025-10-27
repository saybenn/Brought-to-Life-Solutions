import { Meta } from "@/lib/seo";

export default function Results() {
  return (
    <>
      <Meta title="Results" />
      <section className="bg-ivory pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 rounded-[var(--r-lg)] border border-[var(--border)] p-8 md:p-12">
            <div className="eyebrow mb-2">Proof</div>
            <h1 className="h1">Results & mini-case studies</h1>
            <p className="subhead mt-3">
              Before/after story cards and quick outcomes.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
