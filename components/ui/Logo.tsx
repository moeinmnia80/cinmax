import { cn } from "@/utils";
import Link from "next/link";
import { ComponentProps } from "react";

export const Logo = ({ className, ...props }: ComponentProps<"a">) => {
  return (
    <Link
      href="/"
      className={cn(
        "text-primary font-black tracking-widest text-4xl select-none shrink-0",
        className,
      )}
      {...props}
    >
      CINEMAX
    </Link>
  );
};
