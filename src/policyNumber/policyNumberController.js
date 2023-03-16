const PolicyNumber = require('../../models/policyNumber');

exports.getPolicyNumbers = async (req, res, next) => {
  try {
    const policyNumbers = await PolicyNumber.find();
    res.status(200).json({
      success: true,
      count: policyNumbers.length,
      data: policyNumbers
    });
  } catch (error) {
    next(error);
  }
};

exports.getPolicyNumber = async (req, res, next) => {
  try {
    const policyNumber = await PolicyNumber.findById(req.params.id);
    if (!policyNumber) {
      return res.status(404).json({
        success: false,
        error: 'Policy number not found'
      });
    }
    res.status(200).json({
      success: true,
      data: policyNumber
    });
  } catch (error) {
    next(error);
  }
};

exports.createPolicyNumber = async (req, res, next) => {
  try {
    const policyNumber = await PolicyNumber.create(req.body);
    res.status(201).json({
      success: true,
      data: policyNumber
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePolicyNumber = async (req, res, next) => {
  try {
    const policyNumber = await PolicyNumber.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!policyNumber) {
      return res.status(404).json({
        success: false,
        error: 'Policy number not found'
      });
    }
    res.status(200).json({
      success: true,
      data: policyNumber
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePolicyNumber = async (req, res, next) => {
  try {
    const policyNumber = await PolicyNumber.findByIdAndDelete(req.params.id);
    if (!policyNumber) {
      return res.status(404).json({
        success: false,
        error: 'Policy number not found'
      });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
