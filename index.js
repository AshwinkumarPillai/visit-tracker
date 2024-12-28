require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const visitRoutes = require("./routes/visit.routes");

const app = express();
const PORT = process.env.PORT || 3200;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/api", visitRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Start the server
try {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (error) {
  console.log(error);
}
