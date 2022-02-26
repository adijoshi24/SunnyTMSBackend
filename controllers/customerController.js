const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Customer = require("../models/Customer");

exports.addCustomer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { customerFullName, customerRep } = req.body;
  try {
    // See if user exists

    // let CustomerData = await Customer.findOne({ customerFullName });
    // if (CustomerData) {
    //   return res
    //     .status(400)
    //     .json({ errors: [{ msg: "Customer already exists" }] });
    // }

    CustomerData = new Customer(req.body);
    console.log("addCustomer");

    await CustomerData.save();
    res.status(200).json({
      message: "Customer added successfully",
      CustomerData,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getCustomer = async (req, res) => {
  const customerList = await Customer.find({});

  try {
    res.status(200).json({
      message: "Customer fetched successfully",
      customerList,
    });
  } catch (error) {
    res.status(500).send(error);
  }

  console.log("getCustomer");
};

exports.deleteCustomer = async (req, res) => {
  Customer.deleteOne({ _id: req.body.id }, (err) => {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json({
        message: "Customer deleted successfully",
      });
    }
  });

  console.log("deleteCustomer");
};

exports.updateCustomer = async (req, res) => {
  Customer.findByIdAndUpdate(req.body._id, { $set: req.body }, (err) => {
    if (err) {
      res.send(err);
      return;
    }
    res.status(200).json({ message: "Record has been Updated..!!" });
  });

  console.log("updateCustomer");
};
