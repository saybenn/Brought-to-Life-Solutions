// /components/dashboard/customers/CustomerLedgerTable.tsx

import DashboardDataTable from "@/components/dashboard/management/DashboardDataTable";
import DashboardTagList from "@/components/dashboard/management/DashboardTagList";
import { DashboardButton } from "@/components/dashboard/management/DashboardButton";

export type CustomerRecord = {
  id: string;
  site_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
};

type CustomerLedgerTableProps = {
  customers: CustomerRecord[];
  onOpenCustomer: (customer: CustomerRecord) => void;
};

export function tagsToArray(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags
      .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
      .filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

function formatDate(value?: string | null): string {
  if (!value) return "—";

  try {
    return new Date(value).toLocaleDateString();
  } catch {
    return "—";
  }
}

export default function CustomerLedgerTable({
  customers,
  onOpenCustomer,
}: CustomerLedgerTableProps) {
  return (
    <div className="dash-desktop-table-only">
      <DashboardDataTable minWidth={860}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Tags</th>
            <th>Updated</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <span className="dash-tag-list__empty">
                  No customers match this view.
                </span>
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr
                key={customer.id}
                className="is-clickable"
                onClick={() => onOpenCustomer(customer)}
              >
                <td>
                  <strong className="dash-table-primary-text">
                    {customer.name || "Untitled customer"}
                  </strong>
                </td>

                <td>{customer.email || "—"}</td>

                <td>{customer.phone || "—"}</td>

                <td>
                  <DashboardTagList tags={tagsToArray(customer.tags)} />
                </td>

                <td className="is-date">{formatDate(customer.updated_at)}</td>

                <td className="is-actions">
                  <DashboardButton
                    variant="ghost"
                    size="sm"
                    onClick={(event) => {
                      event.stopPropagation();
                      onOpenCustomer(customer);
                    }}
                  >
                    Open
                  </DashboardButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </DashboardDataTable>
    </div>
  );
}
