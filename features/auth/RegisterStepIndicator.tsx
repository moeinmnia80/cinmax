import { Check } from "lucide-react";

const steps = ["Account", "Plan", "Done"];

export const RegisterStepIndicator = ({ step }: { step: number }) => {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((s, index) => (
        <div key={s} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={`size-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                index < step
                  ? "bg-destructive text-white"
                  : index === step
                    ? "border-2 border-destructive text-destructive"
                    : "border border-white/20 text-white/30"
              }`}
            >
              {index < step ? <Check size={12} /> : index + 1}
            </div>
            <span
              className={`text-xs uppercase tracking-wider transition-colors ${index === step ? "text-white" : "text-white/30"}`}
            >
              {s}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-8 h-px mx-3 transition-colors ${index < step ? "bg-destructive" : "bg-white/10"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
