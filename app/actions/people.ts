"use server";

import { z } from "zod";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import sharp from "sharp";
import db from "@/lib/db";

import { generateSlug } from "@/utils";
import { deleteFile, uploadPublicFile } from "@/lib/s3";
import { personSchema } from "@/lib/validations/person.schema";

type FieldErrors = Partial<Record<string, string[]>>;

export type PersonFormState = {
  errors?: FieldErrors;
  message: string;
  success: boolean;
};

async function toWebp(file: File, maxWidth: number) {
  const input = Buffer.from(await file.arrayBuffer());
  return sharp(input)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
}

export async function savePerson(
  _prev: PersonFormState,
  formData: FormData,
): Promise<PersonFormState> {
  console.log(Object.fromEntries(formData));
  const parsed = personSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      success: false,
      errors: z.flattenError(parsed.error).fieldErrors,
      message: "Missing or invalid fields.",
    };
  }

  const { id, image: file, ...fields } = parsed.data;

  try {
    const existing = id
      ? await db.person.findUnique({ where: { id }, select: { slug: true } })
      : null;

    if (id && !existing) {
      return { success: false, message: "Person not found." };
    }

    const slug = existing?.slug ?? generateSlug(fields.name);
    if (!slug) {
      return {
        success: false,
        errors: { name: ["Name must contain letters or numbers."] },
        message: "Invalid name.",
      };
    }

    const image = file
      ? (
          await uploadPublicFile(
            await toWebp(file, 600),
            `people/${slug}/profile.webp`,
            "image/webp",
          )
        ).url
      : undefined;

    if (id) {
      await db.person.update({ where: { id }, data: { ...fields, image } });
    } else {
      await db.person.create({ data: { ...fields, slug, image } });
    }

    revalidatePath("/admin/people");
    return {
      success: true,
      message: id ? "Person updated." : "Person created.",
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        errors: { name: ["A person with this name already exists."] },
        message: "Could not save.",
      };
    }
    console.error("savePerson failed", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
}
export async function deletePerson(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid person ID provided.");
  }

  try {
    const person = await db.person.findUnique({
      where: { id },
    });

    await db.person.delete({ where: { id } });

    if (person) {
      await deleteFile(`people/${person.slug}/profile.webp`);
    }
  } catch (error) {
    console.error("Failed to delete serial:", error);
    throw new Error("Failed to delete the serial from database.");
  }

  revalidatePath("/admin/serials");
  redirect("/admin/people");
}
