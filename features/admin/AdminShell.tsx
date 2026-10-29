"use client";

import { useCallback, useState } from "react";
import { Menu } from "lucide-react";

import { AdminSidebar } from "@/features/server";
import { AdminMobileSidebar } from "@/features/client";

export const AdminShell = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <div className="flex min-h-dvh">
      <AdminSidebar />
      <AdminMobileSidebar open={open} onClose={close} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-foreground/10 bg-background/80 px-4 backdrop-blur md:hidden">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-md hover:bg-foreground/5"
          >
            <Menu size={20} />
          </button>
          <span className="font-bold uppercase tracking-widest">cinmax</span>
        </header>

        <main className="flex-5">{children}</main>
      </div>
    </div>
  );
};
