"use client";

import { movies } from "@/constants";
import { SearchItems } from "@/components";
import { useModalStore } from "@/store/useModalStore";
import { useFilterStore } from "@/store/useFilterStore";
import { SearchInput } from "./SearchInput";

export const SearchBox = () => {
  const searchQuery = useFilterStore((state) => state.searchQuery);
  const searchModal = useModalStore((state) => state.searchModalOpen);

  const searchResults =
    searchQuery.length > 1
      ? movies
          .filter((m) =>
            m.title.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .slice(0, 6)
      : [];

  return (
    <div
      className={`relative flex-1 max-w-xl transition-all duration-300 ${searchModal ? "opacity-100" : "opacity-0 pointer-events-none w-0"}`}
    >
      <SearchInput />
      {searchResults.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-background border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
          {searchResults.map((result) => (
            <SearchItems key={result.id} result={result} />
          ))}
        </div>
      )}
    </div>
  );
};
