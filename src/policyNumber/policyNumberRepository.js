const PolicyNumber = require('../models/policyNumber');

exports.getPolicyNumbers = async () => {
  return await PolicyNumber.find();
};

exports.getPolicyNumberById = async (id) => {
  return await PolicyNumber.findById(id);
};

exports.createPolicyNumber = async (policyNumber) => {
  return await PolicyNumber.create(policyNumber);
};

exports.updatePolicyNumber = async (id, policyNumber) => {
  return await PolicyNumber.findByIdAndUpdate(id, policyNumber, {
    new: true,
    runValidators: true
  });
};

exports.deletePolicyNumber = async (id) => {
  return await PolicyNumber.findByIdAndDelete(id);
};
