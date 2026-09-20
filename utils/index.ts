import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateActiveFilters = (
  sortBy: string,
  releaseYear: number[],
  selectedGenre: string[],
) => selectedGenre.length + (sortBy ? 1 : 0) + (releaseYear.length ? 1 : 0);
