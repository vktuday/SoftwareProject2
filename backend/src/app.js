const express = require("express");
const cors = require("cors");
const trainerRoutes = require("./routes/trainerRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { registerUser, loginUser, registerTrainer, loginTrainer } = require("./controllers/authController");

function createApp() {
  const app = express();
  app.use(cors());
 
  app.use(express.json());

  app.use("/api/messages", messageRoutes);
  app.use("/api/trainers", trainerRoutes);
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);
app.post("/api/auth/register-trainer", registerTrainer);
app.post("/api/auth/login-trainer", loginTrainer);


  // Authentication routes (register, login)
  app.use("/api/auth", authRoutes);
  // User routes (dashboard, quiz result)
  app.use("/api/users", userRoutes);
  // Product routes
  app.use("/api/products", productRoutes);

  return app;
}

module.exports = { createApp };