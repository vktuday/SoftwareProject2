const express = require("express");
const cors = require("cors");
const dns = require('node:dns').promises;
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

// allow the frontend origin (or use `cors()` to allow all origins)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "https://software-project2-fe.vercel.app",
  })
);

// Load environment variables from .env
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("ERROR: MONGODB_URI is missing. Put it in server/.env");
  process.exit(1);
}

// Start the server and connect to database
async function start() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
    console.log("✅ Mongo connected to:", mongoose.connection.host, mongoose.connection.name);

    // Start HTTP server
    app.listen(PORT, () => {
      console.log(`✅ Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();