const mongoose = require("mongoose");

// Connection Request Schema
const ConnectionRequestSchema = new mongoose.Schema({
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: "Mentee", required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  reason: { type: String, default: "" }, // Reason for rejection or acceptance
}, { timestamps: true });

module.exports.ConnectionRequest = mongoose.model("ConnectionRequest", ConnectionRequestSchema);
