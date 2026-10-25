import Image from "next/image";
import { connection } from "next/server";

import { MovieCategory } from "@/types/types";
import { EditButton } from "@/features/server";
import { getMovieWithQuery } from "@/data/movies";
// import { FeatureButton } from "@/features/client/FeatureButton";
import { Row, Table, TBody, TD, THead } from "@/components/ui/Table";
import { CATEGORY_STYLES, COL, MOVIE_COLUMNS } from "@/constants/movies";

const CategoryBadge = ({
  category,
  featured,
}: {
  category: MovieCategory;
  featured: boolean;
}) => {
  const { badge, dot } = CATEGORY_STYLES[featured ? "featured" : "default"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${badge}`}
    >
      <span className={`size-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {category}
    </span>
  );
};

export const MovieTable = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) => {
  await connection();
  const { search } = await searchParams;
  const query = search?.trim() ?? "";
  const movies = await getMovieWithQuery(query);

  return (
    <Table>
      <THead className="border-b border-foreground/10 font-mono text-xs tracking-widest uppercase text-foreground/60">
        <Row className="flex py-3">
          {MOVIE_COLUMNS.map(({ label, className }) => (
            <TD key={label} className={`flex items-center ${className}`}>
              {label}
            </TD>
          ))}
        </Row>
      </THead>

      <TBody>
        {movies.length ? (
          movies.map((movie) => {
            const featured = movie.featuredItems.length > 0;
            const director = movie.crew[0]?.person.name;

            return (
              <Row
                key={movie.id}
                className="flex border-b border-foreground/10 py-3 text-sm text-foreground/50 transition-colors last:border-0 hover:bg-foreground/2"
              >
                <TD className={`flex items-center gap-4 ps-3 ${COL.title}`}>
                  {movie.image ? (
                    <Image
                      src={movie.image}
                      alt={`${movie.title} poster`}
                      width={56}
                      height={84}
                      sizes="56px"
                      className="aspect-2/3 w-14 shrink-0 rounded-xs object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid aspect-2/3 w-14 shrink-0 place-items-center rounded-xs bg-foreground/5 font-mono text-sm text-foreground/40 line-clamp-2"
                    >
                      {movie.title}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-base font-medium text-foreground line-clamp-1 max-w-40">
                      {movie.title}
                    </p>
                    {director && (
                      <p className="truncate font-mono text-xs">{director}</p>
                    )}
                  </div>
                </TD>

                <TD className={`flex items-center font-mono ${COL.year}`}>
                  {movie.year}
                </TD>

                <TD
                  className={`flex flex-wrap content-center items-center gap-1.5 ${COL.genres}`}
                >
                  {movie.genres.map(({ genre }) => (
                    <span
                      key={genre.id}
                      className="rounded-md bg-foreground/5 px-2 py-1 text-xs text-foreground/70"
                    >
                      {genre.name}
                    </span>
                  ))}
                </TD>

                <TD
                  className={`flex items-center font-mono font-semibold text-foreground ${COL.rating}`}
                >
                  {movie.rating.toFixed(1)}
                </TD>

                <TD className={`flex items-center ${COL.category}`}>
                  <CategoryBadge
                    category={movie.category}
                    featured={featured}
                  />
                </TD>

                <TD
                  className={`flex items-center justify-end gap-5 pe-3 ${COL.actions}`}
                >
                  {/* <FeatureButton movieId={movie.id} featured={featured} /> */}
                  <EditButton slug={movie.slug} />
                </TD>
              </Row>
            );
          })
        ) : (
          <Row className="flex justify-center py-10 text-sm text-foreground/40">
            <TD className="w-full text-center">
              {query ? `No movies match “${query}”` : "No movies yet"}
            </TD>
          </Row>
        )}
      </TBody>
    </Table>
  );
};
