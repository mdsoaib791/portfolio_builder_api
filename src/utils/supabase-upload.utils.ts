import { PutObjectCommand } from "@aws-sdk/client-s3";
import CustomError from "../exceptions/custom-error";
import { supabaseS3Bucket } from "./supabase";

/**
 * Uploads a file buffer to Supabase S3 storage and returns the public URL.
 * Validates file type and size before upload.
 * @param fileBuffer - The file buffer to upload.
 * @param originalName - The original file name (for extension).
 * @param mimeType - The file's MIME type.
 * @param folder - The folder in the bucket to store the file.
 * @param maxSize - Maximum allowed file size in bytes (default: 5MB).
 * @param allowedMimeTypes - Array of allowed MIME types (default: common images).
 * @returns The public URL of the uploaded file.
 */
export async function uploadToSupabaseS3(
  fileBuffer: Buffer,
  originalName: string,
  mimeType: string,
  folder = "user_profile_image",
  maxSize = 5 * 1024 * 1024, // 5MB
  allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
): Promise<string> {
  if (!allowedMimeTypes.includes(mimeType)) {
    throw new CustomError("Invalid file type", 400);
  }
  if (fileBuffer.length > maxSize) {
    throw new CustomError("File size exceeds limit", 400);
  }

  const fileExt = originalName.split('.').pop();
  const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.SUPABASE_AWS_BUCKET,
    Key: filePath,
    Body: fileBuffer,
    ContentType: mimeType,
  });

  const fileResponse = await supabaseS3Bucket.send(command);

  if (fileResponse.$metadata.httpStatusCode !== 200) {
    throw new CustomError('Failed to upload file to Supabase', 500);
  }

  return `${process.env.SUPABASE_S3_ENDPOINT}/${process.env.SUPABASE_AWS_BUCKET}/${filePath}`;
}
