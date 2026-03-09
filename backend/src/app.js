const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

// Creates and configures the Express application
function createApp() {
  const app = express();

  // Enable CORS for frontend requests
  app.use(cors());
  // Parse JSON request bodies
  app.use(express.json());

  // Simple health check route
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Authentication routes (register, login)
  app.use("/api/auth", authRoutes);
  // User routes (dashboard, quiz result)
  app.use("/api/users", userRoutes);
  // Product routes
  app.use("/api/products", productRoutes);

  return app;
}

module.exports = { createApp };