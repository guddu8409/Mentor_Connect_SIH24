const User = require("../models/user");

module.exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, role });
    console.log("new user: ");
    console.log(user);
    const registeredUser = await User.register(user, password);
    console.log("new user registered successfully with password: " + registeredUser.password);
    
    req.login(registeredUser, err => {
      console.log("try to login");
      
      if (err) return next(err);
      req.flash("success", "Welcome!");
      res.redirect(`/${registeredUser.role}`);
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/");
  }
};

module.exports.login = (req, res) => {
  const redirectUrl = `/${req.user.role}`;
  req.flash("success", "Welcome back!");
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully.");
    res.redirect("/");
  });
};
