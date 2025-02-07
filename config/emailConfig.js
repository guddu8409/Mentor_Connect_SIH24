


const nodemailer = require("nodemailer");

// Create and export the transporter object
const transporter = nodemailer.createTransport({
  service: "gmail", // Change this if using another email service
  auth: {
    user: process.env.EMAIL_USER, // Email address
    pass: process.env.EMAIL_PASS, // App password
  },
});

module.exports = transporter;