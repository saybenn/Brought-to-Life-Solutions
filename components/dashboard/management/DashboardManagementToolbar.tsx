// /components/dashboard/management/DashboardManagementToolbar.tsx

import type { ReactNode } from "react";

type DashboardManagementToolbarProps = {
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export default function DashboardManagementToolbar({
  children,
  footer,
  className,
}: DashboardManagementToolbarProps) {
  return (
    <section className={`dash-management-toolbar ${className ?? ""}`}>
      <div className="dash-management-toolbar__grid">{children}</div>

      {footer ? (
        <div className="dash-management-toolbar__footer">{footer}</div>
      ) : null}
    </section>
  );
}
