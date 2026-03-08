const express = require("express");
const router = express.Router();
const User = require("../models/User");

//REGISTER 
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password, // plain text (simple version)
    });

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//LOGIN 
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      userId: user._id,
      name: user.name,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
