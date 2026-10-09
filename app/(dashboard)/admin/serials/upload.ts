"use server";

// Adjust this import to match where you placed s3.ts.
import { uploadPublicFile } from "@/lib/s3";

type UploadCategory = "poster" | "backdrop";

function buildSerialImageKey(
  slug: string,
  category: UploadCategory,
  fileName: string,
) {
  const ext = fileName.split(".").pop()?.toLowerCase() || "jpg";
  const safeSlug = slug || "untitled";
  return `serials/${safeSlug}/${category}-${Date.now()}.${ext}`;
}

export async function uploadSerialImage(formData: FormData) {
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
  const key = buildSerialImageKey(slug, category, file.name);

  const { url } = await uploadPublicFile(buffer, key, file.type);
  return { url };
}
