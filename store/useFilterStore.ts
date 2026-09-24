import { create } from "zustand";

export type MediaType = "all" | "movie" | "series";
export type MinRating = "Any" | "9+" | "8+" | "7+" | null;
export type SortOption = "newest" | "popular" | "imdb_rating";

interface FilterState {
  searchQuery: string;
  mediaType: MediaType;
  selectedGenre: string[];
  releaseYear: string[];
  minRating: MinRating;
  sortBy: SortOption;

  setSearchQuery: (query: string) => void;
  setMediaType: (type: MediaType) => void;
  setSelectedGenre: (genreId: string) => void;
  setReleaseYear: (year: string | "Earlier") => void;
  setMinRating: (rating: MinRating) => void;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
}

const initialFilterValues = {
  searchQuery: "",
  mediaType: "all" as MediaType,
  selectedGenre: [] as string[],
  releaseYear: [] as string[],
  minRating: null as MinRating,
  sortBy: "newest" as SortOption,
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialFilterValues,

  setSortBy: (sortBy) => set({ sortBy }),
  setMediaType: (mediaType) => set({ mediaType }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setMinRating: (minRating) => set({ minRating }),
  setReleaseYear: (releaseYear) =>
    set((state) => {
      const exists = state.selectedGenre.includes(releaseYear);

      return {
        releaseYear: exists
          ? state.releaseYear.filter((id) => id !== releaseYear)
          : [...state.releaseYear, releaseYear],
      };
    }),
  setSelectedGenre: (genreId) =>
    set((state) => {
      const exists = state.selectedGenre.includes(genreId);
      return {
        selectedGenre: exists
          ? state.selectedGenre.filter((id) => id !== genreId)
          : [...state.selectedGenre, genreId],
      };
    }),

  resetFilters: () => set(initialFilterValues),
}));
