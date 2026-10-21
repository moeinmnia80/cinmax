"use client";

import { ComponentProps } from "react";

import { cn } from "@/utils";

export const LABEL_TEXT =
  "block text-xs tracking-widest uppercase text-foreground/60";
export const CONTROL =
  "mt-1 w-full rounded-sm border border-foreground/10 bg-foreground/5 px-2 py-1 text-foreground outline-0";

interface FieldProps extends ComponentProps<"label"> {
  label: string;
}

export const Field = ({ label, children, className }: FieldProps) => (
  <label className={cn("block min-w-0 col-span-4", className)}>
    <span className={LABEL_TEXT}>{label}</span>
    {children}
  </label>
);

export const TextInput = ({
  name,
  defaultValue,
  inputMode,
  placeholder,
}: {
  name: string;
  defaultValue?: string | number;
  inputMode?: "numeric" | "decimal";
  placeholder?: string;
}) => (
  <input
    type="text"
    name={name}
    defaultValue={defaultValue}
    inputMode={inputMode}
    placeholder={placeholder}
    className={`${CONTROL} placeholder:text-sm`}
  />
);
