const mongoose = require("mongoose");

const MenteeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  goals: { type: [String], required: false, default: [] }, // Learning goals
  educationLevel: { type: String, required: false, default: "" }, // Education level
  bio: { type: String, required: false, default: "" }, // Bio of mentee
});

// Middleware to auto-populate the `user` field when querying
MenteeSchema.pre("find", function () {
  this.populate("user");
});

MenteeSchema.pre("findOne", function () {
  this.populate("user");
});

module.exports = mongoose.model("Mentee", MenteeSchema);
