"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { Check, LogIn } from "lucide-react";
import { useActionState, useEffect } from "react";

import { toast, useAppDispatch } from "@/store";
import { SubmitButton } from "@/features/client";
import { LOGIN_FIELDS } from "@/constants/authFields";
import { AuthField } from "@/features/auth/AuthFiled";
import { LoginFormState, loginAction } from "@/app/actions/auth";

const initialState: LoginFormState = {
  errors: {},
  message: "",
};

export const LoginForm = () => {
  const [state, formAction] = useActionState(loginAction, initialState);

  const dispatch = useAppDispatch();
  const formError = state.errors?._form?.[0];

  useEffect(() => {
    if (state.success) {
      redirect("/");
    } else if (formError) {
      toast.error("Something went wrong", {
        description: formError,
        actions: [
          { label: "Retry", variant: "primary", onClick: () => {} },
          { label: "Dismiss" },
        ],
      });
    }
  }, [state.success, formError, dispatch]);

  return (
    <form action={formAction} className="space-y-4">
      {LOGIN_FIELDS.map((field) => (
        <AuthField
          key={field.name}
          {...field}
          error={state.errors?.[field.name]?.[0]}
        />
      ))}
      <div className="flex items-center justify-between">
        <label className="flex items-center justify-start gap-3">
          <input name="remember" type="checkbox" className="size-0 peer" />
          <span className="peer-checked:*:inline-block w-5 h-5 rounded flex items-center justify-center peer-checked:bg-destructive border border-foreground/10 transition-all shrink-0">
            <Check size={15} className="hidden text-foreground" />
          </span>
          <div className="flex flex-wrap items-center text-sm font-normal text-foreground/20 gap-0.5">
            Keep me signed in
          </div>
        </label>
        <Link
          href="/forgot-password"
          className="text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          Forgot password?
        </Link>
      </div>
      {state.errors?.remember?.[0] && (
        <p role="alert" className="mt-1 text-xs text-red-500">
          {state.errors.remember[0]}
        </p>
      )}
      <SubmitButton>
        <LogIn size={16} /> Sign In
      </SubmitButton>
    </form>
  );
};
