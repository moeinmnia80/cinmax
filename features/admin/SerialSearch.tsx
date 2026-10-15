"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import useDebounce from "@/hooks/useDebounce";

export const SerialSearch = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 500);

  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const element = event.target.value;
    setSearch(element);
  };

  return (
    <div className="relative flex items-center">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 uppercase text-foreground/15">
        search
      </span>
      <input
        type="search"
        name="search"
        placeholder="Series title"
        className="w-50 border border-foreground/15 outline-0 rounded-sm pl-15 pr-3 py-2 focus:border-foreground/60 placeholder:text-foreground/40 placeholder:text-md"
        value={search}
        onChange={handleChange}
      />
    </div>
  );
};
