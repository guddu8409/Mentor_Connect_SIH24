const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // You can change this to another email service if needed
  auth: {
    user: process.env.EMAIL_USER, // Your email address from environment variables
    pass: process.env.EMAIL_PASS, // Your email password or app password from environment variables
  },
});

// Send email function
const sendEmail = async (recipients, subject, message) => {
  try {
  
    console.log("the recipients");
    console.log(recipients);
    console.log("the subject");
    console.log(subject);
    console.log("the message part");
    console.log(message);
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: recipients, // List of recipients
      subject: subject, // Subject line
      text: message, // Plain text body
    };


    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
