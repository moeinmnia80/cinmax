"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AdminSidebarHeader } from "./AdminSidebarHeader";
import { navItems } from "@/constants/mobileSidebarNavItems";

export const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex-1 border-r border-foreground/10">
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
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? "bg-destructive text-foreground"
                  : "hover:bg-foreground/10"
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
