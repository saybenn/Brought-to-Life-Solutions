// /components/dashboard/management/DashboardDataTable.tsx

import type { ReactNode } from "react";

type DashboardDataTableProps = {
  children: ReactNode;
  minWidth?: number;
  className?: string;
};

export default function DashboardDataTable({
  children,
  minWidth = 760,
  className,
}: DashboardDataTableProps) {
  return (
    <div className={`dash-data-table-wrap ${className ?? ""}`}>
      <table className="dash-data-table" style={{ minWidth }}>
        {children}
      </table>
    </div>
  );
}
