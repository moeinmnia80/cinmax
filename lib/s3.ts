import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  forcePathStyle: true,

  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

export async function uploadPublicFile(
  fileBuffer: Buffer,
  key: string,
  mimeType: string,
) {
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: mimeType,
    }),
  );

  const endpoint = process.env.AWS_ENDPOINT_URL_S3!.replace(/\/$/, "");
  const publicUrl = `${endpoint}/${BUCKET_NAME}/${key}`;

  return {
    url: publicUrl,
    key: key,
  };
}
