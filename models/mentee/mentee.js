const mongoose = require("mongoose");


// Updated Mentee Schema
const MenteeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  goals: { type: [String], default: [] },
  educationLevel: { type: String, default: "" },
  bio: { type: String, default: "" },
  pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "ConnectionRequest" }], // Pending requests
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }], // Accepted connections
});



// Middleware to auto-populate the `user` field when querying
MenteeSchema.pre("find", function () {
  this.populate("user");
});

MenteeSchema.pre("findOne", function () {
  this.populate("user");
});

module.exports = mongoose.model("Mentee", MenteeSchema);
