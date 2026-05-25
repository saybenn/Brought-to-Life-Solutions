// /components/results/TestimonialStrip.tsx
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

type Testimonial = {
  name: string;
  business: string;
  quote: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Bold City IAQ",
    business: "Water Restoration & Mold Remediation",
    rating: 5,
    quote:
      "Sabin rebuilt our entire website, and it made all the difference. Professional, prompt, and easy to work with. After the new site went live, we started getting almost three times the calls.",
  },
  {
    name: "Apollos Cleaning",
    business: "Veteran-Owned Cleaning Services",
    rating: 5,
    quote:
      "Knowledgeable, helpful, and easy to work with. The site makes my business feel official and something I can stand behind. Highly recommended.",
  },
  {
    name: "CES757",
    business: "Epoxy Garage Floors",
    rating: 5,
    quote:
      "Great service and quick responses. Exactly what I needed to start running ads and look like a serious operation. 10/10 would work with him again.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const isFilled = index < rating;

        return (
          <span
            key={index}
            aria-hidden="true"
            className={cn(
              "text-sm leading-none",
              isFilled ? "text-[var(--brand-700)]" : "text-(--ink-300)",
            )}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export function TestimonialStrip() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className={cn(
        "mt-12 border-t border-(--border-subtle) pt-8",
        "transition-all duration-700 ease-out",
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--ink-500)">
            Real client words
          </p>

          <h3 className="mt-1 text-base font-semibold text-(--ink-900) sm:text-lg">
            Owners with clearer visibility, stronger credibility, and a better
            path to inquiry.
          </h3>

          <p className="mt-1 text-sm text-(--ink-700)">
            The proof is in the installed system, the client&apos;s words, and
            the movement that followed.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="flex h-full flex-col justify-between rounded-[var(--r-lg)] border border-(--border-soft) bg-(--surface-muted) p-4"
          >
            <div>
              <StarRating rating={t.rating} />

              <blockquote className="mt-4 text-sm leading-relaxed text-(--ink-800)">
                “{t.quote}”
              </blockquote>
            </div>

            <figcaption className="mt-4 text-xs text-(--ink-600)">
              <span className="block font-semibold text-(--ink-900)">
                {t.name}
              </span>
              <span>{t.business}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
