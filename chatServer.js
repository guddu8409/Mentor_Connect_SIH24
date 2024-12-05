// chatServer.js
const Chat = require("./models/chat"); // Import Chat model

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join a chat room based on the chat ID
    socket.on("joinRoom", (chatId) => {
      socket.join(chatId);
      console.log(`User joined room: ${chatId}`);
    });

    // Listen for a new message from the client
    socket.on("newMessage", async ({ chatId, senderId, text }) => {
      try {
        // Save the message to the database
        const chat = await Chat.findById(chatId);
        if (!chat) return;

        const message = { sender: senderId, text, timestamp: new Date() };
        chat.messages.push(message);
        await chat.save();

        // Broadcast the new message to all users in the room
        io.to(chatId).emit("message", message);
      } catch (error) {
        console.error("Error handling newMessage:", error);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};
