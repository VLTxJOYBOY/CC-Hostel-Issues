import { PutCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";
import getDynamoDocClient from "../config/dynamo.js";

export const writeS3UploadLog = async ({
  issueId,
  bucket,
  objectKey,
  imageUrl,
  fileName,
  contentType,
  fileSize,
  uploadedByUserId,
}) => {
  const tableName = process.env.DDB_TABLE_NAME;
  if (!tableName) {
    throw new Error("Missing DDB_TABLE_NAME in environment");
  }

  const ddb = getDynamoDocClient();

  await ddb.send(
    new PutCommand({
      TableName: tableName,
      Item: {
        logId: crypto.randomUUID(),
        issueId,
        uploadedAt: new Date().toISOString(),
        bucket,
        objectKey,
        imageUrl,
        fileName,
        contentType,
        fileSize,
        uploadedByUserId,
        status: "uploaded",
      },
    })
  );
};

export default writeS3UploadLog;