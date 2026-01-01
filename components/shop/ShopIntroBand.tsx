import React from "react";
import Link from "next/link";

type Props = {
  headline?: string;
  subhead?: string;
  sockets?: string[];
};

export default function ShopIntroBand({
  headline = "Buy systems.\nNot guesses.",
  subhead = "This isn’t browsing. It’s selecting the next mechanism your business runs on — with outcomes, scope, and a clear next step.",
  sockets = [
    "Visibility",
    "Proof",
    "Conversion",
    "Offer Strength",
    "Operations",
    "Analytics",
  ],
}: Props) {
  return (
    <section className="relative overflow-hidden pt-16">
      {/* Deep submerged gradient (directional, high contrast) */}

      {/* Subtle grain */}

      {/* Gold thread (thin, intentional) */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-[72%] h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(214,185,138,0) 0%, rgba(214,185,138,0.55) 18%, rgba(214,185,138,0.20) 52%, rgba(214,185,138,0.0) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-10/12 pt-[clamp(48px,6vw,92px)] pb-[clamp(52px,6vw,96px)]">
        <div className="grid gap-(--space-10) lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <div className="flex items-center gap-(--space-3)">
              <span className="inline-flex h-2 w-2 rounded-full bg-(--gold-400)" />
              <p className="text-[12px] tracking-[0.26em] text-[rgba(247,243,235,0.75)]">
                SHOP
              </p>
            </div>

            <h2 className="mt-(--space-4) whitespace-pre-line font-[var(--font-head)] text-[clamp(40px,6vw,86px)] leading-[0.88] tracking-[-0.02em] text-[rgba(247,243,235,0.92)]">
              {headline}
            </h2>

            <p className="mt-(--space-5) max-w-[70ch] text-[rgba(247,243,235,0.78)] leading-[var(--leading-relaxed)] text-[16px]">
              {subhead}
            </p>

            <div className="mt-(--space-8)">
              <p className="text-[11px] tracking-[0.22em] text-[rgba(247,243,235,0.64)]">
                THE SIX SOCKETS (YOUR REVENUE FRAME)
              </p>
              <div className="mt-(--space-3) flex flex-wrap gap-(--space-2)">
                {sockets.map((s) => (
                  <span
                    key={s}
                    className="rounded-[999px] border px-(--space-3) py-[7px] text-[12px]"
                    style={{
                      borderColor: "rgba(214,185,138,0.28)",
                      color: "rgba(247,243,235,0.82)",
                      background: "rgba(0,0,0,0.18)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Calm dominance “guide card” */}
          <aside
            className="rounded-[var(--r-lg)] border p-(--space-7) shadow-[var(--shadow-deep)]"
            style={{
              borderColor: "rgba(214,185,138,0.20)",
              background: "rgba(10,16,13,0.55)",
              backdropFilter: "blur(10px)",
            }}
          >
            <p className="text-[13px] font-semibold text-[rgba(247,243,235,0.88)]">
              Calm, engineered offers.
            </p>
            <p className="mt-(--space-2) text-[13px] leading-[1.6] text-[rgba(247,243,235,0.70)]">
              Start with the most chosen system. If you prefer clarity before
              committing, book a roadmap session — then decide.
            </p>

            <div className="mt-(--space-6) grid gap-(--space-3)">
              <Link
                href="/products/revenue-engine?intent=buy&offerId=revenue_engine"
                className="btn btn-primary w-full justify-center"
              >
                View the Most Chosen
              </Link>

              <Link
                href="/booking?section=intro&intent=talk"
                className="btn btn-secondary w-full justify-center"
              >
                Talk first
              </Link>
            </div>

            <p className="mt-(--space-4) text-[12px] text-[rgba(247,243,235,0.62)]">
              You’re entering a buying experience, not window shopping.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
