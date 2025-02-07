const { log } = require("console");
const userService = require("../services/userService");

module.exports.register = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    // Call userService for registration
    const { user } = await userService.register({ username, password, email, role });

    req.login(user, (err) => {
      if (err) throw new Error("Login failed");
      req.flash("success", `Welcome! ${user.username}`);
      res.redirect(`/${role}`);
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/register");
  }
};


module.exports.forgetPassword = async (req, res) => {

  try {
    const { username, password } = req.body;
    // console.log(username, password);
    // console.log("password", password);
    

    // Call userService to reset the password
    await userService.resetPassword(username, password);

    req.flash("success", "Password has been reset successfully.");
    res.redirect("/auth/login");
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/auth/forgetPassword");
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


