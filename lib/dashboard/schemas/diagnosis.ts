import { z } from "zod";

export const DiagnosisRequestBodySchema = z.object({
  note: z
    .string()
    .trim()
    .max(1000, "Note must be 1000 characters or less.")
    .optional(),
});

export type DiagnosisRequestBodyInput = z.infer<
  typeof DiagnosisRequestBodySchema
>;