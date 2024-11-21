const { saveMessage } = require("./services/messagingService");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handle message sending
    socket.on("sendMessage", async (data) => {
      const { sender, receiver, content } = data;

      // Save the message to the database
      const savedMessage = await saveMessage({ sender, receiver, content });

      // Emit the message to the receiver
      io.to(receiver).emit("receiveMessage", savedMessage);
    });

    // Handle typing indication
    socket.on("typing", (data) => {
      io.to(data.receiver).emit("typing", { sender: data.sender });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};



const sockethandler = (io) => {
    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);
  
      // Handle signaling for video calls
      socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("incomingCall", {
          signal: data.signal,
          from: data.from,
          name: data.name,
        });
      });
  
      socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
      });
  
      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });
  };
  
//  module.exports = socketHandler;
  

module.exports = socketHandler;
