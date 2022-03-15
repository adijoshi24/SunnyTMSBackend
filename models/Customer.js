const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema({
  customerRep: {
    type: String,
    required: true,
  },
  customerFullName: {
    type: String,
    required: true,
  },
  shippingManager: {
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
  accountPayable: {
    type: String,
    required: true,
  },
  accountPayableEmail: {
    type: String,
    required: true,
  },
  accountPayablePhoneNumber: {
    type: Number,
    required: true,
  },
});

module.exports = Customer = mongoose.model("customer", CustomerSchema);
