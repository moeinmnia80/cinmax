"use client";

import Image from "next/image";
import { ChangeEvent, ComponentProps, useState } from "react";

import { cn } from "@/utils";
import { Person } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/axios";
import useDebounce from "@/hooks/useDebounce";

interface CastsFieldProps extends Omit<ComponentProps<"div">, "defaultValue"> {
  defaultValue?: {
    role: string;
    person: Person;
  }[];
}

export const CastsField = ({ className, defaultValue }: CastsFieldProps) => {
  const [search, setSearch] = useState("");
  const [casts] = useState(defaultValue);

  const debouncedValue = useDebounce(search, 500);

  const { data } = useQuery<{ success: boolean; persons: Person[] }>({
    queryKey: ["persons"],
    queryFn: () => fetchData("/api/person"),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <section
      aria-labelledby="castField"
      className={cn(
        "col-span-4 border border-foreground/10 rounded-lg p-4",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h2
          id="castFiled"
          className="text-sm text-foreground/60 font-normal uppercase"
        >
          cast
        </h2>
        <input
          type="search"
          name="search"
          className="border border-foreground/15 outline-0 rounded-sm px-3 py-1 focus:border-foreground/60 placeholder:text-foreground/40 placeholder:text-md"
          value={search}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {casts?.map(({ person, role }) => (
          <div key={person.id} className="flex items-center gap-4">
            {person.image ? (
              <div className="size-10 rounded-full overflow-hidden">
                <Image
                  src={person.image}
                  alt={`${person.name}`}
                  width={200}
                  height={200}
                  className="size-full object-cover"
                />
              </div>
            ) : (
              <span className="size-10 bg-gray-200/20 rounded-full" />
            )}
            <div>
              <p className="text-sm">{person.name}</p>
              <p className="text-xs text-foreground/60">{role}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        {data?.persons.map(
          (person) =>
            person.name.includes(search) && (
              <div key={person.id} className="last:col-span-2">
                {person.name}
              </div>
            ),
        )}
      </div>
    </section>
  );
};
