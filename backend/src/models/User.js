const mongoose = require("mongoose");

const QuizResultSchema = new mongoose.Schema(
  {
    skinType: { type: String, required: true },
    concerns: { type: [String], default: [] },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },

    role: {
      type: String,
      enum: ["user", "trainer"],
      default: "user",
    },

    age: { type: Number, default: null },
    gender: { type: String, default: null },

    quizResult: { type: QuizResultSchema, default: null },

    favorites: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);