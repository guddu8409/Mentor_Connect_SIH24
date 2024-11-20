const express = require("express");
const { isLoggedIn, isMentee, isOwner } = require("../middlewares/authMiddleware");
const {
  dashboard,
  viewMentors,
  notifications,
  viewProfile,
  editProfile,
  deleteProfile,
  renderEditProfile,displayMentor,
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

module.exports = router;
