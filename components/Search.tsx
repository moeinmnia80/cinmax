"use client";

import { Loader2, Search as SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import { useFocusShortcut } from "@/hooks/useFocusShortcut";

const PARAM = "search";
const DEBOUNCE_MS = 400;

export function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const urlValue = searchParams.get(PARAM) ?? "";
  const [value, setValue] = useState(urlValue);

  useFocusShortcut(inputRef);

  useEffect(() => {
    if (document.activeElement !== inputRef.current) setValue(urlValue);
  }, [urlValue]);

  const commit = useCallback(
    (term: string, immediate = false) => {
      clearTimeout(timeoutRef.current);

      const run = () => {
        const params = new URLSearchParams(window.location.search);
        const next = term.trim();

        if (next === (params.get(PARAM) ?? "")) return;

        if (next) params.set(PARAM, next);
        else params.delete(PARAM);
        params.delete("page");

        startTransition(() => {
          const qs = params.toString();
          router.replace(qs ? `${pathname}?${qs}` : pathname, {
            scroll: false,
          });
        });
      };

      if (immediate) run();
      else timeoutRef.current = setTimeout(run, DEBOUNCE_MS);
    },
    [pathname, router],
  );

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    commit(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    commit("", true);
    inputRef.current?.focus();
  };

  return (
    <search role="search" className="w-full max-w-sm">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <div className="group relative flex items-center rounded-full border border-foreground/15 bg-foreground/3 transition-all duration-200 hover:border-foreground/30 focus-within:border-foreground/60 focus-within:bg-background focus-within:shadow-[0_0_0_4px_--theme(--color-foreground/8%)]">
        <SearchIcon
          aria-hidden
          className="pointer-events-none absolute left-4 size-4 text-foreground/40 transition-colors group-focus-within:text-foreground/80"
        />

        <input
          ref={inputRef}
          id="search"
          type="text"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          spellCheck={false}
          placeholder="Search"
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit(value, true);
            if (e.key === "Escape" && value) {
              e.stopPropagation();
              handleClear();
            }
          }}
          className="h-11 w-full bg-transparent pl-11 pr-20 text-sm outline-none placeholder:text-foreground/40"
        />

        <div className="absolute right-3 flex items-center gap-2">
          {isPending && (
            <Loader2
              aria-label="Searching"
              className="size-4 animate-spin text-foreground/50"
            />
          )}

          {value ? (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="grid size-6 place-items-center rounded-full text-foreground/50 transition-colors hover:bg-foreground/10 hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          ) : (
            <kbd className="hidden select-none rounded-md border border-foreground/15 px-1.5 py-0.5 font-sans text-[11px] text-foreground/40 sm:block group-focus-within:hidden">
              /
            </kbd>
          )}
        </div>
      </div>
    </search>
  );
}
