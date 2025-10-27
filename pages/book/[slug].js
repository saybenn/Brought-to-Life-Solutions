import { useRouter } from "next/router";
import { Meta } from "@/lib/seo";

export default function Book() {
  const { query } = useRouter();
  const service = (query.slug || "Consult").toString();

  return (
    <>
      <Meta title={`Book · ${service}`} />
      <section className="bg-cream pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 rounded-[var(--r-lg)] border border-[var(--border)] p-8 md:p-12">
            <div className="eyebrow mb-2">Booking</div>
            <h1 className="h1">Book: {service}</h1>
            <p className="subhead mt-3">
              Pick a time; we’ll confirm by email. (Calendly embed later)
            </p>
            <div className="mt-6 rounded-[var(--r-md)] bg-[var(--sage-100)] aspect-[16/9] grid place-items-center text-ink-muted">
              Calendar placeholder
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
