// components/home/showcase/SystemVisibilityShowcase.tsx

import Link from "next/link";
import { FileText, LineChart, UsersRound } from "lucide-react";

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
        {/* Header / content now sits above everything */}
        <div className="system-showcase__header">
          <p className="eyebrow mx-auto w-fit border-b border-[rgba(214,185,138,0.32)] pb-2 text-sm font-semibold text-[rgba(247,243,235,0.58)]">
            05. System Visibility
          </p>

          <h2 id="system-showcase-title" className="system-showcase__title">
            Your website should not go silent after launch.
          </h2>

          <p className="system-showcase__body mx-auto">
            The BTLS dashboard connects traffic, lead capture, customer records,
            and content activity into one operating view. Revenue Engine
            includes dashboard installation and initial tracking setup, with
            ongoing dashboard access available after launch.
          </p>
        </div>

        {/* Visual now gets its own full-width row */}
        <div
          className="system-showcase__visual"
          aria-label="Dashboard product previews"
        >
          <div className="system-showcase__visual-header">
            <div>
              <p className="system-showcase__visual-kicker">
                Revenue Intelligence
              </p>
              <h3>Funnel dashboard first. Support tools around it.</h3>
            </div>

            <p className="system-showcase__visual-badge">
              Included with Revenue Engine
            </p>
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

        {/* Content cards below visual */}
        <div className="system-showcase__support">
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
            <p className="system-showcase__cta-kicker">
              Visibility from day one
            </p>

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
              Dashboard installation and initial tracking setup included, with
              ongoing access available after launch.
            </p>
          </div>
        </div>

        <div
          className="system-showcase__metric-strip"
          aria-label="Dashboard visibility summary"
        >
          {METRICS.map((metric) => (
            <div key={metric.label} className="system-showcase__metric">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>

        <p className="system-showcase__closing-line">
          One system <span>&bull;</span> clear visibility <span>&bull;</span> better
          decisions
        </p>
      </div>
    </section>
  );
}
