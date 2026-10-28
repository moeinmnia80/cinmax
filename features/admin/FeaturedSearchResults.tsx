import Image from "next/image";

import { getKey, getMedia, getYear } from "@/utils";
import { DashboardFeatured } from "@/data/dashboard";

interface FeaturedSearchResultsProps {
  results: DashboardFeatured[];
  addedKeys: Set<string>;
  isLoading: boolean;
  disabled: boolean;
  error: string | null;
  onAdd: (item: DashboardFeatured) => void;
}

export function FeaturedSearchResults({
  results,
  addedKeys,
  isLoading,
  disabled,
  error,
  onAdd,
}: FeaturedSearchResultsProps) {
  return (
    <div
      className="mt-2 max-h-72 overflow-y-auto overscroll-contain rounded-xl border border-foreground/20 bg-background/95 shadow-lg backdrop-blur"
      aria-label="Search results"
    >
      {error && (
        <p role="alert" className="p-3 text-sm text-red-500">
          {error}
        </p>
      )}

      {isLoading && results.length === 0 ? (
        <p className="p-4 text-sm text-foreground/60">Searching…</p>
      ) : results.length === 0 ? (
        <p className="p-4 text-sm text-foreground/60">No results found</p>
      ) : (
        <ul className="divide-y divide-foreground/10">
          {results.map((item) => {
            const media = getMedia(item);
            const key = getKey(item);
            const added = addedKeys.has(key);

            return (
              <li key={key} className="flex items-center gap-3 p-2">
                <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-foreground/10">
                  {media?.image && (
                    <Image
                      src={media.image}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium capitalize">
                    {media?.title}
                    <span className="mx-2 text-foreground/40">|</span>
                    <span className="text-foreground/40">{getYear(item)}</span>
                  </p>
                  <p className="text-xs text-foreground/60">{item?.type}</p>
                </div>

                <button
                  type="button"
                  disabled={added || disabled}
                  onClick={() => onAdd(item)}
                  className="shrink-0 rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {added ? "Added" : "Add"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
