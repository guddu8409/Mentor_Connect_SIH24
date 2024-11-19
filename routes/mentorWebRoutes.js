const express = require("express");
const { isLoggedIn, isMentor } = require("../middlewares/authMiddleware");
const { dashboard, viewUsers, notifications } = require("../controllers/mentorWebController");

const router = express.Router();

// Mentor Dashboard
router.get("/", isLoggedIn, isMentor, dashboard);

// Manage Users (Example: mentor-specific user management)
router.get("/users", isLoggedIn, isMentor, viewUsers);

// Mentor Notifications
router.get("/notifications", isLoggedIn, isMentor, notifications);

module.exports = router;
