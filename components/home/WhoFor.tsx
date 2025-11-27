// components/home/WhoFor.tsx
import Image from "next/image";

const ITEMS = [
  {
    first: "Local trades & owner-operators.",
    second:
      "For those tired of relying on reputation alone — and ready for a stronger online backbone.",
  },
  {
    first: "New or growing businesses.",
    second:
      "For entrepreneurs seeking clarity in their offer, pricing, and positioning.",
  },
  {
    first: "Established businesses.",
    second:
      "For owners ready to escape feast-or-famine lead flow and build predictability.",
  },
  {
    first: "Craft and revenue-focused systems.",
    second:
      "For people who value systems over hype — and want results, not randomness.",
  },
];

export default function WhoFor() {
  return (
    <section className="section-pad bg-[var(--bg-ivory)]">
      {/* Section header */}
      <div className="mx-auto my-12 flex w-full flex-col items-center text-center">
        <h2 className="h2 text-ink">Who BTLS Is Built For</h2>
        <p className="subhead mt-2 max-w-xl text-ink-muted">
          We work with owners who care about clarity, credibility, and
          predictable growth — not hype or guesswork.
        </p>
      </div>

      {/* Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl bg-[var(--green-pine-800)] overflow-hidden w-5/6 mx-auto">
        {/* Image column */}
        <div className="relative h-[480px] lg:h-full w-full">
          <Image
            src="/images/whofor.png"
            alt="BTLS workspace with laptop, whiteboard, and plants"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Text column */}
        <div className="mt-4 lg:mt-0  p-4 px-4 md:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8">
            {ITEMS.map((item, index) => (
              <div
                key={item.first}
                className="flex items-start gap-6 border-b-2 border-dashed border-white/40 pb-6 last:border-b-0 last:pb-0"
              >
                <p className="mt-1 text-4xl font-semibold leading-none text-[var(--isabelline)]/70 md:text-5xl lg:text-6xl">
                  0{index + 1}
                </p>

                <div className="space-y-1">
                  <p className="text-lg font-semibold text-[var(--isabelline)] md:text-xl lg:text-2xl">
                    {item.first}
                  </p>
                  <p className="text-sm text-[var(--isabelline)]/75 md:text-base lg:text-lg">
                    {item.second}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex justify-between">
              <div className="flex-col flex w-1/2 justify-between">
                <p className="eyebrow capitalize">
                  Designed using conversion psychology and analytics-backed
                  patterns
                </p>
                <p className="eyebrow capitalize">
                  Built from real case data, not trends
                </p>
              </div>
              <button className="btn btn-secondary">
                Book a Strategy Meeting
              </button>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
