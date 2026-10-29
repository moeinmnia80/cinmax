import "server-only";
import { Suspense } from "react";

import { FeaturedItemList } from "@/features/client";
import { getFeaturedItems, getGenreStats } from "@/data/dashboard";
import {
  GenreChart,
  FeaturedSummary,
  GenreChartSkeleton,
  FeaturedItemListSkeleton,
} from "@/features/server";

export const AdminBox = () => {
  const genreStats = getGenreStats();
  const featureItems = getFeaturedItems();
  return (
    <>
      <FeaturedSummary />
      <Suspense fallback={<GenreChartSkeleton />}>
        <GenreChart data={genreStats} size={230} />
      </Suspense>
      <Suspense fallback={<FeaturedItemListSkeleton />}>
        <FeaturedItemList data={featureItems} />
      </Suspense>
    </>
  );
};
