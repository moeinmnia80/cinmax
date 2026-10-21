"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Plus, Search, X } from "lucide-react";
import { ComponentProps, useId, useState, useTransition } from "react";

import { cn } from "@/utils";
import { getData } from "@/lib/axios";
import { Person, SerialDetailCast } from "@/types/types";
import useDebounce from "@/hooks/useDebounce";
import { CastRole, Avatar } from "@/features/client";
import { addCast, removeCast, CastTarget } from "@/app/actions/cast";

interface CastFieldProps extends Omit<
  ComponentProps<"section">,
  "defaultValue"
> {
  target: CastTarget;
  defaultValue?: SerialDetailCast[];
}

export const CastField = ({
  target,
  defaultValue = [],
  className,
  ...props
}: CastFieldProps) => {
  const router = useRouter();
  const headingId = useId();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Person | null>(null);
  const [role, setRole] = useState("");

  const debouncedSearch = useDebounce(search.trim(), 400);

  const { data, isFetching } = useQuery<{
    success: boolean;
    persons: Person[];
  }>({
    queryKey: ["persons", debouncedSearch],
    queryFn: () =>
      getData("/api/person", { params: { search: debouncedSearch } }),
    enabled: debouncedSearch.length > 0 && !selected,
    refetchOnWindowFocus: false,
  });

  const castIds = new Set(defaultValue.map(({ person }) => person.id));
  const results = (data?.persons ?? []).filter((p) => !castIds.has(p.id));
  const showResults = !selected && debouncedSearch.length > 0;

  const reset = () => {
    setSearch("");
    setSelected(null);
    setRole("");
  };

  const handleAdd = () => {
    if (!selected) return;
    // TODO: Add toast
    if (role.trim().length < 2) return;

    startTransition(async () => {
      const res = await addCast({ target, personId: selected.id, role });
      // TODO: Add Toast
      if (!res.success) return;
      reset();
      router.refresh();
    });
  };

  const handleRemove = (personId: number) => {
    startTransition(async () => {
      const res = await removeCast(target, personId);
      // TODO: Add Toast
      if (!res.success) return;
      router.refresh();
    });
  };

  const handleRoleChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setRole(value);
  };
  const handleRoleClick = (suggestion: string) => {
    setRole(suggestion);
  };

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "col-span-4 rounded-xl border border-foreground/10 bg-foreground/5 p-4",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <h2
          id={headingId}
          className="text-sm font-normal uppercase tracking-wide text-foreground/60"
        >
          Cast
        </h2>
        <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs text-foreground/60">
          {defaultValue.length}
        </span>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-2">
        {defaultValue.map(({ person, role }) => (
          <li
            key={person.id}
            className="group relative flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-foreground/5"
          >
            <Avatar person={person} className="size-11" />
            <div className="min-w-0">
              <p className="truncate text-sm">{person.name}</p>
              <p className="truncate text-xs text-foreground/60">{role}</p>
            </div>
            <button
              type="button"
              aria-label={`Remove ${person.name}`}
              disabled={isPending}
              onClick={() => handleRemove(person.id)}
              className="absolute right-1 top-1 rounded-full p-1 text-foreground/40 opacity-0 transition hover:bg-foreground/10 hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
            >
              <X size={14} />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-3 rounded-lg border border-dashed border-foreground/15 p-3">
        <div className="relative">
          {selected ? (
            <div className="flex items-center gap-2 rounded-md border border-foreground/10 bg-foreground/5 p-1.5">
              <Avatar person={selected} className="size-7 text-[10px]" />
              <span className="flex-1 truncate text-sm">{selected.name}</span>
              <button
                type="button"
                aria-label="Clear selected person"
                onClick={reset}
                className="rounded-full p-1 text-foreground/50 hover:bg-foreground/10"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <>
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground/40"
              />
              <input
                type="search"
                name="search-cast"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search person by name"
                autoComplete="off"
                className="w-full rounded-md border border-foreground/10 bg-transparent py-2 pl-8 pr-8 text-sm outline-none transition focus:border-foreground/30"
              />
              {isFetching && (
                <Loader2
                  size={14}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 animate-spin text-foreground/40"
                />
              )}
            </>
          )}

          {showResults && (
            <ul className="absolute inset-x-0 top-full z-20 mt-1 max-h-56 overflow-auto rounded-md border border-foreground/10 bg-background p-1 shadow-lg">
              {results.length === 0 && !isFetching && (
                <li className="px-2 py-3 text-center text-xs text-foreground/50">
                  No person found
                </li>
              )}
              {results.map((person) => (
                <li key={person.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(person)}
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-foreground/5"
                  >
                    <Avatar person={person} className="size-7 text-[10px]" />
                    <span className="truncate">{person.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <CastRole
          role={role}
          onRoleChange={handleRoleChange}
          onRoleClick={handleRoleClick}
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={isPending || !selected || role.trim().length < 2}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-foreground py-2 text-sm font-medium text-background transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Plus size={14} />
          )}
          Add to cast
        </button>
      </div>
    </section>
  );
};
