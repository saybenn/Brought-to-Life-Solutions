// /pages/_app.js
import "@/styles/globals.css";
import RootLayout from "@/components/layout/RootLayout";
import { useEffect } from "react";
import { captureUTMs } from "@/lib/utm";
export default function App({ Component, pageProps }) {
  useEffect(() => {
    captureUTMs(); // ✅ Run once when app loads
  }, []);
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

