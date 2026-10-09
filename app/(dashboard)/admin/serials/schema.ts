import { z } from "zod";

// Mirrors the Prisma `SerialStatus` enum in schema.prisma.
export const SERIAL_STATUSES = ["Ongoing", "Ended", "Cancelled"] as const;

export const serialFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and dashes only"),
  rating: z.coerce.number().min(0, "Min 0").max(10, "Max 10"),
  startYear: z.coerce.number().int().min(1900).max(2100),
  // 0 = "no end year yet" (still ongoing) -> stored as `null` in actions.ts.
  endYear: z.coerce.number().int().nonnegative().default(0),
  seasons: z.coerce.number().int().min(1, "At least 1 season"),
  episodes: z.coerce.number().int().min(0),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Poster image is required"),
  durationMinutes: z.number().int().positive(),
  // Unlike Movie, `backdrop` is optional on Serial.
  backdrop: z.string().optional().or(z.literal("")),
  status: z.enum(SERIAL_STATUSES),
  badge: z.string().optional().or(z.literal("")),
  languageId: z.coerce.number().int().min(1, "Language is required"),
  countryId: z.coerce.number().int().optional().nullable(),
  studioId: z.coerce.number().int().optional().nullable(),
  genreIds: z.array(z.number()).min(1, "Pick at least one genre"),
});

export type SerialFormValues = z.infer<typeof serialFormSchema>;

export const serialFormDefaults: SerialFormValues = {
  title: "",
  slug: "",
  rating: 0,
  startYear: new Date().getFullYear(),
  endYear: 0,
  seasons: 1,
  episodes: 0,
  description: "",
  image: "",
  backdrop: "",
  durationMinutes: 0,
  status: "Ongoing",
  badge: "",
  languageId: 0,
  countryId: null,
  studioId: null,
  genreIds: [],
};
