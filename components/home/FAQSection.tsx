// components/FaqSection.tsx
import React from "react";
import { cn } from "@/lib/utils";

type FaqItem = { question: string; answer: string };
type FaqGroup = { title: string; items: FaqItem[] };

const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Results & ROI",
    items: [
      {
        question:
          "Will this actually get me results, or just a nicer-looking site?",
        answer:
          "The goal isn’t “prettier.” The goal is more qualified leads and clearer sales conversations. Every project starts with understanding how you currently get business, where money leaks out of the journey, and how your site can plug those gaps. Design, copy, structure, and tech are all chosen to support that flow—not to win design awards.",
      },
      {
        question: "How do you measure whether the site is working?",
        answer:
          "We define success before we design: form fills, booked calls, quote requests, email signups, etc. Then we wire in basic analytics and event tracking so you can see where traffic comes from and what it does. Over time you can adjust offers, headlines, or traffic sources based on data instead of guesses.",
      },
    ],
  },
  {
    title: "Process & Timeline",
    items: [
      {
        question: "How long does a typical project take?",
        answer:
          "Most projects land in the 3–6 week range, depending on scope and content readiness. Smaller, template-powered builds are faster; larger custom builds or multi-service sites take a bit longer. You’ll get a realistic window up front and clear milestones as we move.",
      },
      {
        question: "What does your process look like from start to finish?",
        answer:
          "In short: Discovery → Strategy → Build → Review → Launch. Discovery: understand your business, offers, and audience. Strategy: map the pages, messages, and conversion paths. Build: design and development in a private staging environment. Review: we refine together and handle any fixes. Launch: we go live, connect your domain, and run a basic post-launch check.",
      },
    ],
  },
  {
    title: "Your Involvement & Workload",
    items: [
      {
        question: "How much work will this be for me?",
        answer:
          "You’re not project-managing a dev team. Your main jobs are: 1) helping me understand your business and offers, 2) giving timely feedback on drafts, and 3) approving final copy and visuals. I handle the structure, tech, and execution so you can stay focused on running the business.",
      },
      {
        question:
          "What if I’m bad at words or don’t know what to say on my site?",
        answer:
          "That’s normal. I’ll ask targeted questions about your services, pricing, guarantees, and customer stories, then shape that into clear, conversion-focused copy. You’re responsible for truth and accuracy; I’m responsible for making it understandable and compelling.",
      },
    ],
  },
  {
    title: "Pricing, Scope & Fit",
    items: [
      {
        question: "How much does a project like this cost?",
        answer:
          "Pricing depends on scope—number of pages, complexity, integrations, and whether we’re doing photography, SEO foundations, or ongoing care. Most clients fall into a defined package range that we’ll walk through on the call, so you know exactly what’s included and what isn’t before you say yes.",
      },
      {
        question: "What kind of businesses are you the best fit for?",
        answer:
          "Owners who care about repeatable income, not random spikes. That usually means trades and home services, local operators, and small teams who want their site to behave like a revenue system—not a static brochure. If you value clarity, honesty, and systems, we’ll probably work well together.",
      },
    ],
  },
  {
    title: "Tech, Hosting & Ownership",
    items: [
      {
        question: "Who handles hosting, domains, and all the technical stuff?",
        answer:
          "I handle the setup and connections so you don’t have to wrestle with dashboards. You keep ownership of your domain and core accounts; I help you wire them together correctly. If you choose an ongoing care plan, I’ll also handle updates, small improvements, and basic support.",
      },
      {
        question:
          "Will I be locked into you forever if I want to change something later?",
        answer:
          "No. You’ll have a modern, standard stack with clean structure, so another competent developer could step in if needed. My goal is to be the best option, not the only option. Many clients stay on for care because it’s easier, but you’re not trapped.",
      },
    ],
  },
];

export default function FaqSection() {
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(
    {}
  );
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupTitle]: !prev[groupTitle] }));
  };

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-[var(--border)] bg-[var(--bg-ivory)]"
    >
      <div className="mx-auto max-w-10/12 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Heading */}
        <header className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted)]">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-[var(--ink-900)] sm:text-3xl"
          >
            Questions owners usually ask before we start
          </h2>
          <p className="mt-3 text-sm text-[var(--ink-700)] sm:text-base">
            Straight answers so you can decide if we’re the right partner.
          </p>
        </header>

        {/* Groups */}
        <div className="space-y-6">
          {FAQ_GROUPS.map((group) => {
            const isGroupOpen = !!openGroups[group.title];
            const groupId = group.title.replace(/\s+/g, "-").toLowerCase();

            return (
              <div
                key={group.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow-soft)]"
              >
                {/* Group header */}
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6 sm:py-5"
                  onClick={() => toggleGroup(group.title)}
                  aria-expanded={isGroupOpen}
                  aria-controls={`${groupId}-panel`}
                >
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-900)]">
                    {group.title}
                  </h3>
                  <span
                    className={cn(
                      "flex h-7 w-7 flex-none items-center justify-center rounded-full border text-sm transition",
                      "border-[var(--border)] text-[var(--muted)]",
                      isGroupOpen
                        ? "rotate-45 bg-[var(--ink-900)] text-white"
                        : "bg-[var(--bg-elevated)]"
                    )}
                  >
                    +
                  </span>
                </button>

                {/* Group panel with smooth open/close */}
                <div
                  id={`${groupId}-panel`}
                  className={cn(
                    "grid overflow-hidden border-t transition-all duration-300 ease-out",
                    "border-[var(--border)]",
                    isGroupOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="min-h-0">
                    <div className="divide-y divide-[var(--border)]">
                      {group.items.map((item) => {
                        const key = `${group.title}-${item.question}`;
                        const isOpen = !!openItems[key];
                        const panelId = key.replace(/\s+/g, "-").toLowerCase();

                        return (
                          <div key={key} className="group">
                            <button
                              type="button"
                              className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left text-sm font-medium text-[var(--ink-900)] sm:px-6 sm:py-4"
                              aria-expanded={isOpen}
                              aria-controls={panelId}
                              onClick={() => toggleItem(key)}
                            >
                              <span>{item.question}</span>
                              <span
                                className={cn(
                                  "mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full border text-xs transition",
                                  "border-[var(--border)] text-[var(--muted)]",
                                  isOpen
                                    ? "rotate-45 bg-[var(--ink-900)] text-white"
                                    : "bg-[var(--bg-elevated)]"
                                )}
                              >
                                +
                              </span>
                            </button>

                            <div
                              id={panelId}
                              className={cn(
                                "grid overflow-hidden transition-all duration-300 ease-out",
                                isOpen
                                  ? "grid-rows-[1fr] opacity-100"
                                  : "grid-rows-[0fr] opacity-0"
                              )}
                            >
                              <div className="min-h-0 px-4 pb-4 text-sm leading-relaxed text-[var(--ink-700)] sm:px-6 sm:pb-4">
                                {item.answer}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing line */}
        <p className="mt-10 max-w-2xl text-sm text-[var(--ink-700)]">
          Underneath every answer here is the same idea: we don’t treat your
          site as artwork—we treat it as a{" "}
          <span className="font-semibold text-[var(--ink-900)]">
            revenue system
          </span>
          . The design, copy, and tech are built around how money actually flows
          through your business.
        </p>
      </div>
    </section>
  );
}
