import express from "express";
import {
  applyJob,
  getMyApplications,
  getReceivedApplications,
  updateApplicationStatus
} from "../controllers/application.controller.js";
import { protectUser } from "../middlewares/clerkAuth.middleware.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protectUser, applyJob);
router.get("/my", protectUser, getMyApplications);
router.get("/received", verifyToken, getReceivedApplications);
router.patch("/:id/status", updateApplicationStatus);

export default router;
