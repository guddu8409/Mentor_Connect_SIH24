const express = require("express");
const { isLoggedIn, isMentee, isOwner } = require("../middlewares/authMiddleware");
const menteeController = require("../controllers/menteeWebController");

const router = express.Router();

// Dashboard route
router.get("/", isLoggedIn, isMentee, menteeController.dashboard);

// Profile routes
router.get("/profile/:id", isLoggedIn, isMentee, menteeController.viewProfile);
router.get("/profile/edit/:id", isLoggedIn, isMentee, isOwner, menteeController.renderEditProfile);
router.post("/profile/edit/:id", isLoggedIn, isMentee, isOwner, menteeController.editProfile);
router.post("/profile/delete/:id", isLoggedIn, isMentee, isOwner, menteeController.deleteProfile);

// Mentor listing and finding routes
router.get("/mentorList", isLoggedIn, isMentee, menteeController.displayMentorList);

// Connection routes
router.get("/connections", isLoggedIn, isMentee, menteeController.displayAllConnections);
router.post("/connections/:mentorId/connectRequest", isLoggedIn, isMentee, menteeController.connectRequest);
router.delete("/connections/:mentorId/cancelRequest", isLoggedIn, isMentee, menteeController.cancelRequest);

// scheduling routes
router.get("/schedule/:mentorId", isLoggedIn, isMentee, menteeController.renderMentorScheduleForMentee);
// router.post("/schedule/:bookingId/cancel-booking",isLoggedIn, isMentee, MenteeController.cancelBookRequest);
// router.post("/schedule/:bookingId/reverse-cancel-booking",isLoggedIn, isMentee, MenteeController.reverseCancelBookingRequest);

module.exports = router;
