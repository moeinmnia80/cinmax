"use client";

import { LogIn } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-destructive enabled:hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2.5 text-sm uppercase tracking-wider shadow-lg shadow-red-900/30 mt-2"
    >
      {pending ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Signing in…
        </>
      ) : (
        <>
          <LogIn size={16} /> Sign In
        </>
      )}
    </button>
  );
}
