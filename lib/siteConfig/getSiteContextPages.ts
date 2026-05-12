import type { GetServerSidePropsContext } from "next";
import { supabaseSsr } from "@/lib/supabase/ssrPages";
import { SiteConfigSchema, type SiteConfig } from "@/lib/siteConfig/schema";
import type { ModuleKey } from "@/lib/analytics/config.types";

export type SiteContext = {
  siteId: string;
  role: string;
  config: SiteConfig;
};

export async function getSiteContextPages(
  ctx: GetServerSidePropsContext
): Promise<SiteContext> {
  const supabase = supabaseSsr(ctx);

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    throw new Error("Unauthorized");
  }

  const { data: membership, error: mErr } = await supabase
    .from("site_users")
    .select("site_id, role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (mErr) throw mErr;
  if (!membership?.site_id) throw new Error("No site assigned to this user");

  const { data, error } = await supabase
    .from("site_config")
    .select("config_json")
    .eq("site_id", membership.site_id)
    .single();

  if (error) throw error;

  const raw = (data?.config_json ?? {}) as unknown;
  const parsed = SiteConfigSchema.safeParse(raw);

  if (!parsed.success) {
    console.error("Invalid site_config.config_json (SSR)", {
      site_id: membership.site_id,
      issues: parsed.error.issues,
      raw,
    });

    throw new Error("Invalid site analytics configuration");
  }

  return {
    siteId: membership.site_id,
    role: membership.role ?? "viewer",
    config: parsed.data,
  };
}

export function isModuleEnabled(config: SiteConfig, moduleKey: ModuleKey): boolean {
  return config.modules?.[moduleKey]?.enabled === true;
}