"use client";

import { usePathname, useSearchParams } from "next/navigation";

export function useQueryToggle(slug: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get("edit") === slug;

  const params = new URLSearchParams(searchParams);
  if (isOpen) params.delete("edit");
  else params.set("edit", slug);

  const query = params.toString();
  return { isOpen, href: query ? `${pathname}?${query}` : pathname };
}
