import { notFound } from "next/navigation";

import { getMovieById, getMovieFormOptions } from "../actions";
import { MovieForm } from "../_components/MovieForm";

interface EditMoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMoviePage({ params }: EditMoviePageProps) {
  const { id } = await params;
  const movieId = Number(id);

  if (!Number.isInteger(movieId)) notFound();

  const [movie, options] = await Promise.all([
    getMovieById(movieId),
    getMovieFormOptions(),
  ]);

  if (!movie) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-wide">
          Edit movie
        </h1>
        <p className="text-white/40 text-sm mt-1">{movie.title}</p>
      </div>

      <MovieForm
        options={options}
        movieId={movie.id}
        defaultValues={{
          title: movie.title,
          slug: movie.slug,
          tagline: movie.tagline ?? "",
          rating: movie.rating,
          votesCount: movie.votesCount,
          year: movie.year,
          durationMinutes: movie.durationMinutes,
          category: movie.category,
          description: movie.description,
          longDescription: movie.longDescription ?? "",
          image: movie.image,
          backdrop: movie.backdrop,
          trailer: movie.trailer ?? "",
          budget: movie.budget,
          boxOffice: movie.boxOffice,
          recognition: movie.recognition ?? "",
          languageId: movie.languageId,
          countryId: movie.countryId,
          studioId: movie.studioId,
          genreIds: movie.genreIds,
        }}
      />
    </div>
  );
}
