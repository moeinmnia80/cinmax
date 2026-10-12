"use client";

import { Toaster } from "@/components/Toaster";
import { useToastStore } from "@/store/useToastStore";

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed bottom-10 right-10 z-30 flex w-[min(28rem,calc(100vw-2rem))] flex-col gap-3">
      {toasts.map((t) => (
        <Toaster key={t.id} {...t} />
      ))}
    </div>
  );
};
