const { getChatHistory } = require("../services/messagingService");

// Fetch chat history
exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params; // Receiver's ID
    const chatHistory = await getChatHistory(req.user._id, userId);
    res.status(200).json(chatHistory);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages", error: err.message });
  }
};
