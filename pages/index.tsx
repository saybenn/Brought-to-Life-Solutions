import Head from "next/head";

import { Hero } from "@/components/home/Hero";
import { TrustStripB } from "@/components/home/TrustStrip";
import { ProductSection } from "@/components/home/ProductSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { WhySystemsSection } from "@/components/home/WhySystemsSection";
import SystemVisibilityShowcase from "@/components/home/showcase/SystemVisibilityShowcase";
import { SixSocketsIntro } from "@/components/home/SixSocketsIntro";
import FaqSection from "@/components/home/FAQSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import { RealProblemSection } from "@/components/home/RealProblemSection";
import WhoWeAre from "@/components/home/WhoWeAre";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Brought to Life Solutions — Web Systems for Service Businesses
        </title>
        <meta
          name="description"
          content="Brought to Life Solutions builds websites, dashboards, and growth systems for service businesses that need clearer paths from attention to inquiry."
        />
      </Head>

      <main>
        <Hero />
        <TrustStripB />
        <RealProblemSection /> <ProductSection />
        <WhoWeAre />
        <SixSocketsIntro />
        <ResultsSection />
        <SystemVisibilityShowcase />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeUp {
          animation: fadeUp 0.6s var(--ease-out) forwards;
          opacity: 0;
        }

        [animation-delay\\: 150ms] {
          animation-delay: 150ms;
        }

        [animation-delay\\: 300ms] {
          animation-delay: 300ms;
        }

        [animation-delay\\: 450ms] {
          animation-delay: 450ms;
        }
      `}</style>
    </>
  );
}

