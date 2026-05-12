// /components/dashboard/management/DashboardManagementSection.tsx

import type { ReactNode } from "react";

type DashboardManagementSectionProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function DashboardManagementSection({
  title,
  description,
  actions,
  children,
  className,
}: DashboardManagementSectionProps) {
  return (
    <section className={`dash-management-section ${className ?? ""}`}>
      <div className="dash-management-section__header">
        <div className="dash-management-section__copy">
          <h2 className="dash-management-section__title">{title}</h2>

          {description ? (
            <p className="dash-management-section__description">
              {description}
            </p>
          ) : null}
        </div>

        {actions ? (
          <div className="dash-management-section__actions">{actions}</div>
        ) : null}
      </div>

      {children}
    </section>
  );
}
