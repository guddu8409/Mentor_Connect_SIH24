const mongoose = require("mongoose");

// Availability Schema
const AvailabilitySchema = new mongoose.Schema({
  type: { type: String, required: false, enum: ["immediate", "scheduled"] },
  startTime: { type: Date, required: false },
  endTime: { type: Date }, // Optional
  reasonUnavailable: { type: String }, // Optional
});

// Mentor Schema
const MentorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  expertise: { type: [String], required: false, default: [] }, // Array of expertise areas
  yearsOfExperience: { type: Number, required: false, default: 0 }, // Years of experience
  availability: AvailabilitySchema, // Embedded schema for availability
  bio: { type: String, required: false, default: "" }, // Mentor bio
  linkedIn: { type: String, required: false, default: "" }, // LinkedIn profile
  twitter: { type: String, required: false, default: "" }, // Twitter profile
  github: { type: String, required: false, default: "" }, // GitHub profile
  portfolio: { type: String, required: false, default: "" }, // Portfolio link
});

// Middleware to auto-populate the `user` field when querying
MentorSchema.pre("find", function () {
  this.populate("user");
});

MentorSchema.pre("findOne", function () {
  this.populate("user");
});

// Export the Mentor model
module.exports = mongoose.model("Mentor", MentorSchema);
