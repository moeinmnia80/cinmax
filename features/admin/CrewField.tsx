"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ComponentProps, useId, useState, useTransition } from "react";
import {
  X,
  Video,
  Check,
  Search,
  PenLine,
  Loader2,
  UserPlus,
  Clapperboard,
} from "lucide-react";

import { cn } from "@/utils";
import { getData } from "@/lib/axios";
import { Avatar } from "@/features/client";
import useDebounce from "@/hooks/useDebounce";
import { Person, SerialDetailCrew } from "@/types/types";
import type { CastTarget } from "@/app/actions/cast";
import { CREW_ROLES, CrewRole } from "@/constants/crew";
import { addCrew, removeCrew } from "@/app/actions/crew";

const ROLE_META: Record<
  CrewRole,
  { label: string; plural: string; icon: typeof Video }
> = {
  Director: { label: "Director", plural: "Directors", icon: Clapperboard },
  Writer: { label: "Writer", plural: "Writers", icon: PenLine },
  Producer: { label: "Producer", plural: "Producers", icon: Video },
};

interface CrewFieldProps extends Omit<
  ComponentProps<"section">,
  "defaultValue"
> {
  target: CastTarget;
  defaultValue?: SerialDetailCrew[];
}

export const CrewField = ({
  target,
  defaultValue = [],
  className,
  ...props
}: CrewFieldProps) => {
  const router = useRouter();
  const headingId = useId();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState("");
  const [role, setRole] = useState<CrewRole>("Director");
  const [selected, setSelected] = useState<Person | null>(null);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search.trim(), 400);

  const { data, isFetching, refetch } = useQuery<{
    success: boolean;
    persons: Person[];
  }>({
    queryKey: ["persons", role, debouncedSearch],
    queryFn: () =>
      getData("/api/person", {
        params: { search: debouncedSearch, type: role },
      }),
    enabled: debouncedSearch.length > 0 && !selected,
    refetchOnWindowFocus: false,
  });

  const takenIds = new Set(
    defaultValue.filter((c) => c.role === role).map((c) => c.person.id),
  );
  const results = (data?.persons ?? []).filter((p) => !takenIds.has(p.id));
  const showResults = !selected && debouncedSearch.length > 0;

  const resetPerson = () => {
    setSearch("");
    setSelected(null);
    setError(null);
  };

  const handleRoleChange = (next: CrewRole) => {
    setRole(next);
    resetPerson();
  };

  const handleAdd = async () => {
    if (!selected) return setError("Select a person first");

    setError(null);
    startTransition(async () => {
      const res = await addCrew({ target, personId: selected.id, role });
      if (!res.success) return setError(res.error);

      resetPerson();
      router.refresh();
    });
    refetch();
  };

  const handleRemove = async (personId: number, crewRole: CrewRole) => {
    startTransition(async () => {
      const res = await removeCrew(target, personId, crewRole);
      if (!res.success) return setError(res.error);
      router.refresh();
    });
  };

  const groups = CREW_ROLES.map((r) => ({
    role: r,
    members: defaultValue.filter((c) => c.role === r),
  })).filter((g) => g.members.length > 0);

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
          Crew
        </h2>
        <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs text-foreground/60">
          {defaultValue.length}
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {groups.length === 0 && (
          <p className="rounded-lg border border-dashed border-foreground/10 py-6 text-center text-xs text-foreground/50">
            No crew added yet
          </p>
        )}

        {groups.map(({ role: groupRole, members }) => {
          const Icon = ROLE_META[groupRole].icon;
          return (
            <div key={groupRole} className="space-y-1.5">
              <p className="flex items-center gap-1.5 text-xs font-medium text-foreground/50">
                <Icon size={12} />
                {members.length > 1
                  ? ROLE_META[groupRole].plural
                  : ROLE_META[groupRole].label}
              </p>
              <ul className="space-y-1">
                {members.map(({ person }) => (
                  <li
                    key={`${groupRole}-${person.id}`}
                    className="group flex items-center gap-3 rounded-lg border border-foreground/5 bg-foreground/5 p-2 transition-colors hover:border-foreground/15"
                  >
                    <Avatar person={person} />
                    <p className="flex-1 truncate text-sm">{person.name}</p>
                    <button
                      type="button"
                      aria-label={`Remove ${person.name} as ${groupRole}`}
                      disabled={isPending}
                      onClick={() => handleRemove(person.id, groupRole)}
                      className="rounded-full p-1.5 text-foreground/40 opacity-0 transition hover:bg-foreground/10 hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
                    >
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-3 rounded-lg border border-dashed border-foreground/15 p-3">
        <div
          role="radiogroup"
          aria-label="Crew role"
          className="grid grid-cols-3 gap-1 rounded-lg bg-foreground/5 p-1"
        >
          {CREW_ROLES.map((r) => {
            const Icon = ROLE_META[r].icon;
            const active = role === r;
            return (
              <button
                key={r}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => handleRoleChange(r)}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs transition-colors",
                  active
                    ? "bg-foreground text-background"
                    : "text-foreground/60 hover:bg-foreground/10",
                )}
              >
                <Icon size={12} />
                {ROLE_META[r].label}
              </button>
            );
          })}
        </div>

        <div className="relative">
          {selected ? (
            <div className="flex items-center gap-2 rounded-md border border-foreground/10 bg-foreground/5 p-1.5">
              <Avatar
                person={selected}
                className="size-7 rounded-lg text-[10px]"
              />
              <span className="flex-1 truncate text-sm">{selected.name}</span>
              <Check size={14} className="text-emerald-400" />
              <button
                type="button"
                aria-label="Clear selected person"
                onClick={resetPerson}
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
                name="search-crew"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${ROLE_META[role].label.toLowerCase()} by name`}
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
                  No {ROLE_META[role].label.toLowerCase()} found
                </li>
              )}
              {results.map((person) => (
                <li key={person.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(person)}
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-foreground/5"
                  >
                    <Avatar
                      person={person}
                      className="size-7 rounded-lg text-[10px]"
                    />
                    <span className="truncate">{person.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {error && (
          <p role="alert" className="text-xs text-red-400">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleAdd}
          disabled={isPending || !selected}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-foreground py-2 text-sm font-medium text-background transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <UserPlus size={14} />
          )}
          Add {ROLE_META[role].label.toLowerCase()}
        </button>
      </div>
    </section>
  );
};
