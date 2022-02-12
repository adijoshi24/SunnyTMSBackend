const mongoose = require("mongoose");
const OperationsTeamSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  customerRep: {
    type: String,
    required: true,
  },
});

module.exports = OperationsTeam = mongoose.model(
  "operationsTeam",
  OperationsTeamSchema
);
