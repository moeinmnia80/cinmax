import "server-only";
import { Suspense } from "react";

import { GenreChart } from "./GenreChart";
import { FeaturedSummary } from "@/features/server";
import { FeaturedItemList } from "./FeaturedItemList";
import { getFeaturedItems, getGenreStats } from "@/data/dashboard";

export const AdminBox = () => {
  const genreStats = getGenreStats();
  const featureItems = getFeaturedItems();
  return (
    <>
      <Suspense fallback={<>Loading</>}>
        <FeaturedSummary />
      </Suspense>
      <Suspense fallback={<>Loading</>}>
        <GenreChart data={genreStats} size={230} />
      </Suspense>
      <Suspense fallback={<></>}>
        <FeaturedItemList data={featureItems} />
      </Suspense>
    </>
  );
};
