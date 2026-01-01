// /pages/process.tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * BTLS Process Page (MVP)
 * - Pages Router
 * - Uses CSS variable tokens (bg/text/border/shadows/radius)
 * - No portal/dashboard claims; assets shared via secure email/shared folder
 * - Free call = routing only; Revenue Roadmap remains paid + distinct
 */

type Step = {
  kicker: string;
  title: string;
  purpose: string;
  youDo: string[];
  weDo: string[];
  youGet: string[];
  note?: string;
};

const STEPS: Step[] = [
  {
    kicker: "Step 1",
    title: "Intake",
    purpose: "Filter + context",
    youDo: [
      "Complete a short intake (5–10 minutes).",
      "Share basic information: business type, services, service area, goals.",
    ],
    weDo: [
      "Review for fit, urgency, and category.",
      "Confirm whether we’re positioned to help.",
    ],
    youGet: ["A clear next step—or a quick, honest “not a fit.”"],
  },
  {
    kicker: "Step 2",
    title: "Clarity Call",
    purpose: "Remove ambiguity",
    youDo: [
      "Explain your goals, constraints, and expectations.",
      "Answer focused questions about your business.",
    ],
    weDo: [
      "Clarify what will best support your goals and constraints.",
      "Bring definition to where momentum is being lost or delayed.",
    ],
    youGet: [
      "Confidence in what direction makes sense.",
      "Clear understanding of what the next step should be.",
    ],
    note: "This is a guided routing conversation—focused, efficient, and respectful of your time.",
  },
  {
    kicker: "Step 3",
    title: "Prescription",
    purpose: "Product match",
    youDo: ["Decide whether to move forward."],
    weDo: [
      "Recommend one system that best fits your situation:",
      "Starter System, Revenue Engine, Growth Partner, or a defined bundle (SEO Momentum, Copywriting, etc.).",
    ],
    youGet: [
      "A clear recommendation.",
      "Product scope overview.",
      "Timeline range and investment range.",
      "The exact next step.",
    ],
    note: "This is where direction becomes a decision.",
  },
  {
    kicker: "Step 4",
    title: "Commit",
    purpose: "Lock the work",
    youDo: ["Approve the product.", "Submit deposit / checkout."],
    weDo: ["Reserve your build slot.", "Schedule the kickoff."],
    youGet: [
      "A confirmed start date.",
      "A short kickoff checklist outlining what we’ll need.",
    ],
  },
  {
    kicker: "Step 5",
    title: "Kickoff + Inputs",
    purpose: "Remove friction",
    youDo: [
      "Share assets we request (brand materials, photos, reviews, access) via secure email or a shared folder.",
      "Answer a small set of structured questions.",
    ],
    weDo: [
      "Organize and validate everything internally.",
      "Align execution precisely to the selected product.",
    ],
    youGet: [
      "Momentum without micromanagement.",
      "Clear check-ins and expectations.",
    ],
    note: "No portals. No dashboards. Just clarity and follow-through.",
  },
  {
    kicker: "Step 6",
    title: "Build, Review, Launch",
    purpose: "Execution",
    youDo: ["Review work at defined checkpoints only."],
    weDo: [
      "Design, copy, implementation, QA, and launch.",
      "Wire your site into the six revenue sockets.",
    ],
    youGet: [
      "A deployed system.",
      "Tracking in place (where applicable).",
      "Clear handoff and next-step recommendations.",
    ],
    note: "This is where experience shows.",
  },
];

