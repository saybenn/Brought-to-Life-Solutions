// /components/layout/RootLayout.jsx (FULL FILE)
// Keeps your existing SEO + global [data-track] click listener.
// Adds: conditional Navbar/Footer + conditional Calendly script load.

import React, { useEffect, useMemo } from "react";
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

  const canonical = useMemo(() => {
    const path = router.asPath || "";
    return `${siteMeta.url}${path}`;
  }, [router.asPath]);

  const { t, d, c } = getMeta({
    title: undefined,
    description: undefined,
    canonical,
  });

  // Dashboard routes typically should not show marketing chrome
  const isDashboardRoute = router.pathname.startsWith("/dashboard");

  // Load Calendly only where needed (adjust if you embed it elsewhere)
  const needsCalendly =
    router.pathname === "/contact" || router.pathname.startsWith("/contact/");

  // Global click-to-track for elements with data-track
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

      {!isDashboardRoute ? <Navbar /> : null}

      <main>
        {needsCalendly ? (
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="afterInteractive"
          />
        ) : null}

        {children}
        <ToastHost />
      </main>

      {!isDashboardRoute ? <Footer /> : null}
    </>
  );
}
