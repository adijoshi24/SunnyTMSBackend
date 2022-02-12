const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const CustomerRep = require("../models/CustomerRep");
const { dbValidator } = require("./helperFunctions.js/userValidatorDB");

exports.addCustomerRep = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, phone } = req.body;
  try {
    // See if user exists in any collection
    const validateDB = await dbValidator(req, res);
    let CustomerRepData;
    if (!validateDB.success) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    } else {
      CustomerRepData = new CustomerRep({
        name,
        email,
        password,
        phone,
        role: 2,
      });
      console.log("CustomerRepData", CustomerRepData);
      const salt = await bcrypt.genSalt(10);

      CustomerRepData.password = await bcrypt.hash(password, salt);

      await CustomerRepData.save();

      const payload = {
        CustomerRepData: {
          id: CustomerRepData.id,
        },
      };
      console.log("payload", payload);
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
        message: "Customer Rep added successfully",
        CustomerRepData,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getCustomerRep = async (req, res) => {
  const customerRepList = await CustomerRep.find({});

  try {
    res.status(200).json({
      message: "Customer Rep fetched successfully",
      customerRepList,
    });
  } catch (error) {
    res.status(500).send(error);
  }

  console.log("getCustomerRep");
};

exports.deleteCustomerRep = async (req, res) => {
  CustomerRep.deleteOne({ _id: req.body.id }, (err) => {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json({
        message: "Customer Rep deleted successfully",
      });
    }
  });

  console.log("deleteCustomerRep");
};

exports.updateCustomerRep = async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;

  // checking email in all the collections
  const validateDB = await dbValidator(req, "update");
  if (!validateDB.success) {
    return res.status(400).json({ errors: [{ msg: "User already exists" }] });
  } else {
    const salt = await bcrypt.genSalt(10);
    if (req.body.password) {
      password = await bcrypt.hash(req.body.password, salt);
    }
    req.body.password !== ""
      ? CustomerRep.findByIdAndUpdate(
          req.body.id,
          { password, name, email, phone },
          (err) => {
            if (err) {
              res.send(err);
              return;
            }
            res.status(200).json({ message: "Record has been Updated..!!" });
          }
        )
      : CustomerRep.findByIdAndUpdate(
          req.body.id,
          { name, email, phone },
          (err) => {
            if (err) {
              res.send(err);
              return;
            }
            res.status(200).json({ message: "Record has been Updated..!!" });
          }
        );

    console.log("updateCustomerRep");
  }
};
