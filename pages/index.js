import Head from "next/head";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import WhoFor from "@/components/home/WhoFor";
import WhoWeAre from "@/components/home/WhoWeAre";
import { Hero } from "@/components/home/Hero";
import {
  TrustStripA,
  TrustStripB,
  TrustStripC,
} from "@/components/home/TrustStrip";
import { WhoWeBuildFor } from "@/components/home/WhoWeBuildFor";
import { WhoWeBuildForShelf } from "@/components/home/WhoWeBuildForShelf";
import { WhoWeBuildForBigType } from "@/components/home/WhoWeBuildForBigType";
import { RealProblemSection } from "../components/home/RealProblemSection";
import { SixSocketsIntro } from "@/components/home/SixSocketsIntro";
import { ProductSection } from "@/components/home/ProductSection";
import { ResultsSection } from "@/components/results/ResultsSection";
import FaqSection from "../components/FAQSection";
import FinalCtaSection from "@/components/FinalCtaSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Brought to Life Solutions — Outcomes Over Hype</title>
        <meta
          name="description"
          content="Web, SEO, Coaching, Photography. Get backed, seen, heard, and paid."
        />
      </Head>

      <main>
        <Hero />
        <TrustStripB />
        {/* <WhoWeBuildForBigType /> */}
        <RealProblemSection />
        <WhoWeAre />
        <SixSocketsIntro />
        <ProductSection />
        <ResultsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      {/* Inline keyframes to avoid extra file; place this in globals.css later if you like */}
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

