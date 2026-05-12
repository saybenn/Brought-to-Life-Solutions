// /components/dashboard/customers/CustomerLedgerCards.tsx

import DashboardTagList from "@/components/dashboard/management/DashboardTagList";
import {
  DashboardMobileRecordCard,
  DashboardMobileRecordList,
} from "@/components/dashboard/management/DashboardMobileRecordList";
import type { CustomerRecord } from "@/components/dashboard/customers/CustomerLedgerTable";
import { tagsToArray } from "@/components/dashboard/customers/CustomerLedgerTable";

type CustomerLedgerCardsProps = {
  customers: CustomerRecord[];
  onOpenCustomer: (customer: CustomerRecord) => void;
};

function formatDate(value?: string | null): string {
  if (!value) return "No date";

  try {
    return new Date(value).toLocaleDateString();
  } catch {
    return "No date";
  }
}

export default function CustomerLedgerCards({
  customers,
  onOpenCustomer,
}: CustomerLedgerCardsProps) {
  return (
    <div className="dash-mobile-cards-only">
      {customers.length === 0 ? (
        <div className="dash-empty-state is-compact">
          <div className="dash-empty-state__title">No customers found</div>
          <div className="dash-empty-state__description">
            Try changing your search or add a new customer.
          </div>
        </div>
      ) : (
        <DashboardMobileRecordList>
          {customers.map((customer) => (
            <DashboardMobileRecordCard
              key={customer.id}
              onClick={() => onOpenCustomer(customer)}
              ariaLabel={`Open ${customer.name || "customer"} record`}
            >
              <div className="dash-mobile-record-card__top">
                <h3 className="dash-mobile-record-card__title">
                  {customer.name || "Untitled customer"}
                </h3>

                <span className="dash-status-pill dash-status-pill--info">
                  Record
                </span>
              </div>

              <div className="dash-mobile-record-card__meta">
                <span>Email: {customer.email || "—"}</span>
                <span>Phone: {customer.phone || "—"}</span>
                <span>Updated: {formatDate(customer.updated_at)}</span>
              </div>

              <div className="dash-mobile-record-card__footer">
                <DashboardTagList
                  tags={tagsToArray(customer.tags)}
                  maxVisible={2}
                />
              </div>
            </DashboardMobileRecordCard>
          ))}
        </DashboardMobileRecordList>
      )}
    </div>
  );
}
