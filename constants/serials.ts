import { SerialStatus } from "@/types/types";

export const COLUMNS = [
  { label: "Title", className: "flex-2 ps-3" },
  { label: "Years", className: "flex-1" },
  { label: "Seasons", className: "flex-1" },
  { label: "Episodes", className: "flex-1" },
  { label: "Genres", className: "flex-2" },
  { label: "Rating", className: "flex-1" },
  { label: "Status", className: "flex-1" },
  { label: "Actions", className: "flex-1" },
] as const;

export const STATUS_STYLES: Record<
  SerialStatus,
  { badge: string; dot: string }
> = {
  Ongoing: { badge: "bg-green-400/15 text-green-400", dot: "bg-green-400" },
  Ended: {
    badge: "bg-foreground/5 text-foreground/60",
    dot: "bg-foreground/60",
  },
  Cancelled: {
    badge: "bg-destructive/15 text-destructive",
    dot: "bg-destructive",
  },
};

export const STATUS_OPTIONS = [
  { id: "ongoing", label: "ongoing" },
  { id: "ended", label: "ended" },
  { id: "cancelled", label: "cancelled" },
] as const;

export const serialFields = [
  "title",
  "description",
  "startYear",
  "endYear",
  "seasons",
  "episodes",
  "rating",
  "badge",
  "status",
  "backdrop",
  "image",
  "language",
  "country",
  "studio",
  "purchasePrice",
  "genres",
] as const;

export type SerialField = (typeof serialFields)[number];
