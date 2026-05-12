import type { GoalProgression, ExecutiveSnapshot } from "@/lib/dashboard/payload";

function formatBiggestLeakLabel(goal?: GoalProgression | null): string | null {
  if (!goal?.biggestLeak) return null;

  return `${goal.biggestLeak.fromStepName} → ${goal.biggestLeak.toStepName} (${goal.biggestLeak.dropoffPct}% drop-off)`;
}

export function buildExecutiveSnapshot(
  primary: GoalProgression,
  secondary?: GoalProgression | null,
  tertiary?: GoalProgression | null
): ExecutiveSnapshot {
  return {
    funnelEntries: primary.entryCount,
    primaryCompletions: primary.completionCount,
    primaryConversionRatePct: primary.conversionRatePct,
    biggestLeakLabel: formatBiggestLeakLabel(primary),
    secondaryCompletions: secondary?.completionCount,
    tertiaryCompletions: tertiary?.completionCount,
  };
}