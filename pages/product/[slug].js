import { useRouter } from "next/router";
import { Meta } from "@/lib/seo";
import Button from "@/components/ui/Button";

export default function Product() {
  const { query } = useRouter();
  const name = (query.slug || "Service").toString();

  return (
    <>
      <Meta title={`Product · ${name}`} />
      <section className="bg-cream pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 rounded-[var(--r-lg)] border border-[var(--border)] p-8 md:p-12">
            <div className="eyebrow mb-2">Service</div>
            <h1 className="h1">{name}</h1>
            <p className="subhead mt-3">Short outcome statement.</p>
            <div className="mt-6 flex gap-3">
              <Button href="#" variant="primary">
                Buy Now
              </Button>
              <Button href="/book/consult" variant="secondary">
                Book a Call
              </Button>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="card p-4">
                <strong>Includes</strong>
                <p className="text-ink-muted mt-2">Bullets…</p>
              </div>
              <div className="card p-4">
                <strong>Doesn’t include</strong>
                <p className="text-ink-muted mt-2">Bullets…</p>
              </div>
              <div className="card p-4">
                <strong>Timeline</strong>
                <p className="text-ink-muted mt-2">When/how…</p>
              </div>
              <div className="card p-4">
                <strong>FAQ</strong>
                <p className="text-ink-muted mt-2">Q/A…</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
