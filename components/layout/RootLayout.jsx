// /components/layout/RootLayout.jsx
import React, { useCallback, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import SiteContainer from "@/components/layout/SiteContainer";
import AnnouncementMarquee from "@/components/ui/AnnouncementMarquee";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { siteMeta } from "@/lib/siteMeta";
import { getMeta, orgSchema } from "@/lib/seo";

const announcements = [
  {
    id: "a1",
    text: "Lead-Machine Sites launch in 14 days when your intake is on time.",
    href: "/product/lead-machine-site",
  },
  {
    id: "a2",
    text: "Free Aisle: Local SEO Scorecard & Brand Photo Checklist.",
    href: "/resources",
  },
  {
    id: "a3",
    text: "Scholarships: 1 per 10 paid orders—see criteria.",
    href: "/legal/scholarships",
  },
];

export default function RootLayout({ children }) {
  const router = useRouter();
  const { t, d, c } = getMeta({
    // Per-page can still override <Head>; this is the fallback.
    title: undefined,
    description: undefined,
    canonical: `${siteMeta.url}${router.asPath || ""}`,
  });
  const [annH, setAnnH] = useState(0);
  const onAnnounceHeight = useCallback((h) => setAnnH(h || 0), []);

  const navH = 56; // h-14
  const stickyAnn = true; // you can flip to false
  const spacerH = (stickyAnn ? annH : 0) + navH; // CONSTANT push-down (no “breathing”)

  return (
    <>
      <Head>
        <title>{t}</title>
        <meta name="description" content={d} />
        <meta property="og:title" content={t} />
        <meta property="og:description" content={d} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={c} />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema()) }}
        />
      </Head>

      <AnnouncementMarquee
        items={announcements}
        sticky={stickyAnn}
        dismissible
        onHeightChange={onAnnounceHeight}
      />

      {/* Navbar sits beneath the banner by exact measured height */}
      <Navbar offsetTop={stickyAnn ? annH : 0} />

      {/* Constant spacer: reserve space for BOTH banner + nav */}
      <div style={{ height: spacerH }} />

      {/* Page content */}
      <main className="pt-20">
        <SiteContainer className="py-10">{children}</SiteContainer>
      </main>
      {/* Cookie consent banner */}
      {/* <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 max-w-md bg-[var(--bg-cream)] text-[var(--ink-900)] border border-[var(--border)] p-4 rounded-[var(--r-md)] shadow-md z-50">
        <p className="text-sm mb-3">
          We use cookies for analytics to improve your experience. No tracking
          until you say OK.
        </p>
        <div className="flex gap-2">
          <button className="btn btn-primary">Accept</button>
          <button className="btn btn-secondary">Decline</button>
        </div>
      </div> */}

      <Footer />
    </>
  );
}
