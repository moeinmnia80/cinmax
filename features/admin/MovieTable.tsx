import Image from "next/image";
import { connection } from "next/server";

import { EditButton } from "@/features/server";
import { getMovieWithQuery } from "@/data/movies";
// import { FeatureButton } from "@/features/client/FeatureButton";
import { Row, Table, TBody, TD, THead } from "@/components/ui/Table";
import { CATEGORY_STYLES, COL, MOVIE_COLUMNS } from "@/constants/movies";
import { cn } from "@/utils";

const CategoryBadge = ({
  category,
  featured,
}: {
  category: {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
  };
  featured: boolean;
}) => {
  const { badge, dot } = CATEGORY_STYLES[featured ? "featured" : "default"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${badge}`}
    >
      <span className={`size-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {category.name}
    </span>
  );
};

const CELL =
  "flex flex-col items-start gap-0.5 before:text-[10px] before:uppercase before:tracking-wider before:text-foreground/40 md:flex-row md:items-center md:gap-0 md:before:hidden";

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
    <Table className="animate-slide-up md:min-w-225">
      <THead className="max-md:hidden border-b border-foreground/10 text-xs tracking-wider uppercase text-foreground">
        <Row className="flex items-center h-12 bg-foreground/5 rounded-t-2xl overflow-hidden p-2">
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
                className="grid grid-cols-2 gap-3 border-b border-foreground/10 p-2 text-sm text-foreground/50 last:border-0 md:flex md:gap-0"
              >
                <TD className="col-span-2 flex items-center gap-3 md:col-span-1 md:flex-3">
                  <Image
                    src={movie.image}
                    alt={`${movie.title} poster`}
                    width={60}
                    height={75}
                    sizes="60px"
                    loading="eager"
                    className="aspect-2/3 w-19 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground capitalize">
                      {movie.title}
                    </p>
                    <p className="uppercase">{movie.language.name}</p>
                    <p className="flex items-center gap-1.5 text-xs">
                      {movie.studio && (
                        <>
                          <span className="max-w-28 truncate">
                            {movie.studio.name}
                          </span>
                          <span aria-hidden="true">·</span>
                        </>
                      )}
                      <span className="truncate uppercase">
                        {movie.country?.name ?? "—"}
                      </span>
                    </p>
                    {director && (
                      <p className="truncate font-mono text-xs">{director}</p>
                    )}
                  </div>
                </TD>

                <TD className={`${CELL} before:content-['Years'] md:flex-1`}>
                  {movie.year}
                </TD>

                <TD
                  className={cn(
                    CELL,
                    "col-span-2 md:col-span-1 flex-row flex-wrap content-center gap-1 md:gap-1 md:flex-2 items-center",
                  )}
                >
                  {movie.genres.map(({ genre }) => (
                    <span
                      key={genre.id}
                      className="bg-foreground/5 capitalize px-2 py-0.5 rounded-md"
                    >
                      {genre.name}
                    </span>
                  ))}
                </TD>

                <TD
                  className={`${CELL} text-foreground before:content-['Rating'] md:flex-1`}
                >
                  {movie.rating.toFixed(1)}
                </TD>

                <TD className={`flex items-center ${COL.category}`}>
                  {movie.categories.map(({ category }) => (
                    <CategoryBadge
                      key={category.id}
                      category={category}
                      featured={featured}
                    />
                  ))}
                </TD>

                <TD className="col-span-2 flex items-center justify-end border-t border-foreground/10 pt-3 md:col-span-1 md:flex-1 md:justify-center md:border-0 md:pt-0">
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
