import type { ReactNode } from "react";

type DashboardGridProps = {
  children: ReactNode;
  columns?: "1" | "2" | "2-1";
  className?: string;
};

export default function DashboardGrid({
  children,
  columns = "2",
  className,
}: DashboardGridProps) {
  return (
    <div className={`dash-grid dash-grid--${columns} ${className ?? ""}`}>
      {children}
    </div>
  );
}
