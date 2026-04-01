// controllers/cvController.js
// import cloudinary from "../config/cloudinary.config.js";
import UserCV from "../models/userCV.model.js";

// Upload CV method
export const uploadCV = async (req, res) => {
  try {
    const filePath = `uploads/cv/${req.file.filename}`;

    if (!filePath) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // save to DB
    const user = await UserCV.create({
      clerkId: req.user.id,
      cvUrl: filePath
    });

    res.json({
      message: "CV uploaded successfully",
      success: true,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get CV method

export const viewCV = async (req, res) => {
    console.log("ViewCV controller called for user:", req.user.id);
    try {
        const userCV = await UserCV.findOne({ clerkId: req.user.id });
        if (!userCV) {
            return res.status(404).json({ message: "CV not found" });
        }
        console.log("CV URL:", userCV.cvUrl);
        res.json({ cvUrl: userCV.cvUrl, success: true });
    } catch (error) {
        console.error("Error fetching CV:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// update CV method
export const updateCV = async (req, res) => {
  try {
    const filePath = `uploads/cv/${req.file.filename}`;

    if (!filePath) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // update in DB
    const userCV = await UserCV.findOneAndUpdate(
      { clerkId: req.user.id },
      { cvUrl: filePath },
      { new: true }
    );

    if (!userCV) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.json({
      message: "CV updated successfully",
      success: true,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

