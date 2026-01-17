// /components/results/ResultsSection.tsx
import Link from "next/link";
import { CaseCard } from "./CaseCard";
import { TestimonialStrip } from "./TestimonialStrip";

const CASES = [
  {
    title: "Bold City IAQ — From invisible to 3× more calls",
    clientType: "WATER RESTORATION · JACKSONVILLE, FL",
    sockets: ["Visibility", "Proof", "Conversion", "Operations"],
    before:
      "Their old WordPress site looked half-finished and amateur. No real photos, no SEO presence, and a weak mobile experience meant visitors and Google basically ignored them.",
    system:
      "We built a custom Next.js site, shot real on-site photography from hurricane cleanup jobs, clarified services, and wired an emergency-first navigation with local SEO best practices and a fast, stable core.",
    after:
      "The owner reports roughly three times as many calls, more inquiries, and a site he’s proud to show off—one that even helped him refer us to another restoration company.",
    imageSrc: "/images/boldcity.webp",
    highlight: true,
  },
  {
    title:
      "Apollos Cleaning — A credible home base for a veteran-owned cleaner",
    clientType: "CLEANING SERVICES · VETERAN-OWNED",
    sockets: ["Visibility", "Proof", "Offer Strength"],
    before:
      "No website, no online identity, and no link to share—just word-of-mouth that risked making him look like ‘a guy doing errands for money.’",
    system:
      "We built a clean, mobile-first one-page site that lays out services, trust cues, and a clear way to reach him.",
    after:
      "The site gives him a badge of legitimacy he can wear into conversations with customers. He left a positive review and finally has something that looks as serious as he is.",
    imageSrc: "/images/apollos.webp",
    highlight: false,
  },
  {
    title: "CES757 — Ad-ready funnel for epoxy garage floors",
    clientType: "EPOXY FLOORING · HAMPTON ROADS, VA",
    sockets: ["Visibility", "Offer Strength", "Conversion"],
    before:
      "No site, nowhere solid to send ad traffic, and no visual authority in a highly visual trade.",
    system:
      "We designed a multi-page conversion funnel with clear service pages, a project gallery structure, and a landing experience built to receive paid traffic.",
    after:
      "Now he has a professional, ad-ready destination for his campaigns and a brand presence he reviewed positively—and is returning to expand as his capacity allows.",
    imageSrc: "/images/ces.webp",
    highlight: false,
  },
  {
    title: "Aloyo Money Management — Elevating a DIY Wix site",
    clientType: "FINANCIAL SERVICES · RHODE ISLAND",
    sockets: ["Offer Strength", "Proof", "Conversion"],
    before:
      "Their Wix site was cramped, inconsistent in color, and visually amateur—undercutting the credibility you need when handling people’s money.",
    system:
      "We overhauled the spacing, hierarchy, and color system, using typography and layout to create breathing room and a calmer, more confident environment.",
    after:
      "The final site feels cohesive and professional. The owner loved the result and finally has a presence that matches the seriousness of her work.",
    imageSrc: "/images/aloyo.webp",
    highlight: false,
  },
  {
    title: "The Swade Group — Simplifying a broad service offering",
    clientType: "WATER RESTORATION · MULTI-SERVICE",
    sockets: ["Conversion", "Operations", "Visibility"],
    before:
      "A broad list of services with no clear structure made it hard for visitors to quickly understand what they offered and what to do next.",
    system:
      "We designed a lightweight, low-friction experience with predictable navigation and an intentional path from scanning services to getting in touch.",
    after:
      "The owner loves the site and even tried to bring us back in for another project—it’s now a clear, easy-to-use tool that supports his sales conversations.",
    imageSrc: "/images/swade.webp",
    highlight: false,
  },
];

export function ResultsSection() {
  return (
    <section
      id="results"
      className="bg-(--page) py-16 sm:py-20 md:py-24 border-t border-(--border-subtle)"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-4xl">
          <p className="eyebrow text-[var(--muted)] text-sm  w-fit">
            05. Results & Proof
          </p>

          <h2 className="h2 mt-3 text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Not redesigns. System installations that fixed problems.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-(--ink-700)">
            No “pretty pages.” We wire visibility, proof, conversion, offers,
            operations, and analytics so revenue stops feeling random.
          </p>
        </header>

        {/* Scan row (new) */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3 text-sm text-(--ink-700)">
          <div className="rounded-2xl border border-(--border-subtle) bg-(--surface-elevated) px-4 py-3">
            <span className="font-semibold text-(--ink-900)">More calls</span>{" "}
            from higher-intent traffic
          </div>
          <div className="rounded-2xl border border-(--border-subtle) bg-(--surface-elevated) px-4 py-3">
            <span className="font-semibold text-(--ink-900)">Higher trust</span>{" "}
            so buyers choose faster
          </div>
          <div className="rounded-2xl border border-(--border-subtle) bg-(--surface-elevated) px-4 py-3">
            <span className="font-semibold text-(--ink-900)">
              Less manual work
            </span>{" "}
            through sane systems
          </div>
        </div>

        {/* Case grid */}
        <div className="mt-10 space-y-8">
          <div className="grid gap-6 md:grid-cols-3">
            {CASES.slice(0, 3).map((item) => (
              <CaseCard key={item.title} {...item} />
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {CASES.slice(3).map((item) => (
              <CaseCard key={item.title} {...item} />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <TestimonialStrip />

        {/* CTA (updated to system review -> /contact) */}
        <div className="mt-12 flex flex-col gap-3 border-t border-(--border-subtle) pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-(--ink-900)">
              Want to know where revenue is leaking?
            </h3>
            <p className="mt-1 text-sm text-(--ink-700)">
              We&apos;ll review your current site and point out which socket(s)
              are breaking predictability.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?intent=system-review"
              className="inline-flex items-center justify-center rounded-full  px-5 py-2.5 text-sm font-medium btn btn-primary"
              data-track="click cta"
              data-location="results section"
              data-intent="Request a review"
              data-label="Request a system review"
            >
              Request a system review
            </Link>

            <Link
              href="/process"
              className="inline-flex items-center justify-center rounded-full border border-(--border-soft) bg-(--surface-muted) px-5 py-2.5 text-sm font-medium text-(--ink-900) hover:bg-(--surface-elevated) transition-colors"
              data-track="click cta"
              data-location="results section"
              data-intent="See how it works"
              data-label="See how it works"
            >
              See how it works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
