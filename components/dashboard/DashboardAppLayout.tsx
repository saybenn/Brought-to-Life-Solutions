import type { ReactNode } from "react";
import { useMemo } from "react";
import { useRouter } from "next/router";

import type { AnalyticsConfig, ModuleKey } from "@/lib/analytics/config.types";
import DashboardMobileBottomNav from "@/components/dashboard/layout/DashboardMobileBottomNav";
import DashboardSidebar from "@/components/dashboard/layout/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/layout/DashboardTopbar";

type DashboardAppLayoutProps = {
  children: ReactNode;
  config: AnalyticsConfig;
  currentModule?: ModuleKey;
  siteId?: string;
  role?: string;
};

export type DashboardLayoutNavItem = {
  key: ModuleKey;
  path: string;
  label: string;
};

const DEFAULT_NAV: Record<ModuleKey, DashboardLayoutNavItem> = {
  analytics: {
    key: "analytics",
    path: "/dashboard/analytics",
    label: "Analytics",
  },
  customer_management: {
    key: "customer_management",
    path: "/dashboard/customers",
    label: "Customers",
  },
  commerce: {
    key: "commerce",
    path: "/dashboard/commerce",
    label: "Commerce",
  },
  content: {
    key: "content",
    path: "/dashboard/content",
    label: "Content",
  },
  integrity: {
    key: "integrity",
    path: "/dashboard/integrity",
    label: "Integrity",
  },
  settings: {
    key: "settings",
    path: "/dashboard/settings",
    label: "Settings",
  },
};

function isModuleEnabled(
  config: AnalyticsConfig,
  moduleKey: ModuleKey,
): boolean {
  return config.modules?.[moduleKey]?.enabled === true;
}

function buildNavItems(config: AnalyticsConfig): DashboardLayoutNavItem[] {
  if (config.nav?.items?.length) {
    return config.nav.items
      .filter((item) => isModuleEnabled(config, item.key))
      .map((item) => ({
        key: item.key,
        path: item.path,
        label: item.label,
      }));
  }

  return (Object.keys(DEFAULT_NAV) as ModuleKey[])
    .filter((key) => isModuleEnabled(config, key))
    .map((key) => DEFAULT_NAV[key]);
}

function isActivePath(currentPath: string, targetPath: string): boolean {
  const cleanCurrentPath = currentPath.split("?")[0];
  const cleanTargetPath = targetPath.split("?")[0];

  if (cleanCurrentPath === cleanTargetPath) return true;
  return cleanCurrentPath.startsWith(`${cleanTargetPath}/`);
}

function resolveActiveModule(
  navItems: DashboardLayoutNavItem[],
  currentPath: string,
  currentModule?: ModuleKey,
): ModuleKey | undefined {
  if (currentModule) return currentModule;

  return navItems.find((item) => isActivePath(currentPath, item.path))?.key;
}

export default function DashboardAppLayout({
  children,
  config,
  currentModule,
  siteId,
  role,
}: DashboardAppLayoutProps) {
  const router = useRouter();

  const navItems = useMemo(() => buildNavItems(config), [config]);

  const activeModule = useMemo(
    () => resolveActiveModule(navItems, router.asPath, currentModule),
    [navItems, router.asPath, currentModule],
  );

  return (
    <div className="dash-app-frame">
      <DashboardSidebar
        navItems={navItems}
        activeModule={activeModule}
        siteId={siteId}
        role={role}
      />

      <main className="dash-app-main">
        <DashboardTopbar siteId={siteId} role={role} />

        <div className="dash-app-content">
          <div className="dash-report-surface">{children}</div>
        </div>
      </main>

      <DashboardMobileBottomNav
        navItems={navItems}
        activeModule={activeModule}
      />
    </div>
  );
}
