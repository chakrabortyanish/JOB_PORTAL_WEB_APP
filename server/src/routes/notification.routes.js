import express from "express";
import {
  getNotifications,
  getUnreadNotificationCount,
} from "../controllers/notification.controller.js";
import { protectUser } from "../middlewares/clerkAuth.middleware.js";

const router = express.Router();

router.get("/", protectUser, getNotifications);
router.get(
  "/unread-count",
  protectUser,
  getUnreadNotificationCount,
);

export { router as notificationRouter };
