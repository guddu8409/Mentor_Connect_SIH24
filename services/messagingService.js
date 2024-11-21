const Message = require("../models/Message");

// Save a new message
exports.saveMessage = async (data) => {
  const message = new Message(data);
  return await message.save();
};

// Retrieve chat history between mentor and mentee
exports.getChatHistory = async (user1, user2) => {
  return await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 },
    ],
  }).sort({ createdAt: 1 }); // Sort messages by time
};
