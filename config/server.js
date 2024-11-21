const http = require("http");
const socketIO = require("socket.io");
const socketHandler = require("./socket");

// Create the server
const server = http.createServer(app);

// Integrate Socket.IO
const io = socketIO(server);
socketHandler(io);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
