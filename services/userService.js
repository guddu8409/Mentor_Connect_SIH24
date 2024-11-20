const User = require('../models/user'); // Ensure the correct path

const deleteUserById = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  // Other userService functions
  deleteUserById,
};
