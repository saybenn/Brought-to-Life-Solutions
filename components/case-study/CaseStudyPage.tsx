// /components/case-study/CaseStudyPage.tsx
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/lib/catalog/types";

function Section({
  label,
  title,
  children,
  className,
  band = false,
}: {
  label?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  band?: boolean;
}) {
  return (
    <section
      className={cn(
        band ? "bg-[var(--bg-alt)]" : "bg-[var(--bg-page)]",
        "py-12 sm:py-16 lg:py-20",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {label ? (
          <p className="text-[12px] tracking-[0.18em] text-[var(--muted)]">
            {label}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-3 font-[var(--font-head)] text-[28px] leading-[var(--leading-tight)] text-[var(--ink-900)] sm:text-[34px] lg:text-[40px]">
            {title}
          </h2>
        ) : null}
        <div className={cn(title || label ? "mt-6" : "", "")}>{children}</div>
      </div>
    </section>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow-soft)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function SocketChips({ sockets }: { sockets: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sockets.map((s) => (
        <span
          key={s}
          className="rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1 text-[13px] text-[var(--ink-700)]"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

function DesktopEvidenceGrid({
  items,
}: {
  items: CaseStudy["assets"]["evidence"];
}) {
  const desktops = items.filter((i) => i.kind === "desktop");

  if (!desktops.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 items-stretch">
      {desktops.map((a) => (
        <Card key={a.src} className="overflow-hidden">
          <div className="relative aspect-[16/9] bg-[var(--bg-page)]">
            <Image
              src={a.src}
              alt={a.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-4 sm:p-5 flex-1 flex flex-col">
            <p className="text-[12px] tracking-[0.12em] text-[var(--muted)]">
              DESKTOP SYSTEM
            </p>
            <p className="mt-2 text-[14px] leading-[var(--leading-normal)] text-[var(--ink-700)] line-clamp-2">
              {a.alt}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

function MobileEvidenceRail({
  items,
  eyebrow,
  description,
}: {
  items: CaseStudy["assets"]["evidence"];
  eyebrow: string;
  description: string;
}) {
  const mobiles = items.filter((i) => i.kind === "mobile");

  if (!mobiles.length) return null;

  return (
    <div className="mt-10">
      <p className="text-[12px] tracking-[0.18em] text-[var(--muted)]">
        {eyebrow}
      </p>

      <p className="mt-2 max-w-prose text-[15px] leading-[var(--leading-relaxed)] text-[var(--ink-700)]">
        {description}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 items-stretch lg:grid-cols-3">
        {mobiles.map((a) => (
          <Card key={a.src} className="overflow-hidden mx-auto max-w-[320px]">
            <div className="relative aspect-[9/16] bg-[var(--bg-page)]">
              <Image
                src={a.src}
                alt={a.alt}
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
            <div className="p-4 sm:p-5 flex-1 flex flex-col">
              <p className="text-[12px] tracking-[0.12em] text-[var(--muted)]">
                MOBILE
              </p>
              <p className="mt-2 text-[14px] leading-[var(--leading-normal)] text-[var(--ink-700)] line-clamp-2">
                {a.alt}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <main className="bg-[var(--bg-page)]">
      {/* HERO */}
      <section className="bg-[var(--bg-page)] pt-10 sm:pt-14 lg:pt-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="text-[12px] tracking-[0.18em] text-[var(--muted)]">
              {study.eyebrow}
            </p>

            <h1 className="mt-3 font-[var(--font-head)] text-[44px] leading-[1.05] text-[var(--ink-900)] sm:text-[54px] lg:text-[64px]">
              {study.heroHeadline}
            </h1>

            <p className="mt-5 max-w-prose text-[16px] leading-[var(--leading-relaxed)] text-[var(--ink-700)] sm:text-[18px]">
              {study.heroSubhead}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-[13px] text-[var(--muted)]">
              <span className="rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1">
                {study.industry}
              </span>
              <span className="rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1">
                {study.location}
              </span>
              <span className="rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1">
                {study.clientName}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={study.cta.primaryHref}
                className="inline-flex items-center justify-center rounded-[999px] bg-[var(--brand-600)] px-6 py-3 text-[14px] font-semibold text-white shadow-[var(--shadow-card)] transition-base hover:bg-[var(--brand-700)]"
              >
                {study.cta.primaryLabel}
              </Link>
              <Link
                href={study.cta.secondaryHref}
                className="inline-flex items-center justify-center rounded-[999px] border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-3 text-[14px] font-semibold text-[var(--ink-900)] transition-base hover-raise"
              >
                {study.cta.secondaryLabel}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Card className="overflow-hidden">
              <div className="relative aspect-[16/10] bg-[var(--bg-page)]">
                <Image
                  src={study.assets.hero.src}
                  alt={study.assets.hero.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </Card>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
          <div className="h-px w-full bg-[var(--border)]" />
        </div>
      </section>

      {/* CONTEXT */}
      <Section label={study.contextLabel} band>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {study.contextBody.map((p, idx) => (
                <p
                  key={idx}
                  className="max-w-prose text-[16px] leading-[var(--leading-relaxed)] text-[var(--ink-700)] sm:text-[18px]"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card className="p-6 sm:p-8">
              <p className="font-[var(--font-head)] text-[22px] leading-[1.2] text-[var(--ink-900)] sm:text-[26px]">
                {study.contextPullQuote}
              </p>
              <p className="mt-3 text-[14px] leading-[var(--leading-normal)] text-[var(--muted)]">
                The fix is structural: clarity, trust signals, speed, and
                conversion paths built for urgency.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* PROBLEM */}
      <Section title={study.problemTitle}>
        <Card className="p-6 sm:p-8">
          <ul className="grid gap-3 sm:grid-cols-2">
            {study.problemBullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[var(--brand-600)]" />
                <p className="text-[15px] leading-[var(--leading-normal)] text-[var(--ink-700)] sm:text-[16px]">
                  {b}
                </p>
              </li>
            ))}
          </ul>
          {study.problemCloser ? (
            <p className="mt-6 text-[14px] leading-[var(--leading-normal)] text-[var(--muted)]">
              {study.problemCloser}
            </p>
          ) : null}
        </Card>
      </Section>

      {/* SYSTEM */}
      <Section title={study.systemTitle}>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="max-w-prose text-[16px] leading-[var(--leading-relaxed)] text-[var(--ink-700)] sm:text-[18px]">
              {study.systemIntro}
            </p>

            <div className="mt-6">
              <Card className="overflow-hidden">
                <div className="relative aspect-[16/10] bg-[var(--bg-page)]">
                  <Image
                    src={study.assets.supportingHero.src}
                    alt={study.assets.hero.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-[12px] tracking-[0.12em] text-[var(--muted)]">
                    PROOF
                  </p>
                  <p className="mt-2 text-[14px] leading-[var(--leading-normal)] text-[var(--ink-700)]">
                    Real work, real environment. This is what the system has to
                    represent.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-5">
              {study.pillars.map((p) => (
                <Card key={p.title} className="p-6 sm:p-8">
                  <h3 className="font-[var(--font-head)] text-[22px] leading-[1.2] text-[var(--ink-900)] sm:text-[24px]">
                    {p.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-[10px] h-1.5 w-1.5 flex-none rounded-full bg-[var(--focus)]" />
                        <p className="text-[15px] leading-[var(--leading-normal)] text-[var(--ink-700)] sm:text-[16px]">
                          {b}
                        </p>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* SIX SOCKETS */}
      <Section label={study.frameworkLabel} band>
        <Card className="p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h3 className="font-[var(--font-head)] text-[24px] leading-[1.15] text-[var(--ink-900)] sm:text-[28px]">
                The Six Sockets
              </h3>
              <p className="mt-3 max-w-prose text-[15px] leading-[var(--leading-relaxed)] text-[var(--ink-700)] sm:text-[16px]">
                {study.socketsLine}
              </p>
            </div>
            <div className="lg:col-span-5">
              <SocketChips sockets={study.sockets} />
            </div>
          </div>
        </Card>
      </Section>

      {/* RESULTING SYSTEM (EVIDENCE) */}
      <Section title={study.resultingTitle}>
        <p className="max-w-prose text-[16px] leading-[var(--leading-relaxed)] text-[var(--ink-700)] sm:text-[18px]">
          {study.resultingCaption}
        </p>

        <div className="mt-8">
          <DesktopEvidenceGrid items={study.assets.evidence} />

          <div className="my-10 h-px w-full bg-[var(--border)]" />

          {study.mobileEvidence && (
            <MobileEvidenceRail
              items={study.assets.evidence}
              eyebrow={study.mobileEvidence.eyebrow}
              description={study.mobileEvidence.description}
            />
          )}
        </div>
      </Section>

      {/* OUTCOMES */}
      <Section title={study.outcomesTitle} band>
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {study.outcomes.map((o) => (
                <Card key={o.label} className="p-6">
                  <p className="text-[12px] tracking-[0.14em] text-[var(--muted)]">
                    {o.label.toUpperCase()}
                  </p>
                  <p className="mt-2 font-[var(--font-head)] text-[26px] leading-[1.1] text-[var(--ink-900)]">
                    {o.value}
                  </p>
                  {o.note ? (
                    <p className="mt-3 text-[13px] leading-[var(--leading-normal)] text-[var(--muted)]">
                      {o.note}
                    </p>
                  ) : null}
                </Card>
              ))}
            </div>

            {study.outcomesCloser ? (
              <p className="mt-6 max-w-prose text-[14px] leading-[var(--leading-relaxed)] text-[var(--muted)]">
                {study.outcomesCloser}
              </p>
            ) : null}
          </div>

          <div className="lg:col-span-5">
            <Card className="p-6 sm:p-8">
              <p className="text-[12px] tracking-[0.18em] text-[var(--muted)]">
                CLIENT WORDS
              </p>
              <p className="mt-4 font-[var(--font-head)] text-[22px] leading-[1.25] text-[var(--ink-900)] sm:text-[24px]">
                {study.testimonial.quote}
              </p>
              <p className="mt-5 text-[14px] text-[var(--ink-700)]">
                <span className="font-semibold">{study.testimonial.name}</span>
                <span className="text-[var(--muted)]">
                  {" "}
                  — {study.testimonial.org}
                </span>
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* QUALIFY */}
      <Section title={study.qualifyTitle}>
        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="p-6 sm:p-8 lg:col-span-6">
            <p className="text-[12px] tracking-[0.18em] text-[var(--muted)]">
              FOR
            </p>
            <ul className="mt-4 space-y-3">
              {study.qualifyFor.map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="mt-[10px] h-1.5 w-1.5 flex-none rounded-full bg-[var(--brand-600)]" />
                  <p className="text-[15px] leading-[var(--leading-normal)] text-[var(--ink-700)]">
                    {x}
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 sm:p-8 lg:col-span-6">
            <p className="text-[12px] tracking-[0.18em] text-[var(--muted)]">
              NOT FOR
            </p>
            <ul className="mt-4 space-y-3">
              {study.qualifyNotFor.map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="mt-[10px] h-1.5 w-1.5 flex-none rounded-full bg-[var(--error)]" />
                  <p className="text-[15px] leading-[var(--leading-normal)] text-[var(--ink-700)]">
                    {x}
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section band className="pb-16 sm:pb-20">
        <Card className="p-7 sm:p-10">
          <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="font-[var(--font-head)] text-[30px] leading-[1.1] text-[var(--ink-900)] sm:text-[36px]">
                {study.cta.heading}
              </h2>
              <p className="mt-4 max-w-prose text-[16px] leading-[var(--leading-relaxed)] text-[var(--ink-700)]">
                {study.cta.body}
              </p>
            </div>
            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <div className="flex flex-wrap gap-3">
                <Link
                  href={study.cta.primaryHref}
                  className="inline-flex items-center justify-center rounded-[999px] bg-[var(--brand-600)] px-6 py-3 text-[14px] font-semibold text-white shadow-[var(--shadow-card)] transition-base hover:bg-[var(--brand-700)]"
                >
                  {study.cta.primaryLabel}
                </Link>
                <Link
                  href={study.cta.secondaryHref}
                  className="inline-flex items-center justify-center rounded-[999px] border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-3 text-[14px] font-semibold text-[var(--ink-900)] transition-base hover-raise"
                >
                  {study.cta.secondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </Section>
    </main>
  );
}
