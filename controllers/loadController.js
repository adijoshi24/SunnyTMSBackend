const { validationResult } = require("express-validator");
const Load = require("../models/Load");
const connectDB = require("../config/db");

exports.addLoad = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    LoadData = new Load(req.body);
    console.log("LoadData", LoadData);

    await LoadData.save();
    res.status(200).json({
      message: "Load added successfully",
      LoadData,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getLoad = async (req, res) => {
  const { role, name } = req.body;
  console.log("loads req.body", req.body);
  var loadList;
  if (
    role == 1 ||
    role == "Carrier Operations" ||
    role == "After Hour Operations"
  ) {
    console.log("loads role 1");
    var loadList = await Load.find({});
  } else if (role == 2) {
    console.log("loads role 2");
    var loadList = await Load.find({
      customerRep: name,
      status: { $ne: "Deliver" },
    });
  }

  try {
    return res.status(200).json({
      message: "Loads fetched successfully",
      loadList,
    });
  } catch (error) {
    res.status(500).send(error);
  }
  console.log("getLoad");
};

exports.deleteLoad = async (req, res) => {
  Load.deleteOne({ _id: req.body.id }, (err) => {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json({
        message: "Load deleted successfully",
      });
    }
  });
  console.log("deleteLoad");
};

exports.updateLoad = async (req, res) => {
  const { accessorials, status, margin, dropNotes } = req.body;
  console.log("req edit load", req.body);
  Load.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        ...req.body,
        accessorials: accessorials,
        status: status,
        margin: margin,
      },
    },
    { upsert: true },
    (err) => {
      if (err) {
        res.send(err);
        return;
      }
      res.status(200).json({ message: "Record has been Updated..!!" });
    }
  );

  console.log("updateLoad", req.body._id);
};
