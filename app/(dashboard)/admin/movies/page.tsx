import { getMovies } from "./actions";
import { MoviesTable } from "../../../../features/admin/MoviesTable";

interface MoviesPageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams;
  const search = params.search ?? "";
  const page = Number(params.page ?? "1") || 1;

  const { movies, total, pageCount } = await getMovies({ search, page });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-wide">
          Movies
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Manage the movie catalog — poster, details, genres.
        </p>
      </div>

      <MoviesTable
        movies={movies}
        total={total}
        page={page}
        pageCount={pageCount}
        search={search}
      />
    </div>
  );
}
