// /components/results/TestimonialStrip.tsx
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

type Testimonial = {
  name: string;
  business: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Bold City IAQ",
    business: "Water Restoration & Mold Remediation",
    quote:
      "Sabin rebuilt our entire website, and it made all the difference. Professional, prompt, and easy to work with. After the new site went live, we started getting almost three times the calls.",
  },
  {
    name: "Apollos Cleaning",
    business: "Veteran-Owned Cleaning Services",
    quote:
      "Knowledgeable, helpful, and easy to work with. The site makes my business feel official and something I can stand behind. Highly recommended.",
  },
  {
    name: "CES757",
    business: "Epoxy Garage Floors",
    quote:
      "Great service and quick responses. Exactly what I needed to start running ads and look like a serious operation. 10/10 would work with him again.",
  },
];

export function TestimonialStrip() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className={cn(
        "mt-12 border-t border-(--border-subtle) pt-8",
        "transition-all duration-700 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-(--ink-500) uppercase">
            Real client words
          </p>
          <h3 className="mt-1 text-base sm:text-lg font-semibold text-(--ink-900)">
            Owners who feel more visible, more official, and more in demand.
          </h3>
          <p className="mt-1 text-sm text-(--ink-700)">
            These aren&apos;t hype claims—we just built them better systems and
            let the results speak.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="flex h-full flex-col justify-between rounded-[var(--r-lg)] border border-(--border-soft) bg-(--surface-muted) p-4"
          >
            <blockquote className="text-sm text-(--ink-800)">
              “{t.quote}”
            </blockquote>
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
