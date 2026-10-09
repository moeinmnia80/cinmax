import { z } from "zod";

// Mirrors the Prisma `SerialStatus` enum in schema.prisma.
export const SERIAL_STATUSES = ["Ongoing", "Ended", "Cancelled"] as const;

export const serialFormSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  slug: z.string().min(1, "اسلاگ الزامی است"),
  rating: z.coerce.number().min(0).max(10),
  startYear: z.coerce.number().int(),
  endYear: z.coerce.number().int(),
  seasons: z.coerce.number().int().min(1),
  episodes: z.coerce.number().int().min(0),
  durationMinutes: z.coerce.number().int().default(0),
  description: z.string(),
  image: z.string().url("آدرس تصویر معتبر نیست"),
  backdrop: z.string().optional(),
  status: z.enum(SERIAL_STATUSES),
  badge: z.string().optional(),
  languageId: z.coerce.number().int(),
  countryId: z.coerce.number().int().nullable().optional(),
  studioId: z.coerce.number().int().nullable().optional(),
  genreIds: z.array(z.number()),
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
