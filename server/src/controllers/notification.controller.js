import { Notification } from "../models/notification.model.js";

const getNotifications = async (req, res) => {
  try {
    const clerkId = req.user.id; // Clerk user ID
    // console.log(clerkId);

    const notifications = await Notification.find({
      receiverId: clerkId,
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

const getUnreadNotificationCount = async (req, res) => {
  try {
    const clerkId = req.user.id;

    const count = await Notification.countDocuments({
      receiverId: clerkId,
      isRead: false,
    });

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateNotificationReadStatus = async (req, res) => {
  try {
    const clerkId = req.user.id;

    const result = await Notification.updateMany(
      {
        receiverId: clerkId,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No unread notifications found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to mark notification as read",
      error: error.message,
    });
  }
};

export {
  getNotifications,
  getUnreadNotificationCount,
  updateNotificationReadStatus,
};
