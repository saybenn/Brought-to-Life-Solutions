import type {
  GoalDefinition,
  GoalKey,
  FunnelStep,
  PathMatchMode,
} from "@/lib/analytics/config.types";
import type {
  EventCountByPageRow,
  GoalStepCount,
  GoalStepCountsResult,
} from "@/lib/ga4/types";
import type { QueryDateInput } from "@/lib/ga4/queryBase";
import { matchesPath } from "@/lib/ga4/queryBase";
import { queryEventCountsByDate } from "@/lib/ga4/queries/queryEventCountsByDate";
import { queryEventCountsByPage } from "@/lib/ga4/queries/queryEventCountsByPage";
import { queryCtaClicks } from "@/lib/ga4/queries/queryCtaClicks";

type QueryGoalStepCountsArgs = {
  propertyId: string;
  range: QueryDateInput;
  goalKey: GoalKey;
  goalDefinition: GoalDefinition;
  ctaEventName: string;
  pageViewEventName: string;
};

function sumCounts<T>(rows: T[], selector: (row: T) => number): number {
  return rows.reduce((total, row) => total + selector(row), 0);
}

function pageRowsTotalForMatch(
  rows: EventCountByPageRow[],
  eventName: string,
  pageMatch: string,
  pageMatchMode: PathMatchMode = "contains"
): number {
  return rows
    .filter(
      (row) =>
        row.eventName === eventName &&
        matchesPath(row.pageLocation, pageMatch, pageMatchMode)
    )
    .reduce((total, row) => total + row.count, 0);
}

function ctaRowsTotalForFilters(
  rows: Awaited<ReturnType<typeof queryCtaClicks>>,
  label?: string,
  location?: string
): number {
  return rows
    .filter((row) => {
      if (label && row.ctaLabel !== label) return false;
      if (location && row.ctaLocation !== location) return false;
      return true;
    })
    .reduce((total, row) => total + row.clicks, 0);
}

async function queryEntryCount({
  propertyId,
  range,
  goalDefinition,
  ctaEventName,
  pageViewEventName,
}: Omit<QueryGoalStepCountsArgs, "goalKey">): Promise<number> {
  const entry = goalDefinition.entry;

  if (entry.type === "event") {
    const rows = await queryEventCountsByDate({
      propertyId,
      range,
      eventNames: [entry.eventName],
    });

    return sumCounts(rows, (row) => row.count);
  }

  if (entry.type === "page") {
    const rows = await queryEventCountsByPage({
      propertyId,
      range,
      eventNames: [pageViewEventName],
    });

    return pageRowsTotalForMatch(
      rows,
      pageViewEventName,
      entry.match,
      entry.matchMode ?? "contains"
    );
  }

  if (entry.type === "cta") {
    const rows = await queryCtaClicks({
      propertyId,
      range,
      ctaEventName,
    });

    return ctaRowsTotalForFilters(rows, entry.label, entry.location);
  }

  return 0;
}

async function queryStepCount(args: {
  propertyId: string;
  range: QueryDateInput;
  ctaEventName: string;
  pageViewEventName: string;
  step: FunnelStep;
}): Promise<GoalStepCount> {
  const { propertyId, range, ctaEventName, pageViewEventName, step } = args;

  if (step.ctaLabel || step.ctaLocation) {
    const rows = await queryCtaClicks({
      propertyId,
      range,
      ctaEventName,
    });

    return {
      key: step.key,
      name: step.name,
      count: ctaRowsTotalForFilters(rows, step.ctaLabel, step.ctaLocation),
    };
  }

  if (step.pageMatch) {
    const eventName = step.eventName || pageViewEventName;

    const rows = await queryEventCountsByPage({
      propertyId,
      range,
      eventNames: [eventName],
    });

    return {
      key: step.key,
      name: step.name,
      count: pageRowsTotalForMatch(
        rows,
        eventName,
        step.pageMatch,
        step.pageMatchMode ?? "contains"
      ),
    };
  }

  if (step.eventName) {
    const rows = await queryEventCountsByDate({
      propertyId,
      range,
      eventNames: [step.eventName],
    });

    return {
      key: step.key,
      name: step.name,
      count: sumCounts(rows, (row) => row.count),
    };
  }

  return {
    key: step.key,
    name: step.name,
    count: 0,
  };
}

export async function queryGoalStepCounts({
  propertyId,
  range,
  goalKey,
  goalDefinition,
  ctaEventName,
  pageViewEventName,
}: QueryGoalStepCountsArgs): Promise<GoalStepCountsResult> {
  const [entryCount, completionRows, steps] = await Promise.all([
    queryEntryCount({
      propertyId,
      range,
      goalDefinition,
      ctaEventName,
      pageViewEventName,
    }),
    queryEventCountsByDate({
      propertyId,
      range,
      eventNames: [goalDefinition.successEvent],
    }),
    Promise.all(
      goalDefinition.funnelSteps.map((step) =>
        queryStepCount({
          propertyId,
          range,
          ctaEventName,
          pageViewEventName,
          step,
        })
      )
    ),
  ]);

  return {
    goalKey,
    goalName: goalDefinition.name,
    entryCount,
    completionCount: sumCounts(completionRows, (row) => row.count),
    steps,
  };
}