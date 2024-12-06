const multer = require("multer");
const { storage } = require("../config/cloudConfig"); // Use Cloudinary storage if configured
const path = require("path");

const { getUploader } = require("../services/uploadService");

// Choose Cloudinary or local storage dynamically
const upload = getUploader(process.env.UPLOAD_TYPE || "cloudinary");


// Cloudinary-based upload
const uploadToCloudinary = multer({ storage });

// Local storage configuration (fallback if Cloudinary is not used)
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the local upload folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadToLocal = multer({ storage: localStorage });

// Function to choose between Cloudinary or local
function getUploader(type = "cloudinary") {
  return type === "cloudinary" ? uploadToCloudinary : uploadToLocal;
}

module.exports = { getUploader };
