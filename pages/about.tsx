// /pages/about.tsx
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * BTLS About Page (Locked)
 * Pages Router
 * - Uses CSS variable tokens (bg/text/border/shadows/radius)
 * - Uses 3 photo assets (portrait / workspace / detail)
 *
 * NOTE: Update image src paths to match your /public structure.
 * Recommended:
 *  /public/images/about/philosophy-portrait.jpg
 *  /public/images/about/sockets-hero.jpg
 *  /public/images/about/philosophy-detail.jpg
 */

const IMAGES = {
  portrait: {
    src: "/images/about/philosophy-portrait.jpg",
    alt: "Founder portrait in a calm, editorial workspace.",
  },
  workspace: {
    src: "/images/about/sockets-hero.jpg",
    alt: "A quiet, intentional workspace with tools and light.",
  },
  detail: {
    src: "/images/about/philosophy-detail.jpg",
    alt: "Hands working at a laptop—craft in motion.",
  },
};

function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-[var(--space-16)]", className)}>
      {children}
    </section>
  );
}

function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 md:px-6", className)}>
      {children}
    </div>
  );
}

function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow-card)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-[var(--border)]" />;
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold tracking-[0.12em] text-[var(--muted)]">
      {children}
    </div>
  );
}

function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="mt-3 font-[var(--font-head)] text-3xl leading-[var(--leading-tight)] text-[var(--ink-900)] md:text-5xl"
      style={{ letterSpacing: "-0.02em" }}
    >
      {children}
    </h1>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[var(--font-head)] text-2xl leading-[var(--leading-tight)] text-[var(--ink-900)] md:text-3xl">
      {children}
    </h2>
  );
}

function P({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-[var(--size-base)] leading-[var(--leading-normal)] text-[var(--ink-700)]",
        className
      )}
    >
      {children}
    </p>
  );
}

function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "transition-base inline-flex items-center justify-center rounded-[var(--r-md)] px-4 py-2 text-sm font-semibold";
  const styles =
    variant === "primary"
      ? "bg-[var(--brand-600)] text-white shadow-[var(--shadow-card)] hover:bg-[var(--brand-700)]"
      : "border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--ink-900)] shadow-[var(--shadow-soft)] hover:-translate-y-[1px]";
  return (
    <Link href={href} className={cn(base, styles)}>
      {children}
    </Link>
  );
}

