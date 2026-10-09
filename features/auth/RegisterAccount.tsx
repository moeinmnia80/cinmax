import { useActionState, useState } from "react";
import { Check, Lock, Mail, User } from "lucide-react";

import { SubmitButton } from "@/features/auth/SubmitButton";
import { RegisterAuthField } from "@/features/auth/RegisterAuthFiled";
import { registerAction, RegisterFormState } from "@/app/actions/auth";
import { RegisterAccountHeader } from "@/features/auth/RegisterAccountHeader";

const initialState: RegisterFormState = { errors: {}, message: "" };

const FIELDS = [
  {
    name: "firstName",
    label: "Name",
    icon: User,
    type: "text",
    autoComplete: "given-name",
    placeholder: "Your name",
  },
  {
    name: "email",
    label: "Email Address",
    icon: Mail,
    type: "email",
    autoComplete: "email",
    placeholder: "you@example.com",
  },
  {
    name: "password",
    label: "Password",
    icon: Lock,
    type: "password",
    autoComplete: "new-password",
    placeholder: "Min. 6 characters",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    icon: Lock,
    type: "password",
    autoComplete: "new-password",
    placeholder: "Repeat password",
  },
] as const;

const REQUIRED_FIELDS = FIELDS.map((f) => f.name);

const isFormFilled = (form: HTMLFormElement) => {
  const data = new FormData(form);
  const allFilled = REQUIRED_FIELDS.every(
    (name) => String(data.get(name) ?? "").trim() !== "",
  );
  return allFilled && data.get("terms") === "on";
};

interface RegisterAccountProps {
  onStepChange: (value: number) => void;
}

export const RegisterAccount = ({ onStepChange }: RegisterAccountProps) => {
  const [state, formAction] = useActionState(registerAction, initialState);
  const [canSubmit, setCanSubmit] = useState(false);
  const formError = state.errors?._form?.[0];

  const handlePass = () => {
    if (!canSubmit || !state.success) return;
    onStepChange(1);
  };

  return (
    <form
      action={formAction}
      onChange={(e) => setCanSubmit(isFormFilled(e.currentTarget))}
      className="animate-fade-in space-y-4"
    >
      <RegisterAccountHeader />
      {FIELDS.map((field) => (
        <RegisterAuthField
          key={field.name}
          {...field}
          error={state.errors?.[field.name]?.[0]}
        />
      ))}

      <div>
        <label className="flex items-center gap-3">
          <input name="terms" type="checkbox" className="size-0 peer" />
          <span className="peer-checked:*:inline-block w-5 h-5 rounded flex items-center justify-center  peer-checked:bg-destructive border transition-all shrink-0">
            <Check size={15} className="hidden text-white" />
          </span>
          <div className="flex items-center gap-0.5">
            I agree to the
            <p className="text-white/70 hover:text-white mx-1">
              Terms of Service
            </p>{" "}
            and
            <p className="text-white/70 hover:text-white mx-1">
              Privacy Policy
            </p>
          </div>
        </label>

        {state.errors?.terms?.[0] && (
          <p role="alert" className="mt-1 text-xs text-red-500">
            {state.errors.terms[0]}
          </p>
        )}
      </div>

      {formError && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3"
        >
          <p className="text-sm text-destructive">{formError}</p>
        </div>
      )}

      <SubmitButton
        onClick={handlePass}
        disabled={!canSubmit}
        className="mt-2 w-full rounded-xl bg-destructive py-4 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-red-900/30 transition-all enabled:hover:bg-destructive/60 enabled:active:scale-[0.98]"
      >
        Continue →
      </SubmitButton>
    </form>
  );
};
