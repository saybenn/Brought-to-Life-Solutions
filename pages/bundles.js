import { Meta } from "@/lib/seo";

export default function Bundles() {
  return (
    <>
      <Meta title="Bundles" />
      <section className="bg-ivory pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 rounded-[var(--r-lg)] border border-[var(--border)] p-8 md:p-12">
            <div className="eyebrow mb-2">Bundles</div>
            <h1 className="h1">Packages that launch faster</h1>
            <p className="subhead mt-3">
              Combine our most-requested services for better value.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
