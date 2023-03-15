const mongoose = require('mongoose');

const registerClaimSchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    required: true
  },
  claimNumber: {
    type: String,
    required: true,
    unique: true
  },
  liabilityNumber: {
    type: String,
    required: true
  },
  claimant: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  reserveDate: {
    type: Date,
    required: true
  }
});

const RegisterClaim = mongoose.model('RegisterClaim', registerClaimSchema);

module.exports = RegisterClaim;
