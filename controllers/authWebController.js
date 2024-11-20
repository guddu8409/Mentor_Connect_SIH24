const Admin = require("../models/admin/admin");
const Mentor = require("../models/mentor/mentor");
const Mentee = require("../models/mentee/mentee");
const User = require("../models/user");

module.exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    // Create a new User document
    const user = new User({ username, role });
    console.log("Creating new user with role:", role);

    // Register the user with hashed password
    const registeredUser = await User.register(user, password);
    console.log("User registered successfully:", registeredUser);

    // Create a role-specific document and associate the User
    let roleDocument;
    switch (role) {
      case "admin":
        roleDocument = new Admin({
          user: registeredUser._id,
          permissions: ["read", "write", "delete"], // Default permissions
          department: "Operations", // Default department
        });
        break;

      case "mentor":
        roleDocument = new Mentor({
          user: registeredUser._id,
          expertise: [], // Default empty expertise
          yearsOfExperience: 0, // Default years of experience
          bio: "",
          linkedIn: "",
          twitter: "",
          github: "",
          portfolio: "",
        });
        break;

      case "mentee":
        roleDocument = new Mentee({
          user: registeredUser._id,
          goals: "", // Default empty goals
          interests: [], // Default empty interests
          progress: "Not Started", // Default progress
        });
        break;

      default:
        console.log("Unknown role, no role-specific document created.");
        req.flash("error", "Invalid role selected.");
        return res.redirect("/register"); // Redirect to the registration page
    }

    if (roleDocument) {
      await roleDocument.save();
      console.log(`${role.charAt(0).toUpperCase() + role.slice(1)} document created:`, roleDocument);
    }

    // Automatically log in the registered user
    req.login(registeredUser, (err) => {
      if (err) {
        console.error("Error logging in user after registration:", err);
        req.flash("error", "An error occurred while logging you in. Please try again.");
        return res.redirect("/login");
      }

      req.flash("success", "Welcome!");
      return res.redirect(`/${registeredUser.role}`); // Redirect to a role-specific dashboard
    });
  } catch (error) {
    console.error("Error during registration:", error);
    req.flash("error", error.message);
    res.redirect("/register");
  }
};

module.exports.login = (req, res) => {
  const redirectUrl = `/${req.user.role}`;
  req.flash("success", "Welcome back!");
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully.");
    res.redirect("/");
  });
};
