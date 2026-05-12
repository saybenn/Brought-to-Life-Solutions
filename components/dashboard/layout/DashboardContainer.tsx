import type { ReactNode } from "react";

type DashboardContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function DashboardContainer({
  children,
  className,
}: DashboardContainerProps) {
  return (
    <section className={`dash-container ${className ?? ""}`}>
      <div className="dash-container__inner">{children}</div>
    </section>
  );
}
