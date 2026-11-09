export const CATEGORY_OPTIONS = [
  { id: "Hollywood", label: "Hollywood" },
  {
    id: "Bollywood",
    label: "Bollywood",
  },
  { id: "Korean", label: "Korean" },
  { id: "Turkish", label: "Turkish" },
  { id: "Japanese", label: "Japanese" },
  { id: "Chinese", label: "Chinese" },
  { id: "Iranian", label: "Iranian" },
  { id: "European", label: "European" },
  { id: "Arabic", label: "Arabic" },
  { id: "Thai", label: "Thai" },
  { id: "Latin", label: "Latin" },
  { id: "Animation", label: "Animation" },
  { id: "Anime", label: "Anime" },
  { id: "Donghua", label: "Donghua" },
] as const;

export const COL = {
  title: "flex-3 shrink-0",
  year: "flex-1 shrink-0",
  genres: "flex-2 shrink-0",
  rating: "flex-1 shrink-0",
  category: "flex-1 shrink-0",
  actions: "flex-1 shrink-0",
} as const;

export const MOVIE_COLUMNS = [
  { label: "Title", className: `${COL.title}` },
  { label: "Year", className: COL.year },
  { label: "Genres", className: COL.genres },
  { label: "IMDb", className: COL.rating },
  { label: "Category", className: COL.category },
  { label: "Actions", className: `${COL.actions} justify-center` },
];

export const CATEGORY_STYLES = {
  featured: {
    badge: "bg-emerald-500/10 text-emerald-400",
    dot: "bg-emerald-400",
  },
  default: {
    badge: "bg-foreground/5 text-foreground/60",
    dot: "bg-foreground/40",
  },
} as const;
