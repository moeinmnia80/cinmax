"use client";

import { use, useOptimistic, useState, useTransition } from "react";

import { getKey, getMedia } from "@/utils";
import { Search } from "@/components/Search";
import { useSlider } from "@/hooks/useSlider";
import { FeaturedSlider } from "@/features/server";
import type { DashboardFeatured } from "@/data/dashboard";
import { useFeaturedSearch } from "@/hooks/useFeaturedSearch";
import { FeaturedSearchResults, Navigation } from "@/features/client";
import { addFeaturedItem, removeFeaturedItem } from "@/app/actions/feature";

interface FeaturedItemsListProps {
  data: Promise<DashboardFeatured[]>;
}

type OptimisticAction =
  | { kind: "add"; item: DashboardFeatured }
  | { kind: "remove"; key: string };

export function FeaturedItemList({ data }: FeaturedItemsListProps) {
  const serverItems = use(data);

  const [items, updateOptimisticItems] = useOptimistic(
    serverItems,
    (state, action: OptimisticAction) =>
      action.kind === "add"
        ? [...state, action.item]
        : state.filter((item) => getKey(item) !== action.key),
  );

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const { showResults, results, isFetching, clearSearch } = useFeaturedSearch();
  const { sliderRef, current, handleScroll, scrollTo, scrollOnNextRender } =
    useSlider(items.length);

  const addedKeys = new Set(items.map(getKey));

  const handleAdd = (media: DashboardFeatured) => {
    if (addedKeys.has(getKey(media))) return;

    setError(null);
    scrollOnNextRender(items.length);

    startTransition(async () => {
      updateOptimisticItems({
        kind: "add",
        item: { ...media, id: -1, order: items.length, active: true },
      });

      const result = await addFeaturedItem({
        type: media.type,
        id: getMedia(media).id,
      });

      if (result.success) clearSearch();
      else setError(result.message);
    });
  };

  const handleRemove = (item: DashboardFeatured) => {
    setError(null);

    startTransition(async () => {
      updateOptimisticItems({ kind: "remove", key: getKey(item) });

      const result = await removeFeaturedItem({
        type: item.type,
        id: getMedia(item).id,
      });

      if (!result.success) setError(result.message);
    });
  };

  return (
    <div className="relative col-span-1 row-span-2 overflow-hidden rounded-2xl border border-foreground/20 bg-foreground/5">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 py-5">
        <div className="pointer-events-auto">
          <Search variant="lighter" size="lg" />

          {showResults && (
            <FeaturedSearchResults
              results={results}
              addedKeys={addedKeys}
              isLoading={isFetching}
              disabled={isPending}
              error={error}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          )}
        </div>
      </div>

      <FeaturedSlider
        items={items}
        sliderRef={sliderRef}
        onScroll={handleScroll}
      />

      <Navigation length={items.length} current={current} onChange={scrollTo} />
    </div>
  );
}
