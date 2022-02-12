const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const CustomerRepController = require("../../controllers/customerRepController");

const formValidation = [
  check("name", "Name is required").notEmpty(),
  check("email", "Please enter a valid email").normalizeEmail().isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  check("phone", "Please enter a valid Phone Number")
    .notEmpty()
    .isNumeric()
    .isLength({ min: 10 }),
  check("role", "Role is missing").notEmpty().isNumeric(),
];
//Route POST api/customer-rep
//@desc Add a Customer Rep
router.post("/add", formValidation, CustomerRepController.addCustomerRep);
//Route GET api/customer-rep
//@desc Customer Rep data for table
router.get("/", CustomerRepController.getCustomerRep);
//Route POST api/edit-customer-rep
//@desc Edit a Customer Rep detail
router.post("/edit-customer-rep", CustomerRepController.updateCustomerRep);
//Route POST api/delete-customer-rep
//@desc Delete a Customer Rep
router.post("/delete-customer-rep", CustomerRepController.deleteCustomerRep);

module.exports = router;
