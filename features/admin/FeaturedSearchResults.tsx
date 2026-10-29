"use client";

import Image from "next/image";
import { AlertCircle, Check, Plus, SearchX, Trash2 } from "lucide-react";

import { getKey, getMedia, getYear } from "@/utils";
import { DashboardFeatured } from "@/data/dashboard";

interface FeaturedSearchResultsProps {
  results: DashboardFeatured[];
  addedKeys: Set<string>;
  isLoading: boolean;
  disabled: boolean;
  error: string | null;
  onAdd: (item: DashboardFeatured) => void;
  onRemove: (item: DashboardFeatured) => void;
}

const RowSkeleton = () => (
  <li className="flex items-center gap-3 p-2" aria-hidden="true">
    <div className="aspect-2/3 w-11 animate-pulse rounded-lg bg-foreground/10" />
    <div className="flex-1 space-y-2">
      <div className="h-3.5 w-2/3 animate-pulse rounded bg-foreground/10" />
      <div className="h-3 w-1/3 animate-pulse rounded bg-foreground/10" />
    </div>
    <div className="h-8 w-16 animate-pulse rounded-full bg-foreground/10" />
  </li>
);

export function FeaturedSearchResults({
  results,
  addedKeys,
  isLoading,
  disabled,
  error,
  onAdd,
  onRemove,
}: FeaturedSearchResultsProps) {
  const isEmpty = results.length === 0;

  return (
    <div
      aria-label="Search results"
      aria-busy={isLoading}
      className="mt-2 overflow-hidden rounded-2xl border border-foreground/10 bg-background/80 shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 border-b border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-400"
        >
          <AlertCircle
            size={16}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />
          <p>{error}</p>
        </div>
      )}

      <div className="max-h-80 overflow-y-auto overscroll-contain p-1.5">
        {isLoading && isEmpty ? (
          <ul>
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
          </ul>
        ) : isEmpty ? (
          <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
            <SearchX
              size={28}
              className="text-foreground/30"
              aria-hidden="true"
            />
            <p className="text-sm font-medium">No results found</p>
            <p className="text-xs text-foreground/50">
              Try a different title or check the spelling.
            </p>
          </div>
        ) : (
          <ul className="space-y-0.5">
            {results.map((item) => {
              const media = getMedia(item);
              const key = getKey(item);
              const added = addedKeys.has(key);
              const title = media?.title ?? "item";

              return (
                <li
                  key={key}
                  className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-foreground/5"
                >
                  <div className="relative aspect-2/3 w-11 shrink-0 overflow-hidden rounded-lg bg-foreground/10 ring-1 ring-foreground/10">
                    {media?.image && (
                      <Image
                        src={media.image}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium capitalize">
                      {title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-foreground/50">
                      <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground/70">
                        {item?.type}
                      </span>
                      <span>{getYear(item)}</span>
                    </div>
                  </div>

                  {added ? (
                    <div className="flex shrink-0 items-center gap-1">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                        <Check size={13} aria-hidden="true" />
                        Added
                      </span>
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => onRemove(item)}
                        aria-label={`Remove ${title} from featured`}
                        className="grid size-8 place-items-center rounded-full text-foreground/50 transition hover:bg-red-500/10 hover:text-red-400 active:scale-90 disabled:pointer-events-none disabled:opacity-40"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => onAdd(item)}
                      aria-label={`Add ${title} to featured`}
                      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-foreground py-1.5 pl-2.5 pr-3 text-xs font-medium text-background transition hover:opacity-90 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
                    >
                      <Plus size={14} aria-hidden="true" />
                      Add
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
