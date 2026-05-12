import DashboardPanelShell from "@/components/dashboard/layout/DashboardPanelShell";
import PanelHeader from "@/components/ui/PanelHeader";
import DashboardKpiStrip from "@/components/dashboard/layout/DashboardKpiStrip";
import DashboardInsightBanner from "@/components/dashboard/layout/DashboardInsightBanner";
import { DASHBOARD_COPY } from "@/lib/dashboard/copy";
import type { ExecutiveSnapshotPanelProps } from "@/lib/dashboard/payload";

type ExecutiveSnapshotV2Props = ExecutiveSnapshotPanelProps & {
  notes?: string[];
};

export default function ExecutiveSnapshotV2({
  data,
  notes,
}: ExecutiveSnapshotV2Props) {
  return (
    <DashboardPanelShell surface="base">
      <PanelHeader
        title={DASHBOARD_COPY.executiveSnapshot.title}
        description={DASHBOARD_COPY.executiveSnapshot.description}
        tooltip={DASHBOARD_COPY.executiveSnapshot.tooltip}
      />

      <DashboardKpiStrip
        data={data}
        funnelProgression={[]}
        activeGoalKey={undefined}
      />

      {notes?.length ? (
        <div className="mt-6">
          <DashboardInsightBanner title="What to keep in mind" lines={notes} />
        </div>
      ) : null}
    </DashboardPanelShell>
  );
}
