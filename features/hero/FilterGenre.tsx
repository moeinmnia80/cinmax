"use client";

import { filterGenres } from "@/constants";
import { useFilterStore } from "@/store/useFilterStore";

export const FilterGenre = () => {
  const selectedGenre = useFilterStore((state) => state.selectedGenre);
  const setSelectedGenre = useFilterStore((state) => state.setSelectedGenre);

  return (
    <div>
      <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-2.5">
        Genre
      </p>
      <div className="flex flex-wrap gap-1.5">
        {filterGenres.map((g) => {
          const isSelected = selectedGenre.includes(g);
          return (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                isSelected
                  ? "bg-primary border-primary text-white"
                  : "border-white/12 text-white/45 hover:border-white/30 hover:text-white/70"
              }`}
            >
              {g}
            </button>
          );
        })}
      </div>
    </div>
  );
};
