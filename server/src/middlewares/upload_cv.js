import multer from "multer";
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

export const uploadCV = multer({ storage, fileFilter });