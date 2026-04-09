const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  gender: String,
  quizResult: {
    skinType: String,
    concerns: [String],
    updatedAt: Date,
  },
  profileImage: {
    type: String,
    default: "",
  },
  aboutMe: {
    type: String,
    default: "",
  },
  experience: {
    type: String,
    default: "",
  },
  specialties: {
    type: [String],
    default: [],
  },
  passwordHash: String,
});

module.exports = mongoose.model("Trainer", TrainerSchema);