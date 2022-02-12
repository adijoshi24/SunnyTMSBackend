const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const LoginController = require("../../controllers/loginController");

const User = require("../../models/User");

const loginValidation = [
  check("email", "Please include a valid email").normalizeEmail().isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
];

router.post("/", loginValidation, LoginController.loginUser);
router.post("/tokenIsValid", LoginController.checkToken);
// router.get("/", auth, LoginController.findUsers);

module.exports = router;
