"use client";

import { Check } from "lucide-react";
import { ComponentProps, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/utils";
import { getData } from "@/lib/axios";
import { CategoryItem } from "@/types/types";
import { LABEL_TEXT } from "@/components/Form";

type CategoryOption = Pick<CategoryItem, "id" | "name">;

interface CategoriesFieldProps extends Omit<
  ComponentProps<"fieldset">,
  "defaultValue"
> {
  name: string;
  label: string;
  defaultValue?: readonly number[];
}

const SKELETON_COUNT = 6;

export const CategoriesField = ({
  name,
  label,
  className,
  defaultValue = [],
  ...props
}: CategoriesFieldProps) => {
  const [selected, setSelected] = useState<ReadonlySet<number>>(
    () => new Set(defaultValue),
  );

  const { data, isPending, isError, refetch } = useQuery<{
    success: boolean;
    categories: CategoryOption[];
  }>({
    queryKey: ["categories"],
    queryFn: () => getData("/api/categories"),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const toggle = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  return (
    <fieldset className={className} aria-busy={isPending} {...props}>
      <legend className={LABEL_TEXT}>{label}</legend>

      {[...selected].map((id) => (
        <input key={id} type="hidden" name={name} value={id} />
      ))}

      <div className="mt-2 flex flex-wrap gap-2">
        {isPending &&
          Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="h-8 w-20 animate-pulse rounded-full bg-foreground/5"
            />
          ))}

        {isError && (
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-full border border-dashed border-destructive/40 px-4 py-2 text-xs text-destructive outline-0 transition hover:bg-destructive/10"
          >
            Couldn&apos;t load categories · Retry
          </button>
        )}

        {data?.categories.map(({ id, name: categoryName }) => {
          const checked = selected.has(id);

          return (
            <button
              key={id}
              type="button"
              aria-pressed={checked}
              onClick={() => toggle(id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider",
                "outline-0 transition-colors focus-visible:ring-2 focus-visible:ring-foreground/40",
                checked
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/5 bg-foreground/5 text-foreground/60 hover:bg-foreground/10 hover:text-foreground",
              )}
            >
              {checked && <Check className="size-3" aria-hidden="true" />}
              {categoryName}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};
