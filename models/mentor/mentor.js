const mongoose = require("mongoose");
const JobReview = require("../jobReview");
const { Schema } = mongoose;

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
  graduationYear: {
    type: Number,
    default: null,
  },
  degree: {
    type: String,
    default: "",
  },
  department: {
    type: String,
    default: "",
  },
  employer: {
    type: String,
    default: "",
  },
  jobTitle: {
    type: String,
    default: "",
  },
  industry: {
    type: String,
    default: "",
  },
  experience: {
    type: Number,
    default: 0,
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
  linkedin: {
    type: String,
    default: "",
  },
  github: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  // groupsCreated: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Group",
  //     default: [],
  //   },
  // ],
  // groupsJoined: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Group",
  //     default: [],
  //   },
  // ],
  // quizzesCreated: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Quiz",
  //     default: [],
  //   },
  // ],
  // quizzesParticipated: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Quiz",
  //     default: [],
  //   },
  // ],
  // donations: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Donation",
  //     default: [],
  //   },
  // ],
  // payments: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Payment",
  //     default: [],
  //   },
  // ],
  jobPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Job",
      default: [],
    },
  ],
  // discussionPosts: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Discussion",
  //     default: [],
  //   },
  // ],
  // eventsOrganised: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Event",
  //     default: [],
  //   },
  // ],
  // eventsJoined: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Event",
  //     default: [],
  //   },
  // ],
  // successStories: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Success",
  //     default: [],
  //   },
  // ],
  points: {
    type: Number,
    default: 0,
  },
  isStarAlumni: {
    type: Boolean,
    default: false,
  },
  // isPrivate: {
  //   type: Boolean,
  //   default: false,
  // }
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