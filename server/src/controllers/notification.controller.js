import { Notification } from "../models/notification.model.js";

const getNotifications = async (req, res) => {
  try {
    const clerkId = req.user.id; // Clerk user ID
    console.log(clerkId);

    const notifications = await Notification.find({
      receiverId: clerkId,
       isRead: false,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

export { getNotifications };