function Section({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("py-[var(--space-16)]", className)}>
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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1 text-xs font-medium text-[var(--ink-700)] shadow-[var(--shadow-soft)]">
      {children}
    </span>
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

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-2">
      {items.map((t, idx) => (
        <li key={idx} className="flex gap-2 text-sm text-[var(--ink-700)]">
          <span className="mt-[6px] h-1.5 w-1.5 flex-none rounded-full bg-[var(--brand-600)]" />
          <span className="leading-[var(--leading-normal)]">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function StepCard({ step }: { step: Step }) {
  return (
    <Card className="overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Kicker>
              {step.kicker} • {step.purpose}
            </Kicker>
            <h3 className="mt-2 font-[var(--font-head)] text-xl text-[var(--ink-900)] md:text-2xl">
              {step.title}
            </h3>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold text-[var(--ink-900)]">
              You do
            </div>
            <List items={step.youDo} />
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--ink-900)]">
              We do
            </div>
            <List items={step.weDo} />
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--ink-900)]">
              You get
            </div>
            <List items={step.youGet} />
          </div>
        </div>

        {step.note ? (
          <div className="mt-6 rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-page)] px-4 py-3">
            <P className="text-sm text-[var(--ink-700)]">{step.note}</P>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] pt-16">
      {/* HERO */}
      <Section className="pb-[var(--space-12)]">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Kicker>PROCESS</Kicker>
              <H1>
                A clear path from first contact to a deployed revenue system.
              </H1>
              <P className="mt-4 max-w-xl">
                No babysitting. No endless calls. No vague “let’s see where this
                goes.” We operate as a <strong>steady partner</strong>—guiding
                you through a clear, productized process that turns intent into
                a system that holds weight.
              </P>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <Card className="p-4 shadow-[var(--shadow-soft)]">
                  <div className="text-sm font-semibold text-[var(--ink-900)]">
                    You won’t be confused
                  </div>
                  <div className="mt-1 text-sm text-[var(--muted)]">
                    Clear steps and checkpoints.
                  </div>
                </Card>
                <Card className="p-4 shadow-[var(--shadow-soft)]">
                  <div className="text-sm font-semibold text-[var(--ink-900)]">
                    You won’t babysit
                  </div>
                  <div className="mt-1 text-sm text-[var(--muted)]">
                    We drive. You approve.
                  </div>
                </Card>
                <Card className="p-4 shadow-[var(--shadow-soft)]">
                  <div className="text-sm font-semibold text-[var(--ink-900)]">
                    You’ll know what’s next
                  </div>
                  <div className="mt-1 text-sm text-[var(--muted)]">
                    Predictable delivery.
                  </div>
                </Card>
              </div>
            </div>

            <div className="md:col-span-5">
              <Card className="overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="text-lg font-semibold text-[var(--ink-900)]">
                    Calm authority, real structure.
                  </div>
                  <P className="mt-2 text-sm">
                    You’ll always know where you are in the process, what we
                    need, and what happens next. This is the work of a{" "}
                    <strong>competent craftsman</strong>.
                  </P>
                </div>
                <Divider />
                <div className="p-6 md:p-8">
                  <div className="text-lg font-semibold text-[var(--ink-900)]">
                    The Six Sockets
                  </div>
                  <P className="mt-2 text-sm">
                    Visibility • Proof • Conversion • Offer Strength •
                    Operations • Analytics
                  </P>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* BOUNDARY */}
      <Section className="bg-[var(--bg-alt)] py-[var(--space-12)]">
        <Container>
          <Card className="overflow-hidden">
            <div className="p-6 md:p-10">
              <Kicker>BOUNDARY</Kicker>
              <H2>What our free calls are — and what they are not</H2>
              <P className="mt-3 max-w-3xl">
                Our introductory calls exist to establish{" "}
                <strong>fit and direction</strong>. They route you toward the
                right product and the right next step. They are not deep audits
                or consulting sessions.
              </P>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5">
                  <div className="text-sm font-semibold text-[var(--ink-900)]">
                    Free calls include
                  </div>
                  <List
                    items={[
                      "Fit check (can we help, and is it the right time?)",
                      "High-level direction (what kind of system you need)",
                      "Product routing (which offer fits your situation)",
                    ]}
                  />
                </div>

                <div className="rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5">
                  <div className="text-sm font-semibold text-[var(--ink-900)]">
                    Free calls do not include
                  </div>
                  <List
                    items={[
                      "Written roadmaps, audits, or blueprints",
                      "Page-by-page strategy documents",
                      "Deep SEO or analytics diagnosis",
                    ]}
                  />
                </div>
              </div>

              <div className="mt-6 rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--bg-page)] px-5 py-4">
                <P className="text-sm">
                  If you want a full diagnosis and written blueprint, that work
                  lives inside the <strong>Revenue Roadmap</strong>. Clear
                  boundaries allow us to work with focus, respect, and
                  momentum—on both sides.
                </P>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/shop/revenue-roadmap" variant="primary">
                  Book a Revenue Roadmap
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Start with Intake
                </ButtonLink>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* STEPS */}
      <Section>
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <Kicker>THE PROCESS</Kicker>
              <H2>Step-by-step, start to finish</H2>
              <P className="mt-3 max-w-2xl">
                A steady guide. A clear sequence. Defined checkpoints. You stay
                focused on running your business while we build the system.
              </P>
            </div>
            <div className="hidden md:block">
              <Pill>6 steps • Productized • Guided • Clear</Pill>
            </div>
          </div>

          <div className="mt-10 grid gap-6">
            {STEPS.map((s) => (
              <StepCard key={s.title} step={s} />
            ))}
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
                <H2>Start with the Intake.</H2>
                <P className="mt-3 max-w-2xl">
                  If you’re ready to build, we’ll route you into the right
                  product and move with clarity. If you need diagnosis and a
                  written plan first, book the Revenue Roadmap.
                </P>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:flex-col md:items-stretch">
                <ButtonLink href="/contact" variant="primary">
                  Start with Intake
                </ButtonLink>
                <ButtonLink href="/shop/revenue-roadmap" variant="secondary">
                  Book Revenue Roadmap
                </ButtonLink>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
