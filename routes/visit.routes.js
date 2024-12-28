const express = require("express");
const router = express.Router();
const Visit = require("../models/visitModel");
const crypto = require("crypto");

// Middleware for cookies
const cookieParser = require("cookie-parser");

// Track a visit
router.post("/visit", async (req, res) => {
  try {
    const { websiteName } = req.body;
    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const referrer = req.headers["referer"] || null;

    // Generate or retrieve userId
    let userId = req.cookies.userId;
    if (!userId) {
      userId = crypto.randomUUID();
      res.cookie("userId", userId, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
    }

    const newVisit = new Visit({ websiteName, ipAddress, userAgent, referrer, userId });
    await newVisit.save();

    res.status(201).json({ message: "Visit logged successfully", visit: newVisit });
  } catch (error) {
    console.error("Error logging visit:", error);
    res.status(500).json({ message: "Error logging visit" });
  }
});

// Get unique user count
router.get("/unique-users", async (req, res) => {
  try {
    const uniqueUsers = await Visit.distinct("userId");
    res.status(200).json({ uniqueUserCount: uniqueUsers.length });
  } catch (error) {
    console.error("Error fetching unique user count:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

// Get all visits of a specific user
router.get("/user-visits/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const visits = await Visit.find({ userId });
    res.status(200).json(visits);
  } catch (error) {
    console.error("Error fetching user visit details:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

module.exports = router;
