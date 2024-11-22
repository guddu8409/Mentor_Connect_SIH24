// const { ConnectionRequest } = require("../models/connectionRequest");
// const { Mentor } = require("../models/Mentor");
// const { Mentee } = require("../models/Mentee");

// // Send a connection request (mentee)
// exports.sendRequest = async (req, res) => {
//   try {
//     const { mentorId } = req.body;

//     const mentee = await Mentee.findOne({ user: req.user._id });
//     if (!mentee) return res.status(404).json({ message: "Mentee profile not found." });

//     const mentor = await Mentor.findById(mentorId);
//     if (!mentor) return res.status(404).json({ message: "Mentor not found." });

//     // Check if a request already exists
//     const existingRequest = await ConnectionRequest.findOne({
//       mentee: mentee._id,
//       mentor: mentor._id,
//       status: "pending",
//     });

//     if (existingRequest)
//       return res.status(400).json({ message: "A pending request already exists for this mentor." });

//     // Create a new connection request
//     const connectionRequest = new ConnectionRequest({
//       mentee: mentee._id,
//       mentor: mentor._id,
//     });

//     await connectionRequest.save();

//     // Add to mentee's pendingRequests
//     mentee.pendingRequests.push(connectionRequest._id);
//     await mentee.save();

//     // Add to mentor's pendingRequests
//     mentor.pendingRequests.push(connectionRequest._id);
//     await mentor.save();

//     res.status(201).json({ message: "Connection request sent successfully." });
//   } catch (error) {
//     res.status(500).json({ message: "Server error.", error });
//   }
// };

// // View sent requests (mentee)
// exports.viewMyRequests = async (req, res) => {
//   try {
//     const mentee = await Mentee.findOne({ user: req.user._id }).populate("pendingRequests");
//     if (!mentee) return res.status(404).json({ message: "Mentee profile not found." });

//     res.status(200).json({ pendingRequests: mentee.pendingRequests });
//   } catch (error) {
//     res.status(500).json({ message: "Server error.", error });
//   }
// };

// // View pending requests (mentor)
// exports.viewPendingRequests = async (req, res) => {
//   try {
//     const mentor = await Mentor.findOne({ user: req.user._id }).populate("pendingRequests");
//     if (!mentor) return res.status(404).json({ message: "Mentor profile not found." });

//     res.status(200).json({ pendingRequests: mentor.pendingRequests });
//   } catch (error) {
//     res.status(500).json({ message: "Server error.", error });
//   }
// };

// // Respond to a request (mentor)
// exports.respondToRequest = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, reason } = req.body; // Status can be 'accepted' or 'rejected'

//     if (!["accepted", "rejected"].includes(status))
//       return res.status(400).json({ message: "Invalid status." });

//     const connectionRequest = await ConnectionRequest.findById(id);
//     if (!connectionRequest)
//       return res.status(404).json({ message: "Connection request not found." });

//     if (connectionRequest.status !== "pending")
//       return res.status(400).json({ message: "Request is no longer pending." });

//     connectionRequest.status = status;
//     connectionRequest.reason = reason || "";
//     await connectionRequest.save();

//     // Update mentor and mentee connections if accepted
//     if (status === "accepted") {
//       const mentor = await Mentor.findById(connectionRequest.mentor);
//       const mentee = await Mentee.findById(connectionRequest.mentee);

//       mentor.connections.push(mentee._id);
//       mentee.connections.push(mentor._id);

//       await mentor.save();
//       await mentee.save();
//     }

//     res.status(200).json({ message: `Request ${status} successfully.` });
//   } catch (error) {
//     res.status(500).json({ message: "Server error.", error });
//   }
// };

// // View connections (mentor or mentee)
// exports.viewConnections = async (req, res) => {
//   try {
//     let userConnections = [];
//     if (req.user.role === "mentor") {
//       const mentor = await Mentor.findOne({ user: req.user._id }).populate("connections");
//       if (!mentor) return res.status(404).json({ message: "Mentor profile not found." });

//       userConnections = mentor.connections;
//     } else if (req.user.role === "mentee") {
//       const mentee = await Mentee.findOne({ user: req.user._id }).populate("connections");
//       if (!mentee) return res.status(404).json({ message: "Mentee profile not found." });

//       userConnections = mentee.connections;
//     }

//     res.status(200).json({ connections: userConnections });
//   } catch (error) {
//     res.status(500).json({ message: "Server error.", error });
//   }
// };
