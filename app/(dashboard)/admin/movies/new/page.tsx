import { getMovieFormOptions } from "../actions";
import { MovieForm } from "../../../../../features/admin/MovieForm";

export default async function NewMoviePage() {
  const options = await getMovieFormOptions();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-wide">
          New movie
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Fill in the details below. You can add cast, downloads and gallery
          images later.
        </p>
      </div>

      <MovieForm options={options} />
    </div>
  );
}
