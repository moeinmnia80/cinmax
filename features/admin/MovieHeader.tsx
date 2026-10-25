import { Search } from "@/components/Search";
import { AdminHeader } from "@/features/server";
import { Movie } from "@/types/types";
import { use } from "react";

export const MovieHeader = ({ data }: { data: Promise<Movie[]> }) => {
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
