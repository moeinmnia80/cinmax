"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import sharp from "sharp";
import { uploadPublicFile, deleteFile } from "@/lib/s3";

import { generateSlug } from "@/utils";
import type { SerialField } from "@/constants/serials";
import { serialSchema } from "@/lib/validations/serial.schema";
import { getCountryCode, getLanguageCode } from "@/lib/codeGenerator";

type FieldErrors = Partial<Record<SerialField, string[]>>;

export type EditSerialForm = {
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

  const exists = await db.serial.findUnique({ where: { slug } });
  if (exists) {
    return {
      success: false,
      errors: { title: ["A serial with this title already exists."] },
      message: "Duplicate title.",
    };
  }

  const languageName = data.language.trim().toLowerCase();
  const languageCode = getLanguageCode(languageName);
  if (!languageCode) {
    return {
      success: false,
      errors: {
        language: ["Unknown language. Use the English name, e.g. korean."],
      },
      message: "Invalid language.",
    };
  }

  const countryName = data.country?.trim().toLowerCase() ?? "";
  const countryCode = countryName ? getCountryCode(countryName) : null;
  if (countryName && !countryCode) {
    return {
      success: false,
      errors: {
        country: ["Unknown country. Use the English name, e.g. south korea."],
      },
      message: "Invalid country.",
    };
  }

  const genreNames = [
    ...new Set(data.genres.map((g) => g.trim().toLowerCase()).filter(Boolean)),
  ];
  const uploadedKeys: string[] = [];

  const upload = async (file: File, name: string, width: number) => {
    const buffer = await toWebp(file, width);
    const result = await uploadPublicFile(
      buffer,
      `serials/${slug}/${name}.webp`,
      "image/webp",
    );
    uploadedKeys.push(result.key);
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

    await db.$transaction(async (tx) => {
      let language = await tx.language.findUnique({
        where: { name: languageName },
      });
      if (!language) {
        language = await tx.language.create({
          data: {
            name: languageName,
            code: languageCode,
          },
        });
      }

      let countryId: number | null = null;
      if (countryCode) {
        const country = await tx.country.upsert({
          where: { code: countryCode },
          update: {},
          create: { code: countryCode, name: countryName },
        });
        countryId = country.id;
      }

      const studioName = data.studio?.trim() ?? "";

      let studioId: number | null = null;
      if (studioName) {
        const studio = await tx.studio.upsert({
          where: { name: studioName },
          update: {},
          create: { name: studioName },
        });
        studioId = studio.id;
      }

      const genreIds: number[] = [];
      for (const name of genreNames) {
        let genre = await tx.genre.findUnique({ where: { name } });
        if (!genre) {
          genre = await tx.genre.create({
            data: { name, slug: generateSlug(name) },
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
    });

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
