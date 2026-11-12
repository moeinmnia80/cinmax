import { Suspense } from "react";

import { MovieHeroSection } from "@/features/movies/MovieHeroSection";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function MovieDetailsPage({ params }: Props) {
  return (
    <Suspense fallback={<></>}>
      <MovieHeroSection params={params} />
    </Suspense>
  );
}
