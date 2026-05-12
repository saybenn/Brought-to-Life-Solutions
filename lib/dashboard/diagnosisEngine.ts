import type {
  CtaOutcomeRow,
  GoalProgression,
  LeadSourceRow,
} from "@/lib/dashboard/payload";

export type DiagnosisType =
  | "entry_to_next_step_friction"
  | "weak_cta_engagement"
  | "low_quality_traffic_source"
  | "mid_funnel_dropoff"
  | "late_stage_friction"
  | "healthy_or_insufficient_signal";

export type AutoDiagnosis = {
  diagnosisType: DiagnosisType;
  reason: string;
  recommendation: string;
};

type RunDiagnosisEngineArgs = {
  progression: GoalProgression;
  sourceConversion: LeadSourceRow[];
  ctaOutcomePerformance: CtaOutcomeRow[];
};

function safePct(value: number | null | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function hasMeaningfulVolume(value: number | null | undefined, min = 10): boolean {
  return typeof value === "number" && value >= min;
}

function getTopSource(rows: LeadSourceRow[]): LeadSourceRow | null {
  if (!rows.length) return null;

  return [...rows].sort((a, b) => {
    if (b.completions !== a.completions) return b.completions - a.completions;
    if (b.entries !== a.entries) return b.entries - a.entries;
    return b.conversionRatePct - a.conversionRatePct;
  })[0] ?? null;
}

function getTopCta(rows: CtaOutcomeRow[]): CtaOutcomeRow | null {
  if (!rows.length) return null;
  return [...rows].sort((a, b) => b.clicks - a.clicks)[0] ?? null;
}

export function runDiagnosisEngine({
  progression,
  sourceConversion,
  ctaOutcomePerformance,
}: RunDiagnosisEngineArgs): AutoDiagnosis {
  const steps = progression.steps ?? [];
  const entryCount = progression.entryCount ?? 0;
  const completionCount = progression.completionCount ?? 0;
  const overallConversion = safePct(progression.conversionRatePct);
  const biggestLeak = progression.biggestLeak ?? null;
  const firstStep = steps[0] ?? null;
  const lastStep = steps[steps.length - 1] ?? null;

  const topSource = getTopSource(sourceConversion);
  const topCta = getTopCta(ctaOutcomePerformance);
  const allCtasClicksOnly =
    ctaOutcomePerformance.length > 0 &&
    ctaOutcomePerformance.every((row) => row.conversionRatePct == null);

  if (!hasMeaningfulVolume(entryCount, 15)) {
    return {
      diagnosisType: "healthy_or_insufficient_signal",
      reason:
        "Traffic volume is still too low to produce a trustworthy funnel diagnosis for this range.",
      recommendation:
        "Increase qualified traffic volume first, then review the funnel again after more users move through the flow.",
    };
  }

  if (
    firstStep &&
    biggestLeak &&
    biggestLeak.fromStepKey === "entry" &&
    biggestLeak.dropoffPct >= 45
  ) {
    return {
      diagnosisType: "entry_to_next_step_friction",
      reason: `A large share of users enter the flow but fail to reach the first measurable step (${firstStep.name}).`,
      recommendation:
        "Tighten the transition from entry into the next step. Improve clarity, reduce hesitation, and make the next action more obvious and easier to take.",
    };
  }

  if (topCta && topCta.clicks < Math.max(5, Math.round(entryCount * 0.08))) {
    return {
      diagnosisType: "weak_cta_engagement",
      reason: `CTA interaction is weak relative to entry volume. The top CTA generated ${topCta.clicks} clicks from ${entryCount} entries.`,
      recommendation:
        "Improve CTA prominence, message specificity, and placement so users are more clearly guided into the next step.",
    };
  }

  if (
    topSource &&
    hasMeaningfulVolume(topSource.entries, 15) &&
    topSource.conversionRatePct <= 2
  ) {
    return {
      diagnosisType: "low_quality_traffic_source",
      reason: `The strongest visible source by volume (${topSource.sourceMedium}) is sending traffic that converts poorly.`,
      recommendation:
        "Review source quality before changing the funnel. Tighten message match, targeting quality, and alignment between acquisition intent and landing experience.",
    };
  }

  if (
    biggestLeak &&
    biggestLeak.fromStepKey !== "entry" &&
    lastStep &&
    biggestLeak.toStepKey !== lastStep.key &&
    biggestLeak.dropoffPct >= 35
  ) {
    return {
      diagnosisType: "mid_funnel_dropoff",
      reason: `The largest measurable loss is in the middle of the flow: ${biggestLeak.fromStepName} → ${biggestLeak.toStepName}.`,
      recommendation:
        "Inspect that transition specifically. Reduce friction, make the next step clearer, and check whether the sequence is asking users to do too much too soon.",
    };
  }

  if (
    lastStep &&
    hasMeaningfulVolume(lastStep.count, 10) &&
    completionCount < lastStep.count &&
    safePct(((lastStep.count - completionCount) / Math.max(lastStep.count, 1)) * 100) >= 25
  ) {
    return {
      diagnosisType: "late_stage_friction",
      reason: `Users are reaching the final measurable stage (${lastStep.name}) but too many are failing to complete the goal.`,
      recommendation:
        "Audit the final conversion step for friction, trust gaps, broken fields, confirmation issues, or unnecessary complexity.",
    };
  }

  if (overallConversion >= 8 || (allCtasClicksOnly && overallConversion >= 5)) {
    return {
      diagnosisType: "healthy_or_insufficient_signal",
      reason:
        "The funnel does not show one dominant failure pattern in this range.",
      recommendation:
        "Maintain the current flow, monitor changes by source and goal focus, and intervene only if a specific step weakens over the next range.",
    };
  }

  return {
    diagnosisType: "healthy_or_insufficient_signal",
    reason:
      "The available data does not point to one dominant failure mode with enough certainty.",
    recommendation:
      "Review funnel progression and source quality together before making changes. A human review is likely more valuable than a blind adjustment here.",
  };
}