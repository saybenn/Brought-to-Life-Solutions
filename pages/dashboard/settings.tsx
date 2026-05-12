import type { GetServerSideProps } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getSiteContextPages } from "@/lib/siteConfig/getSiteContextPages";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { siteId, role, config } = await getSiteContextPages(ctx);
    if (config.modules?.settings?.enabled !== true) return { notFound: true };
    return { props: { siteId, role, config, currentModule: "settings" } };
  } catch (e: any) {
    if (e?.message === "Unauthorized") {
      return { redirect: { destination: "/login", permanent: false } };
    }
    return { notFound: true };
  }
};

export default function SettingsPage({ siteId, role, config }: any) {
  return (
    <div className="dash-shell">
      <h1 style={{ margin: 0 }}>Settings</h1>
      <p className="dash-meta">
        Likely future use: site preferences, connected integrations, dashboard
        display toggles, user invites.
      </p>
    </div>
  );
}
