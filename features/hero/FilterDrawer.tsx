"use client";

import { Filter } from "lucide-react";

import { calculateActiveFilters } from "@/utils";
import { useModalStore } from "@/store/useModalStore";
import { useFilterStore } from "@/store/useFilterStore";
import { FilterGenre, FilterRating, FilterYear } from "@/features/client";

export const FilterDrawer = () => {
  const sortBy = useFilterStore((state) => state.sortBy);
  const minRating = useFilterStore((state) => state.minRating);
  const releaseYear = useFilterStore((state) => state.releaseYear);
  const selectedGenre = useFilterStore((state) => state.selectedGenre);

  const filterOpen = useModalStore((state) => state.filterModalOpen);

  const resetFilters = useFilterStore((state) => state.resetFilters);

  const activeFilterCount = calculateActiveFilters(
    sortBy,
    releaseYear,
    selectedGenre,
    minRating,
  );

  return (
    <>
      {filterOpen && (
        <div className="relative z-20 mb-2 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-primary" />
              <span className="text-white font-bold text-sm uppercase tracking-wider">
                Filter Results
              </span>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={() => resetFilters()}
                className="text-primary text-sm hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FilterGenre />
            <FilterRating />
            <FilterYear />
          </div>
        </div>
      )}
    </>
  );
};
