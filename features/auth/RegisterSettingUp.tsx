"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { resetCredentials, useAppDispatch, useAppSelector } from "@/store";

export const RegisterSettingUp = () => {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoading(false);
      dispatch(resetCredentials());
      router.push("/");
    }, 5000);
    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center text-center py-8 animate-fade-in">
      {isLoading ? (
        <>
          <div className="w-16 h-16 border-2 border-foreground/10 border-t-destructive rounded-full animate-spin mb-6" />
          <h2 className="text-2xl font-black text-foreground uppercase mb-2">
            Setting Up…
          </h2>
          <p className="text-white/40 text-sm">Creating your account</p>
        </>
      ) : (
        <>
          <div className="w-20 h-20 rounded-full bg-destructive/10 border-2 border-destructive/40 flex items-center justify-center mb-6">
            <Check size={32} className="text-destructive" />
          </div>
          <h2 className="text-3xl font-black text-foreground uppercase mb-2">
            Welcome,
            <br />
            <p>{user && user.firstName}</p>
            <p>{user && user.lastName}</p>
            <span className="text-destructive">.</span>
          </h2>
          <p className="text-foreground/50 text-sm mb-8">
            Your account is ready. Redirecting you to the home page…
          </p>
          <div className="w-48 h-0.5 bg-foreground/10 rounded-full overflow-hidden">
            <div className="h-full bg-destructive animate-pulse w-full" />
          </div>
        </>
      )}
    </div>
  );
};
