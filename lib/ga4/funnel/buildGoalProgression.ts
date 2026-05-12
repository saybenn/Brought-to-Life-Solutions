import type { GoalKey } from "@/lib/analytics/config.types";
import type { GoalStepCountsResult } from "@/lib/ga4/types";
import type {
  BiggestLeak,
  FunnelStepResult,
  GoalProgression,
} from "@/lib/dashboard/payload";

type BuildGoalProgressionArgs = GoalStepCountsResult & {
  goalKey?: GoalKey;
};

function roundPct(value: number): number {
  return Number(value.toFixed(2));
}

function safePct(numerator: number, denominator: number): number | null {
  if (denominator <= 0) return null;
  return roundPct((numerator / denominator) * 100);
}

function computeDropoffFromPreviousPct(
  previousCount: number,
  currentCount: number
): number | null {
  if (previousCount <= 0) return null;
  if (currentCount >= previousCount) return 0;

  return roundPct(((previousCount - currentCount) / previousCount) * 100);
}

function computeBiggestLeak(
  entryCount: number,
  steps: FunnelStepResult[]
): BiggestLeak | null {
  if (!steps.length) return null;

  let biggestLeak: BiggestLeak | null = null;

  const firstStep = steps[0];
  if (entryCount > 0 && firstStep && firstStep.count < entryCount) {
    const dropoffPct = roundPct(((entryCount - firstStep.count) / entryCount) * 100);

    biggestLeak = {
      fromStepKey: "entry",
      fromStepName: "Entry",
      toStepKey: firstStep.key,
      toStepName: firstStep.name,
      dropoffPct,
    };
  }

  for (let index = 1; index < steps.length; index += 1) {
    const previous = steps[index - 1];
    const current = steps[index];

    if (previous.count <= 0) continue;
    if (current.count >= previous.count) continue;

    const dropoffPct = roundPct(((previous.count - current.count) / previous.count) * 100);

    if (!biggestLeak || dropoffPct > biggestLeak.dropoffPct) {
      biggestLeak = {
        fromStepKey: previous.key,
        fromStepName: previous.name,
        toStepKey: current.key,
        toStepName: current.name,
        dropoffPct,
      };
    }
  }

  return biggestLeak;
}

export function buildGoalProgression(args: BuildGoalProgressionArgs): GoalProgression {
  const entryCount = args.entryCount ?? 0;
  const completionCount = args.completionCount ?? 0;

  const steps: FunnelStepResult[] = args.steps.map((step, index) => {
    const previousCount = index === 0 ? entryCount : args.steps[index - 1]?.count ?? 0;

    return {
      key: step.key,
      name: step.name,
      count: step.count,
      dropoffFromPreviousPct: computeDropoffFromPreviousPct(previousCount, step.count),
      conversionFromEntryPct: safePct(step.count, entryCount),
    };
  });

  const biggestLeak = computeBiggestLeak(entryCount, steps);

  return {
    goalKey: args.goalKey ?? "primary",
    goalName: args.goalName,
    entryCount,
    completionCount,
    conversionRatePct: safePct(completionCount, entryCount) ?? 0,
    steps,
    biggestLeak,
  };
}