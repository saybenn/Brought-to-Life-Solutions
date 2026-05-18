import Link from "next/link";
import { BarChart3, FileText, LineChart, UsersRound } from "lucide-react";

import { track } from "@/lib/analytics";
import ShowcaseDeviceFrame from "./ShowcaseDeviceFrame";
import ShowcaseFeatureCard from "./ShowcaseFeatureCard";

const FEATURES = [
  {
    icon: LineChart,
    title: "Funnel Analytics",
    description:
      "See where visitors become leads, where they drop off, and which actions need attention.",
  },
  {
    icon: UsersRound,
    title: "Customer Ledger",
    description:
      "Keep lead records, contact details, tags, notes, and follow-up context visible.",
  },
  {
    icon: FileText,
    title: "Content System",
    description:
      "Manage posts, draft visibility, publishing status, and content activity in one view.",
  },
];

const METRICS = [
  {
    label: "Traffic",
    value: "See what people actually do.",
  },
  {
    label: "Leads",
    value: "Track the actions that matter.",
  },
  {
    label: "Customers",
    value: "Keep follow-up context visible.",
  },
  {
    label: "Content",
    value: "Publish with the system in view.",
  },
];

export default function SystemVisibilityShowcase() {
  return (
    <section
      className="system-showcase"
      aria-labelledby="system-showcase-title"
    >
      <div className="system-showcase__inner">
        <div className="system-showcase__grid">
          <div className="system-showcase__copy space-y-6">
            <p className="eyebrow text-[var(--muted)] text-sm border-b border-[var(--border)] pb-2 w-fit font-semibold ">
              05. System Visibility
            </p>

            <h2 id="system-showcase-title" className="system-showcase__title">
              Your website should not go silent after launch.
            </h2>

            <p className="system-showcase__body">
              BTLS dashboards connect traffic, lead capture, customer records,
              and content activity into one operating view — so owners can make
              better decisions without guessing.
            </p>

            <div
              className="system-showcase__features"
              aria-label="Dashboard channels"
            >
              {FEATURES.map((feature) => (
                <ShowcaseFeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>

            <div className="system-showcase__cta-row">
              <Link
                href="/offers/revenue-engine"
                className="system-showcase__cta"
                onClick={() =>
                  track("click cta", {
                    location: "system_visibility_showcase",
                    intent: "explore revenue engine",
                    label: "Explore Revenue Engine",
                  })
                }
              >
                Explore Revenue Engine
              </Link>

              <p className="system-showcase__cta-note">
                Private dashboard access. Built to make the system visible, not
                overwhelm you with noise.
              </p>
            </div>
          </div>

          <div
            className="system-showcase__visual"
            aria-label="Dashboard product previews"
          >
            <div className="system-showcase__visual-header">
              <div>
                <p className="system-showcase__visual-kicker">
                  Revenue Intelligence
                </p>
                <div>Funnel dashboard first. Support tools around it.</div>
              </div>

              <div className="system-showcase__visual-dot" aria-hidden="true" />
            </div>

            <div className="system-showcase__device-stage">
              <ShowcaseDeviceFrame
                variant="laptop"
                src="/images/showcase/dashboard-analytics-desktop.webp"
                alt="BTLS analytics dashboard showing funnel progression and conversion trend."
                label="Analytics"
                priority
                className="showcase-device--primary"
              />

              <ShowcaseDeviceFrame
                variant="tablet"
                src="/images/showcase/dashboard-content-tablet.webp"
                alt="BTLS content dashboard showing blog publishing controls."
                label="Content"
                className="showcase-device--support-tablet"
              />

              <ShowcaseDeviceFrame
                variant="phone"
                src="/images/showcase/dashboard-customers-mobile.webp"
                alt="BTLS customer ledger dashboard on mobile."
                label="Customers"
                className="showcase-device--support-phone"
              />
            </div>
          </div>
        </div>

        <div
          className="system-showcase__metric-strip"
          aria-label="Dashboard visibility summary"
        >
          {METRICS.map((metric) => (
            <div key={metric.label} className="system-showcase__metric">
              <span>{metric.label}</span>
              <div>{metric.value}</div>
            </div>
          ))}
        </div>

        <p className="system-showcase__closing-line">
          One system <span>•</span> clear visibility <span>•</span> better
          decisions
        </p>
      </div>
    </section>
  );
}
