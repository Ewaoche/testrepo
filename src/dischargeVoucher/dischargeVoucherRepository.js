const DischargeVoucher = require('../models/dischargeVoucher');

exports.create = async (data) => {
  const dischargeVoucher = new DischargeVoucher(data);
  return await dischargeVoucher.save();
};

exports.findAll = async () => {
  return await DischargeVoucher.find();
};

exports.findByPolicyNumberAndClaimNumber = async (policyNumber, claimNumber) => {
  return await DischargeVoucher.findOne({ policyNumber, claimNumber });
};
