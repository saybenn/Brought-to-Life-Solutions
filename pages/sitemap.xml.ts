// /pages/sitemap.xml.ts

import type { GetServerSideProps } from "next";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { siteMeta } from "@/lib/siteMeta";

type SitemapPostRow = {
  slug: string;
  updated_at: string | null;
  published_at: string | null;
};

function SitemapXmlPage() {
  return null;
}

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function sendXml(
  res: Parameters<GetServerSideProps>[0]["res"],
  statusCode: number,
  body: string,
) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600");
  res.write(body);
  res.end();
}

function sendText(
  res: Parameters<GetServerSideProps>[0]["res"],
  statusCode: number,
  body: string,
) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=300");
  res.write(body);
  res.end();
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const siteId = process.env.DEFAULT_SITE_ID;

  if (!siteId) {
    sendText(res, 500, "DEFAULT_SITE_ID missing");
    return { props: {} };
  }

  const baseUrl = (siteMeta?.url || "").replace(/\/+$/, "");

  if (!baseUrl) {
    sendText(res, 500, "siteMeta.url missing");
    return { props: {} };
  }

  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("slug, updated_at, published_at")
    .eq("site_id", siteId)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(5000);

  if (error) {
    console.error(error);
    sendText(res, 500, "Sitemap query failed");
    return { props: {} };
  }

  const posts = (data ?? []) as SitemapPostRow[];

  const urls = [
    {
      loc: `${baseUrl}/blog`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: "0.7",
    },
    ...posts.map((post) => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.updated_at || post.published_at || new Date().toISOString(),
      changefreq: "monthly",
      priority: "0.6",
    })),
  ];

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (url) =>
          `  <url>\n` +
          `    <loc>${xmlEscape(url.loc)}</loc>\n` +
          `    <lastmod>${xmlEscape(url.lastmod)}</lastmod>\n` +
          `    <changefreq>${url.changefreq}</changefreq>\n` +
          `    <priority>${url.priority}</priority>\n` +
          `  </url>`,
      )
      .join("\n") +
    `\n</urlset>\n`;

  sendXml(res, 200, body);

  return { props: {} };
};

export default SitemapXmlPage;