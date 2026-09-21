import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: true,
});

export type EntityType = "movies" | "serials";
export type ImageCategory = "poster" | "backdrop" | "gallery";

export function buildS3Key(
  type: EntityType,
  slug: String,
  category: ImageCategory,
  fileName: string,
): string {
  const sanitizedFileName = fileName.toLowerCase().replace(/\s+/g, "-");
  const timestamp = Date.now();

  if (category === "gallery") {
    return `${type}/${slug}/gallery/${timestamp}-${sanitizedFileName}`;
  }

  return `${type}/${slug}/${category}.${sanitizedFileName.split(".").pop()}`;
}

export async function uploadToS3({
  fileBuffer,
  mimeType,
  key,
}: {
  fileBuffer: Buffer;
  mimeType: string;
  key: string;
}): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
  });

  await s3Client.send(command);

  return `${process.env.AWS_PUBLIC_URL}/${key}`;
}

export async function deleteFromS3(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
}
