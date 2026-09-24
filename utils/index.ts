import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateActiveFilters = (
  sortBy: string,
  releaseYear: string[],
  selectedGenre: string[],
  MinRating: "Any" | "9+" | "8+" | "7+" | null,
) =>
  selectedGenre.length
    ? 1
    : 0 +
      (sortBy === "newest" ? 0 : 1) +
      (releaseYear.length ? 1 : 0) +
      (MinRating ? 1 : 0);
