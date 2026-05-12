import Link from "next/link";
import {
  BarChart3,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import type { ModuleKey } from "@/lib/analytics/config.types";
import type { DashboardLayoutNavItem } from "@/components/dashboard/DashboardAppLayout";

type DashboardSidebarProps = {
  navItems: DashboardLayoutNavItem[];
  activeModule?: ModuleKey;
  siteId?: string;
  role?: string;
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

function getDisplayRole(role?: string): string {
  if (!role) return "Workspace Admin";

  return role
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getInitial(role?: string): string {
  const label = getDisplayRole(role);
  return label.charAt(0).toUpperCase() || "B";
}

export default function DashboardSidebar({
  navItems,
  activeModule,
  siteId,
  role,
}: DashboardSidebarProps) {
  return (
    <aside className="dash-sidebar" aria-label="Dashboard sidebar">
      <div className="dash-sidebar__inner">
        <Link href="/dashboard/analytics" className="dash-sidebar__brand">
          <span className="dash-sidebar__logo" aria-hidden="true">
            BT
          </span>

          <span className="dash-sidebar__brand-copy">
            <span className="dash-sidebar__brand-title">BTLS</span>
            <span className="dash-sidebar__brand-subtitle">
              Funnel intelligence
            </span>
          </span>
        </Link>

        <nav className="dash-sidebar__nav" aria-label="Dashboard navigation">
          <div className="dash-sidebar__section-label">Workspace</div>

          {navItems.map((item) => {
            const Icon = getModuleIcon(item.key);
            const active = item.key === activeModule;

            return (
              <Link
                key={item.key}
                href={item.path}
                className={`dash-sidebar__nav-link${
                  active ? " is-active" : ""
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span className="dash-sidebar__nav-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={2} />
                </span>

                <span className="dash-sidebar__nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="dash-sidebar__spacer" aria-hidden="true" />

        <div className="dash-sidebar__support-card">
          <div className="dash-sidebar__support-topline">
            <div className="dash-sidebar__support-icon" aria-hidden="true">
              <LifeBuoy size={18} strokeWidth={2} />
            </div>

            <span className="dash-sidebar__support-pill">
              <Sparkles size={12} strokeWidth={2.25} aria-hidden="true" />
              Review
            </span>
          </div>

          <div>
            <div className="dash-sidebar__support-title">Need diagnosis?</div>
            <p className="dash-sidebar__support-copy">
              Use the current dashboard signals to request a focused BTLS
              review.
            </p>
          </div>
        </div>

        <div className="dash-sidebar__account">
          <div className="dash-sidebar__avatar" aria-hidden="true">
            {getInitial(role)}
          </div>

          <div className="dash-sidebar__account-copy">
            <div className="dash-sidebar__account-title">
              {getDisplayRole(role)}
            </div>
            <div className="dash-sidebar__account-meta">
              {siteId ? `Site ${siteId}` : "BTLS workspace"}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
