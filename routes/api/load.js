const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const loadController = require("../../controllers/loadController");

const formValidation = [
  check("customerName", "Customer Name is required").notEmpty(),
  check("customerAmount", "Customer Amount is required").notEmpty(),
  check("carrierAmount", "Carrier Amount is required").notEmpty(),
  check("pickShipperName", "pickShipperName is required").notEmpty(),
  check("pickAddress", "pickAddress is required").notEmpty(),
  check("pickCity", "pickCity is required").notEmpty(),
  check("pickState", "pickState is required").notEmpty(),
  check("pickZip", "pickZip is required").notEmpty(),
  check("pickDate", "pickDate is required").notEmpty(),
  check("pickTime", "pickTime is required").notEmpty(),
  check("pickReferenceId", "pickReferenceId is required").notEmpty(),
  check("pickPONumber", "pickPONumber is required").notEmpty(),
  check("pickStopType", "pickStopType is required").notEmpty(),
  check("pickCommodity", "pickCommodity is required").notEmpty(),
  check("pickWeight", "pickWeight is required").notEmpty(),
  check("pickNotes", "pickNotes is required").notEmpty(),
  check("pickSpecialInstruction", "Special Instruction is required").notEmpty(),
  check("dropReceiverName", "Receiver Name is required").notEmpty(),
];
//Route POST api/load
//@desc Add a Load
router.post("/add-load", loadController.addLoad);
//Route POST api/load
//@desc all the "load" data for table
router.post("/", loadController.getLoad);
//Route POST api/edit-load
//@desc Edit a Customer Rep detail
router.post("/edit-load", loadController.updateLoad);
//Route POST api/remove-load
//@desc Delete a Customer Rep
router.post("/remove-load", loadController.deleteLoad);

module.exports = router;
