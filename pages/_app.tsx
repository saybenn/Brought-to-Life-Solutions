import "@/styles/globals.css";
import "@/styles/dashboard-theme.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import RootLayout from "@/components/layout/RootLayout";
import DashboardAppLayout from "@/components/dashboard/DashboardAppLayout";
import { track } from "@/lib/analytics";
import { captureUTMs } from "@/lib/utm";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { makeQueryClient } from "@/lib/query/queryClient";
import AppToaster from "@/providers/AppToaster";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NGH6J4LS";

export default function App({ Component, pageProps }: any) {
  const router = useRouter();
  const [queryClient] = useState(() => makeQueryClient());

  const isDashboard = router.pathname.startsWith("/dashboard");

  const dashboardConfig = pageProps?.config;
  const dashboardSiteId = pageProps?.siteId;
  const dashboardRole = pageProps?.role;
  const currentModule = pageProps?.currentModule;

  useEffect(() => {
    captureUTMs?.();
  }, []);

  useEffect(() => {
    const sendPageView = (url: string) => {
      track("view page", {
        page_path: url.split("?")[0],
        page_url: url,
      });
    };

    sendPageView(window.location.pathname + window.location.search);
    router.events.on("routeChangeComplete", sendPageView);

    return () => {
      router.events.off("routeChangeComplete", sendPageView);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
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

      {isDashboard && dashboardConfig ? (
        <DashboardAppLayout
          config={dashboardConfig}
          currentModule={currentModule}
          siteId={dashboardSiteId}
          role={dashboardRole}
        >
          <Component {...pageProps} />
        </DashboardAppLayout>
      ) : (
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      )}

      <AppToaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

