const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const CustomerController = require("../../controllers/customerController");

const formValidation = [
  check("customerFullName", "Customer Name is required").notEmpty(),
  check("shippingManager", "Shipping Manager is required").notEmpty(),
  check("phone", "Phone number is required")
    .notEmpty()
    .isNumeric()
    .isLength({ min: 10 }),
  check("email", "Email is required").notEmpty().normalizeEmail().isEmail(),
  check("accountPayable", "Account Payable is required").notEmpty(),
  check("accountPayableEmail", "Account Payable Email is required")
    .notEmpty()
    .normalizeEmail()
    .isEmail(),
  check("accountPayablePhoneNumber", "Account Payable Phone number is required")
    .notEmpty()
    .isNumeric()
    .isLength({ min: 10 }),
];
//Route POST api/customer
//@desc Add a Customer
router.post("/add", formValidation, CustomerController.addCustomer);
//Route GET api/customer
//@desc Customer data for table
router.get("/", CustomerController.getCustomer);
//Route POST api/edit-customer
//@desc Edit a Customer detail
router.post("/edit-customer", CustomerController.updateCustomer);
//Route POST api/delete-customer
//@desc Delete a Customer
router.post("/delete-customer", CustomerController.deleteCustomer);

module.exports = router;
