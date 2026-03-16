import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import connectDB from "./config/db.js";
import upload from "./middleware/uploadMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/issues", (req, res, next) => {
  // Parse multipart/form-data for uploads; fall back to normal router otherwise.
  upload.single("image")(req, res, (err) => {
    if (err) return next(err);
    next();
  });
}, issueRoutes);

// Basic error handler (surfaces multer/fileFilter errors as 400)
app.use((err, req, res, next) => {
  if (err?.message && err.message.includes("Only image uploads")) {
    return res.status(400).json({ message: err.message });
  }
  if (err?.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "File too large (max 5MB)" });
  }
  // fallback
  console.error(err);
  return res.status(500).json({ message: "Server error" });
});

app.get("/", (req, res) => {
  res.send("Hostel Issue Reporting API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});