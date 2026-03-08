const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  skinType: {
    type: String,
    required: true,
  },

  concerns: {
    type: String,
  },

  age: {
    type: Number,
  },

  gender: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QuizResult", quizResultSchema);
