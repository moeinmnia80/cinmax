"use server";

// Adjust this import to match where you placed s3.ts (the version with
// `uploadPublicFile`, using AWS_ENDPOINT_URL_S3 / AWS_BUCKET_NAME).
import { uploadPublicFile } from "@/lib/s3";

type UploadCategory = "poster" | "backdrop";

function buildMovieImageKey(
  slug: string,
  category: UploadCategory,
  fileName: string,
) {
  const ext = fileName.split(".").pop()?.toLowerCase() || "jpg";
  const safeSlug = slug || "untitled";
  return `movies/${safeSlug}/${category}-${Date.now()}.${ext}`;
}

export async function uploadMovieImage(formData: FormData) {
  const file = formData.get("file");
  const category = formData.get("category") as UploadCategory | null;
  const slug = (formData.get("slug") as string | null) ?? "untitled";

  if (!(file instanceof File)) {
    throw new Error("No file provided");
  }
  if (category !== "poster" && category !== "backdrop") {
    throw new Error("Invalid image category");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const key = buildMovieImageKey(slug, category, file.name);

  const { url } = await uploadPublicFile(buffer, key, file.type);
  return { url };
}
