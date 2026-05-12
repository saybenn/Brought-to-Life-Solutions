import type { ReactNode } from "react";

type DashboardPanelShellProps = {
  children: ReactNode;
  className?: string;
  surface?: "base" | "elevated" | "muted";
};

export default function DashboardPanelShell({
  children,
  className,
  surface = "base",
}: DashboardPanelShellProps) {
  return (
    <section
      className={`dash-panel-shell dash-panel-shell--${surface} ${className ?? ""}`}
    >
      {children}
    </section>
  );
}
