"use client";

import { Plus, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ComponentProps, KeyboardEvent, useId, useMemo, useState } from "react";

import { Genre } from "@/types/types";
import { getData } from "@/lib/axios";

interface GenresFieldProps extends ComponentProps<"div"> {
  name: string;
  label: string;
  defaultValue?: readonly string[];
}

const MAX_SUGGESTIONS = 8;

export const GenresField = ({
  name,
  label,
  className,
  defaultValue = [],
}: GenresFieldProps) => {
  const listboxId = useId();

  const [genres, setGenres] = useState<string[]>(() => [...defaultValue]);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const { data } = useQuery<{ success: boolean; genres: Genre[] }>({
    queryKey: ["genres"],
    queryFn: () => getData("/api/genres"),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: adding,
  });

  const suggestions = useMemo(() => {
    const query = draft.trim().toLowerCase();
    if (!query || !data) return [];

    const selected = new Set(genres.map((g) => g.toLowerCase()));

    return data.genres
      .filter((g) => {
        const lower = g.name.toLowerCase();
        return lower.includes(query) && !selected.has(lower);
      })
      .slice(0, MAX_SUGGESTIONS);
  }, [data, draft, genres]);

  const isOpen = adding && suggestions.length > 0;

  const resetDraft = () => {
    setDraft("");
    setActiveIndex(-1);
  };

  const close = () => {
    resetDraft();
    setAdding(false);
  };

  const add = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const canonical =
      data?.genres.find((g) => g.name.toLowerCase() === trimmed.toLowerCase())
        ?.name ?? trimmed;

    setGenres((prev) =>
      prev.some((g) => g.toLowerCase() === canonical.toLowerCase())
        ? prev
        : [...prev, canonical],
    );
    resetDraft();
  };

  const remove = (genre: string) =>
    setGenres((prev) => prev.filter((g) => g !== genre));

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        if (!suggestions.length) return;
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % suggestions.length);
        break;
      case "ArrowUp":
        if (!suggestions.length) return;
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (!draft.trim()) return close();
        add(activeIndex >= 0 ? suggestions[activeIndex].name : draft);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
    }
  };

  return (
    <div role="group" aria-label={label} className={className}>
      <span className="block text-xs tracking-widest uppercase text-foreground/60">
        {label}
      </span>

      {genres.map((genre) => (
        <input key={genre} type="hidden" name={name} value={genre} />
      ))}

      <ul className="mt-2 flex flex-wrap items-center gap-2">
        {genres.map((genre) => (
          <li
            key={genre}
            className="inline-flex items-center gap-1.5 rounded-full border border-destructive/40 bg-destructive/10 py-1 pr-2 pl-3 text-sm text-destructive"
          >
            {genre}
            <button
              type="button"
              onClick={() => remove(genre)}
              aria-label={`Remove ${genre}`}
              className="rounded-full outline-0 transition hover:text-destructive/40 focus-visible:ring-1 focus-visible:ring-destructive/50"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </li>
        ))}

        <li>
          {adding ? (
            <div
              className="relative"
              onBlur={(e) => {
                // close only when focus leaves the whole widget
                if (!e.currentTarget.contains(e.relatedTarget)) close();
              }}
            >
              <input
                autoFocus
                type="text"
                role="combobox"
                aria-label="New genre"
                aria-expanded={isOpen}
                aria-controls={listboxId}
                aria-autocomplete="list"
                aria-activedescendant={
                  activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined
                }
                value={draft}
                maxLength={24}
                placeholder="Genre"
                onChange={(e) => {
                  setDraft(e.target.value);
                  setActiveIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                className="w-28 rounded-full border border-dashed border-foreground/30 bg-transparent px-3 py-1 text-sm text-foreground outline-0 placeholder:text-foreground/30 focus:border-foreground/50"
              />

              {isOpen && (
                <ul
                  id={listboxId}
                  role="listbox"
                  className="absolute top-full left-0 z-10 mt-1 max-h-40 w-40 overflow-auto rounded-md bg-foreground/5 backdrop-blur-2xl"
                >
                  {suggestions.map((genre, i) => (
                    <li
                      key={genre.id}
                      id={`${listboxId}-${i}`}
                      role="option"
                      aria-selected={i === activeIndex}
                      // keep focus in the input so onBlur doesn't close first
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => add(genre.name)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex h-8 cursor-pointer items-center px-3 text-sm ${
                        i === activeIndex ? "bg-foreground/15" : ""
                      }`}
                    >
                      {genre.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAdding(true)}
              className="inline-flex items-center gap-1 rounded-full border border-dashed border-foreground/20 px-3 py-1 text-sm text-foreground/50 outline-0 transition hover:border-foreground/40 hover:text-foreground/80 focus-visible:border-foreground/50"
            >
              <Plus className="size-3.5" aria-hidden="true" />
              Add
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};
