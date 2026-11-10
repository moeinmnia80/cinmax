"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

import { navItems } from "@/constants/navItems";
import { useModalStore } from "@/store/useModalStore";

export const MobileMenu = () => {
  const pathname = usePathname();

  const mobileNavOpen = useModalStore((state) => state.mobileNavOpen);
  const toggleMobileNav = useModalStore((state) => state.toggleMobileNav);

  const closeSidebar = () => toggleMobileNav(false);

  if (!mobileNavOpen) return null;
  return (
    <div className="fixed inset-0 z-50 sm:hidden">
      <div
        aria-hidden="true"
        onClick={closeSidebar}
        className="absolute inset-0 bg-background/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <aside
        aria-label="Mobile Navigation"
        style={{ willChange: "transform" }}
        className="absolute top-0 right-0 h-full w-72 flex flex-col bg-sidebar-accent border-l border-foreground/8 shadow-2xl transition-transform duration-300 ease-out translate-x-0"
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-5 border-b border-foreground/8">
          <span className="text-destructive font-black text-xl tracking-widest">
            CINEMAX
          </span>
          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close navigation menu"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-foreground/12 text-foreground/50 transition-all cursor-pointer hover:text-foreground hover:border-foreground"
          >
            <X size={14} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={label}
                href={href || "#"}
                onClick={closeSidebar}
                prefetch={false}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors group border ${
                  isActive
                    ? "bg-destructive/12 text-foreground border-destructive/20"
                    : "text-foreground/45 hover:text-foreground hover:bg-foreground/4 border-transparent"
                }`}
              >
                <Icon
                  size={17}
                  className={
                    isActive
                      ? "text-destructive"
                      : "text-foreground/30 group-hover:text-foreground/60 transition-colors"
                  }
                />
                <span className="font-bold text-sm uppercase tracking-wide">
                  {label}
                </span>
                {isActive && (
                  <div className="ml-auto w-1 h-4 bg-destructive rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-5 py-5 border-t border-foreground/8 flex flex-col gap-2">
          <Link
            href="/login"
            prefetch={false}
            onClick={closeSidebar}
            className="w-full bg-destructive hover:bg-destructive/60 text-foreground font-bold text-sm py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            prefetch={false}
            onClick={closeSidebar}
            className="w-full flex items-center justify-center border border-foreground/12 hover:border-foreground/25 text-foreground/50 hover:text-foreground font-bold text-sm py-2.5 rounded-xl transition-all"
          >
            Create Account
          </Link>
        </div>
      </aside>
    </div>
  );
};
