const mongoose = require("mongoose");
const CustomerRepSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  role: {
    type: Number,
    required: true,
  },
});

module.exports = CustomerRep = mongoose.model("customerRep", CustomerRepSchema);
