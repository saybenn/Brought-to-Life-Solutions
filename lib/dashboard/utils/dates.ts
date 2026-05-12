import {
  endOfQuarter,
  format,
  startOfDay,
  startOfQuarter,
  subDays,
  subQuarters,
} from "date-fns";
import type { IsoDateString } from "@/lib/ga4/types";

export function toIsoDateString(date: Date): IsoDateString {
  return format(date, "yyyy-MM-dd") as IsoDateString;
}

export function getTodayStart(): Date {
  return startOfDay(new Date());
}

export function getRollingRange(days: number): {
  startDate: IsoDateString;
  endDate: IsoDateString;
} {
  const today = getTodayStart();
  const start = subDays(today, days - 1);

  return {
    startDate: toIsoDateString(start),
    endDate: toIsoDateString(today),
  };
}

export function getCurrentQuarterRange(): {
  startDate: IsoDateString;
  endDate: IsoDateString;
  quarterLabel: string;
} {
  const today = getTodayStart();
  const quarterStart = startOfQuarter(today);

  const quarterNumber = Math.floor(today.getMonth() / 3) + 1;
  const year = today.getFullYear();

  return {
    startDate: toIsoDateString(quarterStart),
    endDate: toIsoDateString(today),
    quarterLabel: `Q${quarterNumber} ${year}`,
  };
}

export function getPreviousQuarterRange(): {
  startDate: IsoDateString;
  endDate: IsoDateString;
  quarterLabel: string;
} {
  const today = getTodayStart();
  const previousQuarterDate = subQuarters(today, 1);
  const quarterStart = startOfQuarter(previousQuarterDate);
  const quarterEnd = endOfQuarter(previousQuarterDate);

  const quarterNumber = Math.floor(previousQuarterDate.getMonth() / 3) + 1;
  const year = previousQuarterDate.getFullYear();

  return {
    startDate: toIsoDateString(quarterStart),
    endDate: toIsoDateString(quarterEnd),
    quarterLabel: `Q${quarterNumber} ${year}`,
  };
}