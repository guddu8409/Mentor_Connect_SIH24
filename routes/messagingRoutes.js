const express = require("express");
const router = express.Router();
const { getMessages } = require("../controllers/messagingController.js");
const upload = require("../middlewares/uploadMiddleware");

// Route to fetch messages
router.get("/:userId", getMessages);

// Route to upload files (used in messaging)
router.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json({ fileUrl: `/uploads/${req.file.filename}` });
  } catch (err) {
    res.status(500).json({ message: "File upload failed", error: err.message });
  }
});

module.exports = router;
