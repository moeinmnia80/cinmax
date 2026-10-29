"use client";

import { useState } from "react";

import {
  RegisterPlans,
  RegisterAccount,
  RegisterSettingUp,
  RegisterStepIndicator,
} from "@/features/client";

export const RegisterForm = () => {
  const [step, setStep] = useState(0);

  const handleStep = (value: number) => {
    if (0 > value && value >= 3) return;
    setStep(value);
  };

  return (
    <div className="w-full max-w-md">
      <RegisterStepIndicator step={step} />
      {step === 0 && <RegisterAccount onStepChange={handleStep} />}
      {step === 1 && <RegisterPlans onStepChange={handleStep} />}
      {step === 2 && <RegisterSettingUp />}
    </div>
  );
};
