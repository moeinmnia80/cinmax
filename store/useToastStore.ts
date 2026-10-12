import { create } from "zustand";

import type { ToastItem, ToastType } from "@/components/Toaster";

export type ToastOptions = Partial<
  Pick<ToastItem, "description" | "actions" | "duration">
>;

export interface ToastState {
  toasts: ToastItem[];
  add: (text: string, type?: ToastType, options?: ToastOptions) => string;
  remove: (id: string) => void;
}

const MAX_TOASTS = 4;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  add: (text, type = "info", options) => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { id, text, type, ...options }].slice(
        -MAX_TOASTS,
      ),
    }));
    return id;
  },
  remove: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

export const toast = {
  info: (text: string, options?: ToastOptions) =>
    useToastStore.getState().add(text, "info", options),
  error: (text: string, options?: ToastOptions) =>
    useToastStore.getState().add(text, "error", options),
  success: (text: string, options?: ToastOptions) =>
    useToastStore.getState().add(text, "success", options),
};
