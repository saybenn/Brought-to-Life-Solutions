import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX";

  return (
    <Html lang="en">
      <Head>
        {/* ✅ Google Tag Manager (in HEAD) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NGH6J4LS');`,
          }}
        />
        {/* <!-- Google Tag Manager --> */}
        {/* Preconnect to reduce CLS from late font swap */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Poppins + Inter with display=swap to avoid layout jank */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#FAF9F6" />
      </Head>
      <body>
        {/* ✅ Google Tag Manager (no-script fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NGH6J4LS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

