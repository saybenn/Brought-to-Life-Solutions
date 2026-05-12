// /pages/dashboard/content/index.tsx

import { useEffect, useMemo, useState } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import DashboardContainer from "@/components/dashboard/layout/DashboardContainer";
import DashboardManagementHeader from "@/components/dashboard/management/DashboardManagementHeader";
import DashboardManagementSection from "@/components/dashboard/management/DashboardManagementSection";
import DashboardPagination from "@/components/dashboard/management/DashboardPagination";
import { DashboardLinkButton } from "@/components/dashboard/management/DashboardButton";
import ContentFilters, {
  type ContentStatusFilter,
} from "@/components/dashboard/content/ContentFilters";
import ContentPostsTable from "@/components/dashboard/content/ContentPostsTable";
import ContentPostCards from "@/components/dashboard/content/ContentPostCards";
import SkeletonPanel from "@/components/dashboard/common/SkeletonPanel";
import EmptyState from "@/components/ui/EmptyState";

import { getSiteContextPages } from "@/lib/siteConfig/getSiteContextPages";
import { canWrite as canWriteRole } from "@/lib/siteConfig/permissions";
import type { SiteConfig } from "@/lib/siteConfig/schema";
import type { Category, PostListItem } from "@/lib/blog/types";
import { fetchJson, UnauthorizedError } from "@/lib/api/fetchJson";

type ContentPageProps = {
  siteId: string;
  role: string;
  config: SiteConfig;
  currentModule: "content";
};

type CategoriesResponse = {
  ok: boolean;
  categories: Category[];
};

type PostsResponse = {
  ok: boolean;
  posts: PostListItem[];
  pagination?: {
    total?: number;
  };
};

const PAGE_LIMIT = 25;

export const getServerSideProps: GetServerSideProps<ContentPageProps> = async (
  ctx,
) => {
  const { siteId, role, config } = await getSiteContextPages(ctx as any);

  if (config.modules.content?.enabled !== true) {
    return { notFound: true };
  }

  return {
    props: {
      siteId,
      role,
      config,
      currentModule: "content",
    },
  };
};

function buildQueryString(args: {
  q: string;
  status: ContentStatusFilter;
  categoryId: string;
  page: number;
  limit: number;
}) {
  const params = new URLSearchParams();

  if (args.q.trim()) params.set("q", args.q.trim());
  if (args.status !== "all") params.set("status", args.status);
  if (args.categoryId) params.set("category_id", args.categoryId);

  params.set("page", String(args.page));
  params.set("limit", String(args.limit));

  return params.toString();
}

function ContentInitialSkeleton() {
  return (
    <DashboardContainer>
      <div className="dash-management-page">
        <SkeletonPanel height={150} />
        <SkeletonPanel height={132} />
        <SkeletonPanel height={340} />
      </div>
    </DashboardContainer>
  );
}

export default function ContentIndex({
  role,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const canWrite = canWriteRole(role);

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<ContentStatusFilter>("all");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);

  const queryString = useMemo(
    () =>
      buildQueryString({
        q,
        status,
        categoryId,
        page,
        limit: PAGE_LIMIT,
      }),
    [q, status, categoryId, page],
  );

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetchJson<CategoriesResponse>("/api/categories", {
        withCredentials: true,
      }),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const postsQuery = useQuery({
    queryKey: ["posts", queryString],
    queryFn: () =>
      fetchJson<PostsResponse>(`/api/posts?${queryString}`, {
        withCredentials: true,
      }),
    placeholderData: (previousData) => previousData,
    staleTime: 2 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const unauthorized =
    postsQuery.error instanceof UnauthorizedError ||
    categoriesQuery.error instanceof UnauthorizedError;

  useEffect(() => {
    if (unauthorized) {
      router.push("/login");
    }
  }, [router, unauthorized]);

  const categories = categoriesQuery.data?.categories ?? [];
  const posts = postsQuery.data?.posts ?? [];
  const total = postsQuery.data?.pagination?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_LIMIT));

  const isInitialLoading = postsQuery.isLoading && !postsQuery.data;
  const isRefreshing =
    (postsQuery.isFetching && Boolean(postsQuery.data)) ||
    (categoriesQuery.isFetching && Boolean(categoriesQuery.data));

  const blockingError = postsQuery.isError && !postsQuery.data;
  const nonBlockingError = postsQuery.isError && Boolean(postsQuery.data);

  function resetFilters() {
    setQ("");
    setStatus("all");
    setCategoryId("");
    setPage(1);
  }

  function refreshContent() {
    postsQuery.refetch();
    categoriesQuery.refetch();
  }

  if (isInitialLoading) {
    return <ContentInitialSkeleton />;
  }

  if (blockingError) {
    return (
      <DashboardContainer>
        <EmptyState
          title="Content unavailable"
          description={
            postsQuery.error instanceof Error
              ? postsQuery.error.message
              : "The content list could not be loaded."
          }
        />
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <div className="dash-dashboard-runtime">
        {isRefreshing ? (
          <div className="dash-refresh-indicator" role="status">
            <span className="dash-refresh-indicator__dot" aria-hidden="true" />
            Updating content…
          </div>
        ) : null}

        <div className="dash-management-page">
          <DashboardManagementHeader
            eyebrow="Content System"
            title="Blog & Publishing"
            description="Manage posts, publishing state, categories, and draft visibility from the same dashboard system as analytics."
            meta={[
              {
                label: "Posts",
                value: total,
              },
              {
                label: "Page",
                value: `${page} of ${totalPages}`,
              },
              {
                label: "Access",
                value: canWrite ? "Editor" : "Read-only",
              },
            ]}
            actions={
              canWrite ? (
                <DashboardLinkButton
                  href="/dashboard/content/new"
                  variant="primary"
                >
                  New post
                </DashboardLinkButton>
              ) : null
            }
          />

          <ContentFilters
            search={q}
            status={status}
            categoryId={categoryId}
            categories={categories}
            isRefreshing={isRefreshing}
            onSearchChange={(value) => {
              setPage(1);
              setQ(value);
            }}
            onStatusChange={(value) => {
              setPage(1);
              setStatus(value);
            }}
            onCategoryChange={(value) => {
              setPage(1);
              setCategoryId(value);
            }}
            onReset={resetFilters}
            onRefresh={refreshContent}
          />

          {nonBlockingError ? (
            <EmptyState
              compact
              title="Showing last available posts"
              description="The latest refresh failed, but the table is still showing the last successful content list."
              className="dash-nonblocking-error"
            />
          ) : null}

          <DashboardManagementSection
            title="Posts"
            description="Current filtered publishing view. Open a post to review or edit it."
          >
            <ContentPostsTable posts={posts} />
            <ContentPostCards posts={posts} />
          </DashboardManagementSection>

          <DashboardPagination
            page={page}
            totalPages={totalPages}
            onPrevious={() =>
              setPage((currentPage) => Math.max(1, currentPage - 1))
            }
            onNext={() =>
              setPage((currentPage) => Math.min(totalPages, currentPage + 1))
            }
            previousDisabled={page <= 1 || postsQuery.isFetching}
            nextDisabled={page >= totalPages || postsQuery.isFetching}
          />
        </div>
      </div>
    </DashboardContainer>
  );
}
