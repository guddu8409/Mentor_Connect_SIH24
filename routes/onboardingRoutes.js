const onboardingController = require("../controllers/onboardingController");
const mentor = require("../models/mentor/mentor");
const express = require("express");
const router = express.Router();
const upload = require("../services/pdfUploadService").pdfUpload; // Multer middleware

// Onboarding route (for mentors, only if registrationStatus is pending)
router.get("/", async (req, res) => {
  try {
    if (req.user && req.user.role === "mentor") {
      // Find mentor by user ID and check registrationStatus
      const mentor = await Mentor.findOne({ user: req.user._id });

      if (mentor && mentor.registrationStatus === "pending") {
        return res.render("mentor/onboarding/onboardingForm"); // Show onboarding form if pending
      } else {
        // If registrationStatus is not pending, redirect to the dashboard or login
        return res.redirect("/mentor/dashboard");
      }
    } else {
      return res.redirect("/login"); // Ensure only logged-in mentors can access
    }
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
});

// Onboarding form submission (for mentors)
router.post(
  "/",
  upload.single("experienceCertificate"),
  onboardingController.onboarding
);

module.exports = router;
