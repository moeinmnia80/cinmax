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
