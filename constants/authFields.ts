import { Lock, Mail, User } from "lucide-react";

export const LOGIN_FIELDS = [
  {
    name: "email",
    label: "Email Address",
    icon: Mail,
    type: "email",
    autoComplete: "email",
    placeholder: "you@example.com",
  },
  {
    name: "password",
    label: "Password",
    icon: Lock,
    type: "password",
    autoComplete: "new-password",
    placeholder: "Min. 6 characters",
  },
] as const;

export const FIELDS = [
  {
    name: "username",
    label: "Username",
    icon: User,
    type: "text",
    autoComplete: "username",
    placeholder: "your username",
  },
  {
    name: "email",
    label: "Email Address",
    icon: Mail,
    type: "email",
    autoComplete: "email",
    placeholder: "you@example.com",
  },
  {
    name: "password",
    label: "Password",
    icon: Lock,
    type: "password",
    autoComplete: "new-password",
    placeholder: "Min. 6 characters",
    strengthBar: true,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    icon: Lock,
    type: "password",
    autoComplete: "new-password",
    placeholder: "Repeat password",
  },
] as const;
