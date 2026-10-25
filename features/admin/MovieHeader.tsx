import { use } from "react";

import { MovieType } from "@/data/movies";
import { Search } from "@/components/Search";
import { AdminHeader } from "@/features/server";

export const MovieHeader = ({ data }: { data: Promise<MovieType[]> }) => {
  const movies = use(data);
  return (
    <AdminHeader
      title="movies"
      desc={`Library / ${movies.length.toLocaleString()} titles`}
    >
      <Search />
    </AdminHeader>
  );
};
