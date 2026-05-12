// /components/dashboard/management/DashboardPagination.tsx

import { DashboardButton } from "@/components/dashboard/management/DashboardButton";

type DashboardPaginationProps = {
  page: number;
  totalPages: number;
  onPrevious?: () => void;
  onNext?: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
};

export default function DashboardPagination({
  page,
  totalPages,
  onPrevious,
  onNext,
  previousDisabled,
  nextDisabled,
}: DashboardPaginationProps) {
  return (
    <nav className="dash-pagination" aria-label="Pagination">
      <DashboardButton
        variant="secondary"
        onClick={onPrevious}
        disabled={previousDisabled || page <= 1}
      >
        Previous
      </DashboardButton>

      <span className="dash-pagination__status">
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
      </span>

      <DashboardButton
        variant="secondary"
        onClick={onNext}
        disabled={nextDisabled || page >= totalPages}
      >
        Next
      </DashboardButton>
    </nav>
  );
}
