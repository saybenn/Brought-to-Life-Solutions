// /components/dashboard/content/ContentPostCards.tsx

import Link from "next/link";

import {
  DashboardMobileRecordCard,
  DashboardMobileRecordList,
} from "@/components/dashboard/management/DashboardMobileRecordList";
import DashboardStatusPill, {
  getPostStatusTone,
} from "@/components/dashboard/management/DashboardStatusPill";
import type { PostListItem } from "@/lib/blog/types";

type ContentPostCardsProps = {
  posts: PostListItem[];
};

function formatDate(value?: string | null): string {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString();
}

export default function ContentPostCards({ posts }: ContentPostCardsProps) {
  return (
    <div className="dash-mobile-cards-only">
      {posts.length === 0 ? (
        <div className="dash-empty-state is-compact">
          <div className="dash-empty-state__title">No posts found</div>
          <div className="dash-empty-state__description">
            Try changing your filters or create a new post.
          </div>
        </div>
      ) : (
        <DashboardMobileRecordList>
          {posts.map((post) => (
            <DashboardMobileRecordCard key={post.id}>
              <div className="dash-mobile-record-card__top">
                <h3 className="dash-mobile-record-card__title">
                  {post.title || "Untitled post"}
                </h3>

                <DashboardStatusPill tone={getPostStatusTone(post.status)}>
                  {post.status || "unknown"}
                </DashboardStatusPill>
              </div>

              <div className="dash-mobile-record-card__meta">
                <span>Category: {post.category?.name ?? "Uncategorized"}</span>
                <span>Updated: {formatDate(post.updated_at)}</span>
                <span>Published: {formatDate(post.published_at)}</span>
              </div>

              <div className="dash-mobile-record-card__footer">
                <Link
                  href={`/dashboard/content/${post.id}`}
                  className="dash-inline-action"
                >
                  Open post
                </Link>
              </div>
            </DashboardMobileRecordCard>
          ))}
        </DashboardMobileRecordList>
      )}
    </div>
  );
}
