"use client";

import { ChevronDown } from "lucide-react";
import {
  useId,
  useRef,
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
  type Dispatch,
  type RefObject,
  type ComponentProps,
  type KeyboardEvent,
  type SetStateAction,
} from "react";

import { cn } from "@/utils";
import { useClickOutside } from "@/hooks/useClickOutside";

/* ---------- Types ---------- */

export interface SelectOption {
  id: string | number;
  label: string;
  value?: string | number;
  /** Replaces the old magic `id: "empty"` check. Disabled options can't be picked. */
  disabled?: boolean;
}

interface SelectContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selected: SelectOption;
  select: (option: SelectOption) => void;
  defaultValue: SelectOption;
  triggerRef: RefObject<HTMLButtonElement | null>;
  listId: string;
  triggerId: string;
}

/* ---------- Context (null default + guard instead of `{} as ...`) ---------- */

const SelectContext = createContext<SelectContextProps | null>(null);

const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be rendered inside <Select>");
  }
  return context;
};

const ENABLED_OPTIONS = '[role="option"]:not([aria-disabled="true"])';

/* ---------- Select (root) ---------- */

interface SelectProps extends Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange"
> {
  /** Initial value, and the value "Reset" goes back to. Hoist it outside render. */
  defaultValue: SelectOption;
  /** Pass `value` + `onValueChange` for controlled usage. */
  value?: SelectOption;
  onValueChange?: (option: SelectOption) => void;
  /** When set, the selected value is submitted with the surrounding <form>. */
  name?: string;
}

export const Select = ({
  children,
  className,
  defaultValue,
  value,
  onValueChange,
  name,
  ...props
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internal, setInternal] = useState(defaultValue);

  const domNode = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const id = useId();
  const listId = `${id}-list`;
  const triggerId = `${id}-trigger`;

  const isControlled = value !== undefined;
  const selected = isControlled ? value : internal;

  const select = useCallback(
    (option: SelectOption) => {
      if (!isControlled) setInternal(option);
      onValueChange?.(option);
    },
    [isControlled, onValueChange],
  );

  useClickOutside({ domNode, setState: setIsOpen });

  // Stable context value: consumers don't re-render just because the parent did.
  const context = useMemo<SelectContextProps>(
    () => ({
      isOpen,
      setIsOpen,
      selected,
      select,
      defaultValue,
      triggerRef,
      listId,
      triggerId,
    }),
    [isOpen, selected, select, defaultValue, listId, triggerId],
  );

  return (
    <SelectContext value={context}>
      <div ref={domNode} className={cn("relative", className)} {...props}>
        {name && (
          <input
            type="hidden"
            name={name}
            value={selected.value ?? selected.id}
          />
        )}
        {children}
      </div>
    </SelectContext>
  );
};

/* ---------- SelectButton (trigger) ---------- */

interface SelectButtonProps extends Omit<
  ComponentProps<"div">,
  "onReset" | "onClick"
> {
  onReset?: () => void;
}

export const SelectButton = ({
  onReset,
  className,
  ...props
}: SelectButtonProps) => {
  const {
    isOpen,
    setIsOpen,
    selected,
    select,
    defaultValue,
    triggerRef,
    listId,
    triggerId,
  } = useSelect();

  const toggle = () => setIsOpen((prev) => !prev);
  const isChanged = selected.id !== defaultValue.id;

  const reset = () => {
    onReset?.();
    select(defaultValue);
  };

  const onTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  // Layout: a real <button> for the trigger, and Reset as its *sibling*
  // (a <button> inside a clickable <div role=button> is invalid HTML).
  return (
    <div className={cn("items-center gap-2", className)} {...props}>
      <button
        id={triggerId}
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        onClick={toggle}
        onKeyDown={onTriggerKeyDown}
        className="flex min-w-0 flex-1 cursor-pointer justify-between gap-2 rounded-sm text-left outline-0 focus-visible:ring-1 focus-visible:ring-foreground/40"
      >
        {/* key re-triggers the fade when the selection changes */}
        <span key={selected.id} className="truncate uppercase animate-fade-in">
          {selected.label}
        </span>
        {selected.value !== undefined && (
          <span className="shrink-0 opacity-50">{selected.value}</span>
        )}
      </button>

      {isChanged && (
        <button
          type="button"
          onClick={reset}
          className="opacity-30 transition duration-200 hover:opacity-50"
        >
          Reset
        </button>
      )}

      {/* Mouse-only affordance; the trigger button is the accessible control */}
      <ChevronDown
        aria-hidden="true"
        onClick={toggle}
        className={cn(
          "size-3 shrink-0 cursor-pointer stroke-st-primary transition duration-200",
          isOpen ? "rotate-180" : "rotate-0",
        )}
      />
    </div>
  );
};

