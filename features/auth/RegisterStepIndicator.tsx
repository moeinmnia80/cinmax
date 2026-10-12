"use client";

import { Check } from "lucide-react";

const steps = ["Account", "Plan", "Done"];

interface RegisterStepIndicatorProps {
  step: number;
}

export const RegisterStepIndicator = ({ step }: RegisterStepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((s, index) => (
        <div key={s} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={`size-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                index < step
                  ? "bg-destructive text-foreground"
                  : index === step
                    ? "border-2 border-destructive text-destructive"
                    : "border border-foreground/20 text-foreground/30"
              }`}
            >
              {index < step ? <Check size={12} /> : index + 1}
            </div>
            <span
              className={`text-sm uppercase tracking-wider transition-colors ${index === step ? "text-foreground" : "text-foreground/30"}`}
            >
              {s}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-8 h-px mx-3 transition-colors ${index < step ? "bg-destructive" : "bg-foreground/10"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
