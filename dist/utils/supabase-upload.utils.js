"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToSupabaseS3 = uploadToSupabaseS3;
const client_s3_1 = require("@aws-sdk/client-s3");
const custom_error_1 = __importDefault(require("../exceptions/custom-error"));
const supabase_1 = require("./supabase");
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
function uploadToSupabaseS3(fileBuffer_1, originalName_1, mimeType_1) {
    return __awaiter(this, arguments, void 0, function* (fileBuffer, originalName, mimeType, folder = "user_profile_image", maxSize = 5 * 1024 * 1024, // 5MB
    allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]) {
        if (!allowedMimeTypes.includes(mimeType)) {
            throw new custom_error_1.default("Invalid file type", 400);
        }
        if (fileBuffer.length > maxSize) {
            throw new custom_error_1.default("File size exceeds limit", 400);
        }
        const fileExt = originalName.split('.').pop();
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.SUPABASE_AWS_BUCKET,
            Key: filePath,
            Body: fileBuffer,
            ContentType: mimeType,
        });
        const fileResponse = yield supabase_1.supabaseS3Bucket.send(command);
        if (fileResponse.$metadata.httpStatusCode !== 200) {
            throw new custom_error_1.default('Failed to upload file to Supabase', 500);
        }
        return `${process.env.SUPABASE_S3_ENDPOINT}/${process.env.SUPABASE_AWS_BUCKET}/${filePath}`;
    });
}
