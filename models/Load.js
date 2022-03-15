const mongoose = require("mongoose");
const LoadSchema = new mongoose.Schema({
  accessorials: {
    // type: String,
    required: false,
  },
  status: {
    // type: String,
    required: false,
  },
  margin: {
    type: Number,
    required: false,
  },
  customerRep: {
    type: String,
    required: false,
  },
  // slide 1
  customerName: {
    type: String,
    // required: true,
  },
  loadID: {
    type: String,
    // required: true,
  },
  customerAmount: {
    type: String,
    // required: true,
  },
  carrierAmount: {
    type: String,
    // required: true,
  },
  // slide 2
  pickShipperName: {
    type: String,
    // required: true,
  },
  pickAddress: {
    type: String,
    // required: true,
  },
  pickCity: {
    type: String,
    // required: true,
  },
  pickState: {
    type: String,
    // required: true,
  },
  pickZip: {
    type: String,
    // required: true,
  },
  pickDate: {
    type: Date,
    // required: true,
  },
  pickTime: {
    type: String,
    // required: true,
  },
  // slide 3
  pickReferenceId: {
    type: String,
    // required: true,
  },
  pickPONumber: {
    type: String,
    // required: true,
  },
  pickStopType: {
    type: String,
    // required: true,
  },
  pickCommodity: {
    type: String,
    // required: true,
  },
  pickWeight: {
    type: String,
    // required: true,
  },
  // slide4
  pickNotes: {
    type: String,
    // required: true,
  },
  pickSpecialInstruction: {
    type: String,
    // required: true,
  },
  // slide 5
  dropReceiverName: {
    type: String,
    // required: true,
  },
  dropAddress: {
    type: String,
    // required: true,
  },
  dropCity: {
    type: String,
    // required: true,
  },
  dropState: {
    type: String,
    // required: true,
  },
  dropZip: {
    type: String,
    // required: true,
  },
  dropDate: {
    type: Date,
    // required: true,
  },
  dropTime: {
    type: String,
    // required: true,
  },
  // slide 6
  dropReferenceId: {
    type: String,
    // required: true,
  },
  dropPONumber: {
    type: String,
    // required: true,
  },
  dropStopType: {
    type: String,
    // required: true,
  },
  // slide 7
  dropNotes: {
    type: String,
    // required: true,
  },
  dropSpecialInstruction: {
    type: String,
    // required: true,
  },
  trailerType: {
    type: String,
    // required: true,
  },
  pickPUNumber: {
    type: String,
    // required: true,
  },
  pickReferenceId1: {
    type: String,
    // required: true,
  },
  pickReferenceId2: {
    type: String,
    // required: true,
  },
  pickReferenceId3: {
    type: String,
    // required: true,
  },
  pickReferenceId4: {
    type: String,
    // required: true,
  },
  pickReferenceId5: {
    type: String,
    // required: true,
  },
  pickCarrierNotes: {
    type: String,
    // required: true,
  },
  dropCarrierNotes: {
    type: String,
    // required: true,
  },
  dropDeliveryNumber: {
    type: String,
    // required: true,
  },
  dropReferenceId1: {
    type: String,
    // required: true,
  },
  dropReferenceId2: {
    type: String,
    // required: true,
  },
  dropReferenceId3: {
    type: String,
    // required: true,
  },
  dropReferenceId4: {
    type: String,
    // required: true,
  },
  dropReferenceId5: {
    type: String,
    // required: true,
  },
  dropReferenceId6: {
    type: String,
    // required: true,
  },
});

module.exports = Load = mongoose.model("load", LoadSchema);
