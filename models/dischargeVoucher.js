const mongoose = require('mongoose');

const dischargeVoucherSchema = new mongoose.Schema({
  policyNumber: {
    type: String, 
    required: true },
  claimNumber: { 
    type: String, 
    required: true },
  voucherType: { 
    type: String, 
    required: true },
  paymentDate: { 
    type: Date, 
    required: true },
  claimantName: { 
    type: String,
    required: true },
  reserveList: { 
    type: String, 
    required: true },
  signedDate: { 
    type: Date, required: 
    true },
  receivedDate: { 
    type: Date, 
    required: true }
});

module.exports = mongoose.model('DischargeVoucher', dischargeVoucherSchema);
