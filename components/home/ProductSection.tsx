// components/sections/ProductSection.tsx
import { cn } from "@/lib/utils";

type TierId = "starter" | "engine" | "growth";

const TIERS: {
  id: TierId;
  name: string;
  tag?: string;
  featured?: boolean;
  price: string;
  priceNote: string;
  headline: string;
  subline: string;
  bestFor: string;
  bullets: string[];
  ctaPrimary: string;
  ctaSecondary?: string;
}[] = [
  {
    id: "starter",
    name: "Starter System",
    tag: "Foundation",
    price: "Starting at $2,000",
    priceNote: "Perfect for newer or growing owners.",
    headline: "Turn your site into a simple, steady lead source.",
    subline:
      "A clean, conversion-focused foundation that replaces ‘pretty but passive’ sites.",
    bestFor: "Owners who want a real backbone, not another redesign.",
    bullets: [
      "SEO-ready structure & clear navigation",
      "Homepage & key pages designed to convert",
      "Core lead paths wired into your inbox",
      "Baseline analytics so you can see what’s working",
    ],
    ctaPrimary: "Start with the Starter System",
    ctaSecondary: "See what’s included",
  },
  {
    id: "engine",
    name: "Revenue Engine",
    tag: "Most Chosen",
    featured: true,
    price: "Starting at $4,800",
    priceNote: "Our recommended option for serious operators.",
    headline: "Your full revenue system, wired end-to-end.",
    subline:
      "Visibility, proof, conversion, offers, operations, and analytics—built to work together.",
    bestFor: "Owners who want predictable, trackable revenue—not guesses.",
    bullets: [
      "Six Sockets wired into one calm system",
      "Search, Maps, and on-site structure for steady discovery",
      "Proof, offers, and UX tuned for conversion",
      "Pipelines, intake, and booking flows systemized",
      "Analytics & dashboards so you can scale on purpose",
    ],
    ctaPrimary: "Build my Revenue Engine",
    ctaSecondary: "Talk through the details",
  },
  {
    id: "growth",
    name: "Growth Partner",
    tag: "Ongoing",
    price: "From $950 / month",
    priceNote: "Limited spots. By application only.",
    headline: "An ongoing team that thinks about your revenue for you.",
    subline:
      "We stay in the numbers, tune the system, and help you make better decisions month after month.",
    bestFor: "Owners who want a long-term, systems-minded partner.",
    bullets: [
      "Monthly reviews & optimization sprints",
      "New experiments based on live data, not hunches",
      "Landing pages, offers, and tests shipped for you",
      "Priority support for changes and improvements",
    ],
    ctaPrimary: "Apply for Growth Partner",
    ctaSecondary: "See if it’s a fit",
  },
];

export function ProductSection() {
  const handlePrimaryClick = (tierId: TierId) => {
    // TODO: wire to Stripe / Calendly / custom flow
    console.log("Primary CTA clicked for:", tierId);
  };

  const handleSecondaryClick = (tierId: TierId) => {
    // TODO: open modal / scroll to details / toggle Part B
    console.log("Secondary CTA clicked for:", tierId);
  };

  return (
    <section
      className="relative isolate py-24 sm:py-32"
      style={{
        background: `
          linear-gradient(
            to bottom,
            #050e0a 0%,
            #050e0a 30%,
            #071812 55%,
            #0b1813 75%,
            #0e1412ff 100%
          )
        `,
      }}
    >
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage: "url('/textures/grain.png')",
          backgroundSize: "320px",
        }}
      />

      {/* Ambient glow behind featured card */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full blur-3xl opacity-30 bg-[var(--olive-mist)]" />

      <div className="relative z-10 mx-auto max-w-10/12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 lg:mb-16">
          <p className="eyebrow on-dark-muted mb-3">04. YOUR SYSTEM OPTIONS</p>
          <h2 className="h2 on-dark text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Choose the system that makes earning feel predictable.
          </h2>
          <p className="subhead on-dark-sub mt-4">
            Each package installs a calm, revenue-first system around your
            website—so it stops acting like a brochure and starts behaving like
            an engine.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3 items-stretch">
          {TIERS.map((tier) => {
            const featured = tier.featured;

            return (
              <article
                key={tier.id}
                className={cn(
                  "relative flex flex-col rounded-[var(--r-xl)] border border-white/6 bg-white/3",
                  "backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
                  "px-5 py-6 sm:px-6 sm:py-7 md:px-7 md:py-8",
                  "transition-transform transition-shadow duration-300 ease-out",
                  "hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(0,0,0,0.55)]",
                  featured
                    ? "lg:scale-[1.03] lg:-translate-y-1.5 border-[var(--sage-300)]/55"
                    : "opacity-[0.96]"
                )}
              >
                {/* Tag / badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col items-start gap-1">
                    <p className="eyebrow on-dark-muted">{tier.tag}</p>
                    <h3 className="h3 on-dark text-lg sm:text-xl">
                      {tier.name}
                    </h3>
                  </div>

                  {featured && (
                    <span className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[0.68rem] font-medium tracking-[0.18em] uppercase on-dark">
                      Most chosen
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-4 sm:mb-5">
                  <p className="text-sm font-medium tracking-[0.16em] uppercase text-[rgba(255,255,255,0.72)]">
                    {tier.price}
                  </p>
                  <p className="caption on-dark-muted mt-1">{tier.priceNote}</p>
                </div>

                {/* Outcome copy */}
                <div className="space-y-2.5 mb-5 sm:mb-6">
                  <p className="text-sm font-semibold text-[rgba(255,255,255,0.94)]">
                    {tier.headline}
                  </p>
                  <p className="text-sm text-[rgba(255,255,255,0.78)]">
                    {tier.subline}
                  </p>
                  <p className="text-xs text-[rgba(255,255,255,0.7)] italic">
                    Best for: {tier.bestFor}
                  </p>
                </div>

                {/* Bullet list */}
                <ul className="space-y-2.5 mb-6 text-sm text-[rgba(255,255,255,0.78)]">
                  {tier.bullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[7px] h-1 w-1 rounded-full bg-[rgba(255,255,255,0.7)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="mt-auto pt-3 flex flex-col gap-2">
                  <button
                    type="button"
                    className={cn(
                      "btn btn-primary w-full justify-center text-sm",
                      featured && "shadow-[0_18px_50px_rgba(0,0,0,0.65)]"
                    )}
                    onClick={() => handlePrimaryClick(tier.id)}
                  >
                    {tier.ctaPrimary}
                  </button>

                  {tier.ctaSecondary && (
                    <button
                      type="button"
                      className="btn btn-secondary w-full justify-center text-xs sm:text-sm on-dark-muted bg-white/5 border-white/18 hover:bg-white/10"
                      onClick={() => handleSecondaryClick(tier.id)}
                    >
                      {tier.ctaSecondary}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Safety / reassurance line */}
        <p className="mt-8 sm:mt-10 text-center text-[0.78rem] text-[rgba(255,255,255,0.65)] max-w-xl mx-auto">
          Not sure which system fits? Start the conversation—no hard pitch, just
          clear answers and a recommendation based on where your revenue is
          stuck today.
        </p>
      </div>
    </section>
  );
}
