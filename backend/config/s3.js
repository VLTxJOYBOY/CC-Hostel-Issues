import { S3Client } from "@aws-sdk/client-s3";

let cachedClient = null;

export const getS3Client = () => {
  if (cachedClient) return cachedClient;

  const region = process.env.AWS_REGION;

  const accessKeyId =
    process.env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY;
  const secretAccessKey =
    process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_KEY;

  if (!region) {
    throw new Error("Missing AWS_REGION in environment");
  }
  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing AWS credentials (AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY) in environment"
    );
  }

  cachedClient = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  return cachedClient;
};

export default getS3Client;