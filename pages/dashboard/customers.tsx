// /pages/dashboard/customers.tsx

import { useEffect, useMemo, useState } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import DashboardContainer from "@/components/dashboard/layout/DashboardContainer";
import DashboardManagementHeader from "@/components/dashboard/management/DashboardManagementHeader";
import DashboardManagementSection from "@/components/dashboard/management/DashboardManagementSection";
import { DashboardButton } from "@/components/dashboard/management/DashboardButton";
import CustomerFilters from "@/components/dashboard/customers/CustomerFilters";
import CustomerLedgerCards from "@/components/dashboard/customers/CustomerLedgerCards";
import CustomerLedgerTable from "@/components/dashboard/customers/CustomerLedgerTable";
import CustomerEditorModal from "@/components/dashboard/customers/CustomerEditorModal";
import SkeletonPanel from "@/components/dashboard/common/SkeletonPanel";
import EmptyState from "@/components/ui/EmptyState";

import type { SiteContext } from "@/lib/siteConfig/getSiteContextPages";
import { getSiteContextPages } from "@/lib/siteConfig/getSiteContextPages";
import { canWrite } from "@/lib/siteConfig/permissions";
import { fetchJson, UnauthorizedError } from "@/lib/api/fetchJson";
import type { CustomerRecord } from "@/components/dashboard/customers/CustomerLedgerTable";

type CustomersResponse = {
  ok?: boolean;
  customers: CustomerRecord[];
};

type CustomersPageProps = SiteContext & {
  currentModule: "customer_management";
};

export const getServerSideProps: GetServerSideProps<
  CustomersPageProps
> = async (ctx) => {
  const site = await getSiteContextPages(ctx);

  if (site.config.modules?.customer_management?.enabled !== true) {
    return { notFound: true };
  }

  return {
    props: {
      ...site,
      currentModule: "customer_management",
    },
  };
};

function makeKey(query: string) {
  return ["customers", query.trim()] as const;
}

async function fetchCustomers(query: string) {
  const params = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";

  return fetchJson<CustomersResponse>(`/api/customers${params}`, {
    withCredentials: true,
  });
}

function createEmptyCustomer(siteId: string): CustomerRecord {
  const now = new Date().toISOString();

  return {
    id: "",
    site_id: siteId,
    name: "",
    email: null,
    phone: null,
    notes: null,
    tags: [],
    created_at: now,
    updated_at: now,
  };
}

function CustomersInitialSkeleton() {
  return (
    <DashboardContainer>
      <div className="dash-management-page">
        <SkeletonPanel height={150} />
        <SkeletonPanel height={118} />
        <SkeletonPanel height={320} />
      </div>
    </DashboardContainer>
  );
}

export default function CustomersPage({
  siteId,
  role,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const writable = canWrite(role);

  const [searchDraft, setSearchDraft] = useState("");
  const [committedSearch, setCommittedSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerRecord | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const query = useQuery({
    queryKey: makeKey(committedSearch),
    queryFn: () => fetchCustomers(committedSearch),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const unauthorized = query.error instanceof UnauthorizedError;

  useEffect(() => {
    if (unauthorized) {
      router.push("/login");
    }
  }, [router, unauthorized]);

  const customers = Array.isArray(query.data?.customers)
    ? query.data.customers
    : [];

  const isInitialLoading = query.isLoading && !query.data;
  const isRefreshing = query.isFetching && Boolean(query.data);
  const hasBlockingError = query.isError && !query.data;
  const hasNonBlockingError = query.isError && Boolean(query.data);

  const resultLabel = useMemo(() => {
    if (!committedSearch.trim()) return `${customers.length} customers`;
    return `${customers.length} results`;
  }, [committedSearch, customers.length]);

  function submitSearch() {
    setCommittedSearch(searchDraft.trim());
  }

  function resetSearch() {
    setSearchDraft("");
    setCommittedSearch("");
  }

  function openCreate() {
    if (!writable) return;
    setSelectedCustomer(createEmptyCustomer(siteId));
    setEditorOpen(true);
  }

  function openEdit(customer: CustomerRecord) {
    setSelectedCustomer(customer);
    setEditorOpen(true);
  }

  function closeEditor() {
    if (isSaving || isDeleting) return;
    setEditorOpen(false);
    setSelectedCustomer(null);
  }

  async function saveCustomer(draft: CustomerRecord, tags: string[]) {
    if (!writable) return;

    const payload = {
      name: draft.name,
      email: draft.email,
      phone: draft.phone,
      notes: draft.notes,
      tags,
    };

    setIsSaving(true);

    try {
      if (!draft.id) {
        await fetchJson("/api/customers", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      } else {
        await fetchJson(`/api/customers/${draft.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      }

      setEditorOpen(false);
      setSelectedCustomer(null);
      toast.success(draft.id ? "Customer updated." : "Customer created.");

      await queryClient.invalidateQueries({ queryKey: ["customers"] });
    } catch (error: any) {
      toast.error(error?.message ?? "Save failed.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteCustomer(id: string) {
    if (!writable) return;

    const confirmed = window.confirm("Delete this customer?");
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      await fetchJson(`/api/customers/${id}`, {
        method: "DELETE",
      });

      setEditorOpen(false);
      setSelectedCustomer(null);
      toast.success("Customer deleted.");

      await queryClient.invalidateQueries({ queryKey: ["customers"] });
    } catch (error: any) {
      toast.error(error?.message ?? "Delete failed.");
    } finally {
      setIsDeleting(false);
    }
  }

  if (isInitialLoading) {
    return <CustomersInitialSkeleton />;
  }

  if (hasBlockingError) {
    return (
      <DashboardContainer>
        <EmptyState
          title="Customers unavailable"
          description={
            query.error instanceof Error
              ? query.error.message
              : "The customer ledger could not be loaded."
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
            Updating customers…
          </div>
        ) : null}

        <div className="dash-management-page">
          <DashboardManagementHeader
            eyebrow="Customer Ledger"
            title="Customers & Leads"
            description="Track customer records, lead notes, contact details, tags, and follow-up context in one clean ledger."
            meta={[
              {
                label: "Records",
                value: resultLabel,
              },
              {
                label: "Access",
                value: writable ? "Editor" : "Read-only",
              },
            ]}
            actions={
              writable ? (
                <DashboardButton
                  variant="primary"
                  onClick={openCreate}
                  disabled={query.isFetching}
                >
                  Add customer
                </DashboardButton>
              ) : null
            }
          />

          <CustomerFilters
            search={searchDraft}
            isRefreshing={isRefreshing}
            onSearchChange={setSearchDraft}
            onSubmit={submitSearch}
            onReset={resetSearch}
            onRefresh={() => query.refetch()}
          />

          {hasNonBlockingError ? (
            <EmptyState
              compact
              title="Showing last available customers"
              description="The latest refresh failed, but the ledger is still showing the last successful customer list."
              className="dash-nonblocking-error"
            />
          ) : null}

          <DashboardManagementSection
            title="Ledger"
            description="Open a record to review or update customer contact details, tags, and notes."
          >
            <CustomerLedgerTable
              customers={customers}
              onOpenCustomer={openEdit}
            />

            <CustomerLedgerCards
              customers={customers}
              onOpenCustomer={openEdit}
            />
          </DashboardManagementSection>
        </div>

        <CustomerEditorModal
          open={editorOpen}
          customer={selectedCustomer}
          writable={writable}
          isSaving={isSaving}
          isDeleting={isDeleting}
          onClose={closeEditor}
          onSave={saveCustomer}
          onDelete={deleteCustomer}
        />
      </div>
    </DashboardContainer>
  );
}
