"use client";

import { useState, type ComponentProps } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

import { calculatePasswordStrength } from "@/lib/password";
import { PasswordStrengthBars } from "@/components/ui/PasswordStrengthBars";

type AuthFieldProps = Omit<ComponentProps<"input">, "id" | "name"> & {
  name: string;
  label: string;
  icon: LucideIcon;
  error?: string;
  strengthBar?: boolean;
};

export const AuthField = ({
  className,
  name,
  label,
  icon: Icon,
  error,
  type = "text",
  strengthBar = false,
  ...props
}: AuthFieldProps) => {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const passwordScore = calculatePasswordStrength(password);

  const isPassword = type === "password";
  const errorId = `${name}-error`;

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-2 block text-xs uppercase tracking-widest text-foreground/40"
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          size={15}
          aria-hidden
          className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30"
        />
        <input
          {...props}
          id={name}
          name={name}
          type={isPassword && visible ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => name === "password" && setPassword(e.target.value)}
          className={`w-full rounded-xl border bg-foreground/5 py-3.5 pl-11 text-sm text-foreground placeholder-foreground/25 outline-none transition-all hover:border-foreground/20 focus:border-destructive/60 ${
            isPassword ? "pr-12" : "pr-4"
          } ${error ? "border-destructive/60" : "border-foreground/10"}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30 transition-colors hover:text-foreground/60"
          >
            {visible ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {name === "password" && strengthBar && (
        <PasswordStrengthBars score={passwordScore} />
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};