function PhotoCard({
  src,
  alt,
  priority,
  aspect = "portrait",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  aspect?: "portrait" | "landscape" | "detail";
}) {
  // Aspect ratios tuned for your existing assets:
  // - portrait (B&W): typically wider than tall in your set
  // - workspace: wide hero
  // - detail: wide-ish close shot
  const ratio =
    aspect === "portrait"
      ? "aspect-[4/3] md:aspect-[5/4]"
      : aspect === "detail"
      ? "aspect-[4/3] md:aspect-[16/10]"
      : "aspect-[16/10] md:aspect-[16/9]";

  return (
    <Card className="overflow-hidden">
      <div className={cn("relative w-full", ratio)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 520px"
        />
      </div>
    </Card>
  );
}

function InlineList({ items }: { items: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1 text-xs font-medium text-[var(--ink-700)] shadow-[var(--shadow-soft)]"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] pt-16">
      {/* HERO */}
      <Section className="pb-[var(--space-12)]">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Kicker>ABOUT BTLS</Kicker>
              <H1>A steady partner for building systems that hold.</H1>

              <div className="mt-5 space-y-4">
                <P className="max-w-2xl">
                  Brought to Life Solutions works with owners who are skilled at
                  what they do—but tired of everything depending on them.
                </P>
                <P className="max-w-2xl">
                  We design and build clear, reliable systems that reduce
                  friction, remove guesswork, and make growth feel manageable
                  again.
                </P>
                <P className="max-w-2xl">
                  This work isn’t rushed. It isn’t loud. And it isn’t
                  improvised.
                </P>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/case-studies" variant="primary">
                  View Case Studies
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Contact
                </ButtonLink>
              </div>
            </div>

            <div className="md:col-span-5">
              <PhotoCard
                src={IMAGES.portrait.src}
                alt={IMAGES.portrait.alt}
                priority
                aspect="portrait"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* WHY STRUCTURE */}
      <Section className="bg-[var(--bg-alt)] py-[var(--space-12)]">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <PhotoCard
                src={IMAGES.workspace.src}
                alt={IMAGES.workspace.alt}
                aspect="landscape"
              />
            </div>

            <div className="md:col-span-7">
              <Kicker>WHY STRUCTURE</Kicker>
              <H2>Why structure comes first</H2>

              <div className="mt-4 space-y-4">
                <P>Life is chaotic enough. Business shouldn’t add to it.</P>
                <P>
                  The work we do is intentionally structured because clarity
                  protects momentum. When decisions are defined, scope is known,
                  and expectations are shared, progress stops feeling fragile.
                  Energy goes back into the craft instead of being spent
                  managing uncertainty.
                </P>
                <P>
                  Structure serves both sides. It keeps execution focused, the
                  client experience predictable, and outcomes grounded in
                  reality rather than hope.
                </P>
                <P>
                  Our role is to guide work forward without unnecessary
                  turbulence—so you can stay oriented while things are being
                  built.
                </P>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* PRODUCTIZED */}
      <Section>
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-7">
              <Kicker>PRODUCTIZED</Kicker>
              <H2>Productized on purpose</H2>

              <div className="mt-4 space-y-4">
                <P>
                  We don’t operate in vague engagements or open-ended
                  arrangements.
                </P>
                <P>
                  Our work is productized because it creates shared
                  understanding, clear boundaries, and mutual language around
                  scope and quality.
                </P>

                <Card className="mt-2">
                  <div className="p-2 md:p-4  ">
                    <P className="text-base ">
                      Like a labeled product: you know what’s inside, what it
                      costs, and what to expect.
                    </P>
                  </div>
                </Card>

                <P>
                  That clarity allows conversations to stay practical and
                  honest. If something is missing, it can be pointed to
                  plainly—without tension, defensiveness, or reinterpretation.
                </P>
                <P>
                  Productization isn’t about rigidity. It’s about removing
                  ambiguity so real work can happen.
                </P>
              </div>
            </div>

            <div className="md:col-span-5">
              <PhotoCard
                src={IMAGES.detail.src}
                alt={IMAGES.detail.alt}
                aspect="detail"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* CALM */}
      <Section className="bg-[var(--bg-alt)] py-[var(--space-12)]">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <Kicker>POSTURE</Kicker>
              <H2>Calm is a strategy</H2>

              <div className="mt-4 space-y-4">
                <P>
                  BTLS is built on the assumption that disciplined execution
                  outperforms reactive motion.
                </P>
                <P>
                  We work from constraints, from what can be tested, and from
                  what holds up under scrutiny. Panic, hype, and urgency don’t
                  improve outcomes—they distort them.
                </P>
                <P>
                  <strong>Results are engineered, not wished for.</strong>
                </P>
                <P>
                  That means measured pacing, clear decisions, and steady
                  follow-through. It’s how we protect quality, preserve trust,
                  and build systems that last beyond a launch.
                </P>
              </div>
            </div>

            <div className="md:col-span-4">
              <Card className="overflow-hidden">
                <div className="p-6 md:p-8">
                  <Kicker>YOU CAN EXPECT</Kicker>
                  <div className="mt-4 space-y-3">
                    {[
                      "Clear scope",
                      "Defined checkpoints",
                      "Direct communication",
                      "Steady follow-through",
                    ].map((t) => (
                      <div
                        key={t}
                        className="flex items-start gap-3 rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-[var(--shadow-soft)]"
                      >
                        <span className="mt-[6px] h-2 w-2 rounded-full bg-[var(--brand-600)]" />
                        <div className="text-sm text-[var(--ink-700)]">{t}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <Divider />
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* FRAMEWORK */}
      <Section>
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-7">
              <Kicker>FRAMEWORK</Kicker>
              <H2>The framework behind the work</H2>

              <div className="mt-4 space-y-4">
                <P>
                  Under the hood, our builds are guided by a simple revenue
                  framework spanning:
                </P>

                <InlineList
                  items={[
                    "Visibility",
                    "Proof",
                    "Conversion",
                    "Offer Strength",
                    "Operations",
                    "Analytics",
                  ]}
                />

                <P className="mt-2">
                  You don’t need to study this framework or memorize
                  terminology.
                </P>
                <P>
                  It exists to inform priorities, sequencing, and tradeoffs as
                  work is executed.
                </P>
                <P>
                  Our responsibility is to build with it—quietly and
                  consistently—so the system does what it’s supposed to do.
                </P>
              </div>
            </div>

            <div className="md:col-span-5">
              <Card className="overflow-hidden">
                <div className="p-6 md:p-10">
                  <Kicker>NEXT</Kicker>
                  <H2>An invitation</H2>
                  <P className="mt-3">
                    If you’re looking for clarity without theater, structure
                    without rigidity, and a partner who respects both your time
                    and your work, we’re ready to talk.
                  </P>
                  <P className="mt-4 text-sm text-[var(--muted)]">
                    This is the next step if you’re ready.
                  </P>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink href="/contact" variant="primary">
                      Start with Contact
                    </ButtonLink>
                    <ButtonLink href="/process" variant="secondary">
                      View Process
                    </ButtonLink>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-[var(--bg-alt)] py-[var(--space-12)]">
        <Container>
          <Card className="overflow-hidden">
            <div className="p-6 md:p-10 md:flex md:items-center md:justify-between md:gap-10">
              <div>
                <Kicker>NEXT STEP</Kicker>
                <H2>Start with the intake.</H2>
                <P className="mt-3 max-w-2xl">
                  If you’re ready to move forward, start with contact and we’ll
                  route you into the appropriate next step.
                </P>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:flex-col md:items-stretch">
                <ButtonLink href="/contact" variant="primary">
                  Start with Contact
                </ButtonLink>
                <ButtonLink href="/case-studies" variant="secondary">
                  View Case Studies
                </ButtonLink>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
