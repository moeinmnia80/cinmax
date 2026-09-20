"use client";

import { useState } from "react";
import { LogIn, X } from "lucide-react";

import { navItems } from "@/constants";
import { useModalStore } from "@/store/useModalStore";

export const MobileSidebar = () => {
  const [activeNavItem, setActiveNavItem] = useState("Home");

  const mobileNavOpen = useModalStore((state) => state.mobileNavOpen);
  const setMobileNavOpen = useModalStore((state) => state.toggleMobileNav);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 z-50 flex flex-col bg-sidebar-accent-foreground border-l border-white/8 shadow-2xl transition-transform duration-300 ease-in-out sm:hidden ${mobileNavOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center justify-between px-5 pt-6 pb-5 border-b border-white/8">
        <span className="text-primary font-black text-xl tracking-widest">
          CINEMAX
        </span>
        <button
          type="button"
          onClick={() => setMobileNavOpen(false)}
          className="flex items-center justify-center w-8 h-8 rounded-full border border-white/12 text-white/50 transition-all cursor-pointer hover:text-white hover:border-white"
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
            className={`gap-3 px-4 py-3 rounded-xl text-left transition-all group border ${activeNavItem === label ? "bg-primary/12 text-white border-primary/20" : "text-white/45 hover:text-white hover:bg-white/4 border-transparent"}`}
          >
            <Icon
              size={17}
              className={
                activeNavItem === label
                  ? "text-primary"
                  : "text-white/30 group-hover:text-white/60 transition-colors"
              }
            />
            <span className="font-bold text-sm uppercase tracking-wide">
              {label}
            </span>
            {activeNavItem === label && (
              <div className="ml-auto w-1 h-4 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </nav>
      <div className="px-5 py-5 border-t border-white/8 flex flex-col gap-2">
        <button
          type="button"
          className="w-full bg-primary hover:bg-red-600 text-white font-bold text-sm py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <LogIn size={14} /> Sign In
        </button>
        <button
          type="button"
          className="w-full justify-center border border-white/12 hover:border-white/25 text-white/50 hover:text-white font-bold text-sm py-2.5 rounded-xl transition-all"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};
