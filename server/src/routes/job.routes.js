import express from "express";
import {
  createJob,
  // getMyJobs,
  getAllJobs
} from "../controllers/job.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllJobs);
router.post("/", verifyToken, createJob);
// router.get("/my", protect, getMyJobs);

export default router;
