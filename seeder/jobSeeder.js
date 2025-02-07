const mongoose = require("mongoose");
const Job = require("../models/job");
const User = require("../models/user");
const { validateJob } = require("../schemas/jobSchema");
const { log } = require("winston");
const logger = require("../utils/logger")("jobSeeder"); // Import logger


const jobData = [
  {
    title: "Software Engineer",
    salary: 120000,
    location: "Bangalore, India",
    jobType: "Full-time",
    techStack: ["JavaScript", "Node.js", "React", "MongoDB"],
    description: "Develop and maintain scalable web applications using modern frameworks and libraries.",
    companyName: "TechNova",
    applyLink: "https://technova.in/careers",
    reviews: [],
    owner: "64abd35b73ac8f46481e290", // Example owner ID
    reports: [],
    likes: [],
    refer: [],
  },
  {
    title: "Data Scientist",
    salary: 140000,
    location: "Hyderabad, India",
    jobType: "Full-time",
    techStack: ["Python", "TensorFlow", "Pandas", "SQL"],
    description: "Analyze large datasets to provide actionable insights and build predictive models.",
    companyName: "DataNest",
    applyLink: "https://datanest.com/jobs",
    reviews: [],
    owner: "64abd35b73ac8f46481e291", // Example owner ID
    reports: [],
    likes: [],
    refer: [],
  },
  {
    title: "Frontend Developer",
    salary: 100000,
    location: "Chennai, India",
    jobType: "Part-time",
    techStack: ["HTML", "CSS", "JavaScript", "Vue.js"],
    description: "Design and implement user interfaces for web and mobile applications.",
    companyName: "WebSpark",
    applyLink: "https://webspark.dev/apply",
    reviews: [],
    owner: "64abd35b73ac8f46481e292", // Example owner ID
    reports: [],
    likes: [],
    refer: [],
  },
  {
    title: "Backend Developer",
    salary: 130000,
    location: "Pune, India",
    jobType: "Full-time",
    techStack: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    description: "Build and maintain server-side logic, APIs, and database systems.",
    companyName: "CodeCraft",
    applyLink: "https://codecraft.co.in/careers",
    reviews: [],
    owner: "64abd35b73ac8f46481e293", // Example owner ID
    reports: [],
    likes: [],
    refer: [],
  },
  {
    title: "DevOps Engineer",
    salary: 145000,
    location: "Delhi, India",
    jobType: "Full-time",
    techStack: ["AWS", "Kubernetes", "Jenkins", "Terraform"],
    description: "Ensure reliable CI/CD pipelines and scalable infrastructure for deployments.",
    companyName: "CloudOps",
    applyLink: "https://cloudops.net/jobs",
    reviews: [],
    owner: "64abd35b73ac8f46481e294", // Example owner ID
    reports: [],
    likes: [],
    refer: [],
  },
  {
    title: "UI/UX Designer",
    salary: 95000,
    location: "Kolkata, India",
    jobType: "Part-time",
    techStack: ["Figma", "Sketch", "Adobe XD"],
    description: "Design user-friendly interfaces and prototypes for web and mobile applications.",
    companyName: "DesignHub",
    applyLink: "https://designhub.in/careers",
    reviews: [],
    owner: "64abd35b73ac8f46481e295", // Example owner ID
    reports: [],
    likes: [],
    refer: [],
  },
  {
    title: "AI/ML Engineer",
    salary: 180000,
    location: "Noida, India",
    jobType: "Full-time",
    techStack: ["Python", "PyTorch", "Scikit-learn", "NLP"],
    description: "Develop machine learning models and algorithms for real-world applications.",
    companyName: "IntelliAI",
    applyLink: "https://intelliai.com/apply",
    reviews: [],
    owner: "64abd35b73ac8f46481e296", // Example owner ID
    reports: [],
    likes: [],
    refer: [],
  },
];


async function jobSeeder() {
  try {
    // Clear existing jobs
    await Job.deleteMany({});
    logger.info("Existing jobs cleared.");

    // Fetch all mentors
    const mentors = await User.find({ role: "mentor" });
    const mentorIds = mentors.map((mentor) => mentor._id);

    // Fetch all mentees
    const mentees = await User.find({ role: "mentee" });
    const menteeIds = mentees.map((mentee) => mentee._id);

    if (mentorIds.length === 0) {
      logger.warn("No mentors found. Cannot seed jobs without mentors.");
      return;
    }

    if (menteeIds.length === 0) {
      logger.warn("No mentees found. Jobs will have no likes.");
    }

    for (const job of jobData) {
      // Validate the job data
      // try {
      //   // await validateJob(job);
      // } catch (validationError) {
      //   logger.error(`Failed to validate job: ${validationError.message}`);
      //   continue; // Skip this job and move to the next one
      // }

      // Assign a random mentor as the job owner
      const ownerId = mentorIds[Math.floor(Math.random() * mentorIds.length)];
      job.owner = ownerId;

      // Randomly generate likes from mentees
      const numLikes = Math.floor(Math.random() * menteeIds.length);
      job.likes = [];
      for (let i = 0; i < numLikes; i++) {
        const menteeId = menteeIds[Math.floor(Math.random() * menteeIds.length)];
        if (!job.likes.includes(menteeId)) {
          job.likes.push(menteeId);
        }
      }

      // Create the job
      const newJob = await Job.create(job);


      console.info(`Job "${newJob.title}" created successfully`);
    }

    logger.info("Job data seeded successfully!");
  } catch (error) {
    logger.error("Error seeding job data:", error);
  }
}


module.exports = jobSeeder;
