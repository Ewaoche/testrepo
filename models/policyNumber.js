const mongoose = require('mongoose');

const policyNumberSchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    required: true,
    unique: true
  },
  lossDate: {
    type: Date,
    required: true
  },
  policyItem: {
    type: String,
    required: true
  },
  claimStatus: {
    type: String,
    required: true
  },
  notificationDate: {
    type: Date,
    required: true
  }
});

const PolicyNumber = mongoose.model('PolicyNumber', policyNumberSchema);

module.exports = PolicyNumber;
