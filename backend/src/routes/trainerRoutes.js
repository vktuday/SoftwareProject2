const express = require("express");
const router = express.Router();
const { registerTrainer, loginTrainer } = require("../controllers/authController");
const Trainer = require("../models/Trainer");
const requireTrainerAuth = require("../middleware/requireTrainerAuth");
const trainerController = require("../controllers/trainerController");

// Register trainer
router.post("/register-trainer", registerTrainer);

// Login trainer
router.post("/login-trainer", loginTrainer);

// Get current trainer
router.get("/me", requireTrainerAuth, trainerController.getMe);

// Get selected user profile for trainer chat
router.get(
  "/users/:userId/profile",
  requireTrainerAuth,
  trainerController.getUserProfile
);

// Get all trainers
router.get("/", async (req, res) => {
  try {
    const trainers = await Trainer.find().select("_id name email");
    res.json({ trainers });
  } catch (err) {
    res.status(500).json({ error: "Failed to load trainers" });
  }
});

// Update trainer profile
router.put("/me/profile", requireTrainerAuth, trainerController.updateProfile);
router.put("/me/quiz", requireTrainerAuth, trainerController.saveQuiz);

module.exports = router;