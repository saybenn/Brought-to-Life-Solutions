import { CalendarDays, ChevronDown, Target } from "lucide-react";

import type { GoalKey } from "@/lib/analytics/config.types";
import type { DashboardRangeKey } from "@/lib/dashboard/dateRanges";

type GoalToggleOption = {
  value: GoalKey;
  label: string;
};

type RangeOption = {
  value: DashboardRangeKey;
  label: string;
  shortLabel: string;
};

type DashboardControlBarProps = {
  range: DashboardRangeKey;
  onRangeChange: (value: DashboardRangeKey) => void;
  goalValue?: GoalKey;
  goalOptions: GoalToggleOption[];
  onGoalChange?: (value: GoalKey) => void;
};

const RANGE_OPTIONS: RangeOption[] = [
  { value: "7", label: "Last 7 Days", shortLabel: "7 Days" },
  { value: "30", label: "Last 30 Days", shortLabel: "30 Days" },
  { value: "90", label: "Last 90 Days", shortLabel: "90 Days" },
  {
    value: "current_quarter",
    label: "Current Quarter",
    shortLabel: "Current Qtr.",
  },
  {
    value: "previous_quarter",
    label: "Previous Quarter",
    shortLabel: "Previous Qtr.",
  },
];

function getRangeOption(range: DashboardRangeKey): RangeOption {
  return (
    RANGE_OPTIONS.find((option) => option.value === range) ?? RANGE_OPTIONS[2]
  );
}

function getGoalLabel(
  goalOptions: GoalToggleOption[],
  goalValue?: GoalKey,
): string {
  if (!goalValue) return "Goal Focus";

  return (
    goalOptions.find((option) => option.value === goalValue)?.label ??
    "Goal Focus"
  );
}

export default function DashboardControlBar({
  range,
  onRangeChange,
  goalValue,
  goalOptions,
  onGoalChange,
}: DashboardControlBarProps) {
  const selectedRange = getRangeOption(range);
  const selectedGoalLabel = getGoalLabel(goalOptions, goalValue);

  return (
    <div className="dash-control-bar" aria-label="Dashboard controls">
      <label className="dash-control">
        <CalendarDays size={16} strokeWidth={2} aria-hidden="true" />

        <span className="dash-control__label">{selectedRange.shortLabel}</span>

        <ChevronDown
          size={15}
          strokeWidth={2}
          aria-hidden="true"
          className="dash-control__chevron"
        />

        <select
          className="dash-control__select"
          value={range}
          aria-label="Select date range"
          onChange={(event) =>
            onRangeChange(event.target.value as DashboardRangeKey)
          }
        >
          {RANGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {goalOptions.length > 0 && goalValue && onGoalChange ? (
        <label className="dash-control dash-control--goal">
          <Target size={16} strokeWidth={2} aria-hidden="true" />

          <span className="dash-control__label">{selectedGoalLabel}</span>

          <ChevronDown
            size={15}
            strokeWidth={2}
            aria-hidden="true"
            className="dash-control__chevron"
          />

          <select
            className="dash-control__select"
            value={goalValue}
            aria-label="Select goal focus"
            onChange={(event) => onGoalChange(event.target.value as GoalKey)}
          >
            {goalOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ) : null}
    </div>
  );
}
