const express = require("express");
const router = express.Router();

// Render video call page
router.get("/", (req, res) => {
  res.render("videoCall");
});

module.exports = router;
