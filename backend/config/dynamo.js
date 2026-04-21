import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

let cachedClient = null;

export const getDynamoDocClient = () => {
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

  const client = new DynamoDBClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  cachedClient = DynamoDBDocumentClient.from(client);
  return cachedClient;
};

export default getDynamoDocClient;