"use client";

import { Search, X } from "lucide-react";

import { useFilterStore } from "@/store/useFilterStore";

export const SearchInput = () => {
  const searchQuery = useFilterStore((state) => state.searchQuery);
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);

  return (
    <>
      <Search
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
      />
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search movies…"
        className="w-full bg-white/8 border border-white/12 rounded-full pl-10 pr-10 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-primary/60 transition-all"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
        >
          <X size={13} />
        </button>
      )}
    </>
  );
};
