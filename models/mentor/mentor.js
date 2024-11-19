const mongoose = require("mongoose");

// Availability Schema
const AvailabilitySchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ["immediate", "scheduled"] },
  startTime: { type: Date, required: true },
  endTime: { type: Date }, // Optional
  reasonUnavailable: { type: String }, // Optional
});

// Mentor Schema
const MentorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  expertise: { type: [String], required: true },
  yearsOfExperience: { type: Number, required: true },
  availability: AvailabilitySchema,
  bio: { type: String },
  linkedIn: { type: String },
  twitter: { type: String },
  github: { type: String },
  portfolio: { type: String },
});

module.exports = mongoose.model("Mentor", MentorSchema);
