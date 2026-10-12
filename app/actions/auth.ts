"use server";
import "server-only";

import { z } from "zod";
import bcrypt from "bcryptjs";

import db from "@/lib/db";
import { User } from "@/types/auth";
import { createSession, deleteSession } from "@/lib/session";
import {
  planSchema,
  loginSchema,
  registerSchema,
} from "@/lib/validations/auth.schemas";

const GENERIC_ERROR = "Something went wrong. Please try again later.";

type FieldErrors<K extends string> = Partial<Record<K, string[]>>;

const getString = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
};

export type LoginFormState = {
  errors?: FieldErrors<"email" | "password" | "remember" | "_form">;
  message?: string;
  success?: boolean;
  user?: User;
};

export async function loginAction(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const values = {
    email: getString(formData, "email"),
    password: getString(formData, "password"),
  };

  const parsed = loginSchema.safeParse({
    ...values,
  });
  if (!parsed.success) {
    return {
      success: false,
      errors: z.flattenError(parsed.error).fieldErrors,
      message: "Missing or invalid fields.",
    };
  }

  const { email, password } = parsed.data;

  try {
    const user = await db.user.findUnique({
      where: { email },
      include: { subscriptions: true, purchases: true },
    });
    if (!user) {
      return { success: false, message: "Invalid credentials." };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Invalid credentials." };
    }

    const {
      id,
      image,
      role,
      lastName,
      firstName,
      username,
      purchases,
      subscriptions,
    } = user;

    await createSession(id, role);

    return {
      success: true,
      message: "Logged in successfully",
      user: {
        id,
        email,
        image,
        username,
        lastName,
        firstName,
        purchases,
        subscriptions: subscriptions
          ? {
              ...subscriptions,
              startDate: subscriptions.startDate?.toISOString(),
              endDate: subscriptions.endDate?.toISOString(),
              createdAt: subscriptions.createdAt?.toISOString(),
              updatedAt: subscriptions.updatedAt?.toISOString(),
            }
          : null,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: GENERIC_ERROR,
    };
  }
}

interface LogoutState {
  success?: boolean;
  message?: string;
}

export async function logoutAction(): Promise<LogoutState> {
  try {
    await deleteSession();

    return {
      success: true,
      message: "logout successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: GENERIC_ERROR,
    };
  }
}

export interface RegisterFormState {
  errors?: FieldErrors<
    | "firstName"
    | "lastName"
    | "email"
    | "password"
    | "username"
    | "confirmPassword"
    | "terms"
    | "_form"
  >;
  message?: string;
  success?: boolean;
  user?: User;
}

export async function registerAction(
  _prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const parsed = registerSchema.safeParse({
    firstName: getString(formData, "firstName"),
    lastName: getString(formData, "lastName"),
    email: getString(formData, "email"),
    username: getString(formData, "username"),
    password: getString(formData, "password"),
    confirmPassword: getString(formData, "confirmPassword"),
    terms: formData.get("terms") ?? undefined,
  });
  if (!parsed.success) {
    return {
      success: false,
      errors: z.flattenError(parsed.error).fieldErrors,
      message: "Invalid credentials.",
    };
  }

  const { firstName, lastName, username, email, password } = parsed.data;
  try {
    const existingUserByEmail = await db.user.findUnique({ where: { email } });
    if (existingUserByEmail) {
      return {
        message: "User with this email already exists.",
        success: false,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return { message: "Error occurred. please try again.", success: false };
    }

    const freePlan = await db.plan.findUnique({
      where: { slug: "standard" },
    });
    if (!freePlan) {
      return {
        success: false,
        message: "Default subscription plan not found.",
      };
    }

    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: "user",
        username,
      },
    });

    const { id, image } = user;

    return {
      success: true,
      message: "User registered successfully",
      user: {
        id,
        email,
        image,
        username,
        lastName,
        firstName,
      },
    };
  } catch (error) {
    console.error("REGISTER_ACTION_ERROR:", error);
    return { success: false, message: GENERIC_ERROR };
  }
}

export type PlanFormState = {
  success?: boolean;
  errors?: FieldErrors<"plan" | "_form">;
  message?: string;
  values?: {
    plan?: string;
  };
};

export async function planAction(
  userId: string,
  _prevState: PlanFormState,
  formData: FormData,
): Promise<PlanFormState> {
  const parsed = planSchema.safeParse({
    plan: getString(formData, "plan"),
  });
  if (!parsed.success) {
    return {
      success: false,
      errors: z.flattenError(parsed.error).fieldErrors,
      message: "Invalid or missing fields. Please check your input.",
    };
  }

  try {
    const now = new Date();
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 30);
    let finalEndDate = trialEndDate;

    const existingSub = await db.userSubscription.findUnique({
      where: { userId },
    });

    if (existingSub) {
      const currentEndDate = new Date(existingSub.endDate);
      const baseDate = currentEndDate > now ? currentEndDate : now;
      const newPlanDurationMs =
        new Date(trialEndDate).getTime() - now.getTime();
      finalEndDate = new Date(baseDate.getTime() + newPlanDurationMs);
    }

    await db.userSubscription.upsert({
      where: { userId },
      update: {
        planId: 2,
        endDate: finalEndDate,
        isActive: true,
      },
      create: {
        userId,
        planId: 2,
        startDate: now,
        endDate: trialEndDate,
        isActive: true,
      },
    });

    await createSession(userId);

    return {
      success: true,
      message: "User get 30-days free trial",
    };
  } catch (error) {
    console.error("PLAN_ACTION_ERROR:", error);
    return {
      success: false,
      message: GENERIC_ERROR,
    };
  }
}
