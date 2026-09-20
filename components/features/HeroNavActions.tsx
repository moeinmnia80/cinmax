"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import { LogOut, MenuIcon, Search, SlidersHorizontal, X } from "lucide-react";

import { useFilterStore } from "@/store/useFilterStore";
import { useModalStore } from "@/store/useModalStore";
import { calculateActiveFilters } from "@/utils";

export const HeroNavActions = () => {
  const sortBy = useFilterStore((state) => state.sortBy);
  const releaseYear = useFilterStore((state) => state.releaseYear);
  const filterOpen = useModalStore((state) => state.filterModalOpen);
  const searchModal = useModalStore((state) => state.searchModalOpen);
  const selectedGenre = useFilterStore((state) => state.selectedGenre);
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
  const setFilterOpen = useModalStore((state) => state.toggleFilterModal);
  const setMobileNavOpen = useModalStore((state) => state.toggleMobileNav);
  const toggleSearchModal = useModalStore((state) => state.toggleSearchModal);

  const { user, isAuthenticated } = { user: null, isAuthenticated: false };

  const activeFilterCount = calculateActiveFilters(
    sortBy,
    releaseYear,
    selectedGenre,
  );

  return (
    <div className="flex items-center gap-2 shrink-0">
      <button
        onClick={() => {
          toggleSearchModal();
          setSearchQuery("");
          setFilterOpen(false);
        }}
        className={`hidden sm:flex w-9 h-9 rounded-full items-center justify-center border transition-all ${searchModal ? "bg-primary border-primary text-white" : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"}`}
      >
        {searchModal ? <X size={15} /> : <Search size={15} />}
      </button>
      <button
        onClick={() => {
          setFilterOpen();
          toggleSearchModal(false);
        }}
        className={`relative hidden sm:flex w-9 h-9 rounded-full items-center justify-center border transition-all ${filterOpen ? "bg-primary border-primary text-white" : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"}`}
      >
        <SlidersHorizontal size={15} />
        {activeFilterCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-white text-[9px] font-bold flex items-center justify-center border border-white">
            {activeFilterCount}
          </span>
        )}
      </button>
      <div className="hidden sm:block w-px h-5 bg-white/10 mx-1" />
      {isAuthenticated ? (
        <div className="hidden sm:flex items-center gap-2">
          <Image
            src=""
            alt="replace"
            className="w-7 h-7 rounded-full object-cover border border-primary/50"
          />
          <span className="text-white/80 text-sm font-medium">{user}</span>
          <button
            onClick={() => {
              // logout
            }}
            className="text-white/30 hover:text-red-400 transition-colors px-1"
            title="Sign out"
          >
            <LogOut size={13} />
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => redirect("/login")}
            className="hidden sm:block text-white/50 hover:text-white text-sm transition-colors px-1"
          >
            Login
          </button>
          <span className="hidden sm:block text-white/20 text-sm">/</span>
          <button
            onClick={() => redirect("/register")}
            className="hidden sm:block text-white/50 hover:text-white text-sm transition-colors px-1"
          >
            Register
          </button>
        </>
      )}
      <button
        onClick={() => setMobileNavOpen(true)}
        className="sm:hidden w-9 h-9 rounded-full flex items-center justify-center border border-white/15 text-white/60 hover:border-white/40 hover:text-white transition-all"
      >
        <MenuIcon size={16} />
      </button>
    </div>
  );
};
