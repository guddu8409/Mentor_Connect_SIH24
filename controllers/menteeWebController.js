const Mentee = require("../models/mentee/mentee");
const Mentor = require("../models/mentor/mentor");
const menteeService = require("../services/menteeService");
const userService = require("../services/userService");
const { validationResult } = require("express-validator");

module.exports.dashboard = (req, res) => {
  res.render("mentee/home/home");
};

module.exports.viewMentors = (req, res) => {
  res.render("mentee/mentors/mentors");
};

module.exports.notifications = (req, res) => {
  res.render("mentee/notifications/notifications");
};

module.exports.viewProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("try to view mentee profile................................");
    
    const mentee = await menteeService.getMenteeByUserId(userId);

    if (!mentee) {
      req.flash("error", "Mentee not found.");
      return res.redirect("/");
    }
console.log("Mentee retrieved: " + JSON.stringify(mentee));

    const isOwner = mentee.user._id.toString() === req.user._id.toString();

    res.render("mentee/profile/index", { mentee, isOwner });
  } catch (error) {
    console.error("Error fetching mentee profile: ", error);
    req.flash("error", "An error occurred while fetching the profile.");
    res.redirect("/");
  }
};

module.exports.renderEditProfile = async (req, res) => {
  const userId = req.user._id;
  const mentee = await menteeService.getMenteeByUserId(userId);
  res.render("mentee/profile/edit", { mentee });
};

module.exports.editProfile = async (req, res) => {
  const paramsId = req.params.id;
  const userId = req.user._id;

  try {
    const mentee = await menteeService.getMenteeByUserId(userId);

    if (!mentee || mentee.user._id.toString() !== userId.toString()) {
      req.flash("error", "You do not have permission to edit this profile.");
      return res.redirect(`/mentee/profile/${paramsId}`);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("mentee/profile/edit", { mentee, errors: errors.array() });
    }

    const updatedData = {
      goals: req.body.goals,
      educationLevel: req.body.educationLevel,
      bio: req.body.bio,
    };

    await menteeService.updateMentee(mentee._id, updatedData);
    req.flash("success", "Profile updated successfully!");
    res.redirect(`/mentee/profile/${paramsId}`);
  } catch (error) {
    console.error("Error updating mentee profile: ", error);
    req.flash("error", "An error occurred while updating the profile.");
    res.redirect(`/mentee/profile/${paramsId}`);
  }
};

module.exports.deleteProfile = async (req, res) => {
  const paramsId = req.params.id;
  const userId = req.user._id;

  try {
    const mentee = await menteeService.getMenteeByUserId(paramsId);

    if (!mentee || mentee.user._id.toString() !== userId.toString()) {
      req.flash("error", "You do not have permission to delete this profile.");
      return res.redirect(`/mentee/profile/${paramsId}`);
    }

    await menteeService.deleteMentee(mentee._id);
    await userService.deleteUserById(userId);

    req.logout((err) => {
      if (err) {
        req.flash("error", "An error occurred during logout. Please try again.");
        return res.redirect(`/mentee/profile/${paramsId}`);
      }
      req.flash("success", "Your profile has been deleted successfully.");
      res.redirect("/");
    });
  } catch (error) {
    console.error("Error deleting mentee profile and user: ", error);
    req.flash("error", "An error occurred while deleting the profile.");
    res.redirect(`/mentee/profile/${paramsId}`);
  }
};

module.exports.displayMentor = async (req, res) => {
  try {
      const mentors = await Mentor.find().populate('user').exec(); // Replace with your mentor fetching logic
      res.render("mentee/findMentor/mentorList", { mentors,cssFile:"mentee/findmentor/mentorList.css" });
  } catch (error) {
      console.error("Error fetching mentors:", error);
      res.status(500).send("An error occurred while fetching mentors.");
  }
};

