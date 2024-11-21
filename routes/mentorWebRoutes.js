// routes/mentorRoutes.js

const express = require("express");
const { isLoggedIn, isMentor, isOwner } = require("../middlewares/authMiddleware");
const { dashboard, viewUsers, notifications,
    viewProfile, editProfile, deleteProfile,
    renderEditProfile, displayAllConnections,
    pendingRequest,
    
 } = require("../controllers/mentorWebController");

const router = express.Router();

// Mentor Dashboard
router.get("/", isLoggedIn, isMentor, dashboard);

// Manage Users (mentor-specific user management)
router.get("/users", isLoggedIn, isMentor, viewUsers);

// View Mentor Profile
router.get("/profile/:id", isLoggedIn,  viewProfile);

// Edit Mentor Profile (only for the owner)
router.get("/profile/edit/:id", isLoggedIn, isMentor, isOwner, renderEditProfile);
router.post("/profile/edit/:id", isLoggedIn, isMentor, isOwner, editProfile);

// Delete Mentor Profile (only for the owner)
router.post("/profile/delete/:id", isLoggedIn, isMentor, isOwner, deleteProfile);

// Mentor Notifications
router.get("/notifications", isLoggedIn, isMentor, notifications);



router.get("/connection", isLoggedIn, isMentor, displayAllConnections);
router.get("/connection/:mentorId/pendingRequest", isLoggedIn, isMentor, pendingRequest);


// Accept Connection Request
router.post('/connection/accept/:requestId', (req, res) => {
    const { reason } = req.body;
    const requestId = req.params.requestId;
    // Logic to accept the request and update status
    res.redirect('/mentor/connection/pendingRequests');
});

// Reject Connection Request
router.post('/connection/reject/:requestId', (req, res) => {
    const { reason } = req.body;
    const requestId = req.params.requestId;
    // Logic to reject the request and update status
    res.redirect('/mentor/connection/pendingRequests');
});




module.exports = router;
