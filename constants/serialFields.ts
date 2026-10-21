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
