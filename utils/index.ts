import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { SerialStatus } from "@/types/types";
import { DashboardFeatured } from "@/data/dashboard";

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

export const formatYears = (
  start: number,
  end: number | null,
  status: SerialStatus,
) => {
  if (end) return end === start ? `${start}` : `${start} – ${end}`;
  return status === "Ongoing" ? `${start} – Present` : `${start}`;
};

export const getInitialsName = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export const getMedia = (item: DashboardFeatured) =>
  item.type === "Movie" ? item.movie : item.serial;

export const getKey = (item: DashboardFeatured) =>
  `${item?.type}-${getMedia(item)?.id}`;

export const getYear = (item: DashboardFeatured) =>
  item?.type === "Movie" ? item?.movie?.year : item?.serial?.startYear;
