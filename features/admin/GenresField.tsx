"use client";

import { Plus, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

interface GenresFieldProps {
  name: string;
  label: string;
  defaultValue?: readonly string[];
}

export const GenresField = ({
  name,
  label,
  defaultValue = [],
}: GenresFieldProps) => {
  const labelId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const skipBlurRef = useRef(false);

  const [genres, setGenres] = useState<string[]>(() => [...defaultValue]);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (adding) inputRef.current?.focus();
  }, [adding]);

  const openInput = () => {
    skipBlurRef.current = false;
    setAdding(true);
  };

  const finish = (save: boolean) => {
    skipBlurRef.current = true;

    const value = draft.trim();
    const exists = genres.some((g) => g.toLowerCase() === value.toLowerCase());
    if (save && value && !exists) setGenres((prev) => [...prev, value]);

    setDraft("");
    setAdding(false);
  };

  const remove = (genre: string) =>
    setGenres((prev) => prev.filter((g) => g !== genre));

  return (
    <div role="group" aria-labelledby={labelId}>
      <span
        id={labelId}
        className="block text-xs tracking-widest uppercase text-foreground/60"
      >
        {label}
      </span>

      {genres.map((genre) => (
        <input key={genre} type="hidden" name={name} value={genre} />
      ))}

      <ul className="mt-2 flex flex-wrap items-center gap-2">
        {genres.map((genre) => (
          <li
            key={genre}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/10 py-1 pr-2 pl-3 text-sm text-red-500"
          >
            {genre}
            <button
              type="button"
              onClick={() => remove(genre)}
              aria-label={`Remove ${genre}`}
              className="rounded-full outline-0 transition hover:text-red-400 focus-visible:ring-1 focus-visible:ring-red-500"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </li>
        ))}

        <li>
          {adding ? (
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={draft}
                maxLength={24}
                placeholder="Genre"
                aria-label="New genre"
                onChange={(e) => setDraft(e.target.value)}
                onBlur={() => {
                  if (!skipBlurRef.current) finish(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // don't submit the whole form
                    finish(true);
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    finish(false);
                  }
                }}
                className="w-28 rounded-full border border-dashed border-foreground/30 bg-transparent px-3 py-1 text-sm text-foreground outline-0 placeholder:text-foreground/30 focus:border-foreground/50"
              />
              <button type="button">
                <Plus
                  size={15}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                />
              </button>
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
