const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Debugging: Log Cloudinary configuration initialization
console.log("Initializing Cloudinary configuration...");

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Ensure environment variables are loaded
if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
  console.error("Error: Missing Cloudinary configuration in environment variables.");
  throw new Error("Cloudinary configuration is incomplete.");
}

// Define Cloudinary storage for file uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "connexus_dev", // Folder where files will be uploaded in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Restrict file formats
  },
});

// Debugging: Log storage initialization
console.log("Cloudinary storage configured successfully.");

module.exports = { cloudinary, storage };
