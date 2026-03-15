import express from "express";
import {
  createIssue,
  getIssues,
  resolveIssue,
} from "../controllers/issueController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createIssue);
router.get("/", getIssues);
router.patch("/:id/resolve", protect, resolveIssue);

export default router;