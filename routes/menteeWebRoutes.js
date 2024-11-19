const express = require("express");
const { isLoggedIn, isMentee } = require("../middlewares/authMiddleware");
const { dashboard, viewUsers, notifications } = require("../controllers/menteeWebController");

const router = express.Router();

// Mentor Dashboard
router.get("/", isLoggedIn, isMentee, dashboard);

// Manage Users (Example: mentor-specific user management)
router.get("/users", isLoggedIn, isMentee, viewUsers);

// Mentor Notifications
router.get("/notifications", isLoggedIn, isMentee, notifications);

module.exports = router;
