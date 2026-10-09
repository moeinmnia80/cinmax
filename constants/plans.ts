import { Crown, Shield, Zap, type LucideIcon } from "lucide-react";

interface PlanConfig {
  type: string;
  name: string;
  price: number;
  icon: LucideIcon;
  features: readonly string[];
  styles: {
    border: string;
    dot: string;
    icon: string;
    badge: string;
  };
}

export const plans = [
  {
    type: "basic",
    name: "Basic",
    price: 8.99,
    icon: Shield,
    features: ["HD Quality", "1 Screen", "Ad-supported"],
    styles: {
      border: "border-plan-basic",
      dot: "bg-plan-basic",
      icon: "border-plan-basic/20 bg-plan-basic/10 text-plan-basic",
      badge: "border-plan-basic/25 bg-plan-basic/15 text-plan-basic",
    },
  },
  {
    type: "standard",
    name: "Standard",
    price: 14.99,
    icon: Zap,
    features: ["1080p Full HD", "2 Screens", "No ads", "10 downloads"],
    styles: {
      border: "border-plan-standard",
      dot: "bg-plan-standard",
      icon: "border-plan-standard/20 bg-plan-standard/10 text-plan-standard",
      badge: "border-plan-standard/25 bg-plan-standard/15 text-plan-standard",
    },
  },
  {
    type: "premium",
    name: "Premium",
    price: 22.99,
    icon: Crown,
    features: [
      "4K Ultra HD",
      "4 Screens",
      "Unlimited downloads",
      "Dolby Atmos",
    ],
    styles: {
      border: "border-plan-premium",
      dot: "bg-plan-premium",
      icon: "border-plan-premium/20 bg-plan-premium/10 text-plan-premium",
      badge: "border-plan-premium/25 bg-plan-premium/15 text-plan-premium",
    },
  },
] as const satisfies readonly PlanConfig[];

export type PlanType = (typeof plans)[number]["type"];
export type Plan = PlanType | "none";

export const POPULAR_PLAN = "standard" satisfies PlanType;
