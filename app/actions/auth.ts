"use server";
import "server-only";

import { z } from "zod";
import { redirect } from "next/navigation";

import { createSession } from "@/lib/session";
import { loginSchema, registerSchema } from "@/lib/validations/auth.schemas";

const GENERIC_ERROR = "Something went wrong. Please try again later.";

type FieldErrors<K extends string> = Partial<Record<K, string[]>>;

const getString = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
};

export type LoginFormState = {
  errors?: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  message?: string;
};

export async function loginAction(
  prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const rawEmail = formData.get("email");
  const rawPassword = formData.get("password");

  const validatedFields = loginSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);
    return {
      errors: {
        email: tree.properties?.email?.errors,
        password: tree.properties?.password?.errors,
      },
      message: "Missing or invalid fields.",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      return { errors: { _form: ["Invalid credentials. Please try again."] } };
    }

    const user = await response.json();
    if (!user) {
      return {
        errors: {
          _form: ["Invalid email or password."],
        },
      };
    }

    await createSession(user.id);
  } catch (error) {
    console.log(error);

    return {
      errors: {
        _form: ["Something went wrong. Please try again later."],
      },
    };
  }

  redirect("/");
}

export type RegisterFormState = {
  errors?: FieldErrors<
    "firstName" | "email" | "password" | "confirmPassword" | "terms" | "_form"
  >;
  message?: string;
  values?: { firstName: string; email: string };
  success?: true | false;
};

export async function registerAction(
  _prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const values = {
    firstName: getString(formData, "firstName"),
    email: getString(formData, "email"),
  };

  const parsed = registerSchema.safeParse({
    ...values,
    password: getString(formData, "password"),
    confirmPassword: getString(formData, "confirmPassword"),
    terms: formData.get("terms") ?? undefined,
  });

  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
      message: "Missing or invalid fields.",
      values,
    };
  }

  const { firstName, email, password } = parsed.data;

  try {
    const response = await fetch(`${process.env.BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, email, password }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        errors: {
          _form: [result?.message ?? "Registration failed. Please try again."],
        },
        values,
      };
    }

    if (!result?.user?.id) throw new Error("User creation failed");
    await createSession(result.user.id);
    return { success: true };
  } catch (error) {
    console.error("REGISTER_ACTION_ERROR:", error);
    return { errors: { _form: [GENERIC_ERROR] }, values };
  }

  redirect("/register");
}
