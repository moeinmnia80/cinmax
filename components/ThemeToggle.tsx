"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function ThemeToggle({ className }: ComponentProps<"button">) {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        "group relative inline-flex shrink-0 size-10 items-center justify-center",
        "rounded-full border border-border bg-foreground/5 text-foreground",
        "transition-colors duration-200 hover:bg-accent active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <Sun
        className={cn(
          "absolute size-5 rotate-0 scale-100 text-foreground/50 stroke-[1.5]",
          "transition-all duration-300 motion-reduce:transition-none",
          "dark:-rotate-90 dark:scale-0",
        )}
      />
      <Moon
        className={cn(
          "absolute size-5 rotate-90 scale-0 text-foreground/50 stroke-[1.5]",
          "transition-all duration-300 motion-reduce:transition-none",
          "dark:rotate-0 dark:scale-100",
        )}
      />
    </button>
  );
}
