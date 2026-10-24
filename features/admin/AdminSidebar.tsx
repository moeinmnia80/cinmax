"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AdminSidebarHeader } from "./AdminSidebarHeader";
import { navItems } from "@/constants/mobileSidebarNavItems";

export const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex-1 border-r border-foreground/10 animate-slide-right">
      <AdminSidebarHeader />
      <nav className="flex flex-col gap-2 p-4">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? "bg-foreground/5 border border-foreground/10 text-foreground after:absolute after:left-1 after:top-1/2 after:-translate-y-1/2 after:w-0.5 after:h-5 after:rounded-full after:bg-destructive"
                  : "hover:bg-foreground/5"
              }`}
            >
              <IconComponent size={15} />
              <span className="font-light">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
