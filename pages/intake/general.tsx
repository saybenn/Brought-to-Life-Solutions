// /pages/legal/sow/general.tsx
import Head from "next/head";
import Link from "next/link";

export default function GeneralSow() {
  return (
    <>
      <Head>
        <title>General Scope of Work | Brought to Life</title>
      </Head>

      <main className="bg-(--bg-ivory) min-h-screen">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="h1 text-(--ink-900)">General Scope of Work (SOW)</h1>
          <p className="mt-2 text-(--ink-700)">
            This is the baseline Scope of Work used for all Brought to Life
            projects. Individual projects may include additional deliverables,
            timelines, and pricing described in a product-specific SOW.
          </p>

          {/* SECTION 1 — OVERVIEW */}
          <section className="mt-10 space-y-3">
            <h2 className="h3 text-(--ink-900)">1. Overview</h2>
            <p className="text-(--ink-800)">
              This Scope of Work (“SOW”) outlines what is included, what is not
              included, and what is required to complete a standard engagement
              with Brought to Life. This SOW is governed by the{" "}
              <Link href="/legal/msa" className="underline">
                Master Services Agreement (MSA)
              </Link>
              .
            </p>
            <p className="text-(--ink-700)">
              A project-specific SOW will replace or augment this general SOW as
              appropriate.
            </p>
          </section>

          {/* SECTION 2 — DELIVERABLES */}
          <section className="mt-10 space-y-3">
            <h2 className="h3 text-(--ink-900)">2. Standard Deliverables</h2>
            <p className="text-(--ink-700)">
              For most projects, deliverables generally fall into the following
              categories:
            </p>

            <ul className="list-disc pl-5 text-(--ink-800)">
              <li>
                **Project strategy & alignment**  
                Clarifying goals, priorities, and outcomes.
              </li>
              <li>
                **Design & creative direction**  
                Visual direction, layout planning, and mood/style references.
              </li>
              <li>
                **Technical or marketing deliverables**  
                (e.g., website pages, SEO improvements, photography, coaching).
              </li>
              <li>
                **Basic launch or handoff**  
                Publishing, hosting setup, or delivery of final assets.
              </li>
            </ul>

            <p className="text-(--ink-700)">
              Each product or custom project includes a tailored list of
              deliverables in its respective SOW.
            </p>
          </section>

          {/* SECTION 3 — OUT OF SCOPE */}
          <section className="mt-10 space-y-3">
            <h2 className="h3 text-(--ink-900)">3. Out of Scope</h2>

            <p className="text-(--ink-700)">
              The following items are not included unless explicitly stated in
              writing:
            </p>

            <ul className="list-disc pl-5 text-(--ink-800)">
              <li>Ongoing content writing or monthly SEO retainers</li>
              <li>Paid advertising or campaign management</li>
              <li>Advanced custom software or portal development</li>
              <li>Unlimited revisions or revision rounds beyond the scope</li>
              <li>Rush timelines without a written rush agreement</li>
              <li>Any deliverable not explicitly documented in the SOW</li>
            </ul>
          </section>

          {/* SECTION 4 — TIMELINES */}
          <section className="mt-10 space-y-3">
            <h2 className="h3 text-(--ink-900)">4. Timelines</h2>
            <p className="text-(--ink-700)">
              Standard project timelines depend on client responsiveness and the
              complexity of the work. Timelines typically range from:
            </p>

            <ul className="list-disc pl-5 text-(--ink-800)">
              <li>Simple coaching or consulting — 1–2 weeks</li>
              <li>Brand or content work — 1–2 weeks</li>
              <li>Standard websites — 2–3 weeks</li>
              <li>More complex deliverables — 3–6 weeks</li>
            </ul>

            <p className="text-(--ink-600)">
              Timelines may change based on scope, revisions, feedback speed, or
              additional work requested.
            </p>
          </section>

          {/* SECTION 5 — INVESTMENT */}
          <section className="mt-10 space-y-3">
            <h2 className="h3 text-(--ink-900)">5. Investment & Payments</h2>
            <p className="text-(--ink-700)">
              Project pricing varies based on the selected product, tier, or
              custom quote. Unless otherwise agreed:
            </p>

            <ul className="list-disc pl-5 text-(--ink-800)">
              <li>Projects require a 50% deposit to begin</li>
              <li>Remaining 50% is due at completion and prior to launch</li>
              <li>
                Subscription or retainer services are billed in recurring
                intervals as specified
              </li>
            </ul>

            <p className="text-(--ink-600)">
              Payment constitutes acceptance of this SOW and the governing MSA.
            </p>
          </section>

          {/* SECTION 6 — CLIENT REQUIREMENTS */}
          <section className="mt-10 space-y-3">
            <h2 className="h3 text-(--ink-900)">6. Client Requirements</h2>

            <ul className="list-disc pl-5 text-(--ink-800)">
              <li>Provide accurate information and materials needed to begin</li>
              <li>
                Respond to feedback requests within 2–3 business days unless
                otherwise arranged
              </li>
              <li>Provide timely approvals to avoid timeline delays</li>
              <li>
                Communicate changes or additions early; they may require
                additional fees
              </li>
            </ul>
          </section>

          {/* SECTION 7 — CHANGES */}
          <section className="mt-10 space-y-3">
            <h2 className="h3 text-(--ink-900)">7. Change Requests</h2>

            <p className="text-(--ink-700)">
              Changes beyond the documented scope will require a written change
              order and may adjust timelines, pricing, or deliverables.
            </p>
          </section>

          {/* SECTION 8 — ACCEPTANCE */}
          <section className="mt-12 space-y-3 border-t border-(--border) pt-6">
            <h2 className="h3 text-(--ink-900)">8. Acceptance</h2>
            <p className="text-(--ink-700)">
              By paying the initial deposit or by explicitly approving the formal
              project proposal, the client acknowledges:
            </p>

            <ul className="list-disc pl-5 text-(--ink-800)">
              <li>They have read and understand this SOW</li>
              <li>They agree to the governing Master Services Agreement (MSA)</li>
              <li>
                They understand that additional written SOWs may supplement or
                replace this general SOW
              </li>
            </ul>
          </section>

          <div className="mt-8 flex gap-3">
            <Link href="/shop" className="btn btn-secondary">
              Back to shop
            </Link>
            <Link href="/contact" className="btn btn-primary">
              Contact us
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
