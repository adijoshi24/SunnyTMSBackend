const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const OperationsTeam = require("../models/OperationsTeam");
const { dbValidator } = require("./helperFunctions.js/userValidatorDB");

exports.addOperationsTeam = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { customerFullName, customerRep } = req.body;
  try {
    // See if user exists in any collection
    const validateDB = await dbValidator(req, res);
    if (!validateDB.success) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    } else {
      const { customerRep, role, name, email, password, phone } = req.body;
      OperationsTeamData = new OperationsTeam({
        role,
        email,
        password,
        phone,
        customerRep,
        name: name,
      });
      console.log("OperationsTeamData", OperationsTeamData);
      const salt = await bcrypt.genSalt(10);

      OperationsTeamData.password = await bcrypt.hash(password, salt);

      await OperationsTeamData.save();
      const payload = {
        OperationsTeamData: {
          id: OperationsTeamData.id,
        },
      };
      // OperationsTeamData = new OperationsTeam(OperationsTeamData);
      // console.log("OperationsTeamData", OperationsTeamData);

      // await OperationsTeamData.save();
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      res.status(200).json({
        message: "Operations Team added successfully",
        OperationsTeamData,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getOperationsTeam = async (req, res) => {
  console.log("getOperationsTeam req.body", req.body);
  var operationsTeamList;
  if (req.body.role == 1) {
    console.log("getOperationsTeam role 1");
    var operationsTeamList = await OperationsTeam.find({});
  } else if (req.body.role == 2) {
    console.log("getOperationsTeam role 2");
    var operationsTeamList = await OperationsTeam.find({
      customerRep: req.body.name,
    });
  }
  try {
    res.status(200).json({
      message: "OperationsTeam fetched successfully",
      operationsTeamList,
    });
  } catch (error) {
    res.status(500).send(error);
  }

  console.log("getOperationsTeam");
};

exports.deleteOperationsTeam = async (req, res) => {
  OperationsTeam.deleteOne({ _id: req.body.id }, (err) => {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json({
        message: "Operations Team deleted successfully",
      });
    }
  });

  console.log("deleteOperationsTeam");
};

exports.updateOperationsTeam = async (req, res) => {
  console.log(req.body);
  var { customerRep, role, name, email, password, phone } = req.body;

  const salt = await bcrypt.genSalt(10);
  if (req.body.password) {
    password = await bcrypt.hash(req.body.password, salt);
  }
  req.body.password !== ""
    ? OperationsTeam.findByIdAndUpdate(
        req.body._id,
        { password, name, email, phone, customerRep },
        (err) => {
          if (err) {
            res.send(err);
            return;
          }
          res.status(200).json({ message: "Record has been Updated..!!" });
        }
      )
    : OperationsTeam.findByIdAndUpdate(
        req.body._id,
        { name, email, phone, customerRep },
        (err) => {
          if (err) {
            res.send(err);
            return;
          }
          res.status(200).json({ message: "Record has been Updated..!!" });
        }
      );

  // OperationsTeam.findByIdAndUpdate(req.body._id, { $set: req.body }, (err) => {
  //   if (err) {
  //     res.send(err);
  //     return;
  //   }
  //   res.status(200).json({ message: "Record has been Updated..!!" });
  // });

  console.log("updateOperationsTeam");
};
