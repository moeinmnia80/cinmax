import type { RefObject } from "react";
import { useHotkey } from "@/hooks/useHotkey";

export function useFocusShortcut<T extends HTMLElement>(
  ref: RefObject<T | null>,
  combos: string | string[] = ["/", "mod+k"],
) {
  useHotkey(combos, () => {
    const el = ref.current;
    if (!el) return;

    el.focus();
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      el.select();
    }
  });
}
