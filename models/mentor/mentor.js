const mongoose = require("mongoose");

// Availability Schema
// const AvailabilitySchema = new mongoose.Schema({
//   type: { type: String, enum: ["immediate", "scheduled"], default: "immediate" },
//   startTime: { type: Date, default: null }, // Default to null
//   endTime: { type: Date, default: null }, // Default to null
//   reasonUnavailable: { type: String, default: "" }, // Default to an empty string
// });

// Mentor Schema
const MentorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // No default since it's required
  expertise: { type: [String], default: [] }, // Default to an empty array
  yearsOfExperience: { type: Number, default: 0 }, // Default to 0
  availability: {
    type: { type: String, enum: ["immediate", "scheduled"], default: "immediate" },
    startTime: { type: Date, default: null }, // Default to null
    endTime: { type: Date, default: null }, // Default to null
  },
  bio: { type: String, default: "" }, // Default to an empty string
  linkedIn: { type: String, default: "" }, // Default to an empty string
  twitter: { type: String, default: "" }, // Default to an empty string
  github: { type: String, default: "" }, // Default to an empty string
  portfolio: { type: String, default: "" }, // Default to an empty string
  pendingRequests: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "ConnectionRequest" }],
    default: [], // Default to an empty array
  },
  connections: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentee" }],
    default: [], // Default to an empty array
  },
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