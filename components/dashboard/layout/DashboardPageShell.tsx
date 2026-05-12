import type { ReactNode } from "react";

type DashboardPageShellProps = {
  children: ReactNode;
  className?: string;
};

export default function DashboardPageShell({
  children,
  className,
}: DashboardPageShellProps) {
  return (
    <main className={`dash-page-shell ${className ?? ""}`}>{children}</main>
  );
}
