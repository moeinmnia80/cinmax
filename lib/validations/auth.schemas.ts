import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email({ message: "Invalid email address." })
    .min(1, { message: "Email is required." }),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters." }),
});

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required"),
    email: z.email("Enter a valid email"),
    password: z.string().min(6, "Min. 6 characters"),
    confirmPassword: z.string(),
    terms: z.literal("on", { error: "You must accept the terms" }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
