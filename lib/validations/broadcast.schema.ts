import { z } from "zod";

import { FeaturedType, WeekDay } from "@prisma/client";

const blank = (v: unknown) => (v === "" ? undefined : v);

export const broadcastSchema = z
  .object({
    type: z.enum(FeaturedType),
    days: z.array(z.enum(WeekDay)).min(1, "Pick at least one day"),
    movieId: z.preprocess(blank, z.coerce.number().int().positive().optional()),
    serialId: z.preprocess(
      blank,
      z.coerce.number().int().positive().optional(),
    ),
    label: z.preprocess(blank, z.string().trim().max(60).optional()),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use HH:MM"),
    startDate: z.coerce.date(),
    endDate: z.preprocess(blank, z.coerce.date().optional()),
  })
  .refine((d) => (d.type === FeaturedType.Movie ? d.movieId : d.serialId), {
    path: ["movieId"],
    message: "Select a title",
  })
  .refine((d) => !d.endDate || d.endDate >= d.startDate, {
    path: ["endDate"],
    message: "End date must be after start date",
  })
  .superRefine((d, ctx) => {
    const isMovie = d.type === FeaturedType.Movie;
    if (!(isMovie ? d.movieId : d.serialId)) {
      ctx.addIssue({
        code: "custom",
        path: [isMovie ? "movieId" : "serialId"],
        message: "Select a title",
      });
    }
  });
