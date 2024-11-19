module.exports.dashboard = (req, res) => {
  console.log("try to load dashboard");
  
    res.render("mentee/home/home");
  };
  
  module.exports.viewUsers = (req, res) => {
    // Add logic to retrieve users that mentors are allowed to manage/interact with
    res.render("mentor/users/index", { title: "Manage Users" });
  };
  
  module.exports.notifications = (req, res) => {
    // Example notifications functionality
    res.render("mentor/notification", { title: "Mentor Notifications" });
  };
  