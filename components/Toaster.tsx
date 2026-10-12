"use client";

import { useCallback, useEffect, useState } from "react";
import { CircleCheck, CircleX, Info, X } from "lucide-react";

import type { LucideIcon } from "lucide-react";
import { useToastStore } from "@/store";

export type ToastType = "error" | "success" | "info";

export interface ToastAction {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "muted";
}

export interface ToastItem {
  id: string;
  text: string;
  type: ToastType;
  description?: string;
  actions?: ToastAction[];
  duration?: number;
}

const EXIT_MS = 300;

const TYPE_CONFIG: Record<
  ToastType,
  { Icon: LucideIcon; icon: string; gradient: string }
> = {
  success: {
    Icon: CircleCheck,
    icon: "fill-emerald-600 text-white",
    gradient: "from-emerald-500/10",
  },
  info: {
    Icon: Info,
    icon: "fill-blue-600 text-white",
    gradient: "from-blue-500/10",
  },
  error: {
    Icon: CircleX,
    icon: "fill-red-600 text-white",
    gradient: "from-red-500/10",
  },
};

export const Toaster = ({
  id,
  text,
  type = "info",
  actions,
  duration = 5000,
  description,
}: ToastItem) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const remove = useToastStore((state) => state.remove);

  const dismiss = useCallback(() => setIsLeaving(true), []);

  useEffect(() => {
    if (isLeaving) {
      const removeTimer = setTimeout(() => remove(id), EXIT_MS);
      return () => clearTimeout(removeTimer);
    }
    if (isPaused) return; // hovering → keep it on screen

    const leaveTimer = setTimeout(dismiss, duration);
    return () => clearTimeout(leaveTimer);
  }, [id, remove, dismiss, duration, isLeaving, isPaused]);

  const { Icon, icon, gradient } = TYPE_CONFIG[type];

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      data-testid="toaster"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative flex items-start gap-3 w-full rounded-2xl border border-foreground/10 bg-linear-to-br ${gradient} via-background via-60% to-background px-4 py-3.5 shadow-lg shadow-foreground/5 animate-slide-up transition-all duration-300 backdrop-blur-xs ${
        isLeaving ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
      }`}
    >
      <Icon size={20} strokeWidth={1} className={`mt-px shrink-0 ${icon}`} />

      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium leading-6 text-foreground">
          {text}
        </p>

        {description && (
          <p className="mt-1 text-sm leading-5 text-foreground/60">
            {description}
          </p>
        )}

        {actions && actions.length > 0 && (
          <div className="mt-3 flex items-center gap-4">
            {actions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => {
                  action.onClick?.();
                  dismiss();
                }}
                className={`text-sm font-medium transition-opacity hover:opacity-70 ${
                  action.variant === "primary"
                    ? "text-blue-600"
                    : "text-foreground/50"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Close notification"
        className="shrink-0 mt-0.5 text-foreground/50 transition-colors hover:text-foreground"
      >
        <X size={18} />
      </button>
    </div>
  );
};
