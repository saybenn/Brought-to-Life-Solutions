// /components/dashboard/content/ContentFilters.tsx

import DashboardField from "@/components/dashboard/management/DashboardField";
import { DashboardButton } from "@/components/dashboard/management/DashboardButton";
import DashboardManagementToolbar from "@/components/dashboard/management/DashboardManagementToolbar";
import type { Category } from "@/lib/blog/types";

export type ContentStatusFilter = "all" | "draft" | "published";

type ContentFiltersProps = {
  search: string;
  status: ContentStatusFilter;
  categoryId: string;
  categories: Category[];
  isRefreshing?: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ContentStatusFilter) => void;
  onCategoryChange: (value: string) => void;
  onReset: () => void;
  onRefresh: () => void;
};

export default function ContentFilters({
  search,
  status,
  categoryId,
  categories,
  isRefreshing = false,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onReset,
  onRefresh,
}: ContentFiltersProps) {
  return (
    <DashboardManagementToolbar
      footer={
        <>
          <DashboardButton
            variant="secondary"
            onClick={onReset}
            disabled={isRefreshing}
          >
            Reset filters
          </DashboardButton>

          <DashboardButton
            variant="ghost"
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? "Refreshing…" : "Refresh"}
          </DashboardButton>
        </>
      }
    >
      <DashboardField
        label="Search"
        className="dash-management-toolbar__field--wide"
      >
        <input
          className="dash-input"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search title or excerpt…"
          type="search"
        />
      </DashboardField>

      <DashboardField label="Status">
        <select
          className="dash-select"
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as ContentStatusFilter)
          }
        >
          <option value="all">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </DashboardField>

      <DashboardField label="Category">
        <select
          className="dash-select"
          value={categoryId}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </DashboardField>
    </DashboardManagementToolbar>
  );
}
