const mongoose = require("mongoose");
const { Schema } = mongoose;
const JobReview = require("./jobReview"); // Import the JobReview model

const jobSchema = new Schema({
  title: {
    type: String,
  },
  salary: {
    type: Number,
  },
  location: {
    type: String,
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship"],
 
  },
  techStack: {
    type:[String]
  },
  description: {
    type: String,
  },
  companyName: {
    type: String,
  },
  applyLink: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "JobReview",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reports: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  refer: [
    {
      fromMentor: {
        type: Schema.Types.ObjectId,
        ref: "User", // Mentor making the referral
        required: true,
      },
      mentee: {
        type: Schema.Types.ObjectId,
        ref: "User", // Mentee being referred
        required: true,
      },
      note: {
        type: String, // Optional note for the referral
        default: "",
      },
      timestamp: {
        type: Date, // Time of the referral
        default: Date.now,
      },
    },
  ],
});

// Middleware to initialize arrays if not provided
jobSchema.pre("save", function (next) {
  if (!this.likes) {
    this.likes = [];
  }
  if (!this.reports) {
    this.reports = [];
  }
  if (!this.refer) {
    this.refer = [];
  }
  next();
});

// Middleware to handle the deletion of reviews when a job is deleted
jobSchema.post("findOneAndDelete", async (job) => {
  if (job) {
    await JobReview.deleteMany({ _id: { $in: job.reviews } });
  }
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
