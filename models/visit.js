const mongoose = require("mongoose");

// Visit schema
const visitSchema = new mongoose.Schema({
  websiteName: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  referrer: {
    type: String,
    default: null,
  },
  visitedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Visit", visitSchema);
