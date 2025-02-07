const mongoose = require("mongoose");
const { Schema } = mongoose;

// Updated Mentee Schema
const MenteeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  goals: { type: [String], default: [] },
  educationLevel: { type: String, default: "" },
  bio: { type: String, default: "" },
  pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "ConnectionRequest" }], // Pending requests
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }], // Accepted connections
  linkedIn: { type: String, default: "" }, // Default to an empty string
  twitter: { type: String, default: "" }, // Default to an empty string
  github: { type: String, default: "" }, // Default to an empty string
  portfolio: { type: String, default: "" }, // Default to an empty string
  skills: { type: [String], default: [] },

  dob: {
    type: Date,
    default: null,
  },
  city: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  skills: {
    type: [String],
    default: [],
  },
  projects: {
    type: [String],
    default: [],
  },
  achievements: {
    type: [String],
    default: [],
  },
 
  profilePicture: {
    type: String,
    default: "",
  },

  points: {
    type: Number,
    default: 0,
  },
  isStarMentee: {
    type: Boolean,
    default: false,
  },
  // isPrivate: {
  //   type: Boolean,
  //   default: false,
  // }

});



// Middleware to auto-populate the `user` field when querying
MenteeSchema.pre("find", function () {
  this.populate("user");
});

MenteeSchema.pre("findOne", function () {
  this.populate("user");
});

module.exports = mongoose.model("Mentee", MenteeSchema);
