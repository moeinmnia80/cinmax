"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // resolvedTheme is only read inside the handler (client-only), so no mount check is needed
  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="
        group relative inline-flex size-10 items-center justify-center
        rounded-full border border-border bg-card text-card-foreground
        shadow-sm transition-colors duration-200
        hover:bg-accent hover:text-accent-foreground
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-ring focus-visible:ring-offset-2
        focus-visible:ring-offset-background
        active:scale-95
      "
    >
      <Sun
        className="
          absolute size-5 rotate-0 scale-100 transition-all duration-300
          motion-reduce:transition-none
          dark:-rotate-90 dark:scale-0
        "
      />
      <Moon
        className="
          absolute size-5 rotate-90 scale-0 transition-all duration-300
          motion-reduce:transition-none
          dark:rotate-0 dark:scale-100
        "
      />
    </button>
  );
}
