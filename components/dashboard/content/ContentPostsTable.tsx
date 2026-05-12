// /components/dashboard/content/ContentPostsTable.tsx

import Link from "next/link";

import DashboardDataTable from "@/components/dashboard/management/DashboardDataTable";
import DashboardStatusPill, {
  getPostStatusTone,
} from "@/components/dashboard/management/DashboardStatusPill";
import type { PostListItem } from "@/lib/blog/types";

type ContentPostsTableProps = {
  posts: PostListItem[];
};

function formatDate(value?: string | null): string {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString();
}

export default function ContentPostsTable({ posts }: ContentPostsTableProps) {
  return (
    <div className="dash-desktop-table-only">
      <DashboardDataTable minWidth={820}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Category</th>
            <th>Updated</th>
            <th>Published</th>
            <th aria-label="Actions" />
          </tr>
        </thead>

        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <div className="dash-table-empty">
                  No posts match this view.
                </div>
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post.id} className="is-clickable">
                <td>
                  <Link
                    href={`/dashboard/content/${post.id}`}
                    className="dash-table-primary-link"
                  >
                    {post.title || "Untitled post"}
                  </Link>
                </td>

                <td>
                  <DashboardStatusPill tone={getPostStatusTone(post.status)}>
                    {post.status || "unknown"}
                  </DashboardStatusPill>
                </td>

                <td>{post.category?.name ?? "—"}</td>

                <td className="is-date">{formatDate(post.updated_at)}</td>

                <td className="is-date">{formatDate(post.published_at)}</td>

                <td className="is-actions">
                  <Link
                    href={`/dashboard/content/${post.id}`}
                    className="dash-inline-action"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </DashboardDataTable>
    </div>
  );
}
