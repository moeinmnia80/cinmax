"use client";

import Link from "next/link";
import { useState } from "react";
import { LogIn, X } from "lucide-react";

import { useModalStore } from "@/store/useModalStore";
import { navItems } from "@/constants/mobileSidebarNavItems";

export const MobileSidebar = () => {
  const [activeNavItem, setActiveNavItem] = useState("Home");

  const mobileNavOpen = useModalStore((state) => state.mobileNavOpen);
  const setMobileNavOpen = useModalStore((state) => state.toggleMobileNav);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 z-50 flex flex-col bg-sidebar-accent-foreground border-l border-foreground/8 shadow-2xl transition-transform duration-300 ease-in-out sm:hidden ${mobileNavOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center justify-between px-5 pt-6 pb-5 border-b border-foreground/8">
        <span className="text-destructive font-black text-xl tracking-widest">
          CINEMAX
        </span>
        <button
          type="button"
          onClick={() => setMobileNavOpen(false)}
          className="flex items-center justify-center w-8 h-8 rounded-full border border-foreground/12 text-foreground/50 transition-all cursor-pointer hover:text-foreground hover:border-foreground"
        >
          <X size={14} />
        </button>
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              setActiveNavItem(label);
              setMobileNavOpen(false);
            }}
            className={`gap-3 px-4 py-3 rounded-xl text-left transition-all group border ${activeNavItem === label ? "bg-destructive/12 text-foreground border-destructive/20" : "text-foreground/45 hover:text-foreground hover:bg-foreground/4 border-transparent"}`}
          >
            <Icon
              size={17}
              className={
                activeNavItem === label
                  ? "text-destructive"
                  : "text-foreground/30 group-hover:text-foreground/60 transition-colors"
              }
            />
            <span className="font-bold text-sm uppercase tracking-wide">
              {label}
            </span>
            {activeNavItem === label && (
              <div className="ml-auto w-1 h-4 bg-destructive rounded-full" />
            )}
          </button>
        ))}
      </nav>
      <div className="px-5 py-5 border-t border-foreground/8 flex flex-col gap-2">
        <Link
          href="/login"
          className="w-full bg-destructive hover:bg-destructive/60 text-foreground font-bold text-sm py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <LogIn size={14} /> Sign In
        </Link>
        <Link
          href="/register"
          className="w-full justify-center border border-foreground/12 hover:border-foreground/25 text-foreground/50 hover:text-foreground font-bold text-sm py-2.5 rounded-xl transition-all"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};
