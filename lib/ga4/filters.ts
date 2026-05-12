// lib/ga4/filters.ts
import type { Ga4FilterExpression } from "./queryBase";

export function excludeTagAssistant(): Ga4FilterExpression {
  return {
    notExpression: {
      filter: {
        fieldName: "sessionSourceMedium",
        stringFilter: {
          matchType: "EXACT",
          value: "tagassistant.google.com / referral",
        },
      },
    },
  };
}