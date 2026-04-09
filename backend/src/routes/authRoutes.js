const express = require("express");
const { registerUser, loginUser, registerTrainer, loginTrainer } = require("../controllers/authController");

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);


router.post("/trainer/register", registerTrainer);
router.post("/trainer/login", loginTrainer);

module.exports = router;