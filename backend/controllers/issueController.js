import Issue from "../models/Issue.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import getS3Client from "../config/s3.js";
import writeS3UploadLog from "../utils/uploadLog.js";

export const createIssue = async (req, res) => {
  try {
    const description = req.body?.description;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    let imageUrl = null;
    let uploadedObject = null;

    if (req.file) {
      const bucket = process.env.AWS_BUCKET_NAME;
      if (!bucket) {
        return res
          .status(500)
          .json({ message: "Missing AWS_BUCKET_NAME in environment" });
      }

      let s3;
      try {
        s3 = getS3Client();
      } catch (e) {
        return res.status(500).json({ message: e.message });
      }

      const ext = (req.file.originalname || "").split(".").pop();
      const key = `issues/${crypto.randomUUID()}${ext ? `.${ext}` : ""}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        })
      );

      imageUrl = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
      uploadedObject = {
        bucket,
        key,
        fileName: req.file.originalname || null,
        contentType: req.file.mimetype || null,
        fileSize: req.file.size || 0,
      };
    }

    const issue = await Issue.create({
      description,
      imageUrl,
      postedBy: req.user._id,
    });

    if (uploadedObject) {
      try {
        await writeS3UploadLog({
          issueId: issue._id.toString(),
          bucket: uploadedObject.bucket,
          objectKey: uploadedObject.key,
          imageUrl,
          fileName: uploadedObject.fileName,
          contentType: uploadedObject.contentType,
          fileSize: uploadedObject.fileSize,
          uploadedByUserId: req.user._id.toString(),
        });
      } catch (logError) {
        console.warn("DynamoDB upload log write failed:", logError.message);
      }
    }

    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: "Failed to create issue", error: err.message });
  }
};

export const getIssues = async (req, res) => {
  const issues = await Issue.find()
    .populate("postedBy", "name")
    .sort({ createdAt: -1 });

  res.json(issues);
};

export const resolveIssue = async (req, res) => {
  const issue = await Issue.findById(req.params.id);

  issue.status = "resolved";
  issue.resolvedBy = req.user._id;

  await issue.save();

  res.json(issue);
};