const mongoose = require("mongoose");

// Availability Schema
const AvailabilitySchema = new mongoose.Schema({
  type: { type: String, required: false, enum: ["immediate", "scheduled"] },
  startTime: { type: Date, required: false },
  endTime: { type: Date }, // Optional
  reasonUnavailable: { type: String }, // Optional
});


// Updated Mentor Schema
const MentorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expertise: { type: [String], default: [] },
  yearsOfExperience: { type: Number, default: 0 },
  availability: {
    type: { type: String, enum: ["immediate", "scheduled"], default: "immediate" },
    startTime: { type: Date },
    endTime: { type: Date },
  },
  bio: { type: String, default: "" },
  linkedIn: { type: String, default: "" },
  twitter: { type: String, default: "" },
  github: { type: String, default: "" },
  portfolio: { type: String, default: "" },
  pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "ConnectionRequest" }], // Pending requests
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentee" }], // Accepted connections
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
