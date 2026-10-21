"use server";

import sharp from "sharp";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { uploadPublicFile, deleteFile } from "@/lib/s3";
import { serialSchema } from "@/lib/validations/serial.schema";
import type { SerialField } from "@/constants/serialFields";

type FieldErrors = Partial<Record<SerialField, string[]>>;

export type EditSerialForm = {
  errors?: FieldErrors;
  message?: string;
  success?: boolean;
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// every image is resized and converted to real webp
async function toWebp(file: File, maxWidth: number) {
  const input = Buffer.from(await file.arrayBuffer());

  return sharp(input)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
}

export async function saveSerial(
  _prevState: EditSerialForm,
  formData: FormData,
): Promise<EditSerialForm> {
  const parsed = serialSchema.safeParse({
    ...Object.fromEntries(formData),
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

  const baseSlug = generateSlug(data.title);
  if (!baseSlug) {
    return {
      success: false,
      message: "Title must contain letters or numbers.",
    };
  }
  const slug = `${baseSlug}-${data.startYear}`;

  // check BEFORE uploading, otherwise we would overwrite another serial's images
  const exists = await db.serial.findUnique({ where: { slug } });
  if (exists) {
    return {
      success: false,
      errors: { title: ["A serial with this title already exists."] },
      message: "Duplicate title.",
    };
  }

  const uploadedKeys: string[] = [];

  const upload = async (file: File, name: string, width: number) => {
    const buffer = await toWebp(file, width);
    const result = await uploadPublicFile(
      buffer,
      `serials/${slug}/${name}.webp`,
      "image/webp",
    );
    uploadedKeys.push(result.key); // tracked the moment it succeeds
    return result;
  };

  try {
    const [posterRes, backdropRes] = await Promise.allSettled([
      upload(data.image, "poster", 600),
      data.backdrop
        ? upload(data.backdrop, "backdrop", 1600)
        : Promise.resolve(null),
    ]);

    if (posterRes.status === "rejected") throw posterRes.reason;
    if (backdropRes.status === "rejected") throw backdropRes.reason;

    const poster = posterRes.value;
    const backdrop = backdropRes.value;

    await db.$transaction(
      async (tx) => {
        const languageName = data.language.trim().toLowerCase();
        const language = await tx.language.upsert({
          where: { name: languageName },
          update: {},
          create: { name: languageName, code: languageName.slice(0, 2) },
        });

        let countryId: number | null = null;
        if (data.country) {
          const countryName = data.country.trim();
          const country = await tx.country.upsert({
            where: { code: countryName.toUpperCase() },
            update: {},
            create: { code: countryName.toUpperCase(), name: countryName },
          });
          countryId = country.id;
        }

        let studioId: number | null = null;
        if (data.studio) {
          const studio = await tx.studio.upsert({
            where: { name: data.studio },
            update: {},
            create: { name: data.studio },
          });
          studioId = studio.id;
        }

        // sequential on purpose: same transaction, and avoids duplicate-genre races
        const genreIds: number[] = [];
        for (const rawName of new Set(
          data.genres.map((g) => g.trim().toLowerCase()),
        )) {
          let genre = await tx.genre.findUnique({ where: { name: rawName } });

          if (!genre) {
            genre = await tx.genre.create({
              data: {
                name: rawName,
                slug: `${generateSlug(rawName)}-${Date.now()}`,
              },
            });
          }
          genreIds.push(genre.id);
        }

        await tx.serial.create({
          data: {
            title: data.title,
            slug,
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
            isPurchasable: (data.purchasePrice ?? 0) > 0,
            durationMinutes: data.durationMinutes,

            languageId: language.id,
            countryId,
            studioId,

            genres: {
              create: genreIds.map((id) => ({
                genre: { connect: { id } },
              })),
            },
          },
        });
      },
      { maxWait: 10_000, timeout: 20_000 },
    );

    revalidatePath("/admin/serials");
    return { success: true, message: "Serial saved successfully!" };
  } catch (error) {
    console.error("Save serial error:", error);

    // don't leave orphan files in the bucket
    await Promise.allSettled(uploadedKeys.map(deleteFile));

    return {
      success: false,
      message: "Failed to save serial. Please try again.",
    };
  }
}

export async function deleteSerial(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid serial ID provided.");
  }

  try {
    const serial = await db.serial.findUnique({
      where: { id },
      select: { slug: true },
    });

    await db.serial.delete({ where: { id } });

    // after the DB delete succeeded; deleting a missing key is harmless
    if (serial) {
      await Promise.allSettled([
        deleteFile(`serials/${serial.slug}/poster.webp`),
        deleteFile(`serials/${serial.slug}/backdrop.webp`),
      ]);
    }
  } catch (error) {
    console.error("Failed to delete serial:", error);
    throw new Error("Failed to delete the serial from database.");
  }

  revalidatePath("/admin/serials");
  redirect("/admin/serials");
}
