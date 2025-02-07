
require("dotenv").config(); // Ensure dotenv is configured
const transporter = require("../config/emailConfig");

// Function to send email to a single user
const sendMailToOneUser = async (recipient, subject, message) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject,
      text: message,
    };

   return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email to user:", error);
  }
};

// Function to send email to multiple recipients
const sendMailToMultipleUser = async (recipients, subject, message) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipients.join(", "), // Join email array into a single string
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to multiple recipients: ${recipients}`);
  } catch (error) {
    console.error("Error sending email to multiple recipients:", error);
  }
};

// Function to send email to all mentees
const sendMailToAllMentees = async (mentees, subject, message) => {
  const recipients = mentees.map(mentee => mentee.email); // Extract emails from mentees
  await sendMailToMultiple(recipients, subject, message);
};

// Function to send email to all mentors
const sendMailToAllMentors = async (mentors, subject, message) => {
  const recipients = mentors.map(mentor => mentor.email); // Extract emails from mentors
  await sendMailToMultiple(recipients, subject, message);
};

// Function to send email to all members of a particular group
const sendMailToGroupMember = async (groupMembers, subject, message) => {
  const recipients = groupMembers.map(member => member.email); // Extract emails from group members
  await sendMailToMultiple(recipients, subject, message);
};

module.exports = {
  sendMailToOneUser,
  sendMailToMultipleUser,
  sendMailToAllMentees,
  sendMailToAllMentors,
  sendMailToGroupMember,
};