import { use } from "react";

interface Props {
  searchParams: Promise<{
    search?: string;
    genre?: string;
    rating?: string;
    year?: string;
  }>;
}

export const HeroSearchResult = ({ searchParams }: Props) => {
  const { search } = use(searchParams);
  return <>{search && search}</>;
};
