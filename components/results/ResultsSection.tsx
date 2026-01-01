// /components/results/ResultsSection.tsx
import { CaseCard } from "./CaseCard";
import { TestimonialStrip } from "./TestimonialStrip";

const CASES = [
  {
    title: "Bold City IAQ — from invisible to 3× more calls",
    clientType: "WATER RESTORATION · JACKSONVILLE, FL",
    sockets: ["Visibility", "Proof", "Conversion", "Operations"],
    before:
      "Their old WordPress site looked half-finished and amateur. No real photos, no SEO presence, and a weak mobile experience meant visitors and Google basically ignored them.",
    system:
      "We built a custom Next.js site, shot real on-site photography from hurricane cleanup jobs, clarified services, and wired an emergency-first navigation with local SEO best practices and a fast, stable core.",
    after:
      "The owner reports roughly three times as many calls, more inquiries, and a site he’s proud to show off—one that even helped him refer us to another restoration company.",
    imageSrc: "/images/boldcity.webp", // swap with your actual path
    highlight: true,
  },
  {
    title:
      "Apollos Cleaning — a credible home base for a veteran-owned cleaner",
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
    title: "CES757 — ad-ready funnel for epoxy garage floors",
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
    title: "Aloyo Money Management — elevating a DIY Wix site",
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
    title: "The Swade Group — simplifying a broad service offering",
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
        <header className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-(--ink-500) uppercase">
            Results & Proof
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-[2rem] font-semibold text-(--ink-900)">
            What happens when a website finally behaves like a revenue system?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-(--ink-700)">
            We don’t ship “pretty pages.” We build systems that help owners get
            seen, trusted, and booked—by plugging their sites into the Six
            Sockets of Predictable Revenue.
          </p>
        </header>

        {/* Case grid */}
        <div className="mt-10 space-y-8">
          {/* Top row: 3 strongest cases */}
          <div className="grid gap-6 md:grid-cols-3">
            {CASES.slice(0, 3).map((item) => (
              <CaseCard key={item.title} {...item} />
            ))}
          </div>

          {/* Bottom row: 2 supporting cases */}
          <div className="grid gap-6 md:grid-cols-2">
            {CASES.slice(3).map((item) => (
              <CaseCard key={item.title} {...item} />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <TestimonialStrip />

        {/* CTA */}
        <div className="mt-12 flex flex-col gap-3 border-t border-(--border-subtle) pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-(--ink-900)">
              Ready for your site to act like a system, not a brochure?
            </h3>
            <p className="mt-1 text-sm text-(--ink-700)">
              We’ll plug your site into the sockets that move the needle:
              visibility, proof, conversion, offer strength, operations, and
              analytics.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-full bg-(--ink-900) px-5 py-2.5 text-sm font-medium text-(--white) hover:bg-(--ink-800) transition-colors"
            >
              View packages
            </a>
            <a
              href="#process"
              className="inline-flex items-center justify-center rounded-full border border-(--border-soft) bg-(--surface-muted) px-5 py-2.5 text-sm font-medium text-(--ink-900) hover:bg-(--surface-elevated) transition-colors"
            >
              See how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
