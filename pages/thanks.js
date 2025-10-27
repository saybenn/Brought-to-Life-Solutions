import { Meta } from "@/lib/seo";

export default function Thanks() {
  return (
    <>
      <Meta title="Thanks" />
      <section className="bg-ivory pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 rounded-[var(--r-lg)] border border-[var(--border)] p-8 md:p-12">
            <h1 className="h1">You’re in. Thank you.</h1>
            <p className="subhead mt-3">
              Check your email for next steps and your intake form.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
