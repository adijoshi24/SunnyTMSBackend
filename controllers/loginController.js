const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const CustomerRep = require("../models/CustomerRep");
const OperationsTeam = require("../models/OperationsTeam");
const mongojs = require("mongojs");
const dbDemo = config.get("mongoURIDemo");
const db = mongojs(dbDemo, []);
const mongodb = require("mongodb");
const { dbValidator } = require("./helperFunctions.js/userValidatorDB");

exports.loginUser = async (req, res) => {
  // Our login logic starts here
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Get user input
    const { email, password } = req.body;
    console.log("req.body", req.body);
    // Find user in all our collections

    const validateDB = await dbValidator(req, res);
    var user = validateDB.user;

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        user: {
          id: user.id,
        },
      };
      // Create token
      const token = jwt.sign({ user_id: user._id }, config.get("jwtSecret"), {
        expiresIn: "2h",
      });
      // save user token
      user.token = token;
      // user
      res.status(200).json({ auth: true, token, user });
    } else {
      res.status(400).json({ msg: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};
// Check if token is valid/tokenIsValid
exports.checkToken = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.findUsers = async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
};
