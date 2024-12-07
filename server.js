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
// const mongoose = require("mongoose");
const session = require("express-session");

// Configurations and Services
const connectToDatabase = require("./config/mongoConfig");
const sessionConfig = require("./config/sessionConfig");
// const uploadService = require("./services/uploadService");
const flashConfig = require("./config/flashConfig");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes/indexRoutes");

// MongoDB Connection
connectToDatabase();

// Models
const User = require("./models/user");

// Express App Initialization
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Express Configuration
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(
  session(sessionConfig(process.env.MONGODB_URL, process.env.SESSION_SECRET))
);
app.use(flash());

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware for Flash Messages
app.use(flashConfig);

// Routes
app.use(routes);

// Landing Page Route
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect(`/${req.user.role}`);
  }
  res.render("common/landingPage", { cssFile: "common/landingPage.css" });
});

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

// Error Handling Middleware
app.use(errorHandler);

// Real-Time Chat Integration
const chatServer = require("./chatServer");
chatServer(io);

// Server Listener
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
