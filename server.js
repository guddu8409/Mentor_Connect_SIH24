// Handle Unhandled Rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", { promise, reason });
  process.exit(1);
});

// Environment Configuration
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Imports
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const http = require("http");
const socketIo = require("socket.io");

// Models
const User = require("./models/user");
const Chat = require("./models/chat"); // Import Chat model

// Route Imports
const authRoutes = require("./routes/authWebRoutes");
const mentorRoutes = require("./routes/mentorWebRoutes");
const menteeRoutes = require("./routes/menteeWebRoutes");
const adminRoutes = require("./routes/adminWebRoutes");
const chatRoutes = require("./routes/chatRoutes");

// Express App Initialization
const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server); // Attach Socket.IO to the server

// Mongoose Connection
const MONGO_URL =
  process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/mentorConnect2";
mongoose
  .connect(MONGO_URL, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Express Configuration
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Session and Flash Configuration
const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  secret: process.env.SESSION_SECRET || "defaultsecret",
  touchAfter: 24 * 3600,
});

const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET || "defaultsecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware for Flash Messages
app.use((req, res, next) => {
  res.locals.currUser = req.user;
  res.locals.messages = {
    success: req.flash("success"),
    error: req.flash("error"),
    info: req.flash("info"),
  };
  next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/mentor", mentorRoutes);
app.use("/chat", chatRoutes);
app.use("/mentee", menteeRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect(`/${req.user.role}`);
  }
  res.render("common/landingPage", { cssFile: "common/landingPage.css" });
});

// Error Handling
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("common/error", { message });
});

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

// Real-Time Chat Integration
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

// Server Listener
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});