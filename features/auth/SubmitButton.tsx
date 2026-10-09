"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/utils";

export function SubmitButton({
  children,
  className,
  ...props
}: ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "w-full bg-destructive enabled:hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2.5 text-sm uppercase tracking-wider shadow-lg shadow-red-900/30 mt-2",
        className,
      )}
      {...props}
    >
      {pending ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}
