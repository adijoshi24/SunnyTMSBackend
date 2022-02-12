const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const OperationsTeamController = require("../../controllers/operationsTeamController");

const formValidation = [
  check("role", "Please enter a valid Role").notEmpty(),
  check("name", "Please enter a valid Name").notEmpty(),
  check("phone", "Please enter a valid Phone Number")
    .notEmpty()
    .isNumeric()
    .isLength({ min: 10 }),
  check("email", "Please enter a valid Email")
    .notEmpty()
    .normalizeEmail()
    .isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
];
//Route POST api/operations-team
//@desc Add an Operations Team
router.post("/add", formValidation, OperationsTeamController.addOperationsTeam);
//Route POST api/operations-team
//@desc Operations Team data for table
router.post("/", OperationsTeamController.getOperationsTeam);
//Route POST api/edit-operations-team
//@desc Edit an Operations Team detail
router.post(
  "/edit-operations-team",
  OperationsTeamController.updateOperationsTeam
);
//Route POST api/delete-operations-team
//@desc Delete an Operations Team
router.post("/delete", OperationsTeamController.deleteOperationsTeam);

module.exports = router;
