const User = require("../models/User");

// Return current authenticated user's profile
async function getMe(req, res) {
  try {
    const user = await User.findById(req.userId).select("-passwordHash");
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}

// Save or update the quiz result for the authenticated user
async function saveQuizResult(req, res) {
  try {
    const { skinType, concerns, age, gender } = req.body;

    // Basic validation for quiz result
    if (!skinType) {
      return res.status(400).json({ error: "skinType is required" });
    }

    // Find user by ID from JWT (added by requireAuth middleware)
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Require age/gender only if user profile is missing
    const needsProfile = user.age === null || user.gender === null;
    if (needsProfile) {
      if (age === undefined || age === null || gender === undefined || gender === null || gender === "") {
        return res.status(400).json({ error: "age and gender are required the first time you take the quiz" });
      }
    }
    
    // If age is provided, validate and update
    if (age !== undefined && age !== null && age !== "") {
      const parsedAge = Number(age);
      if (Number.isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) {
        return res.status(400).json({ error: "age must be a valid number (1-120)" });
      }
      user.age = parsedAge;
    }
    
    // If gender is provided, update
    if (gender !== undefined && gender !== null && gender !== "") {
      user.gender = String(gender);
    }

    // Update embedded quizResult object (always updates)
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
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
}


// Update basic user profile fields
async function updateProfile(req, res) {
  try {
    const { name, email, age, gender } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update name/email if provided
    if (typeof name === "string" && name.trim()) {
      user.name = name.trim();
    }

    if (typeof email === "string" && email.trim()) {
      user.email = email.trim().toLowerCase();
    }

    // Update age if provided
    if (age !== undefined && age !== null && age !== "") {
      const parsedAge = Number(age);
      if (Number.isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) {
        return res.status(400).json({ error: "age must be a valid number (1-120)" });
      }
      user.age = parsedAge;
    }

    // Update gender if provided
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
      },
    });
  } catch (err) {
    // Duplicate email error handling (Mongo unique index)
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email already in use" });
    }

    return res.status(500).json({ error: "Server error", details: err.message });
  }
}


module.exports = { getMe, saveQuizResult, updateProfile };