import Image from "next/image";

import { Person } from "@/types/types";
import { cn, getInitialsName } from "@/utils";
import { EditButton } from "./EditButton";

interface PersonRowProps {
  person: Person;
}

export function PersonRow({ person }: PersonRowProps) {
  const isDirector = person.role.toLowerCase() === "director";

  return (
    <li className="flex items-center justify-between gap-4 border-b border-foreground/10 px-5 py-4 transition-colors hover:bg-foreground/5 odd:border-r">
      <div className="flex min-w-0 items-center gap-5">
        <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-foreground/5 font-condensed text-lg font-bold">
          {person.image ? (
            <Image
              src={person.image}
              alt={person.name}
              width={128}
              height={128}
              className="size-full object-cover"
              loading="eager"
            />
          ) : (
            getInitialsName(person.name)
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-md font-medium">{person.name}</p>
          <p className="truncate font-mono text-sm text-foreground/50">
            {person.birthPlace}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <span
          className={cn(
            "rounded-full border px-4 py-1 text-sm",
            isDirector
              ? "border-destructive/30 bg-destructive/15 text-destructive"
              : "border-transparent bg-foreground/10 text-foreground/60",
          )}
        >
          {person.role}
        </span>
        <EditButton slug={person?.slug} />
      </div>
    </li>
  );
}
