const express = require("express");
const { isLoggedIn, isAdmin } = require("../middlewares/authMiddleware");
const { dashboard, viewUsers, notifications,viewProfile } = require("../controllers/adminWebController");

const router = express.Router();

// Mentor Dashboard
router.get("/", isLoggedIn, isAdmin, dashboard);

// Manage Users (Example: mentor-specific user management)
router.get("/users", isLoggedIn, isAdmin, viewUsers);

router.get("/profile/:id", isLoggedIn, isAdmin, viewProfile);

// Mentor Notifications
router.get("/notifications", isLoggedIn, isAdmin, notifications);

module.exports = router;
