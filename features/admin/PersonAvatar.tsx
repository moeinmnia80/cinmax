"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/utils";
import { Person } from "@/types/types";

export function Avatar({
  person,
  className,
}: {
  person: Person;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border border-foreground/10 bg-foreground/10 text-xs font-medium",
        className,
      )}
    >
      {person.image && !failed ? (
        <Image
          src={person.image}
          alt={person.name}
          width={80}
          height={80}
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        <span>{person.name.slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
}
