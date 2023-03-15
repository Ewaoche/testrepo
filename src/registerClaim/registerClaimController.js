const RegisterClaim = require('../../models/registerClaim');

const createRegisterClaim = async (req, res, next) => {
  try {
    const { policyNumber, claimNumber, liabilityNumber, claimant, amount, reserveDate } = req.body;
    const registerClaim = await RegisterClaim.create({ policyNumber, claimNumber, liabilityNumber, claimant, amount, reserveDate });
    res.status(201).json({ success: true, data: registerClaim });
  } catch (error) {
    next(error);
  }
};

const getRegisterClaimByPolicyNumber = async (req, res, next) => {
  try {
    const { policyNumber } = req.params;
    const registerClaim = await RegisterClaim.findOne({ policyNumber });
    if (!registerClaim) {
      return res.status(404).json({ success: false, error: 'Register claim not found' });
    }
    res.status(200).json({ success: true, data: registerClaim });
  } catch (error) {
    next(error);
  }
};

module.exports = { createRegisterClaim, getRegisterClaimByPolicyNumber };
