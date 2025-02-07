const Admin = require("../models/admin/admin");
const adminService = require("../services/adminService");
const userService = require("../services/userService");
const { validationResult } = require("express-validator");

module.exports.dashboard = (req, res) => {
  res.render("admin/home/home", { cssFile: "admin/home.css" });
};

module.exports.viewUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(); // Adjust service as needed to fetch users
    res.render("admin/users/users", { users });
  } catch (error) {
    console.error("Error fetching users: ", error);
    req.flash("error", "An error occurred while fetching users.");
    res.redirect("/");
  }
};

module.exports.viewProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const admin = await adminService.getAdminByUserId(userId);

    if (!admin) {
      req.flash("error", "Admin not found.");
      return res.redirect("/");
    }

    const isOwner = admin.user._id.toString() === req.user._id.toString();

    res.render("admin/profile/index", { admin, isOwner });
  } catch (error) {
    console.error("Error fetching admin profile: ", error);
    req.flash("error", "An error occurred while fetching the profile.");
    res.redirect("/");
  }
};

module.exports.renderEditProfile = async (req, res) => {
  const userId = req.user._id;
  const admin = await adminService.getAdminByUserId(userId);
  res.render("admin/profile/edit", { admin });
};

module.exports.editProfile = async (req, res) => {
  const paramsId = req.params.id;
  const userId = req.user._id;

  try {
    const admin = await adminService.getAdminByUserId(userId);

    if (!admin || admin.user._id.toString() !== userId.toString()) {
      req.flash("error", "You do not have permission to edit this profile.");
      return res.redirect(`/admin/profile/${paramsId}`);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("admin/profile/edit", { admin, errors: errors.array() });
    }

    const updatedData = {
      permissions: req.body.permissions,
      department: req.body.department,
    };

    await adminService.updateAdmin(admin._id, updatedData);
    req.flash("success", "Profile updated successfully!");
    res.redirect(`/admin/profile/${paramsId}`);
  } catch (error) {
    console.error("Error updating admin profile: ", error);
    req.flash("error", "An error occurred while updating the profile.");
    res.redirect(`/admin/profile/${paramsId}`);
  }
};

module.exports.deleteProfile = async (req, res) => {
  const paramsId = req.params.id;
  const userId = req.user._id;

  try {
    const admin = await adminService.getAdminByUserId(paramsId);

    if (!admin || admin.user._id.toString() !== userId.toString()) {
      req.flash("error", "You do not have permission to delete this profile.");
      return res.redirect(`/admin/profile/${paramsId}`);
    }

    await adminService.deleteAdmin(admin._id);
    await userService.deleteUserById(userId);

    req.logout((err) => {
      if (err) {
        req.flash("error", "An error occurred during logout. Please try again.");
        return res.redirect(`/admin/profile/${paramsId}`);
      }
      req.flash("success", "Your profile has been deleted successfully.");
      res.redirect("/");
    });
  } catch (error) {
    console.error("Error deleting admin profile and user: ", error);
    req.flash("error", "An error occurred while deleting the profile.");
    res.redirect(`/admin/profile/${paramsId}`);
  }
};
