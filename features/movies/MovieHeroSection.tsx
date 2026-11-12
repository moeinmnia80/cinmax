import { Suspense, use } from "react";

import { getMovie } from "@/data/movies";
import { MovieHero } from "./MovieHero";

interface Props {
  params: Promise<{ slug: string }>;
}

export function MovieHeroSection({ params }: Props) {
  const { slug } = use(params);
  const movie = getMovie(slug);

  return (
    <Suspense fallback={<></>}>
      <MovieHero data={movie} />
    </Suspense>
  );
}
