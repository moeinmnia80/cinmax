"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

import type { Movie } from "@/constants";
import { useModalStore } from "@/store/useModalStore";
import { useFilterStore } from "@/store/useFilterStore";

interface SearchItemsProps {
  result: Movie;
}

export const SearchItems = ({ result }: SearchItemsProps) => {
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
  const toggleSearchModal = useModalStore((state) => state.toggleSearchModal);

  return (
    <Link
      href={`/movie/${result.slug}`}
      onClick={() => {
        setSearchQuery("");
        toggleSearchModal(false);
      }}
      className="w-full h-25 flex items-center gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 transition-colors text-left"
    >
      <div className="relative aspect-3/4 h-full">
        <Image
          src={result.image}
          alt={result.title}
          fill
          className="size-full rounded-md object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-white text-sm font-bold uppercase truncate"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {result.title}
        </p>
        <p className="text-white/35 text-xs mt-0.5">
          {result.genre.join(" · ")}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <Star size={10} className="text-yellow-400" fill="#facc15" />
        <span className="text-white/60 text-xs">{result.rating}</span>
      </div>
    </Link>
  );
};
