import { Check } from "lucide-react";

const features = [
  "Stream on any device, anywhere",
  "Cancel anytime, no contracts",
  "Earn points & climb the League Board",
  "Exclusive early access to coming releases",
];

export const RegisterFeatureList = () => {
  return (
    <ul className="space-y-4 mb-12">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-destructive/20 border border-destructive/40 flex items-center justify-center shrink-0">
            <Check size={10} className="text-destructive" />
          </div>
          <span className="text-white/70 text-sm">{feature}</span>
        </li>
      ))}
    </ul>
  );
};
