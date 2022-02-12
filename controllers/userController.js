// const { validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const config = require("config");

// exports.signupUser = async (req, res) => {
//   console.log(req.file);
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { name, email, password } = req.body;
//   try {
//     // See if user exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ errors: [{ msg: "User already exists" }] });
//     }

//     //Get users gravatar

//     user = new User({
//       name,
//       email,
//       password,
//       itemImage: req.file.originalname,
//     });
//     console.log(user);
//     const salt = await bcrypt.genSalt(10);

//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     jwt.sign(
//       payload,
//       config.get("jwtSecret"),
//       { expiresIn: 36000 },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };
