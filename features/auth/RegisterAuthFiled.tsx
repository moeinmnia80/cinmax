import { useState, type ComponentProps } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

type RegisterAuthFieldProps = Omit<ComponentProps<"input">, "id" | "name"> & {
  name: string;
  label: string;
  icon: LucideIcon;
  error?: string;
};

export const RegisterAuthField = ({
  name,
  label,
  icon: Icon,
  error,
  type = "text",
  ...props
}: RegisterAuthFieldProps) => {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const errorId = `${name}-error`;

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs uppercase tracking-widest text-white/40"
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          size={15}
          aria-hidden
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
        />
        <input
          {...props}
          id={name}
          name={name}
          type={isPassword && visible ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full rounded-xl border bg-white/5 py-3.5 pl-11 text-sm text-white placeholder-white/25 outline-none transition-all hover:border-white/20 focus:border-destructive/60 ${
            isPassword ? "pr-12" : "pr-4"
          } ${error ? "border-destructive/60" : "border-white/10"}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
          >
            {visible ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};
