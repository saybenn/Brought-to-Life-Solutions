import "@/styles/globals.css";
import RootLayout from "@/components/layout/RootLayout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { track } from "@/lib/analytics";
import Script from "next/script";
import { captureUTMs } from "@/lib/utm";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NGH6J4LS"; // <-- set real ID in .env.local

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // 1) One-time UTM capture after hydration
  useEffect(() => {
    captureUTMs?.();
  }, []);

  useEffect(() => {
    const sendPageView = (url) => {
      track("view page", {
        page_path: url.split("?")[0],
        page_url: url,
      });
    };

    // initial load
    sendPageView(window.location.pathname + window.location.search);

    // SPA route changes
    router.events.on("routeChangeComplete", sendPageView);

    return () => {
      router.events.off("routeChangeComplete", sendPageView);
    };
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

