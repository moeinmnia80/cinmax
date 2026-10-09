import { AppleIcon } from "@/components/ui/icons/AppleIcon";
import { GoogleIcon } from "@/components/ui/icons/GoogleIcon";

export const LoginOAuthMethods = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        {
          label: "Google",
          icon: <GoogleIcon className="size-4" />,
        },
        {
          label: "Apple",
          icon: <AppleIcon className="size-4" />,
        },
      ].map(({ label, icon }) => (
        <button
          key={label}
          className="flex items-center justify-center gap-2.5 border border-white/10 hover:border-white/25 bg-white/3 hover:bg-white/6 rounded-xl py-3 text-white/70 hover:text-white text-sm transition-all"
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
};
