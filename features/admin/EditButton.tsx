"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

export const EditButton = ({ slug }: { slug: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isEdit = searchParams.get("edit") === slug;

  const params = new URLSearchParams(searchParams);
  if (isEdit) params.delete("edit");
  else params.set("edit", slug);

  const query = params.toString();

  return (
    <Link
      href={query ? `${pathname}?${query}` : pathname}
      replace
      scroll={false}
      aria-label={isEdit ? "Close editor" : "Edit"}
      aria-pressed={isEdit}
      className="rounded bg-foreground/5 px-2 py-1 text-xs uppercase text-foreground/60 outline-0 transition hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-foreground/40"
    >
      {isEdit ? <Check size={15} aria-hidden="true" /> : "Edit"}
    </Link>
  );
};
