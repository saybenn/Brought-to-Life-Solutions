// /components/dashboard/management/DashboardManagementHeader.tsx

import type { ReactNode } from "react";

type DashboardManagementHeaderMetaItem = {
  label: string;
  value: string | number;
};

type DashboardManagementHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  meta?: DashboardManagementHeaderMetaItem[];
  actions?: ReactNode;
};

export default function DashboardManagementHeader({
  eyebrow,
  title,
  description,
  meta,
  actions,
}: DashboardManagementHeaderProps) {
  return (
    <section
      className="dash-management-header"
      aria-labelledby="management-page-title"
    >
      <div className="dash-management-header__copy">
        <div className="dash-management-header__eyebrow">{eyebrow}</div>

        <h1
          id="management-page-title"
          className="dash-management-header__title"
        >
          {title}
        </h1>

        {description ? (
          <p className="dash-management-header__description">{description}</p>
        ) : null}

        {meta?.length ? (
          <div
            className="dash-management-header__meta"
            aria-label="Page summary"
          >
            {meta.map((item) => (
              <span
                key={`${item.label}-${item.value}`}
                className="dash-management-header__meta-pill"
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {actions ? (
        <div className="dash-management-header__actions">{actions}</div>
      ) : null}
    </section>
  );
}
