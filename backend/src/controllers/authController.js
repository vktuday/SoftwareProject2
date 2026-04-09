const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Trainer = require("../models/Trainer");


function signToken(id) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  if (!secret) throw new Error("JWT_SECRET missing in .env");

  return jwt.sign({ id }, secret, { expiresIn }); 
}


async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
    if (password.length < 8) return res.status(400).json({ error: "Password too short" });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ error: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role: "user",
      quizResult: null,
    });

    const token = signToken(user._id.toString());
    return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, quizResult: user.quizResult } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing fields" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken(user._id.toString());
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, quizResult: user.quizResult } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


async function registerTrainer(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
    if (password.length < 8) return res.status(400).json({ error: "Password too short" });

    const exists = await Trainer.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ error: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);

    const trainer = await Trainer.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      quizResult: null,
    });

    const token = signToken(trainer._id.toString());
    return res.status(201).json({ token, trainer: { id: trainer._id, name: trainer.name, email: trainer.email, quizResult: trainer.quizResult } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function loginTrainer(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing fields" });

    const trainer = await Trainer.findOne({ email: email.toLowerCase() });
    if (!trainer) return res.status(401).json({ error: "Invalid credentials" });

    
    const valid = await bcrypt.compare(password, trainer.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken(trainer._id.toString());
    return res.json({ token, trainer: { id: trainer._id, name: trainer.name, email: trainer.email, quizResult: trainer.quizResult } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  registerTrainer,
  loginTrainer,
};