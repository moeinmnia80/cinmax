"use client";

import { useState } from "react";

import { type Plan } from "@/constants/plans";
import { RegisterPlans } from "@/features/auth/RegisterPlans";
import { RegisterAccount } from "@/features/auth/RegisterAccount";
import { RegisterStepIndicator } from "@/features/auth/RegisterStepIndicator";

export const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<Plan>("standard");

  const handleStep = (value: number) => {
    if (0 > value && value >= 3) return;
    setStep(value);
  };

  const handlePlan = (type: Plan) => {
    setPlan(type);
  };

  return (
    <div className="w-full max-w-md">
      <RegisterStepIndicator step={step} />
      {step === 0 && <RegisterAccount onStepChange={handleStep} />}
      {step === 1 && (
        <RegisterPlans
          value={plan}
          onStepChange={handleStep}
          onChange={handlePlan}
        />
      )}

      {/* ── Step 2: Confirm / loading ── */}
      {/* {step === 2 && (
        <div className="flex flex-col items-center text-center py-8">
          {loading ? (
            <>
              <div className="w-16 h-16 border-2 border-white/10 border-t-[#E50914] rounded-full animate-spin mb-6" />
              <h2 className="text-2xl font-black text-white uppercase mb-2">
                Setting Up…
              </h2>
              <p className="text-white/40 text-sm">Creating your account</p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-[#E50914]/10 border-2 border-[#E50914]/40 flex items-center justify-center mb-6">
                <Check size={32} className="text-[#E50914]" />
              </div>
              <h2 className="text-3xl font-black text-white uppercase mb-2">
                Welcome,
                <br />
                {"moein"}
                <span className="text-[#E50914]">.</span>
              </h2>
              <p className="text-white/50 text-sm mb-8">
                Your account is ready. Redirecting you to the home page…
              </p>
              <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E50914] animate-pulse"
                  style={{ width: "100%" }}
                />
              </div>
            </>
          )}
          {false && (
            <div className="mt-6 bg-[#E50914]/10 border border-[#E50914]/30 rounded-xl px-4 py-3 w-full max-w-sm">
              <p className="text-[#E50914] text-sm">{"error"}</p>
              <button
                onClick={() => {}}
                className="mt-2 text-white/60 text-xs underline"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};
