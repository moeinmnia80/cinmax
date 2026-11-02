import { Suspense } from "react";

import { getMovieCards, getMovies } from "@/data/movies";
import { MovieTable } from "@/features/admin/MovieTable";
import { MovieHeader } from "@/features/admin/MovieHeader";
import { AdminCard, EditMovies, AdminCardSkeleton } from "@/features/server";

interface MoviePageProps {
  searchParams: Promise<{ search?: "string"; edit?: "string" }>;
}

export default function MoviePage({ searchParams }: MoviePageProps) {
  const movies = getMovies();
  return (
    <>
      <Suspense fallback={<></>}>
        <MovieHeader data={movies} />
      </Suspense>
      <div className="hidden sm:block absolute top-19 right-0 w-full h-full border-t border-l border-foreground/10 rounded-tl-2xl -z-10" />
      <div className="flex gap-4 p-4 sm:p-3">
        <div className="flex-5 flex flex-col gap-1">
          <Suspense fallback={<AdminCardSkeleton />}>
            <AdminCard key="movieCards" fetchCards={getMovieCards} />
          </Suspense>
          <div className="w-full bg-background/25 backdrop-blur-2xl rounded-2xl border border-foreground/10">
            <Suspense fallback={<></>}>
              <MovieTable searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<></>}>
          <EditMovies searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