/* ---------- SelectLabel ---------- */

export const SelectLabel = ({
  className,
  ...props
}: ComponentProps<"label">) => {
  const { triggerId } = useSelect();

  return <label htmlFor={triggerId} className={className} {...props} />;
};

/* ---------- SelectContent (listbox) ---------- */

export const SelectContent = ({
  children,
  className,
  onKeyDown,
  ...props
}: ComponentProps<"ul">) => {
  const { isOpen, setIsOpen, triggerRef, listId } = useSelect();
  const listRef = useRef<HTMLUListElement>(null);

  // Move focus into the list when it opens: selected item first, else first enabled one.
  useEffect(() => {
    if (!isOpen) return;
    const list = listRef.current;
    const target =
      list?.querySelector<HTMLElement>('[aria-selected="true"]') ??
      list?.querySelector<HTMLElement>(ENABLED_OPTIONS);
    target?.focus();
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    onKeyDown?.(e);

    const options = Array.from(
      e.currentTarget.querySelectorAll<HTMLElement>(ENABLED_OPTIONS),
    );
    const index = options.indexOf(document.activeElement as HTMLElement);
    const focusAt = (i: number) => {
      e.preventDefault();
      options[i]?.focus();
    };

    switch (e.key) {
      case "ArrowDown":
        focusAt(Math.min(index + 1, options.length - 1));
        break;
      case "ArrowUp":
        focusAt(Math.max(index - 1, 0));
        break;
      case "Home":
        focusAt(0);
        break;
      case "End":
        focusAt(options.length - 1);
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  // Unmounted while closed: no hidden DOM, and the open animation
  // class you pass (e.g. animate-slide-down) plays on every open.
  if (!isOpen) return null;

  return (
    <ul
      ref={listRef}
      id={listId}
      role="listbox"
      onKeyDown={handleKeyDown}
      className={cn("absolute top-full z-10 flex flex-col", className)}
      {...props}
    >
      {children}
    </ul>
  );
};

/* ---------- SelectItems (option) ---------- */

interface SelectItemsProps extends Omit<ComponentProps<"li">, "onClick"> {
  onClick?: (option: SelectOption) => void;
  option: SelectOption;
}

export const SelectItems = ({
  onClick,
  option,
  children,
  className,
  ...props
}: SelectItemsProps) => {
  const { selected, select, setIsOpen, triggerRef } = useSelect();
  const isSelected = selected.id === option.id;

  const choose = () => {
    if (option.disabled) return;

    onClick?.(option);
    if (!isSelected) select(option);

    // Always close, even when the same option is picked again.
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <li
      role="option"
      tabIndex={-1}
      aria-selected={isSelected}
      aria-disabled={option.disabled || undefined}
      onClick={choose}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          choose();
        }
      }}
      className={cn(
        "outline-0 focus:bg-foreground/10",
        option.disabled && "cursor-not-allowed opacity-40",
        className,
      )}
      {...props}
    >
      {children}
    </li>
  );
};
