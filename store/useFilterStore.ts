import { create } from "zustand";

export type MediaType = "all" | "movie" | "series";
export type SortOption = "newest" | "popular" | "imdb_rating";

interface FilterState {
  searchQuery: string;
  mediaType: MediaType;
  selectedGenre: string[];
  releaseYear: number[];
  sortBy: SortOption;

  setSearchQuery: (query: string) => void;
  setMediaType: (type: MediaType) => void;
  setSelectedGenre: (genre: string[]) => void;
  setReleaseYear: (year: number[]) => void;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
}

const initialFilterValues = {
  searchQuery: "",
  mediaType: "all" as MediaType,
  selectedGenre: [],
  releaseYear: [],
  sortBy: "newest" as SortOption,
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialFilterValues,

  setSortBy: (sortBy) => set({ sortBy }),
  setMediaType: (mediaType) => set({ mediaType }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setReleaseYear: (releaseYear) => set({ releaseYear }),
  setSelectedGenre: (selectedGenre) => set({ selectedGenre }),

  resetFilters: () => set(initialFilterValues),
}));
