require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database.js");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Face Card Backend Running");
});

// Quiz Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));

// Start Server
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
