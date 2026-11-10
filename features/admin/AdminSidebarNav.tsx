"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils";
import { adminNavItems } from "@/constants/navItems";

type Props = { onNavigate?: () => void };

const isActiveRoute = (pathname: string, href: string, exact?: boolean) =>
  exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

export const AdminSidebarNav = ({ onNavigate }: Props) => {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin navigation" className="flex flex-col gap-2">
      {adminNavItems.map(({ href, label, icon: Icon, exact }) => {
        const active = isActiveRoute(pathname, href, exact);

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl p-2.5 outline-none",
              "transition-all duration-200 focus-visible:ring-2 focus-visible:ring-foreground/30",
              active
                ? "bg-foreground/10 text-foreground ring-1 ring-foreground/10"
                : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute -left-3 top-1/2 hidden h-5 w-1 -translate-y-1/2 rounded-full",
                "bg-foreground transition-all duration-300 sm:block",
                active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
              )}
            />

            <Icon
              size={25}
              className={cn(
                "shrink-0 transition-transform duration-200 group-hover:scale-110",
                active ? "stroke-[1.5]" : "stroke-1",
              )}
            />

            <span className="font-light sm:hidden">{label}</span>

            <span
              role="tooltip"
              className={cn(
                "pointer-events-none invisible absolute left-full top-1/2 z-50 ml-3 hidden",
                "-translate-x-1 -translate-y-1/2 whitespace-nowrap rounded-lg border border-foreground/10",
                "bg-background/80 px-3 py-1 text-sm opacity-0 shadow-lg backdrop-blur-md",
                "transition-all duration-200 sm:block",
                "group-hover:visible group-hover:translate-x-0 group-hover:opacity-100",
                "group-focus-visible:visible group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
