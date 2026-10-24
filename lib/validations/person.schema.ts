import { z } from "zod";

import { imageFileSchema } from "@/lib/validations/serial.schema";

const blankToNull = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? null : v;

const text = (max: number) =>
  z.preprocess(blankToNull, z.string().trim().max(max).nullable());

const link = z.preprocess(blankToNull, z.url("Enter a valid URL").nullable());

export const personSchema = z.object({
  id: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.coerce.number().int().positive().optional(),
  ),
  name: z.string().trim().min(2, "Name is required").max(120),
  role: z.enum(["Actor", "Director", "Writer", "Producer"], {
    error: "Choose a role",
  }),
  bio: text(5000),
  birthDate: z.preprocess(
    blankToNull,
    z.coerce
      .date()
      .refine((d) => d <= new Date(), "Birth date can't be in the future")
      .nullable(),
  ),
  birthPlace: text(120),
  height: text(30),
  activeYears: text(30),
  socialInstagram: link,
  socialTwitter: link,
  socialImdb: link,
  image: imageFileSchema,
});
