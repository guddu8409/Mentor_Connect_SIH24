const express = require("express");
const { isLoggedIn, isMentee, isOwner } = require("../middlewares/authMiddleware");
const {
  dashboard,
  viewMentors,
  notifications,
  viewProfile,
  editProfile,
  deleteProfile,
  renderEditProfile, displayMentor,displayMentorList,
  displayAllConnections,
  connectRequest,
  cancelRequest,
} = require("../controllers/menteeWebController");

const router = express.Router();

router.get("/", isLoggedIn, isMentee, dashboard);
router.get("/mentors", isLoggedIn, isMentee, viewMentors);
router.get("/profile/:id", isLoggedIn, isMentee, viewProfile);
router.get("/profile/edit/:id", isLoggedIn, isMentee, isOwner, renderEditProfile);
router.post("/profile/edit/:id", isLoggedIn, isMentee, isOwner, editProfile);
router.post("/profile/delete/:id", isLoggedIn, isMentee, isOwner, deleteProfile);
router.get("/notifications", isLoggedIn, isMentee, notifications);

router.get("/findMentor", isLoggedIn, isMentee, displayMentor);

router.get("/mentorList", isLoggedIn, isMentee, displayMentorList);

router.get("/connections", isLoggedIn, isMentee, displayAllConnections);

router.get("/connections/:mentorId/connectRequest", isLoggedIn, isMentee, connectRequest);

// Cancel Connection Request
router.delete('/connections/:mentorId/cancelRequest',isLoggedIn, isMentee, cancelRequest);



/*
router.get("/connections", connectionController.getConnections); // List connections
router.post("/connections", connectionController.sendRequest);   // Send request
router.patch("/connections/:id", connectionController.updateRequest); // Accept/reject requests

router.get("/messages/:mentorId", messageController.getMessages); // Fetch messages
router.post("/messages/:mentorId", messageController.sendMessage); // Send message


*/

module.exports = router;
