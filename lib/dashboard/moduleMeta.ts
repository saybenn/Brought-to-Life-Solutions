// /lib/dashboard/moduleMeta.ts
import type { ModuleKey } from "@/lib/analytics/config.types";

export const MODULE_META: Record<
  ModuleKey,
  { label: string; path: string }
> = {
  analytics: { label: "Analytics", path: "/dashboard/analytics" },
  customer_management: { label: "Customers", path: "/dashboard/customers" },
  content: { label: "Blog", path: "/dashboard/content" },
  commerce: { label: "Commerce", path: "/dashboard/commerce" },
  settings: { label: "Settings", path: "/dashboard/settings" },
  integrity: { label: "Integrity", path: "/dashboard/integrity" }, // optional future
};
