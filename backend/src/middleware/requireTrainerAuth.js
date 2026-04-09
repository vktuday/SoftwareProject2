const jwt = require("jsonwebtoken");
const Trainer = require("../models/Trainer");

async function requireTrainerAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const trainer = await Trainer.findById(payload.id);
    if (!trainer) return res.status(401).json({ error: "Unauthorized" });

    req.trainer = trainer;
    req.role = "Trainer";
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = requireTrainerAuth;