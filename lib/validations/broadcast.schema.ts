import { z } from "zod";
import { WeekDay } from "@prisma/client";

import { FeaturedType } from "@/types/types";

const blank = (value: unknown) => (value === "" ? undefined : value);

export const broadcastSchema = z
  .object({
    type: z.enum(FeaturedType),
    movieId: z.preprocess(blank, z.coerce.number().int().positive().optional()),
    serialId: z.preprocess(
      blank,
      z.coerce.number().int().positive().optional(),
    ),
    label: z.preprocess(blank, z.string().trim().max(60).optional()),
    days: z.array(z.enum(WeekDay)).min(1, "Pick at least one day"),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use HH:MM"),
    startDate: z.coerce.date(),
    endDate: z.preprocess(blank, z.coerce.date().optional()),
  })
  .superRefine((data, ctx) => {
    const isMovie = data.type === FeaturedType.Movie;
    if (!(isMovie ? data.movieId : data.serialId)) {
      ctx.addIssue({
        code: "custom",
        path: [isMovie ? "movieId" : "serialId"],
        message: "Select a title",
      });
    }
    if (data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "End date must be after start date",
      });
    }
  });
