import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";
/**
 * Hero — full-width banner with optional right image.
 * Tone accepts "ivory" | "cream" for subtle background gradient.
 */
export default function Hero({
  eyebrow = "OUTCOMES OVER HYPE",
  headline = "Get backed. Get seen. Get heard. Get paid.",
  subtitle = "Practical websites. Real SEO. Clear coaching. Honest imagery.",
  bullets = [
    "Launch a Lead-Machine Site in 14 days.",
    "Kickstart your Local SEO and get found on Maps.",
    "Stay accountable with coaching and real progress.",
  ],
  primary = { href: "/shop", label: "Shop Services" },
  secondary = { href: "/resources", label: "Visit Free Aisle" },
  image,
  tone = "ivory",
}) {
  const base = tone === "cream" ? "var(--bg-cream)" : "var(--bg-ivory)";
  const gradient = `
    linear-gradient(
      210deg,
      ${base} 0%,
      color-mix(in oklab, var(--white) 94%, var(--green-500)) 55%,
      color-mix(in oklab, var(--white) 88%, var(--green-500)) 100%
    )
  `;

  return (
    <section
      className="rounded-3xl shadow-xl pt-24 md:pt-12"
      style={{ background: gradient }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="grid items-center gap-8 p-6 sm:p-10 lg:p-12 lg:grid-cols-12">
            {/* Copy */}
            <div className="lg:col-span-7">
              <div className="eyebrow mb-2 text-[var(--muted-400)]">
                {eyebrow}
              </div>

              <h1 className="h1 mt-2 animate-fadeUp">
                Get{" "}
                <span className="text-[var(--green-forest-700)]">backed</span>.
                Get
                <span className="text-[var(--green-forest-700)]"> seen</span>.
                Get{" "}
                <span className="text-[var(--green-forest-700)]">heard</span>.
                Get <span className="text-[var(--green-forest-700)]">paid</span>
                .
              </h1>

              <p className="subhead mt-4 max-w-2xl animate-fadeUp [animation-delay:150ms]">
                {subtitle}
                <br className="hidden md:block" />
                Everything you need to look credible, rank locally, and grow
                with confidence.
              </p>

              <ul className="mt-5 space-y-2 text-[var(--ink-700)]">
                {bullets.map((text, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 animate-fadeUp"
                    style={{ animationDelay: `${200 + i * 60}ms` }}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="mt-0.5 h-5 w-5 flex-none"
                      fill="currentColor"
                      style={{ color: "var(--green-500)" }}
                    >
                      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                    </svg>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href={primary.href}>
                  <Button variant="primary">{primary.label}</Button>
                </Link>
                <Link href={secondary.href}>
                  <Button variant="secondary">{secondary.label}</Button>
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div className="lg:col-span-5">
              <div className="hero-21x9 w-full overflow-hidden rounded-2xl bg-[var(--white)]">
                {image ? (
                  <Image
                    src={image.src}
                    alt={image.alt || "Our work collage"}
                    width={1600}
                    height={685}
                    className="h-full w-full object-cover"
                    priority
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-sm text-[var(--muted-400)]">
                    Reserve: 21×9 editorial image / device collage
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* spacing below hero */}
        <div className="h-8" />
      </div>
    </section>
  );
}
