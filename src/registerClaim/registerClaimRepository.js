const RegisterClaim = require('../../models/registerClaim');

const create = async (data) => {
  return RegisterClaim.create(data);
};

const getByPolicyNumber = async (policyNumber) => {
  return RegisterClaim.findOne({ policyNumber });
};

module.exports = { create, getByPolicyNumber };
