// /components/dashboard/customers/CustomerFilters.tsx

import { Search } from "lucide-react";

import { DashboardButton } from "@/components/dashboard/management/DashboardButton";
import DashboardField from "@/components/dashboard/management/DashboardField";
import DashboardManagementToolbar from "@/components/dashboard/management/DashboardManagementToolbar";

type CustomerFiltersProps = {
  search: string;
  isRefreshing?: boolean;
  onSearchChange: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  onRefresh: () => void;
};

export default function CustomerFilters({
  search,
  isRefreshing = false,
  onSearchChange,
  onSubmit,
  onReset,
  onRefresh,
}: CustomerFiltersProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <DashboardManagementToolbar
        className="dash-management-toolbar--customers"
        footer={
          <>
            <DashboardButton type="submit" variant="secondary">
              <Search size={15} strokeWidth={2} aria-hidden="true" />
              Search
            </DashboardButton>

            <DashboardButton
              type="button"
              variant="secondary"
              onClick={onReset}
            >
              Reset search
            </DashboardButton>

            <DashboardButton
              type="button"
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
            placeholder="Search name, email, phone, notes…"
            autoComplete="off"
          />
        </DashboardField>
      </DashboardManagementToolbar>
    </form>
  );
}
