const express = require('express');
const router = express.Router();
const Claim = require('../models/Claim');

// POST route for creating a new claim
router.post('/', async (req, res) => {
  try {
    const { policyNumber, claimNumber, liabilityNumber, claimant, amount, reserveDate } = req.body;
    const claimObj = new Claim({ policyNumber, claimNumber, liabilityNumber, claimant, amount, reserveDate });
    await claimObj.save();
    res.status(201).json({ success: true, message: 'Claim created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while creating the claim.' });
  }
});

module.exports = router;
