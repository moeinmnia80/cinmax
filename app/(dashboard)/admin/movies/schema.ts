import { z } from "zod";

// Mirrors the Prisma `MovieCategory` enum in schema.prisma.
// If you add/rename a category in the schema, update this list too.
export const MOVIE_CATEGORIES = [
  "Hollywood",
  "Independent",
  "Bollywood",
  "Korean",
  "Animation",
] as const;

export const movieFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and dashes only"),
  tagline: z.string().optional().or(z.literal("")),
  rating: z.coerce.number().min(0, "Min 0").max(10, "Max 10"),
  // Prisma has no `duration` string field — just the numeric minutes.
  votesCount: z.coerce.number().int().min(0).default(0),
  year: z.coerce.number().int().min(1900).max(2100),
  durationMinutes: z.coerce.number().int().min(1, "Required, in minutes"),
  category: z.enum(MOVIE_CATEGORIES),
  description: z.string().min(1, "Short description is required"),
  longDescription: z.string().optional().or(z.literal("")),
  image: z.string().min(1, "Poster image is required"),
  backdrop: z.string().min(1, "Backdrop image is required"),
  trailer: z.string().optional().or(z.literal("")),
  // Prisma stores these as BigInt. Kept as plain numbers here (whole
  // dollars) and converted to BigInt in actions.ts right before the
  // Prisma call — 0 is treated as "not entered" -> stored as null.
  budget: z.coerce.number().int().nonnegative().default(0),
  boxOffice: z.coerce.number().int().nonnegative().default(0),
  recognition: z.string().optional().or(z.literal("")),
  languageId: z.coerce.number().int().min(1, "Language is required"),
  countryId: z.coerce.number().int().optional().nullable(),
  studioId: z.coerce.number().int().optional().nullable(),
  genreIds: z.array(z.number()).min(1, "Pick at least one genre"),
});

export type MovieFormValues = z.infer<typeof movieFormSchema>;
export type MovieFormInput = z.input<typeof movieFormSchema>;

export const movieFormDefaults: MovieFormValues = {
  title: "",
  slug: "",
  tagline: "",
  rating: 0,
  votesCount: 0,
  year: new Date().getFullYear(),
  durationMinutes: 0,
  category: "Hollywood",
  description: "",
  longDescription: "",
  image: "",
  backdrop: "",
  trailer: "",
  budget: 0,
  boxOffice: 0,
  recognition: "",
  languageId: 0,
  countryId: null,
  studioId: null,
  genreIds: [],
};
