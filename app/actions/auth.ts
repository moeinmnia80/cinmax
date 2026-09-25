"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

import { createSession } from "@/lib/session";
import { loginSchema } from "@/lib/validations/auth.schemas";

export type FormState = {
  errors?: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  message?: string;
};

export async function loginAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
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
