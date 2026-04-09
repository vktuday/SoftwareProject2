const express = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middleware/requireAuth");
const {
  getMe,
  saveQuizResult,
  updateProfile,
  addFavorite,
  removeFavorite,
  getTrainerProfile,
} = require("../controllers/userController");

const router = express.Router();

router.get("/me", requireAuth, getMe);

router.get(
  "/trainers/:trainerId/profile",
  requireAuth,
  getTrainerProfile
);

router.get("/", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const users = await User.find().select("_id name email age gender");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: "Failed to load users" });
  }
});

router.put("/me/quiz-result", requireAuth, saveQuizResult);
router.put("/me/profile", requireAuth, updateProfile);

router.post("/me/favorites/:productId", requireAuth, addFavorite);
router.delete("/me/favorites/:productId", requireAuth, removeFavorite);

module.exports = router;