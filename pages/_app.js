import "@/styles/globals.css";
import RootLayout from "@/components/layout/RootLayout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { captureUTMs } from "@/lib/utm";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NGH6J4LS"; // <-- set real ID in .env.local

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // 1) One-time UTM capture after hydration
  useEffect(() => {
    captureUTMs?.();
  }, []);

  // 2) Initial pageview + subsequent SPA navigations → dataLayer events
  useEffect(() => {
    const pushPageview = (url) => {
      // define dataLayer if absent
      // don't crash in rare SSR edge-cases
      if (typeof window === "undefined") return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "pageview",
        page_location: url, // GA4-friendly
        page_path: url.split("?")[0] || "/",
      });
    };

    // initial after hydration
    const initial = window.location.pathname + window.location.search;
    pushPageview(initial);

    // SPA route changes
    const onRouteChange = (url) => pushPageview(url);
    router.events.on("routeChangeComplete", onRouteChange);
    return () => router.events.off("routeChangeComplete", onRouteChange);
  }, [router.events]);

  return (
    <>
      {/* 3) GTM base script (loads gtm.js) */}
      {GTM_ID && (
        <Script id="gtm-base" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
              j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
}

