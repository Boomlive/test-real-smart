const express = require("express");
const router = express.Router();

const { register, login } = require("../Controllers/auth");
const { isValidInput } = require("../middleware/validate");

router.post("/register", isValidInput, register);
router.post("/login", isValidInput, login);

module.exports = router;
