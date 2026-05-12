import { useMemo } from "react";

import StatCard from "@/components/ui/StatCard";
import type { GoalKey } from "@/lib/analytics/config.types";
import type {
  ExecutiveSnapshot,
  GoalProgression,
} from "@/lib/dashboard/payload";
import { formatInteger, formatPercent } from "@/lib/dashboard/formatters";

type DashboardKpiStripProps = {
  data: ExecutiveSnapshot;
  funnelProgression: GoalProgression[];
  activeGoalKey?: GoalKey;
};

function getSelectedGoal(
  funnelProgression: GoalProgression[],
  activeGoalKey?: GoalKey,
): GoalProgression | undefined {
  if (activeGoalKey) {
    return funnelProgression.find((goal) => goal.goalKey === activeGoalKey);
  }

  return funnelProgression[0];
}

function formatLeak(
  goal: GoalProgression | undefined,
  data: ExecutiveSnapshot,
) {
  if (goal?.biggestLeak) {
    return {
      value: goal.biggestLeak.toStepName,
      subtext: `${goal.biggestLeak.fromStepName} → ${
        goal.biggestLeak.toStepName
      } · ${formatPercent(goal.biggestLeak.dropoffPct)} drop-off`,
    };
  }

  return {
    value: data.biggestLeakLabel || "No major leak",
    subtext: "Largest drop-off in the current funnel.",
  };
}

export default function DashboardKpiStrip({
  data,
  funnelProgression,
  activeGoalKey,
}: DashboardKpiStripProps) {
  const selectedGoal = useMemo(
    () => getSelectedGoal(funnelProgression, activeGoalKey),
    [funnelProgression, activeGoalKey],
  );

  const funnelVisitors = selectedGoal?.entryCount ?? data.funnelEntries;
  const completions = selectedGoal?.completionCount ?? data.primaryCompletions;
  const conversionRate =
    selectedGoal?.conversionRatePct ?? data.primaryConversionRatePct;
  const leak = formatLeak(selectedGoal, data);

  return (
    <div className="dash-kpi-strip" aria-label="Dashboard KPI summary">
      <StatCard
        label="Active Goal"
        value={selectedGoal?.goalName ?? "Primary Goal"}
        subtext="Current dashboard focus."
        tone="accent"
        icon="target"
        className="dash-kpi-strip__primary"
      />

      <StatCard
        label="Funnel Visitors"
        value={formatInteger(funnelVisitors)}
        subtext="Visitors entering the selected funnel."
        icon="users"
      />

      <StatCard
        label="Completions"
        value={formatInteger(completions)}
        subtext="Goal completions in this range."
        icon="check"
      />

      <StatCard
        label="Conversion Rate"
        value={formatPercent(conversionRate)}
        subtext="Completion rate from funnel entry."
        icon="filter"
      />

      <StatCard
        label="Biggest Leak"
        value={leak.value}
        subtext={leak.subtext}
        tone="warning"
        icon="alert"
      />
    </div>
  );
}
