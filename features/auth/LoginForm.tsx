"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { SubmitButton } from "@/features/auth/SubmitButton";
import { FormState, loginAction } from "@/app/actions/auth";

const initialState: FormState = {
  errors: {},
  message: "",
};

export const LoginForm = () => {
  const [state, formAction] = useActionState(loginAction, initialState);
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  return (
    <form action={formAction} className="space-y-4">
      {state.errors?._form && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
          {state.errors._form.join(", ")}
        </div>
      )}
      <div>
        <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#E50914]/60 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder-white/25 outline-none transition-all"
          />
          {state.errors?.email && (
            <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs uppercase tracking-widest text-white/40">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            id="password"
            type={showPw ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#E50914]/60 rounded-xl pl-11 pr-12 py-3.5 text-white text-sm placeholder-white/25 outline-none transition-all"
          />
          {state.errors?.password && (
            <p className="mt-1 text-xs text-red-500">
              {state.errors.password[0]}
            </p>
          )}
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
          >
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {/* Remember me */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setRemember((v) => !v)}
          className={`w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0 ${remember ? "bg-[#E50914] border-[#E50914]" : "border-white/20 bg-white/4"}`}
        >
          {remember && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 4L4 7L9 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
        <span
          className="text-white/50 text-sm select-none cursor-pointer"
          onClick={() => setRemember((v) => !v)}
        >
          Keep me signed in
        </span>
      </div>

      {/* Error */}
      {state.errors?._form && (
        <div className="bg-[#E50914]/10 border border-[#E50914]/30 rounded-xl px-4 py-3">
          <p className="text-[#E50914] text-sm">{state.errors._form}</p>
        </div>
      )}

      {/* Submit */}
      <SubmitButton />
    </form>
  );
};
