"use client";

import { filterYears } from "@/constants";
import { useFilterStore } from "@/store/useFilterStore";

export const FilterYear = () => {
  const releaseYear = useFilterStore((state) => state.releaseYear);
  const setReleaseYear = useFilterStore((state) => state.setReleaseYear);

  return (
    <div>
      <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-2.5">
        Release Year
      </p>
      <div className="flex flex-wrap gap-1.5">
        {filterYears.map((y) => {
          const isSelected = releaseYear.includes(y);
          return (
            <button
              key={y}
              onClick={() => setReleaseYear(y)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                isSelected
                  ? "bg-primary border-primary text-white"
                  : "border-white/12 text-white/45 hover:border-white/30 hover:text-white/70"
              }`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {y}
            </button>
          );
        })}
      </div>
    </div>
  );
};
