import Accordion from "@/components/ui/Accordion";
import type { ReactNode } from "react";

type MobileDetailsAccordionProps = {
  goalHealth: React.ReactNode;
  ctaPerformance: React.ReactNode;
  trafficContext: ReactNode;
};

export default function MobileDetailsAccordion({
  goalHealth,
  ctaPerformance,
  trafficContext,
}: MobileDetailsAccordionProps) {
  return (
    <div className="dash-mobile-only">
      <Accordion
        allowMultiple
        items={[
          {
            id: "goal-health",
            title: "Goal Health",
            content: goalHealth,
          },
          {
            id: "cta-performance",
            title: "CTA Performance",
            content: ctaPerformance,
          },
          {
            id: "traffic-context",
            title: "Traffic Context",
            content: trafficContext,
          },
        ]}
      />
    </div>
  );
}
