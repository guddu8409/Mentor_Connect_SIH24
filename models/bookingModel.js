const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  menteeUserId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  mentorUserId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  },
  payment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Payment' 
  },
  schedule: { 
    start: { 
      type: Date, 
      required: true 
    },
    end: { 
      type: Date, 
      required: true 
    },
  },
  title: { 
    type: String, 
    required: true 
  },
  reason: { 
    type: String // Reason for cancellation, if applicable
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

// Create the model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
