const mongoose = require("mongoose");
const User = require("../models/User");
const products = require("../data/products");
const Trainer = require("../models/Trainer");

async function getMe(req, res) {
  try {
    const user = await User.findById(req.userId).select("-passwordHash");

    if (!user) return res.status(404).json({ error: "User not found" });

    const favoriteProducts = products.filter((product) =>
      user.favorites.includes(product._id)
    );

    return res.status(200).json({
      user: {
        ...user.toObject(),
        favorites: favoriteProducts,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}

async function saveQuizResult(req, res) {
  try {
    const { skinType, concerns, age, gender } = req.body;

    if (!skinType) {
      return res.status(400).json({ error: "skinType is required" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const needsProfile = user.age === null || user.gender === null;
    if (needsProfile) {
      if (
        age === undefined ||
        age === null ||
        gender === undefined ||
        gender === null ||
        gender === ""
      ) {
        return res
          .status(400)
          .json({ error: "age and gender are required the first time you take the quiz" });
      }
    }

    if (age !== undefined && age !== null && age !== "") {
      const parsedAge = Number(age);
      if (Number.isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) {
        return res.status(400).json({ error: "age must be a valid number (1-120)" });
      }
      user.age = parsedAge;
    }

    if (gender !== undefined && gender !== null && gender !== "") {
      user.gender = String(gender);
    }

    user.quizResult = {
      skinType,
      concerns: Array.isArray(concerns) ? concerns : [],
      updatedAt: new Date(),
    };

    await user.save();

    return res.status(200).json({
      message: "Quiz result saved successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        quizResult: user.quizResult,
        favorites: user.favorites,
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
}

async function updateProfile(req, res) {
  try {
    const { name, email, age, gender } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (typeof name === "string" && name.trim()) {
      user.name = name.trim();
    }

    if (typeof email === "string" && email.trim()) {
      user.email = email.trim().toLowerCase();
    }

    if (age !== undefined && age !== null && age !== "") {
      const parsedAge = Number(age);
      if (Number.isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) {
        return res.status(400).json({ error: "age must be a valid number (1-120)" });
      }
      user.age = parsedAge;
    }

    if (gender !== undefined && gender !== null && gender !== "") {
      user.gender = String(gender);
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        quizResult: user.quizResult,
        favorites: user.favorites,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email already in use" });
    }

    return res.status(500).json({ error: "Server error", details: err.message });
  }
}

async function addFavorite(req, res) {
  try {
    const { productId } = req.params;

    const product = products.find((item) => item._id === productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const alreadyExists = user.favorites.includes(productId);

    if (!alreadyExists) {
      user.favorites.push(productId);
      await user.save();
    }

    const favoriteProducts = products.filter((item) =>
      user.favorites.includes(item._id)
    );

    return res.status(200).json({
      message: alreadyExists ? "Product already in favorites" : "Product added to favorites",
      favorites: favoriteProducts,
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}

async function removeFavorite(req, res) {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.favorites = user.favorites.filter((favoriteId) => favoriteId !== productId);

    await user.save();

    const favoriteProducts = products.filter((item) =>
      user.favorites.includes(item._id)
    );

    return res.status(200).json({
      message: "Product removed from favorites",
      favorites: favoriteProducts,
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}

async function getTrainerProfile(req, res) {
  try {
    const { trainerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(trainerId)) {
      return res.status(400).json({ error: "Invalid trainer id" });
    }

    const trainer = await Trainer.findById(trainerId).select(
      "_id name profileImage aboutMe experience specialties"
    );

    if (!trainer) {
      return res.status(404).json({ error: "Trainer not found" });
    }

    return res.status(200).json({
      trainer: {
        _id: trainer._id,
        name: trainer.name || "",
        profileImage: trainer.profileImage || "",
        aboutMe: trainer.aboutMe || "",
        experience: trainer.experience || "",
        specialties: Array.isArray(trainer.specialties)
          ? trainer.specialties
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
  saveQuizResult,
  updateProfile,
  addFavorite,
  removeFavorite,
  getTrainerProfile,
};