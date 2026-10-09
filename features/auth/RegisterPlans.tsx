import { PlanOption } from "@/features/auth/RegisterPlanOption";
import { type Plan, type PlanType, plans } from "@/constants/plans";
import { SubmitButton } from "./SubmitButton";

interface RegisterPlansProps {
  value: Plan;
  onChange: (plan: PlanType) => void;
  onStepChange: (value: number) => void;
}

export const RegisterPlans = ({
  value,
  onChange,
  onStepChange,
}: RegisterPlansProps) => {
  const handlePass = () => {
    onStepChange(2);
  };
  return (
    <form className="w-full animate-fade-in space-y-5">
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
        {plans.map((plan) => (
          <PlanOption
            key={plan.type}
            plan={plan}
            checked={value === plan.type}
            onSelect={onChange}
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
          onClick={handlePass}
          className="flex justify-center flex-1 rounded-xl bg-destructive py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-red-900/30 transition-all hover:bg-destructive/60 active:scale-[0.98] mt-0"
        >
          Create Account →
        </SubmitButton>
      </div>
    </form>
  );
};
