const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Trainer = require("../models/Trainer");
const { sendMessage, getMessages } = require("../controllers/messageController");

const router = express.Router();
async function allowBoth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      console.log("No token provided");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token payload:", payload);

    const user = await User.findById(payload.id);
    if (user) {
      req.user = user;
      req.role = "User";
      return next();
    }

    const trainer = await Trainer.findById(payload.id);
    if (trainer) {
      req.user = trainer;
      req.role = "Trainer";
      return next();
    }

    console.log("No matching user or trainer found for id:", payload.id);
    return res.status(401).json({ error: "Unauthorized" });
  } catch (err) {
    console.error("Error in allowBoth:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
}

router.post("/", allowBoth, sendMessage);
router.get("/", allowBoth, getMessages);

module.exports = router;