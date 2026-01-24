import  {getAuth}   from "@clerk/express";

export const protectUser = async (req, res, next) => {
  // console.log("ProtectUser middleware called");
  try {
    const auth = getAuth(req);

    // console.log("Clerk auth:", auth.userId);

  if (!auth.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

    req.user = {
      id: auth.userId // Clerk userId
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
