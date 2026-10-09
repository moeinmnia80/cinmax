import { cn } from "@/utils";
import { plans, POPULAR_PLAN, type PlanType } from "@/constants/plans";

type PlanItem = (typeof plans)[number];

interface PlanOptionProps {
  plan: PlanItem;
  checked: boolean;
  onSelect: (type: PlanType) => void;
}

export const PlanOption = ({
  plan: { type, name, price, icon: Icon, features, styles },
  checked,
  onSelect,
}: PlanOptionProps) => (
  <label
    className={cn(
      "flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 text-left transition-all has-focus-visible:ring-2 has-focus-visible:ring-foreground/30",
      checked
        ? cn("bg-foreground/4", styles.border)
        : "border-foreground/8 hover:border-foreground/20",
    )}
  >
    <input
      type="radio"
      name="plan"
      value={type}
      checked={checked}
      onChange={() => onSelect(type)}
      className="sr-only"
    />

    <span
      aria-hidden
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
        checked ? styles.border : "border-foreground/10",
      )}
    >
      {checked && <span className={cn("size-2.5 rounded-full", styles.dot)} />}
    </span>

    <span
      aria-hidden
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-lg border",
        styles.icon,
      )}
    >
      <Icon size={16} />
    </span>

    <span className="min-w-0 flex-1">
      <span className="mb-0.5 flex items-center gap-2">
        <span className="text-sm font-black uppercase text-foreground">
          {name}
        </span>
        {type === POPULAR_PLAN && (
          <span
            className={cn(
              "rounded-full border px-1.5 py-0.5 font-condensed text-[9px] font-bold uppercase tracking-wider",
              styles.badge,
            )}
          >
            Popular
          </span>
        )}
      </span>
      <span className="block truncate text-xs text-foreground/40">
        {features.join(" · ")}
      </span>
    </span>

    <span className="shrink-0 text-right">
      <span className="block text-lg font-black leading-none text-foreground">
        ${price.toFixed(2)}
      </span>
      <span className="mt-0.5 block text-[10px] text-foreground/30">
        /month
      </span>
    </span>
  </label>
);
