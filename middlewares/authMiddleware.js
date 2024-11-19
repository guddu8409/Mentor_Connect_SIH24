module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
      console.log("Authentication is required ");
      
      req.flash("error", "You must be signed in.");
      return res.redirect("/");
    }
    next();
  };
  
  module.exports.isMentor = (req, res, next) => {
    if (req.user && req.user.role === "mentor") {
      return next();
    }
    req.flash("error", "You do not have permission to access this page.");
    res.redirect("/");
  };
  
  module.exports.isMentee = (req, res, next) => {
    if (req.user && req.user.role === "mentee") {
      return next();
    }
    req.flash("error", "You do not have permission to access this page.");
    res.redirect("/");
  };

  module.exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      return next();
    }
    req.flash("error", "You do not have permission to access this page.");
    res.redirect("/");
  };

  // middlewares/authMiddleware.js

module.exports.isOwner = (req, res, next) => {
  const mentorId = req.params.id; // The mentor ID from the route
  const userId = req.user._id; // The logged-in user ID

  if (mentorId !== userId.toString()) {
    req.flash('error', 'You do not have permission to access this profile.');
    return res.redirect('/');
  }

  next();
};

