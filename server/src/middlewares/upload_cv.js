/* import multer from "multer";
import path from "path";
import fs from "fs";

const cvPath = path.join(process.cwd(), "uploads", "cv");

// create folder if not exists
if (!fs.existsSync(cvPath)) {
  fs.mkdirSync(cvPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, cvPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

// allow only PDF / DOC / DOCX
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "application/msword", 
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only CV files allowed"), false);
  }
};

export const uploadCV = multer({ storage, fileFilter }); */

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";

// File filter (security)
/* const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, DOCX files are allowed"), false);
  }
};
 */
// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const format = file.mimetype.split("/")[1]; // pdf, doc, docx

    return {
      upload_preset: "First_cloudnary_app", 
      folder: "user_cvs",
      resource_type: "raw", // IMPORTANT for docs
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
      format: format, // ensures .pdf/.docx works

      // 🔥 IMPORTANT FIX
    type: "upload", // ensures public delivery
    access_mode: "public",
    };
  },
});

// Multer instance
export const uploadCV = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});