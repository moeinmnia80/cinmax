import { useEffect, useEffectEvent } from "react";

type Combo = {
  key: string;
  mod: boolean; // Cmd on macOS, Ctrl elsewhere
  ctrl: boolean;
  meta: boolean;
  alt: boolean;
  shift: boolean;
};

const ALIASES: Record<string, string> = { esc: "escape", space: " " };

function parseCombo(combo: string): Combo {
  const parts = combo
    .toLowerCase()
    .split("+")
    .map((p) => p.trim());
  const rawKey = parts.pop() ?? "";
  return {
    key: ALIASES[rawKey] ?? rawKey,
    mod: parts.includes("mod"),
    ctrl: parts.includes("ctrl"),
    meta: parts.includes("meta"),
    alt: parts.includes("alt"),
    shift: parts.includes("shift"),
  };
}

function isEditableTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || target.matches("input, textarea, select"))
  );
}

function matches(e: KeyboardEvent, c: Combo) {
  if (e.key.toLowerCase() !== c.key) return false;

  if (c.mod) {
    if (!e.metaKey && !e.ctrlKey) return false;
  } else if (e.ctrlKey !== c.ctrl || e.metaKey !== c.meta) {
    return false;
  }

  if (e.altKey !== c.alt) return false;

  // Shift is only strict for letters/digits. Punctuation like "/" needs
  // Shift on some layouts (e.g. German: Shift+7), so we ignore it there.
  const shiftSensitive = /^[a-z0-9]$/.test(c.key);
  if (e.shiftKey !== c.shift && (c.shift || shiftSensitive)) return false;

  return true;
}

type Options = {
  enabled?: boolean;
  preventDefault?: boolean;
};

/**
 * @example
 * useHotkey("mod+k", () => setOpen(true));
 * useHotkey(["/", "mod+k"], focusSearch);
 * useHotkey("esc", close, { enabled: isOpen });
 *
 * Combos without ctrl/meta/alt are ignored while typing in a field.
 */
export function useHotkey(
  combos: string | string[],
  callback: (e: KeyboardEvent) => void,
  { enabled = true, preventDefault = true }: Options = {},
) {
  // Always calls the latest callback without re-subscribing the listener
  const onTrigger = useEffectEvent(callback);

  // Stable primitive dependency, so inline arrays don't resubscribe every render
  const combosKey = Array.isArray(combos) ? combos.join("|") : combos;

  useEffect(() => {
    if (!enabled) return;

    const parsed = combosKey.split("|").map(parseCombo);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing || e.repeat) return;

      const typing = isEditableTarget(e.target);

      for (const combo of parsed) {
        const hasModifier = combo.mod || combo.ctrl || combo.meta || combo.alt;
        if (typing && !hasModifier) continue;

        if (matches(e, combo)) {
          if (preventDefault) e.preventDefault();
          onTrigger(e);
          return;
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [combosKey, enabled, preventDefault]);
}
