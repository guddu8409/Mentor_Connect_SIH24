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
const Booking = require("./models/bookingModel"); // Ensure the model is imported
// const User = require("../models/user");

// const Booking = require("../models/bookingModel"); // Assuming the Booking model is in this path

app.get("/mentor/schedule", async (req, res) => {
  try {
    // Fetch the logged-in user's mentor ID
    const mentorId = req.user._id;

    // Fetch all bookings where the logged-in user is the mentor
    const bookings = await Booking.find({ mentorUserId: mentorId })
      .populate("menteeUserId") // Populate mentee details
      .exec();

    console.log(
      "................................................................"
    );

    // Format bookings for FullCalendar
    const formattedBookings = bookings.map((booking) => ({
      bookingId: booking._id.toString(), // Add the booking ID to the formatted data
      title: `Session with ${
        booking.menteeUserId ? booking.menteeUserId.username : "Mentee"
      }`, // Use mentee's username
      start: booking.schedule.start.toISOString(), // Convert date to ISO string
      end: booking.schedule.end.toISOString(), // Convert date to ISO string
      status: booking.status, // Include booking status
      reason: booking.reason || "", // Default to empty string if no reason
      paymentStatus: booking.payment
        ? `Payment done with ${booking.payment.toString()}`
        : "Payment not done", // Check for payment and format accordingly
    }));

    console.log(formattedBookings);
    // Render the schedule page and pass the bookings data
    res.render("mentor/booking/index.ejs", {
      userRole: "mentor", // Render the page for a mentor
      bookings: formattedBookings, // Pass formatted bookings to the template
    });
  } catch (err) {
    console.error("Error fetching mentor schedule:", err);
    res.status(500).send("An error occurred while fetching your schedule.");
  }
});

const mongoose = require('mongoose');
// const Booking = require('./models/Booking'); // Ensure this is the correct path

app.post('/mentor/update-booking', async (req, res) => {
  console.log("Updating schedule: Received request body:");
  console.log(req.body);

  const { bookingId, status, reason } = req.body; // Extract bookingId, status, and reason

  // Step 1: Validate input
  if (!bookingId || !status) {
    console.error("Error: Missing required fields in the request body.");
    return res.status(400).send({ 
      message: "Invalid request: bookingId and status are required fields." 
    });
  }

  try {
    // Step 2: Convert bookingId to ObjectId if it's a string and the field in DB is an ObjectId
    let bookingQuery = { bookingId };
    if (mongoose.Types.ObjectId.isValid(bookingId)) {
      bookingQuery = { _id: new mongoose.Types.ObjectId(bookingId) }; // Correct instantiation of ObjectId
    }

    console.log(`Searching for booking with bookingId: ${bookingId}`);
    const booking = await Booking.findOne(bookingQuery); // Use the correct query format
    console.log("Booking query executed.");

    if (booking) {
      console.log(`Booking found. Updating bookingId: ${bookingId}`);

      // Step 3: Update booking fields
      booking.status = status;
      booking.reason = reason;

      console.log(`Saving updated booking with bookingId: ${bookingId}`);
      await booking.save(); // Save changes to the database
      console.log("Booking saved successfully.");

      // Step 4: Send success response
      return res.status(200).send({ message: "Booking updated successfully" });
    } else {
      console.error(`Error: Booking with bookingId ${bookingId} not found.`);
      return res.status(404).send({ 
        message: `Booking not found: No booking exists with bookingId ${bookingId}` 
      });
    }
  } catch (error) {
    // Step 5: Handle errors
    console.error("Error during booking update:", error);
    return res.status(500).send({ 
      message: "Internal server error. Please try again later." 
    });
  }
});






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
const { log } = require("console");
chatServer(io);

// Server Listener
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
