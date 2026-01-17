// /components/layout/RootLayout.jsx
import React, { useCallback, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { siteMeta } from "@/lib/siteMeta";
import { getMeta, orgSchema } from "@/lib/seo";
import Script from "next/script";
import ToastHost from "@/components/ui/Toast";
import { track } from "@/lib/analytics";

export default function RootLayout({ children }) {
  const router = useRouter();
  const { t, d, c } = getMeta({
    // Per-page can still override <Head>; this is the fallback.
    title: undefined,
    description: undefined,
    canonical: `${siteMeta.url}${router.asPath || ""}`,
  });
  useEffect(() => {
    const handler = (e) => {
      const el = e.target.closest("[data-track]");
      if (!el) return;

      track(el.dataset.track, {
        location: el.dataset.location,
        intent: el.dataset.intent,
        label: el.dataset.label,
      });
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

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
      {/* 
      <AnnouncementMarquee
        items={announcements}
        sticky={stickyAnn}
        dismissible
        onHeightChange={onAnnounceHeight}
      /> */}

      {/* Navbar sits beneath the banner by exact measured height */}
      <Navbar />

      {/* Page content */}
      <main>
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
        {children}
        <ToastHost />
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
