import { Suspense } from "react";

import { Search } from "@/components/Search";
import { getMovieCards } from "@/data/movies";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MovieTable } from "@/features/admin/MovieTable";
import { MovieTableSkeleton } from "@/features/admin/MovieTableSkeleton";
import {
  AdminCard,
  EditMovies,
  AdminHeader,
  AdminCardSkeleton,
} from "@/features/server";
import { NewButton } from "@/features/admin/NewButton";

interface MoviePageProps {
  searchParams: Promise<{ search?: "string"; edit?: "string" }>;
}

export default function MoviePage({ searchParams }: MoviePageProps) {
  return (
    <>
      <AdminHeader
        title="movies"
        desc={`Library / Movies`}
        className="flex items-center gap-2"
      >
        <Suspense fallback={<></>}>
          <Search />
        </Suspense>
        <ThemeToggle />
        <Suspense fallback={<></>}>
          <NewButton slug="unsaved-draft" />
        </Suspense>
      </AdminHeader>
      <div className="hidden sm:block absolute top-19 right-0 w-full h-full border-t border-l border-foreground/10 rounded-tl-2xl -z-10" />
      <div className="relative z-10 flex flex-col gap-3 sm:gap-1 p-4 sm:p-3">
        <Suspense fallback={<AdminCardSkeleton />}>
          <AdminCard key="movieCards" fetchCards={getMovieCards} />
        </Suspense>
        <div className="w-full bg-background/25 backdrop-blur-2xl rounded-2xl border border-foreground/10">
          <Suspense fallback={<MovieTableSkeleton />}>
            <MovieTable searchParams={searchParams} />
          </Suspense>
        </div>
        <Suspense fallback={<></>}>
          <EditMovies searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
