import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const MOVIE_CATEGORIES = [
  "Hollywood",
  "Independent",
  "Bollywood",
  "Korean",
  "Animation",
] as const;

const blankToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const optionalText = z.preprocess(
  blankToUndefined,
  z.string().trim().max(500).optional(),
);

const optionalMoney = z.preprocess(
  blankToUndefined,
  z.coerce.number().nonnegative("Must be 0 or more.").optional(),
);

const optionalBigInt = z.preprocess(
  (value) => {
    const v = blankToUndefined(value);
    return typeof v === "string" ? v.replace(/[,\s]/g, "") : v;
  },
  z
    .string()
    .regex(/^\d+$/, "Digits only.")
    .transform((v) => BigInt(v))
    .optional(),
);

const imageFile = (label: string) =>
  z
    .instanceof(File, { message: `${label} is required.` })
    .refine((f) => f.size > 0, `${label} is required.`)
    .refine((f) => f.size <= MAX_IMAGE_SIZE, "Max file size is 5 MB.")
    .refine(
      (f) => ACCEPTED_IMAGE_TYPES.includes(f.type),
      "Only JPG, PNG or WebP files are allowed.",
    );

export const movieSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(255),
  tagline: optionalText,
  description: z.string().trim().min(10, "Description is too short."),
  longDescription: z.preprocess(blankToUndefined, z.string().trim().optional()),

  year: z.coerce
    .number()
    .int("Must be a whole number.")
    .min(1888, "Invalid year.")
    .max(new Date().getFullYear() + 5, "Invalid year."),
  durationMinutes: z.coerce
    .number()
    .int("Must be a whole number.")
    .positive("Must be greater than 0."),
  rating: z.coerce.number().min(0).max(10, "Rating must be 0–10."),
  category: z.enum(MOVIE_CATEGORIES, { error: "Pick a category." }),

  genres: z.array(z.string()).min(1, "Pick at least one genre."),
  language: z.string().trim().min(1, "Language is required."),
  country: optionalText,
  studio: optionalText,

  recognition: optionalText,
  trailer: z.preprocess(blankToUndefined, z.url("Invalid URL.").optional()),
  budget: optionalBigInt,
  boxOffice: optionalBigInt,
  purchasePrice: optionalMoney,

  image: imageFile("Poster"),
  backdrop: imageFile("Backdrop"),
});

export type MovieInput = z.infer<typeof movieSchema>;
