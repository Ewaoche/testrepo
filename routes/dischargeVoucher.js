const express = require('express');
const router = express.Router();

// Load dischargeVoucher controller
const dischargeVoucherController = require('../src/dischargeVoucher/dischargeVoucherController');

// POST request for creating a new discharge voucher
router.post('/', dischargeVoucherController.createDischargeVoucher);

// GET request for fetching all discharge vouchers
router.get('/', dischargeVoucherController.getAllDischargeVouchers);

// GET request for fetching a specific discharge voucher by ID
router.get('/:id', dischargeVoucherController.getDischargeVoucherById);

// PUT request for updating a specific discharge voucher by ID
router.put('/:id', dischargeVoucherController.updateDischargeVoucherById);

// DELETE request for deleting a specific discharge voucher by ID
router.delete('/:id', dischargeVoucherController.deleteDischargeVoucherById);

module.exports = router;
