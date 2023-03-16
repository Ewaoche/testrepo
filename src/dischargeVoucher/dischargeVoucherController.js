const DischargeVoucher = require('../../models/dischargeVoucher');
const ErrorResponse = require('../../utils/errorResponse');

// @desc    Create new discharge voucher
// @route   POST /api/discharge-vouchers
// @access  Public
exports.createDischargeVoucher = async (req, res, next) => {
  try {
    const { policyNumber, claimNumber, voucherType, paymentDate, claimantName, reserveList, signedDate, receivedDate } = req.body;

    // Check if policy number and claim number combination already exists
    const existingVoucher = await DischargeVoucher.findOne({ policyNumber, claimNumber });
    if (existingVoucher) {
      return next(new ErrorResponse('A discharge voucher with this policy number and claim number already exists', 400));
    }

    // Create new discharge voucher
    const dischargeVoucher = new DischargeVoucher({
      policyNumber,
      claimNumber,
      voucherType,
      paymentDate,
      claimantName,
      reserveList,
      signedDate,
      receivedDate
    });

    await dischargeVoucher.save();

    res.status(201).json({ success: true, data: dischargeVoucher });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all discharge vouchers
// @route   GET /api/discharge-vouchers
// @access  Public
exports.getDischargeVouchers = async (req, res, next) => {
  try {
    const dischargeVouchers = await DischargeVoucher.find();

    res.status(200).json({ success: true, data: dischargeVouchers });
  } catch (err) {
    next(err);
  }
};


exports.getDischargeVoucherById = async (req, res, next) => {
  try {
    const dischargeVouchers = await DischargeVoucher.find();

    res.status(200).json({ success: true, data: dischargeVouchers });
  } catch (err) {
    next(err);
  }
};

