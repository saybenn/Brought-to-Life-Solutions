// /pages/robots.txt.ts

import type { GetServerSideProps } from "next";
import { siteMeta } from "@/lib/siteMeta";

function RobotsTxtPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = (siteMeta?.url || "").replace(/\/+$/, "");

  if (!baseUrl) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.write("siteMeta.url missing");
    res.end();

    return {
      props: {},
    };
  }

  const body = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600");
  res.write(body);
  res.end();

  return {
    props: {},
  };
};

export default RobotsTxtPage;