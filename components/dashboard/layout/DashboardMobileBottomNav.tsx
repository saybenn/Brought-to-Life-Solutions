import Link from "next/link";
import {
  BarChart3,
  BriefcaseBusiness,
  Ellipsis,
  FileText,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

import type { ModuleKey } from "@/lib/analytics/config.types";
import type { DashboardLayoutNavItem } from "@/components/dashboard/DashboardAppLayout";

type DashboardMobileBottomNavProps = {
  navItems: DashboardLayoutNavItem[];
  activeModule?: ModuleKey;
};

type MobileNavItem = DashboardLayoutNavItem & {
  mobileLabel: string;
  synthetic?: "dashboard" | "more";
};

function getModuleIcon(moduleKey: ModuleKey) {
  switch (moduleKey) {
    case "analytics":
      return BarChart3;
    case "customer_management":
      return Users;
    case "commerce":
      return BriefcaseBusiness;
    case "content":
      return FileText;
    case "integrity":
      return ShieldCheck;
    case "settings":
      return Settings;
    default:
      return LayoutDashboard;
  }
}

function findItem(
  navItems: DashboardLayoutNavItem[],
  key: ModuleKey,
): DashboardLayoutNavItem | undefined {
  return navItems.find((item) => item.key === key);
}

function buildMobileItems(navItems: DashboardLayoutNavItem[]): MobileNavItem[] {
  const analytics = findItem(navItems, "analytics");
  const customers = findItem(navItems, "customer_management");
  const content = findItem(navItems, "content");
  const commerce = findItem(navItems, "commerce");
  const settings = findItem(navItems, "settings");
  const integrity = findItem(navItems, "integrity");

  const dashboardTarget = analytics ?? navItems[0];
  const items: MobileNavItem[] = [];

  if (dashboardTarget) {
    items.push({
      ...dashboardTarget,
      mobileLabel: "Dashboard",
      synthetic: "dashboard",
    });
  }

  if (analytics && dashboardTarget?.path !== analytics.path) {
    items.push({
      ...analytics,
      mobileLabel: "Analytics",
    });
  }

  if (customers) {
    items.push({
      ...customers,
      mobileLabel: "Customers",
    });
  }

  if (content) {
    items.push({
      ...content,
      mobileLabel: "Content",
    });
  }

  const moreTarget =
    settings ??
    commerce ??
    integrity ??
    navItems.find(
      (item) => !items.some((existing) => existing.path === item.path),
    );

  if (moreTarget) {
    items.push({
      ...moreTarget,
      mobileLabel: "More",
      synthetic: "more",
    });
  }

  return items.slice(0, 5);
}

function isMobileItemActive(
  item: MobileNavItem,
  activeModule?: ModuleKey,
): boolean {
  if (!activeModule) return false;
  if (item.synthetic === "more") return false;
  return item.key === activeModule;
}

export default function DashboardMobileBottomNav({
  navItems,
  activeModule,
}: DashboardMobileBottomNavProps) {
  const visibleItems = buildMobileItems(navItems);

  if (!visibleItems.length) return null;

  return (
    <nav className="dash-mobile-bottom-nav" aria-label="Mobile dashboard nav">
      {visibleItems.map((item) => {
        const Icon =
          item.synthetic === "more"
            ? Ellipsis
            : item.synthetic === "dashboard"
              ? LayoutDashboard
              : getModuleIcon(item.key);

        const active = isMobileItemActive(item, activeModule);

        return (
          <Link
            key={`${item.key}-${item.mobileLabel}`}
            href={item.path}
            className={`dash-mobile-bottom-nav__item${
              active ? " is-active" : ""
            }`}
            aria-current={active ? "page" : undefined}
          >
            <Icon size={19} strokeWidth={2} aria-hidden="true" />
            <span>{item.mobileLabel}</span>
          </Link>
        );
      })}
    </nav>
  );
}
