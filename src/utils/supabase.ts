import { S3Client } from "@aws-sdk/client-s3";

const supabaseS3Bucket = new S3Client({
  endpoint: process.env.SUPABASE_STORAGE_ENDPOINT,
  region: process.env.SUPABASE_AWS_REGION,
  credentials: {
    accessKeyId: process.env.SUPABASE_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SUPABASE_AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
});

export { supabaseS3Bucket };
