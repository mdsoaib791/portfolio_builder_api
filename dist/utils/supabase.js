"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseS3Bucket = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const supabaseS3Bucket = new client_s3_1.S3Client({
    endpoint: process.env.SUPABASE_STORAGE_ENDPOINT,
    region: process.env.SUPABASE_AWS_REGION,
    credentials: {
        accessKeyId: process.env.SUPABASE_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.SUPABASE_AWS_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
});
exports.supabaseS3Bucket = supabaseS3Bucket;
