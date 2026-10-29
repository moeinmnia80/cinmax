"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "@/constants/mobileSidebarNavItems";

type Props = { onNavigate?: () => void };

export const AdminSidebarNav = ({ onNavigate }: Props) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 p-4 overflow-y-auto">
      {navItems.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
              isActive
                ? "bg-foreground/5 border border-foreground/10 text-foreground after:absolute after:left-1 after:top-1/2 after:-translate-y-1/2 after:w-0.5 after:h-5 after:rounded-full after:bg-destructive"
                : "hover:bg-foreground/5"
            }`}
          >
            <Icon size={15} />
            <span className="font-light">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
