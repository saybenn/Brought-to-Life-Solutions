// /components/dashboard/management/DashboardMobileRecordList.tsx

import type { ReactNode } from "react";

type DashboardMobileRecordListProps = {
  children: ReactNode;
  className?: string;
};

export function DashboardMobileRecordList({
  children,
  className,
}: DashboardMobileRecordListProps) {
  return (
    <div className={`dash-mobile-record-list ${className ?? ""}`}>
      {children}
    </div>
  );
}

type DashboardMobileRecordCardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

export function DashboardMobileRecordCard({
  children,
  className,
  onClick,
  ariaLabel,
}: DashboardMobileRecordCardProps) {
  if (onClick) {
    return (
      <button
        type="button"
        className={`dash-mobile-record-card is-clickable ${className ?? ""}`}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  }

  return (
    <article className={`dash-mobile-record-card ${className ?? ""}`}>
      {children}
    </article>
  );
}
