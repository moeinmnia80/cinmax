"use client";

import { Filter } from "lucide-react";

import { calculateActiveFilters } from "@/utils";
import { useModalStore } from "@/store/useModalStore";
import { useFilterStore } from "@/store/useFilterStore";
import { filterGenres, filterRatings, filterYears } from "@/constants";

export const FilterDrawer = () => {
  const sortBy = useFilterStore((state) => state.sortBy);
  const releaseYear = useFilterStore((state) => state.releaseYear);
  const filterOpen = useModalStore((state) => state.filterModalOpen);
  const selectedGenre = useFilterStore((state) => state.selectedGenre);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  const activeFilterCount = calculateActiveFilters(
    sortBy,
    releaseYear,
    selectedGenre,
  );

  return (
    <>
      {filterOpen && (
        <div className="relative z-20 mb-2">
          <div className=" backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl">
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
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-2.5">
                  Genre
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {filterGenres.map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        // toggleGenre(g)
                      }}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${selectedGenre.includes(g) ? "bg-primary border-primary text-white" : "border-white/12 text-white/45 hover:border-white/30 hover:text-white/70"}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-2.5">
                  Min Rating
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {filterRatings.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        // setActiveRating(activeRating === r ? null : r)
                      }}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${"activeRating" === r ? "bg-primary border-primary text-white" : "border-white/12 text-white/45 hover:border-white/30"}`}
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-2.5">
                  Release Year
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {filterYears.map((y) => (
                    <button
                      key={y}
                      onClick={() => {
                        // setActiveYear(activeYear === y ? null : y)
                      }}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${"activeYear" === y ? "bg-primary border-primary text-white" : "border-white/12 text-white/45 hover:border-white/30"}`}
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
