import type { ReactNode } from "react";

import DashboardAppLayout from "@/components/dashboard/DashboardAppLayout";
import type { AnalyticsConfig, ModuleKey } from "@/lib/analytics/config.types";

type DashboardShellProps = {
  siteId: string;
  role: string;
  config: AnalyticsConfig;
  currentModule: ModuleKey;
  children: ReactNode;
};

export function DashboardShell({
  siteId,
  role,
  config,
  currentModule,
  children,
}: DashboardShellProps) {
  return (
    <DashboardAppLayout
      siteId={siteId}
      role={role}
      config={config}
      currentModule={currentModule}
    >
      {children}
    </DashboardAppLayout>
  );
}

export default DashboardShell;
