const mongoose = require("mongoose");
const Trainer = require("../models/Trainer");
const User = require("../models/User");

async function getMe(req, res) {
  try {
    const trainer = await Trainer.findById(req.trainer._id).select("-password");
    if (!trainer) return res.status(404).json({ error: "Trainer not found" });

    res.json({ trainer });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function updateProfile(req, res) {
  try {
    const {
      name,
      email,
      age,
      gender,
      profileImage,
      aboutMe,
      experience,
      specialties,
    } = req.body;

    const trainer = await Trainer.findById(req.trainer._id);
    if (!trainer) {
      return res.status(404).json({ error: "Trainer not found" });
    }

    if (name !== undefined) {
      trainer.name = name.trim();
    }

    if (email !== undefined) {
      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail) {
        return res.status(400).json({ error: "Email is required" });
      }

      const existingTrainer = await Trainer.findOne({
        email: normalizedEmail,
        _id: { $ne: trainer._id },
      });

      if (existingTrainer) {
        return res.status(400).json({ error: "Email is already in use" });
      }

      const existingUser = await User.findOne({
        email: normalizedEmail,
      });

      if (existingUser) {
        return res.status(400).json({ error: "Email is already in use" });
      }

      trainer.email = normalizedEmail;
    }

    if (age !== undefined && age !== null && age !== "") {
      const parsedAge = Number(age);
      if (Number.isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) {
        return res.status(400).json({ error: "Invalid age" });
      }
      trainer.age = parsedAge;
    }

    if (gender !== undefined) {
      trainer.gender = gender;
    }

    if (profileImage !== undefined) {
      trainer.profileImage = profileImage;
    }

    if (aboutMe !== undefined) {
      trainer.aboutMe = aboutMe;
    }

    if (experience !== undefined) {
      trainer.experience = experience;
    }

    if (specialties !== undefined) {
      if (Array.isArray(specialties)) {
        trainer.specialties = specialties.filter((item) => item && item.trim());
      } else if (typeof specialties === "string") {
        trainer.specialties = specialties
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }

    await trainer.save();

    res.json({
      message: "Profile updated",
      trainer,
    });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
}

async function saveQuiz(req, res) {
  try {
    const { skinType, concerns, age, gender } = req.body;

    if (!skinType) {
      return res.status(400).json({ error: "skinType is required" });
    }

    const trainer = await Trainer.findById(req.trainer._id);
    if (!trainer) {
      return res.status(404).json({ error: "Trainer not found" });
    }

    const needsProfile = trainer.age === null || trainer.gender === null;
    if (needsProfile) {
      if (!age || !gender) {
        return res.status(400).json({
          error: "age and gender are required the first time",
        });
      }
    }

    if (age !== undefined && age !== null && age !== "") {
      const parsedAge = Number(age);
      if (Number.isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) {
        return res.status(400).json({ error: "Invalid age" });
      }
      trainer.age = parsedAge;
    }

    if (gender) {
      trainer.gender = gender;
    }

    trainer.quizResult = {
      skinType,
      concerns: Array.isArray(concerns) ? concerns : [],
      updatedAt: new Date(),
    };

    await trainer.save();

    res.json({
      message: "Quiz saved successfully",
      trainer,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function getUserProfile(req, res) {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const user = await User.findById(userId).select("_id name age gender quizResult");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      user: {
        _id: user._id,
        name: user.name || "",
        age: user.age ?? null,
        gender: user.gender || "",
        skinType: user.quizResult?.skinType || "",
        concerns: Array.isArray(user.quizResult?.concerns)
          ? user.quizResult.concerns
          : [],
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
}

module.exports = {
  getMe,
  updateProfile,
  saveQuiz,
  getUserProfile,
};