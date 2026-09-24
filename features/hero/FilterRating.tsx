"use client";

import { filterRatings } from "@/constants";
import { MinRating, useFilterStore } from "@/store/useFilterStore";

export const FilterRating = () => {
  const minRating = useFilterStore((state) => state.minRating);
  const setMinRating = useFilterStore((state) => state.setMinRating);

  return (
    <div>
      <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-2.5">
        Min Rating
      </p>
      <div className="flex flex-wrap gap-1.5">
        {filterRatings.map((r) => {
          const isActive = minRating === r;
          return (
            <button
              key={r}
              onClick={() => setMinRating(r as MinRating)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                isActive
                  ? "bg-primary border-primary text-white"
                  : "border-white/12 text-white/45 hover:border-white/30 hover:text-white/70"
              }`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {r}
            </button>
          );
        })}
      </div>
    </div>
  );
};
