// /components/dashboard/management/DashboardStatusPill.tsx

import type { ReactNode } from "react";

type DashboardStatusPillTone =
  | "success"
  | "warning"
  | "muted"
  | "danger"
  | "info";

type DashboardStatusPillProps = {
  children: ReactNode;
  tone?: DashboardStatusPillTone;
};

export default function DashboardStatusPill({
  children,
  tone = "muted",
}: DashboardStatusPillProps) {
  return (
    <span className={`dash-status-pill dash-status-pill--${tone}`}>
      {children}
    </span>
  );
}

export function getPostStatusTone(status?: string): DashboardStatusPillTone {
  switch ((status ?? "").toLowerCase()) {
    case "published":
      return "success";
    case "draft":
      return "warning";
    case "archived":
      return "muted";
    default:
      return "info";
  }
}

export function getCustomerStatusTone(
  status?: string,
): DashboardStatusPillTone {
  switch ((status ?? "").toLowerCase()) {
    case "customer":
    case "active":
    case "won":
      return "success";
    case "lead":
    case "prospect":
      return "info";
    case "lost":
    case "inactive":
      return "danger";
    default:
      return "muted";
  }
}
