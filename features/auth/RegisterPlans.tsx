"use client";

import { useActionState, useEffect, useState } from "react";

import { useAppSelector } from "@/store";
import { planAction } from "@/app/actions/auth";
import { type Plan, plans } from "@/constants/plans";
import { SubmitButton, PlanOption } from "@/features/client";

interface RegisterPlansProps {
  onStepChange: (value: number) => void;
}

const initialState = {
  errors: {},
  message: "",
};

export const RegisterPlans = ({ onStepChange }: RegisterPlansProps) => {
  const [plan] = useState<Plan>("standard");

  const user = useAppSelector((state) => state.auth.user);
  const boundPlanAction = planAction.bind(null, user!.id);
  const [state, formAction, isPending] = useActionState(
    boundPlanAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      onStepChange(2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  return (
    <form action={formAction} className="w-full animate-fade-in space-y-5">
      <header className="mb-6">
        <h1 className="mb-1 text-3xl font-black uppercase leading-tight text-foreground">
          Pick Your Plan
        </h1>
        <p className="text-sm text-foreground/40">Change or cancel anytime.</p>
      </header>

      <div
        role="radiogroup"
        aria-label="Subscription plan"
        className="space-y-3"
      >
        {plans.map((p) => (
          <PlanOption
            key={p.type}
            plan={p}
            checked={plan === p.type}
            onSelect={() => {}}
          />
        ))}
      </div>

      <p className="text-center text-xs text-foreground/25">
        No credit card required to get started. 30-day free trial on all plans.
      </p>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => onStepChange(0)}
          className="rounded-xl border border-foreground/10 px-6 py-3.5 text-sm text-foreground/50 transition-all hover:border-foreground/25 hover:text-foreground"
        >
          Back
        </button>
        <SubmitButton
          disabled={isPending}
          className="flex justify-center flex-1 rounded-xl bg-destructive py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-red-900/30 transition-all hover:bg-destructive/60 active:scale-[0.98] mt-0"
        >
          Create Account →
        </SubmitButton>
      </div>
    </form>
  );
};
