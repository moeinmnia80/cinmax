"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import sharp from "sharp";
import { uploadPublicFile } from "@/lib/s3";
import { serialSchema } from "@/lib/validations/serial.schema";
import { SerialField } from "@/constants/serialFields";

type FieldErrors = Partial<Record<SerialField, string[]>>;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s]+/g, "-");
}

async function toWebp(file: File, maxWidth: number) {
  const input = Buffer.from(await file.arrayBuffer());

  // already webp: upload as-is, no re-encoding
  if (file.type === "image/webp") return input;

  return sharp(input)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
}

export type EditSerialForm = {
  errors?: FieldErrors;
  message?: string;
  success?: boolean;
};

export async function saveSerial(
  _prevState: EditSerialForm,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData);

  const parsed = serialSchema.safeParse({
    ...rawData,
    genres: formData.getAll("genres"),
  });
  if (!parsed.success) {
    return {
      success: false,
      errors: z.flattenError(parsed.error).fieldErrors,
      message: "Missing or invalid fields.",
    };
  }

  const data = parsed.data;
  const slug = generateSlug(data.title);

  if (!slug) {
    return {
      success: false,
      message: "Title must contain letters or numbers.",
    };
  }

  const exists = await db.serial.findUnique({ where: { slug } });
  if (exists) {
    return {
      success: false,
      errors: { title: ["A serial with this title already exists."] },
      message: "Duplicate title.",
    };
  }

  const uploadedKeys: string[] = [];

  try {
    const [poster, backdrop] = await Promise.all([
      toWebp(data.image, 600).then((buf) =>
        uploadPublicFile(buf, `serials/${slug}/poster.webp`, "image/webp"),
      ),
      data.backdrop
        ? toWebp(data.backdrop, 1600).then((buf) =>
            uploadPublicFile(
              buf,
              `serials/${slug}/backdrop.webp`,
              "image/webp",
            ),
          )
        : Promise.resolve(null),
    ]);

    uploadedKeys.push(poster.key);
    if (backdrop) uploadedKeys.push(backdrop.key);
    await db.$transaction(async (tx) => {
      const language = await tx.language.upsert({
        where: { name: data.language },
        update: {},
        create: {
          name: data.language,
          code: data.language.slice(0, 2).toLowerCase(),
        },
      });

      let countryId: number | null = null;
      if (data.country && data.country.trim() !== "") {
        const country = await tx.country.upsert({
          where: { code: data.country.toUpperCase() },
          update: {},
          create: {
            code: data.country.toUpperCase(),
            name: data.country,
          },
        });
        countryId = country.id;
      }

      let studioId: number | null = null;
      if (data.studio && data.studio.trim() !== "") {
        const studio = await tx.studio.upsert({
          where: { name: data.studio },
          update: {},
          create: { name: data.studio },
        });
        studioId = studio.id;
      }

      const genreConnections = await Promise.all(
        data.genres.map(async (genreName) => {
          const trimmedName = genreName.trim();

          let genre = await tx.genre.findUnique({
            where: { name: trimmedName },
          });

          if (!genre) {
            const baseSlug = generateSlug(trimmedName);
            genre = await tx.genre.create({
              data: {
                name: trimmedName,
                slug: `${baseSlug}-${Date.now()}`,
              },
            });
          }

          return { id: genre.id };
        }),
      );

      await tx.serial.create({
        data: {
          title: data.title,
          slug: `${slug}-${data.startYear}`,
          description: data.description,
          startYear: data.startYear,
          endYear: data.endYear ?? null,
          seasons: data.seasons,
          episodes: data.episodes,
          rating: data.rating,
          badge: data.badge ?? null,
          status: data.status,
          image: poster.url,
          backdrop: backdrop?.url ?? null,
          purchasePrice: data.purchasePrice ?? null,
          isPurchasable: data.purchasePrice ? data.purchasePrice > 0 : false,

          durationMinutes: 45,

          languageId: language.id,
          countryId: countryId,
          studioId: studioId,

          genres: {
            create: genreConnections.map((genre) => ({
              genre: {
                connect: { id: genre.id },
              },
            })),
          },
        },
      });
    });

    revalidatePath("/admin/serials");
    return {
      success: true,
      message: "Serial and relations saved successfully!",
    };
  } catch (error) {
    console.error("Transaction Error:", error);
    return {
      success: false,
      message: "Database transaction failed. All changes rolled back.",
    };
  }
}

export async function deleteSerial(formData: FormData) {
  const id = formData.get("id");

  if (!id || typeof id !== "number") {
    throw new Error("Invalid serial ID provided.");
  }

  try {
    await db.serial.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to delete serial:", error);
    throw new Error("Failed to delete the serial from database.");
  }

  revalidatePath("/admin/serials");
  redirect("/admin/serials");
}
