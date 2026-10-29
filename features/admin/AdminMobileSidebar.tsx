"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

import { AdminSidebarNav } from "@/features/client";
import { AdminSidebarHeader } from "@/features/server";

type Props = { open: boolean; onClose: () => void };

export const AdminMobileSidebar = ({ open, onClose }: Props) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
      inert={!open}
    >
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Admin navigation"
        className={`absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-background border-r border-foreground/10 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-foreground/10">
          <div className="flex-1" onClick={onClose}>
            <AdminSidebarHeader />
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="mr-3 grid size-9 place-items-center rounded-md hover:bg-foreground/5"
          >
            <X size={18} />
          </button>
        </div>

        <AdminSidebarNav onNavigate={onClose} />
      </aside>
    </div>
  );
};
