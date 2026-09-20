"use client";

import { ComponentProps } from "react";

import { cn } from "@/utils";
import { useModalStore } from "@/store/useModalStore";

export const MobileOverlay = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const mobileNavOpen = useModalStore((state) => state.mobileNavOpen);
  return (
    <div
      className={cn(
        `fixed inset-0 z-30 bg-black/70 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${mobileNavOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`,
        className,
      )}
      {...props}
    />
  );
};
