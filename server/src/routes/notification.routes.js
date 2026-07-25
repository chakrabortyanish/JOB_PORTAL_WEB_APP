import express from "express";
import { getNotifications } from "../controllers/notification.controller.js";
import { protectUser } from "../middlewares/clerkAuth.middleware.js";

const router = express.Router();

router.get("/", protectUser, getNotifications);

export { router as notificationRouter };