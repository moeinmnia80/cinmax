"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, MenuIcon, Search, SlidersHorizontal, X } from "lucide-react";

import { fetchData } from "@/lib/axios";
import { calculateActiveFilters } from "@/utils";
import { logoutAction } from "@/app/actions/auth";
import { useModalStore } from "@/store/useModalStore";
import { useFilterStore } from "@/store/useFilterStore";

export const HeroNavActions = () => {
  const sortBy = useFilterStore((state) => state.sortBy);
  const minRating = useFilterStore((state) => state.minRating);
  const releaseYear = useFilterStore((state) => state.releaseYear);
  const filterOpen = useModalStore((state) => state.filterModalOpen);
  const searchModal = useModalStore((state) => state.searchModalOpen);
  const selectedGenre = useFilterStore((state) => state.selectedGenre);
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
  const setFilterOpen = useModalStore((state) => state.toggleFilterModal);
  const setMobileNavOpen = useModalStore((state) => state.toggleMobileNav);
  const toggleSearchModal = useModalStore((state) => state.toggleSearchModal);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["user-me"],
    queryFn: () => fetchData("/api/user/me"),
    refetchOnWindowFocus: false,
  });

  const activeFilterCount = calculateActiveFilters(
    sortBy,
    releaseYear,
    selectedGenre,
    minRating,
  );

  const handleLogout = async () => {
    const result = await logoutAction();

    if (result?.success) {
      await queryClient.invalidateQueries({ queryKey: ["user-me"] });
      window.location.reload();
    }
  };

  if (isLoading) return <></>;
  return (
    <div className="flex items-center gap-2 shrink-0">
      <button
        onClick={() => {
          toggleSearchModal();
          setSearchQuery("");
          setFilterOpen(false);
        }}
        className={`hidden sm:flex w-9 h-9 rounded-full items-center justify-center border transition-all ${searchModal ? "bg-destructive border-destructive text-foreground" : "border-foreground/15 text-foreground/50 hover:border-foreground/40 hover:text-foreground"}`}
      >
        {searchModal ? <X size={15} /> : <Search size={15} />}
      </button>
      <button
        onClick={() => {
          setFilterOpen();
          toggleSearchModal(false);
        }}
        className={`relative hidden sm:flex w-9 h-9 rounded-full items-center justify-center border transition-all ${filterOpen ? "bg-destructive border-destructive text-foreground" : "border-foreground/15 text-foreground/50 hover:border-foreground/40 hover:text-foreground"}`}
      >
        <SlidersHorizontal size={15} />
        {activeFilterCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-foreground text-[9px] font-bold flex items-center justify-center border border-foreground">
            {activeFilterCount}
          </span>
        )}
      </button>
      <div className="hidden sm:block w-px h-5 bg-foreground/10 mx-1" />

      {data?.user ? (
        <div className="hidden sm:flex items-center gap-2">
          {data?.user?.image ? (
            <Image
              src={data?.user.image}
              alt="replace"
              loading="eager"
              width={200}
              height={200}
              priority
              className="size-9 rounded-full object-cover border-2 border-destructive/50"
            />
          ) : (
            <span className="size-9 rounded-full bg-gray-200/10 border border-destructive/50" />
          )}
          {data?.user?.firstName && (
            <span className="text-white/80 text-sm font-medium cursor-default underline decoration-transparent underline-offset-3 hover:decoration-foreground transition-all duration-200">
              {data?.user.username}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="text-white/30 hover:text-destructive transition-colors px-1"
          >
            <LogOut size={13} />
          </button>
        </div>
      ) : (
        <>
          <Link
            href="/login"
            className="hidden sm:block text-white/50 hover:text-white text-sm transition-colors px-1"
          >
            Login
          </Link>
          <span className="hidden sm:block text-white/20 text-sm">/</span>
          <Link
            href="/register"
            className="hidden sm:block text-white/50 hover:text-white text-sm transition-colors px-1"
          >
            Register
          </Link>
        </>
      )}
      <button
        onClick={() => setMobileNavOpen(true)}
        className="sm:hidden size-9 rounded-full flex items-center justify-center border border-white/15 text-white/60 hover:border-white/40 hover:text-white transition-all"
      >
        <MenuIcon size={16} />
      </button>
    </div>
  );
};
