import { useCallback } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { getData } from "@/lib/axios";
import { DashboardFeatured } from "@/data/dashboard";

const MIN_QUERY_LENGTH = 2;

interface SearchResponse {
  success: boolean;
  results: DashboardFeatured[];
}

export function useFeaturedSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim() ?? "";

  const { data, isFetching } = useQuery<SearchResponse>({
    queryKey: ["all-content", search],
    queryFn: () => getData("/api", { params: { search } }),
    enabled: search.length >= MIN_QUERY_LENGTH,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });

  const clearSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return {
    showResults: search.length >= MIN_QUERY_LENGTH,
    results: data?.results ?? [],
    isFetching,
    clearSearch,
  };
}
