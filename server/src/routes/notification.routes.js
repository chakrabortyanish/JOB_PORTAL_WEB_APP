import express from "express";
import {
  getNotifications,
  getUnreadNotificationCount,
  updateNotificationReadStatus
} from "../controllers/notification.controller.js";
import { protectUser } from "../middlewares/clerkAuth.middleware.js";

const router = express.Router();

router.get("/", protectUser, getNotifications);
router.get("/unread-count", protectUser, getUnreadNotificationCount);
router.put("/update-all", protectUser, updateNotificationReadStatus);

export { router as notificationRouter };
