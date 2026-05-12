import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getSiteContextPages } from "@/lib/siteConfig/getSiteContextPages";
import { canWrite as canWriteRole } from "@/lib/siteConfig/permissions";
import type { SiteConfig } from "@/lib/siteConfig/schema";
import type { Author, Category } from "@/lib/blog/types";
import PostEditor from "@/components/dashboard/content/PostEditor";

type Props = { siteId: string; role: string; config: SiteConfig };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { siteId, role, config } = await getSiteContextPages(ctx as any);
  if (config.modules.content?.enabled !== true) return { notFound: true };
  return { props: { siteId, role, config } };
};

export default function NewPostPage({ siteId, role, config }: Props) {
  const canWrite = canWriteRole(role);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        const r = await fetch("/api/categories", { signal: ac.signal });
        const json = await r.json().catch(() => null);
        if (ac.signal.aborted) return;
        if (r.ok && json?.ok) setCategories(json.categories ?? []);
      } catch (e: any) {
        // Ignore abort errors (expected during navigation / re-render)
        if (e?.name === "AbortError") return;
        console.error(e);
      }
    })();

    return () => ac.abort();
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const r = await fetch("/api/authors", { signal: ac.signal });
        const json = await r.json().catch(() => null);
        if (ac.signal.aborted) return;
        if (r.ok && json?.ok) setAuthors(json.authors ?? []);
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        console.error(e);
      }
    })();
    return () => ac.abort();
  }, []);

  return (
    <DashboardShell
      siteId={siteId}
      role={role}
      config={config}
      currentModule="content"
    >
      <div className="dash-shell">
        <PostEditor
          mode="create"
          role={role}
          canWrite={canWrite}
          categories={categories}
          authors={authors}
        />
      </div>
    </DashboardShell>
  );
}
