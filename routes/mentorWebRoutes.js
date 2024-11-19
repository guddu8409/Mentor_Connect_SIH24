// routes/mentorRoutes.js

const express = require("express");
const { isLoggedIn, isMentor, isOwner } = require("../middlewares/authMiddleware");
const { dashboard, viewUsers, notifications, viewProfile, editProfile, deleteProfile,renderEditProfile } = require("../controllers/mentorWebController");

const router = express.Router();

// Mentor Dashboard
router.get("/", isLoggedIn, isMentor, dashboard);

// Manage Users (mentor-specific user management)
router.get("/users", isLoggedIn, isMentor, viewUsers);

// View Mentor Profile
router.get("/profile/:id", isLoggedIn, isMentor, viewProfile);

// Edit Mentor Profile (only for the owner)
router.get("/profile/edit/:id", isLoggedIn, isMentor, isOwner, renderEditProfile);
router.post("/profile/edit/:id", isLoggedIn, isMentor, isOwner, editProfile);

// Delete Mentor Profile (only for the owner)
router.post("/profile/delete/:id", isLoggedIn, isMentor, isOwner, deleteProfile);

// Mentor Notifications
router.get("/notifications", isLoggedIn, isMentor, notifications);

module.exports = router;
