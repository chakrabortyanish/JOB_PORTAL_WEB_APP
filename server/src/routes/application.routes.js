import express from "express";
import {
  applyJob,
  getMyApplications,
  getReceivedApplications,
  updateApplicationStatus
} from "../controllers/application.controller.js";
import { protectUser } from "../middlewares/clerkAuth.middleware.js";

const router = express.Router();

router.post("/", protectUser, applyJob);
router.get("/my", protectUser, getMyApplications);
// router.get("/received", protect, getReceivedApplications);
// router.put("/:id/status", protect, updateApplicationStatus);

export default router;
