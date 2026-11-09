"use client";

import { use, useState, useTransition, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  X,
  SlidersHorizontal,
  Check,
  Star,
  CalendarClock,
  Play,
} from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";

interface HeroSearchResultProps {
  searchParams: Promise<{
    search?: string;
    genre?: string;
    rating?: string;
    year?: string;
  }>;
}

const filterGenres = [
  "Action",
  "Sci-Fi",
  "Drama",
  "Thriller",
  "Horror",
  "Comedy",
  "Animation",
];
const filterRatings = ["Any", "7+", "8+", "9+"];
const filterYears = ["2026", "2025", "2024", "Older"];

export const HeroSearchResult = ({ searchParams }: HeroSearchResultProps) => {
  const resolvedParams = use(searchParams);
  const router = useRouter();
  const searchParamsInstance = useSearchParams();
  const [, startTransition] = useTransition();
  const searchRef = useRef<HTMLInputElement>(null);

  const initialSearch = resolvedParams.search || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const [activeGenres, setActiveGenres] = useState<string[]>(
    resolvedParams.genre ? resolvedParams.genre.split(",") : [],
  );
  const [activeRating, setActiveRating] = useState<string | null>(
    resolvedParams.rating || null,
  );
  const [activeYear, setActiveYear] = useState<string | null>(
    resolvedParams.year || null,
  );

  const activeFilterCount =
    activeGenres.length + (activeRating ? 1 : 0) + (activeYear ? 1 : 0);

  const hasSearchCriteria = Boolean(
    resolvedParams.search ||
    resolvedParams.genre ||
    resolvedParams.rating ||
    resolvedParams.year ||
    searchQuery.trim() ||
    activeFilterCount > 0,
  );

  useEffect(() => {
    if (hasSearchCriteria) {
      searchRef.current?.focus();
    }
  }, [hasSearchCriteria]);

  // بروزرسانی URL بدون Refresh صفحه
  //   useEffect(() => {
  //     const params = new URLSearchParams(searchParamsInstance.toString());

  //     if (searchQuery) params.set("search", searchQuery);
  //     else params.delete("search");

  //     if (activeGenres.length > 0) params.set("genre", activeGenres.join(","));
  //     else params.delete("genre");

  //     if (activeRating) params.set("rating", activeRating);
  //     else params.delete("rating");

  //     if (activeYear) params.set("year", activeYear);
  //     else params.delete("year");

  //     startTransition(() => {
  //       router.replace(`?${params.toString()}`, { scroll: false });
  //     });
  //   }, [
  //     searchQuery,
  //     activeGenres,
  //     activeRating,
  //     activeYear,
  //     router,
  //     searchParamsInstance,
  //   ]);

  const handleClose = () => {
    setSearchQuery("");
    setActiveGenres([]);
    setActiveRating(null);
    setActiveYear(null);
    startTransition(() => {
      router.replace("?", { scroll: false });
    });
  };

  const toggleGenre = (genre: string) => {
    setActiveGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  if (!hasSearchCriteria) return null;

  //   const searchResults = mockLibrary.filter((item) => {
  //     const matchesSearch = item.title
  //       .toLowerCase()
  //       .includes(searchQuery.toLowerCase());
  //     const matchesGenre =
  //       activeGenres.length === 0 ||
  //       item.genre.some((g) => activeGenres.includes(g));
  //     const matchesYear = !activeYear || item.year === activeYear;
  //     return matchesSearch && matchesGenre && matchesYear;
  //   });

  return (
    <>
      {/* 🔴 لایه تیره پشت کامپوننت برای فوکوس (خارج از فلو اصلی) */}
      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* 🔴 باکس اصلی که دقیقاً زیر Search در موقعیت absolute باز می‌شود */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50 w-[90vw] max-w-5xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101012]/95 shadow-[0_40px_120px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-in zoom-in-95 duration-200">
        {/* Header & Filter Inputs (دقیقاً طرح شما) */}
        <div className="border-b border-white/[0.07] p-3 sm:p-4">
          <div className="mt-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <SlidersHorizontal size={13} />
                </span>
                <div>
                  <p className="text-[11px] font-bold text-white/80">
                    Refine your results
                  </p>
                  <p className="mt-0.5 text-[9px] text-white/25">
                    Combine multiple filters to narrow the library
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {activeFilterCount > 0 && (
                  <span className="hidden text-[9px] font-bold uppercase tracking-wider text-primary sm:block">
                    {activeFilterCount} selected
                  </span>
                )}
                <button
                  onClick={() => {
                    setActiveGenres([]);
                    setActiveRating(null);
                    setActiveYear(null);
                  }}
                  disabled={activeFilterCount === 0}
                  className="rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white/35 transition-all enabled:hover:border-white/20 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="grid divide-y divide-white/[0.07] lg:grid-cols-[1.45fr_0.8fr_0.9fr] lg:divide-x lg:divide-y-0">
              {/* Genres */}
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
                    Genres
                  </p>
                  <span className="text-[9px] text-white/15">
                    Multiple choice
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {filterGenres.map((genre) => {
                    const selected = activeGenres.includes(genre);
                    return (
                      <button
                        key={genre}
                        onClick={() => toggleGenre(genre)}
                        aria-pressed={selected}
                        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-[10px] font-semibold transition-all ${
                          selected
                            ? "border-primary/50 bg-primary/15 text-white"
                            : "border-white/[0.07] bg-white/[0.025] text-white/35 hover:border-white/15 hover:bg-white/[0.06] hover:text-white/70"
                        }`}
                      >
                        <span
                          className={`flex h-3.5 w-3.5 items-center justify-center rounded-[4px] border transition-all ${
                            selected
                              ? "border-primary bg-primary"
                              : "border-white/15"
                          }`}
                        >
                          {selected && <Check size={9} strokeWidth={3} />}
                        </span>
                        {genre}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rating */}
              <div className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Star size={10} className="text-yellow-400" fill="#facc15" />
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
                    Minimum rating
                  </p>
                </div>
                <div className="grid grid-cols-4 overflow-hidden rounded-xl border border-white/[0.07]">
                  {filterRatings.map((rating) => {
                    const selected =
                      rating === "Any"
                        ? !activeRating
                        : activeRating === rating;
                    return (
                      <button
                        key={rating}
                        onClick={() =>
                          setActiveRating(
                            rating === "Any" || activeRating === rating
                              ? null
                              : rating,
                          )
                        }
                        aria-pressed={selected}
                        className={`border-r border-white/[0.07] py-2.5 text-[10px] font-bold transition-all last:border-r-0 ${
                          selected
                            ? "bg-yellow-400 text-black"
                            : "bg-white/[0.025] text-white/30 hover:bg-white/[0.07] hover:text-white"
                        }`}
                      >
                        {rating}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Release Year */}
              <div className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <CalendarClock size={11} className="text-primary" />
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
                    Release year
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {filterYears.map((year) => (
                    <button
                      key={year}
                      onClick={() =>
                        setActiveYear(activeYear === year ? null : year)
                      }
                      aria-pressed={activeYear === year}
                      className={`rounded-lg border px-2 py-2.5 text-[10px] font-bold transition-all ${
                        activeYear === year
                          ? "border-white bg-white text-black"
                          : "border-white/[0.07] bg-white/[0.025] text-white/30 hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.07] bg-white/[0.018] px-4 py-2.5">
              <div className="flex items-center gap-2 text-[9px] text-white/25">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Filters update results instantly
              </div>
              <span className="text-[9px] font-semibold text-white/35">
                {[].length} titles found
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Results Grid */}
        <div className="p-3 sm:p-4 max-h-[60vh] overflow-y-auto">
          <div className="mb-3 flex items-end justify-between px-1">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                {hasSearchCriteria ? "Matching titles" : "Trending searches"}
              </p>
              <p className="mt-1 text-[10px] text-white/20">
                {[].length} results in the Cinemax library
              </p>
            </div>
            <div className="hidden items-center gap-1.5 text-[9px] text-white/20 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Updated
              live
            </div>
          </div>

          {/* {searchResults.length > 0 ? (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => {
                    router.push(`/movie/${result.slug}`);
                    handleClose();
                  }}
                  className="group relative min-h-[190px] overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.035] text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20"
                >
                  <img
                    src={result.backdrop}
                    alt={result.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-500 group-hover:scale-105 group-hover:opacity-60"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
                  <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/35 px-2.5 py-1 text-[9px] font-bold text-white/60 backdrop-blur-md">
                    {index === 0 && !hasSearchCriteria ? "TRENDING · " : ""}
                    {result.year}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="mb-2 flex items-center gap-2 text-[10px] text-white/45">
                      <span className="flex items-center gap-1 font-bold text-yellow-400">
                        <Star size={9} fill="currentColor" /> {result.rating}
                      </span>
                      <span>·</span>
                      <span>{result.duration}</span>
                    </div>
                    <div className="flex items-end gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-xl font-black uppercase leading-none text-white group-hover:text-primary">
                          {result.title}
                        </h3>
                        <p className="mt-1.5 truncate text-[10px] uppercase tracking-wider text-white/30">
                          {result.genre.join(" · ")}
                        </p>
                      </div>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-110">
                        <Play size={12} fill="currentColor" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.05] text-white/20">
                <Search size={20} />
              </div>
              <p className="font-bold text-white/70">
                Nothing matched your search
              </p>
              <p className="mt-1 text-xs text-white/25">
                Try another title or remove a filter.
              </p>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};
