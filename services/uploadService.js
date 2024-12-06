const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

// Local Disk Storage Configuration
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/uploads");
    try {
      // Ensure the upload directory exists
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (err) {
      cb(err, null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer Middleware
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed.")
      );
    }
    cb(null, true);
  },
});

// Upload Function
async function uploadFile(file, type = "local", options = {}) {
  if (type !== "local") {
    throw new Error("Only 'local' storage is supported in this configuration.");
  }
  const filePath = path.join("/uploads", file.filename); // Relative path for the uploaded file
  return {
    url: filePath, // File URL (relative to "public")
    publicId: file.filename, // Use filename as "publicId"
  };
}

module.exports = { upload, uploadFile };
