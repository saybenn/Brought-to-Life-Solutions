import type { EventMap } from "@/lib/analytics/config.types";
import type { GoalCompletionPoint } from "@/lib/dashboard/payload";
import type { QueryDateInput } from "@/lib/ga4/queryBase";
import { queryEventCountsByDate } from "@/lib/ga4/queries/queryEventCountsByDate";

type BuildGoalCompletionTrendArgs = {
  propertyId: string;
  range: QueryDateInput;
  eventMap: EventMap;
};

type CompletionBucket = {
  forms?: number;
  calls?: number;
  bookings?: number;
};

function sortByDateAsc<T extends { date: string }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => a.date.localeCompare(b.date));
}

export async function buildGoalCompletionTrend({
  propertyId,
  range,
  eventMap,
}: BuildGoalCompletionTrendArgs): Promise<GoalCompletionPoint[]> {
  const trackedEvents = [
    eventMap.formEventName,
    eventMap.callEventName,
    eventMap.bookingEventName,
  ].filter((name): name is string => typeof name === "string" && name.trim().length > 0);

  if (!trackedEvents.length) return [];

  const rows = await queryEventCountsByDate({
    propertyId,
    range,
    eventNames: trackedEvents,
  });

  const byDate = new Map<string, CompletionBucket>();

  for (const row of rows) {
    const bucket = byDate.get(row.date) ?? {};

    if (eventMap.formEventName && row.eventName === eventMap.formEventName) {
      bucket.forms = (bucket.forms ?? 0) + row.count;
    }

    if (eventMap.callEventName && row.eventName === eventMap.callEventName) {
      bucket.calls = (bucket.calls ?? 0) + row.count;
    }

    if (
      eventMap.bookingEventName &&
      row.eventName === eventMap.bookingEventName
    ) {
      bucket.bookings = (bucket.bookings ?? 0) + row.count;
    }

    byDate.set(row.date, bucket);
  }

  return sortByDateAsc(
    Array.from(byDate.entries()).map(([date, bucket]) => ({
      date,
      forms: bucket.forms,
      calls: bucket.calls,
      bookings: bucket.bookings,
    }))
  );
}