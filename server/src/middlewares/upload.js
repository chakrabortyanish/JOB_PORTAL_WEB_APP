import multer from "multer";
import path from "path";
import fs from "fs";

/*
  PURPOSE:
  - Handle image uploads
  - Store images in local folder
*/

const uploadPath = path.join(process.cwd(), "src", "uploads", "images");

// Auto-create folder if missing
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // where image is saved
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

export const upload = multer({ storage });

