import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getMeta } from "@/lib/seo";
import { siteMeta } from "@/lib/siteMeta";

type BlogListItem = {
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  category?: { name: string; slug: string } | null;
  author?: { name: string; slug: string } | null;
};

type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  sort_order?: number | null;
};

function getBaseUrlFromReq(req?: any) {
  if (siteMeta?.url) return siteMeta.url;

  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_URL;

  if (env) {
    const hasProto = env.startsWith("http://") || env.startsWith("https://");
    return hasProto ? env : `https://${env}`;
  }

  if (req) {
    const xfProto = req.headers?.["x-forwarded-proto"];
    const proto = typeof xfProto === "string" ? xfProto : "http";
    const host =
      (req.headers?.["x-forwarded-host"] as string) ||
      (req.headers?.host as string) ||
      "";
    return host ? `${proto}://${host}` : "";
  }

  return "";
}

export const getServerSideProps: GetServerSideProps<{
  posts: BlogListItem[];
  categories: BlogCategory[];
}> = async ({ req }) => {
  const baseUrl = getBaseUrlFromReq(req);

  try {
    const [postsRes, catsRes] = await Promise.all([
      fetch(`${baseUrl}/api/public/blog`, {
        headers: { accept: "application/json" },
      }),
      fetch(`${baseUrl}/api/public/categories`, {
        headers: { accept: "application/json" },
      }),
    ]);

    const postsJson = await postsRes.json().catch(() => null);
    const catsJson = await catsRes.json().catch(() => null);

    const posts = postsJson?.ok ? (postsJson.posts as BlogListItem[]) : [];
    const categories = catsJson?.ok
      ? (catsJson.categories as BlogCategory[])
      : [];

    return { props: { posts, categories } };
  } catch {
    return { props: { posts: [], categories: [] } };
  }
};

export default function BlogIndexPage({
  posts,
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const canonical = `${siteMeta.url}/blog`;
  const { t, d, c } = getMeta({
    title: "Blog",
    description: "Notes, playbooks, and field-tested lessons from BTLS builds.",
    canonical,
  });

  const [q, setQ] = useState("");
  const [categorySlug, setCategorySlug] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();

    return posts.filter((p) => {
      const matchesCategory = !categorySlug
        ? true
        : p.category?.slug === categorySlug;

      const haystack =
        `${p.title} ${p.excerpt ?? ""} ${p.category?.name ?? ""} ${p.author?.name ?? ""}`.toLowerCase();
      const matchesSearch = !needle ? true : haystack.includes(needle);

      return matchesCategory && matchesSearch;
    });
  }, [posts, q, categorySlug]);

  return (
    <>
      <Head>
        <title>{t}</title>
        <meta name="description" content={d} />
        <meta property="og:title" content={t} />
        <meta property="og:description" content={d} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={c} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t} />
        <meta name="twitter:description" content={d} />
      </Head>

      <section className="section">
        <div className="dash-shell">
          <header className="section-header">
            <p className="eyebrow">Library</p>
            <h1 className="h1">Blog</h1>
            <p className="subhead" style={{ maxWidth: 760 }}>
              Notes, playbooks, and field-tested lessons from real BTLS builds.
            </p>

            <div
              style={{
                marginTop: "var(--space-6)",
                display: "grid",
                gap: 12,
                gridTemplateColumns: "1fr",
                maxWidth: 760,
              }}
            >
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search posts…"
                style={{
                  width: "100%",
                  padding: "12px 12px",
                  borderRadius: "var(--r-md)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-elevated)",
                  fontFamily: "var(--font-body)",
                }}
              />

              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 12px",
                  borderRadius: "var(--r-md)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-elevated)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <option value="">All categories</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <div className="caption" style={{ color: "var(--muted)" }}>
                {filtered.length} shown
                {posts.length ? ` • ${posts.length} total` : ""}
              </div>
            </div>
          </header>

          {filtered.length === 0 ? (
            <div className="card dash-card">
              <h2 className="h3">No posts match this view</h2>
              <p className="caption" style={{ marginTop: 8 }}>
                Try clearing search or switching category.
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "var(--space-6)" }}>
              {filtered.map((p) => (
                <article key={p.slug} className="card dash-card animate-fadeUp">
                  {/* Mobile-first layout: image on top, content below. On wide screens: side-by-side */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "var(--space-5)",
                      alignItems: "start",
                    }}
                  >
                    {p.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.cover_image_url}
                        alt=""
                        style={{
                          width: "100%",
                          height: 190,
                          objectFit: "cover",
                          borderRadius: "var(--r-md)",
                          border: "1px solid var(--border)",
                          background: "var(--bg-elevated)",
                        }}
                      />
                    ) : null}

                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        {p.category?.name ? (
                          <span className="dash-badge">{p.category.name}</span>
                        ) : null}
                        {p.author?.name ? (
                          <span className="dash-badge">By {p.author.name}</span>
                        ) : null}
                        {p.published_at ? (
                          <time className="dash-meta">
                            {new Date(p.published_at).toLocaleDateString()}
                          </time>
                        ) : null}
                      </div>

                      <h2
                        className="h2"
                        style={{ marginTop: "var(--space-4)" }}
                      >
                        <Link
                          href={`/blog/${p.slug}`}
                          className="transition-base"
                          data-track="click blog_post_title"
                          data-location="blog index"
                          data-intent="Read post"
                          data-label={p.title}
                        >
                          {p.title}
                        </Link>
                      </h2>

                      {p.excerpt ? (
                        <p
                          className="subhead"
                          style={{ marginTop: "var(--space-3)" }}
                        >
                          {p.excerpt}
                        </p>
                      ) : null}

                      <div
                        style={{
                          marginTop: "var(--space-5)",
                          display: "flex",
                          gap: 10,
                          flexWrap: "wrap",
                        }}
                      >
                        <Link
                          href={`/blog/${p.slug}`}
                          className="btn btn-secondary"
                          data-track="click blog_post_read"
                          data-location="blog index"
                          data-intent="Read post"
                          data-label={p.title}
                        >
                          Read
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
