// /lib/seo.js
import { siteMeta } from "./siteMeta";

export function getMeta({ title, description, canonical } = {}) {
  const t = title
    ? `${title} — ${siteMeta.name}`
    : `${siteMeta.name} — ${siteMeta.tagline}`;
  const d =
    description ||
    "Web, SEO, Coaching, Photography. Practical outcomes for owner-operators.";
  const c = canonical || siteMeta.url;
  return { t, d, c };
}

export function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteMeta.name,
    url: siteMeta.url,
    logo: siteMeta.logo,
    sameAs: Object.values(siteMeta.socials).filter(Boolean),
  };
}

export function productSchema({
  name,
  description,
  price,
  currency = "USD",
  sku,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    sku,
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price: String(price),
      availability: "https://schema.org/InStock",
      url: `${siteMeta.url}/product/${sku || ""}`,
    },
    brand: { "@type": "Brand", name: siteMeta.name },
  };
}

export function faqSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

import Head from "next/head";

export function Meta({ title, description, canonical }) {
  const { t, d, c } = getMeta({ title, description, canonical });

  return (
    <Head>
      <title>{t}</title>
      <meta name="description" content={d} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={c} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
