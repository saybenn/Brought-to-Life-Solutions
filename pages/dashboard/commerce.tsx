import type { GetServerSideProps } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getSiteContextPages } from "@/lib/siteConfig/getSiteContextPages";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { siteId, role, config } = await getSiteContextPages(ctx);
    if (config.modules?.commerce?.enabled !== true) return { notFound: true };
    return { props: { siteId, role, config, currentModule: "commerce" } };
  } catch (e: any) {
    if (e?.message === "Unauthorized") {
      return { redirect: { destination: "/login", permanent: false } };
    }
    return { notFound: true };
  }
};

export default function CommercePage({ siteId, role, config }: any) {
  return (
    <DashboardShell
      siteId={siteId}
      role={role}
      config={config}
      currentModule="commerce"
    >
      <h1 style={{ margin: 0 }}>Commerce</h1>
      <p className="dash-meta">Stub.</p>
    </DashboardShell>
  );
}
