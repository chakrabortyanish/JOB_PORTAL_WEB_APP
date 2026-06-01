import { requireAuth } from "@clerk/express";

export const protectUser = [
  requireAuth(),
  (req, res, next) => {
    try {
      const { userId } = req.auth();

      // console.log("User ID:", userId);

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: No userId found",
        });
      }

      req.user = { id: userId };

      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];