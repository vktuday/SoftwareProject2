const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const { getMe, saveQuizResult, updateProfile } = require("../controllers/userController");

const router = express.Router();

router.get("/me", requireAuth, getMe);

router.put("/me/quiz-result", requireAuth, saveQuizResult);

router.put("/me/profile", requireAuth, updateProfile);

module.exports = router;