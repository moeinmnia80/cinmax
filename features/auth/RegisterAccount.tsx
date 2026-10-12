"use client";

import { Check, User } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

import { FIELDS } from "@/constants/authFields";
import { AuthField, SubmitButton } from "@/features/client";
import { useAppDispatch, setCredentials, toast } from "@/store";
import { registerAction, RegisterFormState } from "@/app/actions/auth";
import { RegisterAccountHeader } from "@/features/auth/RegisterAccountHeader";

const initialState: RegisterFormState = { errors: {}, message: "" };

interface RegisterAccountProps {
  onStepChange: (value: number) => void;
}

export const RegisterAccount = ({ onStepChange }: RegisterAccountProps) => {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );
  const [canSubmit, setCanSubmit] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state.success) {
      if (state.user) {
        dispatch(setCredentials(state.user));
      }
      onStepChange(1);
    } else if (!state.errors) {
      toast.error("Something went wrong", {
        description: state.message,
        actions: [
          { label: "Retry", variant: "primary", onClick: () => {} },
          { label: "Dismiss" },
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement, Element>) => {
    const form = e.currentTarget;
    const data = new FormData(form);
    const allFilled = FIELDS.map((f) => f.name).every(
      (name) => String(data.get(name) ?? "").trim() !== "",
    );
    setCanSubmit(allFilled && data.get("terms") === "on");
  };

  return (
    <form
      action={formAction}
      onChange={handleFormChange}
      className="animate-fade-in space-y-4"
    >
      <RegisterAccountHeader />
      <div className="flex gap-4">
        <AuthField
          className="flex-1"
          name="firstName"
          label="Name"
          icon={User}
          type="text"
          autoComplete="given-name"
          placeholder="Your name"
          error={state.errors?.firstName?.[0]}
        />
        <AuthField
          className="flex-1"
          name="lastName"
          label="Family Name"
          icon={User}
          type="text"
          autoComplete="given-name"
          placeholder="Your family name"
          error={state.errors?.lastName?.[0]}
        />
      </div>
      {FIELDS.map((field) => (
        <AuthField
          key={field.name}
          {...field}
          error={state.errors?.[field.name]?.[0]}
        />
      ))}

      <label className="flex items-center gap-3">
        <input name="terms" type="checkbox" className="size-0 peer" />
        <span className="peer-checked:*:inline-block w-5 h-5 rounded flex items-center justify-center  peer-checked:bg-destructive border border-foreground/10 transition-all shrink-0">
          <Check size={15} className="hidden text-foreground" />
        </span>
        <div className="flex flex-wrap items-center gap-0.5">
          I agree to the
          <p className="text-foreground/70 hover:text-foreground mx-1">
            Terms of Service
          </p>{" "}
          and
          <p className="text-foreground/70 hover:text-foreground mx-1">
            Privacy Policy
          </p>
        </div>
      </label>
      {state.errors?.terms?.[0] && (
        <p role="alert" className="mt-1 text-xs text-red-500">
          {state.errors.terms[0]}
        </p>
      )}
      <SubmitButton
        disabled={!canSubmit || isPending}
        className="w-full rounded-xl bg-destructive py-4 text-sm font-black uppercase tracking-wider text-foreground shadow-lg shadow-destructive/30 mt-2 transition-all enabled:hover:bg-destructive/60 enabled:active:scale-[0.98]"
      >
        Continue →
      </SubmitButton>
    </form>
  );
};
