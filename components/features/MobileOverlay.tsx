import { ComponentProps } from "react";

import { cn } from "@/utils";

interface MobileOverlayProps extends ComponentProps<"div"> {
  mobileNavOpen: boolean;
}

export const MobileOverlay = ({
  mobileNavOpen,
  className,
  ...props
}: MobileOverlayProps) => {
  return (
    <div
      className={cn(
        `fixed inset-0 z-20 bg-black-800/70 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${mobileNavOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`,
        className,
      )}
      {...props}
    />
  );
};
