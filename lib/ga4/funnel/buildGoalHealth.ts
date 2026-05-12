import type { GoalProgression, GoalHealthRow } from "@/lib/dashboard/payload";

export function buildGoalHealth(goalProgressions: GoalProgression[]): GoalHealthRow[] {
  return goalProgressions.map((goal) => ({
    goalKey: goal.goalKey,
    goalName: goal.goalName,
    entryCount: goal.entryCount,
    completionCount: goal.completionCount,
    conversionRatePct: goal.conversionRatePct,
  }));
}