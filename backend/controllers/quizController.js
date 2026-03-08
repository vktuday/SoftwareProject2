const QuizResult = require("../models/QuizResult");

// Save Quiz Result
exports.saveQuizResult = async (req, res) => {
  try {
    const result = await QuizResult.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Results
exports.getQuizResults = async (req, res) => {
  try {
    const results = await QuizResult.find().sort({ date: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
