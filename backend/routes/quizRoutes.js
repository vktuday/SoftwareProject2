const express = require("express");
const router = express.Router();
const Quiz = require("../models/QuizResult");

//CREATE QUIZ 
router.post("/", async (req, res) => {
  try {
    const { userId, skinType, concerns, age, gender } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "User not logged in",
      });
    }

    if (!skinType) {
      return res.status(400).json({
        message: "Skin Type is required",
      });
    }

    const newQuiz = await Quiz.create({
      user: userId,
      skinType,
      concerns,
      age,
      gender,
    });

    res.status(201).json(newQuiz);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  GET USER QUIZZES 
router.get("/:userId", async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      user: req.params.userId,
    }).sort({ date: -1 });

    res.json(quizzes);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
