import express from "express";
import { uploadCV } from "../middlewares/upload_cv.js";
import { protectUser } from "../middlewares/clerkAuth.middleware.js";
import { uploadCV as uploadCVController } from "../controllers/cvController.js";
import { updateCV as updateCVController } from "../controllers/cvController.js";
import { viewCV as viewCVController } from "../controllers/cvController.js";

const router = express.Router();

router.post(
  "/upload-cv",
  protectUser,
  uploadCV.single("cv"),
  uploadCVController,
);
router.get("/my-cv",protectUser, viewCVController);
router.put(
  "/update-cv",
  protectUser,
  uploadCV.single("cv"),
  updateCVController,
);

export default router;
