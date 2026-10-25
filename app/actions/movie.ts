"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import sharp from "sharp";
import { uploadPublicFile, deleteFile } from "@/lib/s3";

import { generateSlug } from "@/utils";
import { movieSchema } from "@/lib/validations/movie.schemas";
import { getCountryCode, getLanguageCode } from "@/lib/codeGenerator";

type MovieField = keyof z.input<typeof movieSchema>;
type FieldErrors = Partial<Record<MovieField, string[]>>;

export type EditMovieForm = {
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

export async function saveMovie(
  _prevState: EditMovieForm,
  formData: FormData,
): Promise<EditMovieForm> {
  console.log(Object.fromEntries(formData));

  const parsed = movieSchema.safeParse({
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
  const slug = `${baseSlug}-${data.year}`;

  const exists = await db.movie.findUnique({ where: { slug } });
  if (exists) {
    return {
      success: false,
      errors: { title: ["A movie with this title already exists."] },
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
      `movies/${slug}/${name}.webp`,
      "image/webp",
    );
    uploadedKeys.push(result.key);
    return result;
  };

  try {
    const [posterRes, backdropRes] = await Promise.allSettled([
      upload(data.image, "poster", 600),
      upload(data.backdrop, "backdrop", 1600),
    ]);

    if (posterRes.status === "rejected") throw posterRes.reason;
    if (backdropRes.status === "rejected") throw backdropRes.reason;

    const poster = posterRes.value;
    const backdrop = backdropRes.value;

    await db.$transaction(async (tx) => {
      const language = await tx.language.upsert({
        where: { name: languageName },
        update: {},
        create: { name: languageName, code: languageCode },
      });

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
        const genre = await tx.genre.upsert({
          where: { name },
          update: {},
          create: { name, slug: generateSlug(name) },
        });
        genreIds.push(genre.id);
      }

      await tx.movie.create({
        data: {
          title: data.title,
          slug,
          tagline: data.tagline ?? null,
          description: data.description,
          longDescription: data.longDescription ?? null,
          year: data.year,
          durationMinutes: data.durationMinutes,
          rating: data.rating,
          category: data.category,
          recognition: data.recognition ?? null,
          trailer: data.trailer ?? null,
          budget: data.budget ?? null,
          boxOffice: data.boxOffice ?? null,
          image: poster.url,
          backdrop: backdrop.url,
          purchasePrice: data.purchasePrice ?? null,
          isPurchasable: (data.purchasePrice ?? 0) > 0,

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

    revalidatePath("/admin/movies");
    return { success: true, message: "Movie saved successfully!" };
  } catch (error) {
    console.error("Save movie error:", error);

    await Promise.allSettled(uploadedKeys.map(deleteFile));

    return {
      success: false,
      message: "Failed to save movie. Please try again.",
    };
  }
}

export async function deleteMovie(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid movie ID provided.");
  }

  try {
    const movie = await db.movie.findUnique({
      where: { id },
      select: {
        slug: true,
        images: { select: { key: true } },
      },
    });

    await db.movie.delete({ where: { id } });

    if (movie) {
      await Promise.allSettled([
        deleteFile(`movies/${movie.slug}/poster.webp`),
        deleteFile(`movies/${movie.slug}/backdrop.webp`),
        ...movie.images.map(({ key }) => deleteFile(key)),
      ]);
    }
  } catch (error) {
    console.error("Failed to delete movie:", error);
    throw new Error("Failed to delete the movie from database.");
  }

  revalidatePath("/admin/movies");
  redirect("/admin/movies");
}
