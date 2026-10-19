"use client";

import { Genre } from "@/types/types";
import { getData } from "@/lib/axios";
import { Plus, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

interface GenresFieldProps extends ComponentProps<"div"> {
  name: string;
  label: string;
  defaultValue?: readonly string[];
}

export const GenresField = ({
  name,
  label,
  className,
  defaultValue = [],
}: GenresFieldProps) => {
  const domNode = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [genres, setGenres] = useState<string[]>(() => [...defaultValue]);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const { data } = useQuery<{ success: boolean; genres: Genre[] }>({
    queryKey: ["genres"],
    queryFn: () => getData("/api/genres"),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: adding,
  });

  useClickOutside({ domNode, setState: setAdding });

  useEffect(() => {
    if (adding) inputRef.current?.focus();
  }, [adding]);

  const openInput = () => {
    setAdding(true);
  };

  const finish = (save: boolean) => {
    const value = draft.trim();
    const exists = genres.some((g) => g.toLowerCase() === value.toLowerCase());
    if (save && value && !exists) setGenres((prev) => [...prev, value]);

    setDraft("");
    setAdding(false);
  };

  const remove = (genre: string) =>
    setGenres((prev) => prev.filter((g) => g !== genre));

  return (
    <div role="group" className={className}>
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
            <div className="relative" ref={domNode}>
              <input
                ref={inputRef}
                type="text"
                value={draft}
                maxLength={24}
                placeholder="Genre"
                aria-label="New genre"
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    finish(true);
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    finish(false);
                  }
                }}
                className="w-28 rounded-full border border-dashed border-foreground/30 bg-transparent px-3 py-1 text-sm text-foreground outline-0 placeholder:text-foreground/30 focus:border-foreground/50"
              />
              {draft && (
                <ul className="absolute top-full left-0 w-30 max-h-24 bg-foreground/5 backdrop-blur-2xl rounded-md mt-1 overflow-auto">
                  {data?.genres.map(
                    (genre) =>
                      genre.name.toLowerCase().includes(draft) && (
                        <li
                          key={genre.id}
                          className="flex items-center h-8 hover:bg-foreground/15 px-3"
                        >
                          {genre.name}
                        </li>
                      ),
                  )}
                </ul>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={openInput}
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
