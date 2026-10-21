import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const imageFileSchema = z
  .instanceof(File, { message: "Image is required" })
  .refine((f) => f.size > 0, "Image is required")
  .refine((f) => f.size <= MAX_FILE_SIZE, "Max file size is 5MB")
  .refine(
    (f) => ACCEPTED_IMAGE_TYPES.includes(f.type),
    "Use a JPG or PNG and Webp image",
  );

const emptyToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

const num = z.coerce.number({ error: "Must be a number" });
const optionalNum = z.preprocess(emptyToUndefined, num.optional());
const optionalText = z.preprocess(
  emptyToUndefined,
  z.string().trim().optional(),
);

export const serialSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(10, "Title must be at least 10 characters long"),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters long"),

    startYear: num.int().min(1900),
    endYear: optionalNum,
    seasons: num.int().min(1),
    episodes: num.int().min(1),
    rating: num
      .min(0, "Rating cannot be less than 0")
      .max(10, "Rating cannot exceed 10"),

    badge: optionalText,
    status: z.preprocess(
      (v) =>
        typeof v === "string"
          ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()
          : v,
      z.enum(["Ongoing", "Ended", "Cancelled"]),
    ),
    image: imageFileSchema,
    backdrop: z.preprocess(
      (v) => (v instanceof File && v.size === 0 ? undefined : v),
      imageFileSchema.optional(),
    ),

    language: z.string().trim().min(1, "Language is required"),
    country: optionalText,
    studio: optionalText,
    genres: z
      .array(
        z
          .string()
          .trim()
          .min(1, { message: "At least one genre is required." }),
      )
      .min(1, "Select at least one genre"),

    durationMinutes: optionalNum,
    purchasePrice: optionalNum,
  })
  .refine(
    (data) => data.endYear === undefined || data.endYear >= data.startYear,
    {
      message: "End year must be greater than or equal to start year",
      path: ["endYear"],
    },
  );
