// controllers/mentorWebController.js

const Mentor = require("../models/mentor/mentor");
const mentorService = require("../services/mentorService");
const userService = require("../services/userService");
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
    // Fetch the mentor by the user ID from the params
    const userId = req.params.id;

    // Find the mentor by user ID
    const mentor = await mentorService.getMentorByUserId(userId);

    if (!mentor) {
      req.flash("error", "Mentor not found.");
      console.log("Mentor not found");
      return res.redirect("/");
    }

    const isOwner = mentor.user._id.toString() === req.user._id.toString(); // Check if logged-in user is the owner
    console.log("isOwner: " + isOwner);
    console.log("mentor: " + mentor.user._id);
    console.log("user: " + req.user._id);

    // Render the profile page and pass mentor data and ownership status
    res.render("mentor/profile/index", { mentor, isOwner });
  } catch (error) {
    console.error("Error fetching mentor profile: ", error);
    req.flash("error", "An error occurred while fetching the profile.");
    res.redirect("/");
  }
};

module.exports.renderEditProfile = async(req, res) => {
  let userId = req.user._id;
  const mentor = await mentorService.getMentorByUserId(userId);
  console.log("Mentor retrieved successfully for user " + userId);
  console.log("mentor: ", mentor);
  
  
  res.render("mentor/profile/edit",{mentor:mentor});
  };
// Edit Profile Controller
module.exports.editProfile = async (req, res) => {
  const paramsId = req.params.id;
  const userId = req.user._id;
  console.log("edit controller....................................................");
  console.log("paramsId", paramsId);
  console.log("userId", userId);
  

  try {
    const mentor = await mentorService.getMentorByUserId(userId);

    if (!mentor || mentor.user._id.toString() !== userId.toString()) {
      req.flash('error', 'You do not have permission to edit this profile.');
      return res.redirect(`/mentor/profile/${paramsId}`);
    }

    const mentorId = mentor._id;
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
    res.redirect(`/mentor/profile/${paramsId}`);
  } catch (error) {
    console.error("Error updating mentor profile: ", error);
    req.flash('error', 'An error occurred while updating the profile.');
    res.redirect(`/mentor/profile/${paramsId}`);
  }
};

// Delete Profile Controller
module.exports.deleteProfile = async (req, res) => {
  const paramsId = req.params.id; // The user ID from the URL
  const userId = req.user._id; // The currently logged-in user's ID

  try {
    // Fetch the mentor profile based on the user ID
    const mentor = await mentorService.getMentorByUserId(paramsId);

    // Check if the mentor exists and if the logged-in user is the owner
    if (!mentor || mentor.user._id.toString() !== userId.toString()) {
      req.flash('error', 'You do not have permission to delete this profile.');
      return res.redirect(`/mentor/profile/${paramsId}`);
    }

    // Delete the mentor profile
    await mentorService.deleteMentor(mentor._id);

    // Delete the associated user account
    await userService.deleteUserById(userId); // Ensure you have a `deleteUserById` function in your user service

    // Logout the user after deletion
    req.logout(err => {
      if (err) {
        console.error("Error during logout after profile deletion: ", err);
        req.flash('error', 'An error occurred during logout. Please try again.');
        return res.redirect(`/mentor/profile/${paramsId}`);
      }

      req.flash('success', 'Your profile has been deleted successfully.');
      res.redirect('/'); // Redirect to the homepage or another safe page
    });
  } catch (error) {
    console.error("Error deleting mentor profile and user: ", error);
    req.flash('error', 'An error occurred while deleting the profile.');
    res.redirect(`/mentor/profile/${paramsId}`);
  }
};
