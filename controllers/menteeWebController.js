const User=require('../models/user');

module.exports.dashboard = (req, res) => {
  console.log("try to load dashboard");
  
    res.render("mentee/home/home");
  };
  
  module.exports.viewUsers = (req, res) => {
    // Add logic to retrieve users that mentors are allowed to manage/interact with
    res.render("mentor/users/index", { title: "Manage Users" });
  };
  
  module.exports.viewProfile = async (req, res) => {
    try {
      // Fetch the user details from the database by the user ID passed in the URL parameters
      const user = await User.findById(req.params.id);  // Assuming 'id' is the field for the user ID in the database
      
      if (!user) {
        // If the user is not found, you can handle the error (e.g., user not found)
        req.flash('error', 'User not found.');
        return res.redirect('/');  // Redirect to the users list or another page
      }
  
      // Log the user details for debugging purposes (optional)
      console.log("Rendering profile for user: ", user);
  
      // Pass the user details to the 'index.ejs' template
      res.render('mentee/profile/index', { user });  // Pass 'user' as an object to the template
    } catch (error) {
      console.error("Error fetching user profile: ", error);
      req.flash('error', 'An error occurred while fetching user details.');
      res.redirect('/');  // Redirect to a safe place if an error occurs
    }
  };

  module.exports.notifications = (req, res) => {
    // Example notifications functionality
    res.render("mentor/notification", { title: "Mentor Notifications" });
  };
  