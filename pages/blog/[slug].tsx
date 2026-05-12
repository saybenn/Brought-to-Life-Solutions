import Head from "next/head";
import Link from "next/link";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getMeta } from "@/lib/seo";
import { siteMeta } from "@/lib/siteMeta";

type BlogPost = {
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  category?: { name: string; slug: string } | null;
  author?: { name: string; slug: string } | null;
};

function getBaseUrlFromReq(req: any) {
  const xfProto = req?.headers?.["x-forwarded-proto"];
  const proto = typeof xfProto === "string" ? xfProto : "http";

  const host =
    (req?.headers?.["x-forwarded-host"] as string) ||
    (req?.headers?.host as string) ||
    "";

  return host ? `${proto}://${host}` : "";
}

export const getServerSideProps: GetServerSideProps<{
  post: BlogPost;
}> = async ({ req, params }) => {
  const slug = params?.slug as string;

  const baseUrl = getBaseUrlFromReq(req);
  if (!baseUrl) return { notFound: true };

  const r = await fetch(
    `${baseUrl}/api/public/blog/${encodeURIComponent(slug)}`,
    {
      headers: { accept: "application/json" },
    },
  );

  if (!r.ok) return { notFound: true };

  const json = await r.json().catch(() => null);
  if (!json?.ok || !json?.post) return { notFound: true };

  return { props: { post: json.post as BlogPost } };
};

export default function BlogPostPage({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const metaTitle = (post.meta_title || post.title || "").trim();
  const metaDescription = (post.meta_description || post.excerpt || "").trim();

  const canonical =
    (post.canonical_url && post.canonical_url.trim()) ||
    `${siteMeta.url}/blog/${post.slug}`;

  const { t, d, c } = getMeta({
    title: metaTitle,
    description: metaDescription || post.excerpt || "",
    canonical,
  });

  const ogImage = post.cover_image_url || undefined;

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: metaDescription || undefined,
    datePublished: post.published_at || undefined,
    image: ogImage ? [ogImage] : undefined,
    mainEntityOfPage: c,
    author: post.author?.name
      ? { "@type": "Person", name: post.author.name }
      : {
          "@type": "Organization",
          name: siteMeta.name || "Brought to Life Solutions",
        },
    publisher: {
      "@type": "Organization",
      name: siteMeta.name || "Brought to Life Solutions",
    },
  };

  return (
    <>
      <Head>
        <title>{t}</title>
        {d ? <meta name="description" content={d} /> : null}

        <meta property="og:title" content={t} />
        {d ? <meta property="og:description" content={d} /> : null}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={c} />
        {ogImage ? <meta property="og:image" content={ogImage} /> : null}

        <meta
          name="twitter:card"
          content={ogImage ? "summary_large_image" : "summary"}
        />
        <meta name="twitter:title" content={t} />
        {d ? <meta name="twitter:description" content={d} /> : null}
        {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}

        <link rel="canonical" href={c} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogPostingJsonLd),
          }}
        />
      </Head>

      <section className="section">
        <div className="dash-shell">
          <div style={{ marginBottom: "var(--space-6)" }}>
            <Link
              href="/blog"
              className="btn btn-secondary"
              data-track="click blog_back"
              data-location="blog post"
              data-intent="Back to blog"
              data-label="Back"
            >
              ← Back
            </Link>
          </div>

          <article className="card dash-card">
            <header style={{ marginBottom: "var(--space-6)" }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {post.category?.name ? (
                  <span className="dash-badge">{post.category.name}</span>
                ) : null}

                {post.author?.name ? (
                  <span className="dash-badge">By {post.author.name}</span>
                ) : null}

                {post.published_at ? (
                  <time className="dash-meta">
                    {new Date(post.published_at).toLocaleDateString()}
                  </time>
                ) : null}
              </div>

              <h1 className="h1" style={{ marginTop: "var(--space-4)" }}>
                {post.title}
              </h1>

              {post.excerpt ? (
                <p
                  className="subhead"
                  style={{ marginTop: "var(--space-3)", maxWidth: 760 }}
                >
                  {post.excerpt}
                </p>
              ) : null}
            </header>

            {post.cover_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.cover_image_url}
                alt=""
                style={{
                  width: "100%",
                  maxHeight: 420,
                  objectFit: "cover",
                  borderRadius: "var(--r-lg)",
                  border: "1px solid var(--border)",
                  marginBottom: "var(--space-6)",
                  background: "var(--bg-elevated)",
                }}
              />
            ) : null}

            <div
              className="blog-content"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--size-lg)",
                lineHeight: "var(--leading-relaxed)",
                color: "var(--ink-700)",
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </section>
    </>
  );
}
