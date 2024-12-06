const mongoose = require("mongoose");
const Donation = require("../models/donation");
const User = require("../models/user");
const { validateDonation } = require("../schemas/donationSchema"); // Import validation function
const logger = require("../utils/logger")("donationSeeder"); // Import logger

const donationData = [
  {
    title: "Support for Education",
    description:
      "A donation to support education for underprivileged children.",
    isEmergency: false,
    fundraisingGoal: 5000, // New field
  },
  {
    title: "Medical Aid",
    description: "Emergency medical aid for a critical case.",
    isEmergency: true,
    fundraisingGoal: 20000,
  },
  {
    title: "Environmental Conservation",
    description: "Funding for a project aimed at environmental conservation.",
    isEmergency: false,
    fundraisingGoal: 15000,
  },
  // ... (add similar fields to all other donation objects)
  {
    title: "Support for Food Security Programs",
    description:
      "Funding programs that ensure food security in developing countries.",
    isEmergency: true,
    fundraisingGoal: 12000,
  },
];

async function donationSeeder() {
  try {
    // Clear existing donations
    await Donation.deleteMany({});
    logger.info("Existing donations cleared.");

    // Fetch all user IDs
    const users = await User.find({});
    const userIds = users.map((user) => user._id);

    for (let donation of donationData) {
      // Validate the donation data
      try {
        validateDonation(donation);
      } catch (validationError) {
        logger.error(`Failed to validate donation: ${validationError.message}`);
        continue; // Skip this donation and move to the next one
      }

      // Pick a random user ID
      donation.owner = userIds[Math.floor(Math.random() * userIds.length)];

      // Create the donation
      const newDonation = await Donation.create(donation);
      logger.info(`Donation "${donation.title}" added.`);

     
    }

    logger.info("Donation data seeded successfully!");
  } catch (error) {
    logger.error("Error seeding donation data:", error);
  }
}

module.exports = donationSeeder;
