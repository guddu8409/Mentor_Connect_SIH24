// server.js

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
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser');
const multer = require('multer');

// MongoDB Connection
const connectToDatabase = require("./config/mongoConfig"); // Import the MongoDB configuration
connectToDatabase(); // Call the connection function

// Session Configuration
const session = require("express-session");
const sessionConfig = require("./config/sessionConfig");
const MONGO_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/mentorConnect2";
const SESSION_SECRET = process.env.SESSION_SECRET || "defaultsecret";

// Models
const User = require("./models/user");

// Express App Initialization
const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server); // Attach Socket.IO to the server

// Express Configuration
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(session(sessionConfig(MONGO_URL, SESSION_SECRET))); // Use the session config module
app.use(flash());

// For handling multipart/form-data (file uploads)
const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage });

app.use(upload.any());


// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware for Flash Messages
app.use((req, res, next) => {
  res.locals.currUser = req.user;
  res.locals.userRole = req.user?.role || "mentee";
  res.locals.messages = {
    success: req.flash("success"),
    error: req.flash("error"),
    info: req.flash("info"),
  };
  next();
});

// Routes
app.use("/auth", require("./routes/authWebRoutes"));
app.use("/mentor", require("./routes/mentorWebRoutes"));
app.use("/chat", require("./routes/chatRoutes"));
app.use("/mentee", require("./routes/menteeWebRoutes"));
app.use("/admin", require("./routes/adminWebRoutes"));
app.use("/jobs", require("./routes/jobRoutes"));
app.use("/jobs/:id/reviews", require("./routes/jobReviewRoutes"));
app.use("/groups", require("./routes/groupRoutes"));
app.use("/groups/:groupId/quizzes", require("./routes/quizRoutes"));
// app.use("/events",require("./routes/eventRoutes"));
// app.use("/events/:id/reviews", require("./routes/eventReviewRoutes"));

app.use("/discussions", require("./routes/discussionRoutes"));
app.use("/discussions/:id/reviews",require("./routes/discussionReviewRoutes"));
// app.use("/api/payment", require("./routes/paymentRoutes"));

app.use("/donations",require("./routes/donationRoutes"));
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
const chatServer = require("./chatServer"); // Import the chat server module
chatServer(io); // Pass the Socket.IO instance to the chat server

// Server Listener
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
