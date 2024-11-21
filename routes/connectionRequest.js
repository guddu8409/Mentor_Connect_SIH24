const express = require("express");
const router = express.Router();
const connectionRequestController = require("../controllers/connectionRequestController");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");

// Mentee Routes
router.post(
  "/send-request",
  isAuthenticated,
  authorizeRole("mentee"),
  connectionRequestController.sendRequest
);

router.get(
  "/my-requests",
  isAuthenticated,
  authorizeRole("mentee"),
  connectionRequestController.viewMyRequests
);

// Mentor Routes
router.get(
  "/pending-requests",
  isAuthenticated,
  authorizeRole("mentor"),
  connectionRequestController.viewPendingRequests
);

router.post(
  "/respond-request/:id",
  isAuthenticated,
  authorizeRole("mentor"),
  connectionRequestController.respondToRequest
);

// Shared Routes
router.get(
  "/connections",
  isAuthenticated,
  connectionRequestController.viewConnections
);

module.exports = router;
