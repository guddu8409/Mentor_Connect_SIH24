// controllers/mentorWebController.js

const Mentor = require("../models/mentor/mentor");
const mentorService = require("../services/mentorService");
const { validationResult } = require("express-validator");

module.exports.dashboard = (req, res) => {
  res.render("mentor/home/home");
};

module.exports.viewUsers = (req, res) => {
  res.render("mentor/users/users");
};

module.exports.notifications = (req, res) => {
  res.render("mentor/notifications/notifications");
};

module.exports.viewProfile = async (req, res) => {
  try {
    const mentorId = req.params.id;
    const mentor = await mentorService.getMentorById(mentorId);

    if (!mentor) {
      req.flash('error', 'Mentor not found.');
      return res.redirect('/');
    }

    const isOwner = mentor.user.toString() === req.user._id.toString(); // Check if logged-in user is the owner
    res.render('mentor/profile/index', { mentor, isOwner });
  } catch (error) {
    console.error("Error fetching mentor profile: ", error);
    req.flash('error', 'An error occurred while fetching the profile.');
    res.redirect('/');
  }
};

// Edit Profile Controller
module.exports.editProfile = async (req, res) => {
  const mentorId = req.params.id;
  const userId = req.user._id;

  try {
    const mentor = await mentorService.getMentorById(mentorId);

    if (!mentor || mentor.user.toString() !== userId.toString()) {
      req.flash('error', 'You do not have permission to edit this profile.');
      return res.redirect(`/mentor/profile/${mentorId}`);
    }

    // Validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("mentor/profile/edit", { mentor, errors: errors.array() });
    }

    const updatedData = {
      expertise: req.body.expertise,
      yearsOfExperience: req.body.yearsOfExperience,
      bio: req.body.bio,
      linkedIn: req.body.linkedIn,
      twitter: req.body.twitter,
      github: req.body.github,
      portfolio: req.body.portfolio,
    };

    await mentorService.updateMentor(mentorId, updatedData);
    req.flash("success", "Profile updated successfully!");
    res.redirect(`/mentor/profile/${mentorId}`);
  } catch (error) {
    console.error("Error updating mentor profile: ", error);
    req.flash('error', 'An error occurred while updating the profile.');
    res.redirect(`/mentor/profile/${mentorId}`);
  }
};

// Delete Profile Controller
module.exports.deleteProfile = async (req, res) => {
  const mentorId = req.params.id;
  const userId = req.user._id;

  try {
    const mentor = await mentorService.getMentorById(mentorId);

    if (!mentor || mentor.user.toString() !== userId.toString()) {
      req.flash('error', 'You do not have permission to delete this profile.');
      return res.redirect(`/mentor/profile/${mentorId}`);
    }

    await mentorService.deleteMentor(mentorId);
    req.flash('success', 'Profile deleted successfully.');
    res.redirect('/'); // Redirect to homepage or another page after deletion
  } catch (error) {
    console.error("Error deleting mentor profile: ", error);
    req.flash('error', 'An error occurred while deleting the profile.');
    res.redirect(`/mentor/profile/${mentorId}`);
  }
};
