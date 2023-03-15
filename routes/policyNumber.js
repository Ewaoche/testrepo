const express = require('express');
const router = express.Router();
const PolicyNumber = require('../models/PolicyNumber');

// POST route for creating a new policy number
router.post('/', async (req, res) => {
  try {
    const { policyNumber, lossDate, policyItem, claimStatus, notificationDate } = req.body;
    const policyNumberObj = new PolicyNumber({ policyNumber, lossDate, policyItem, claimStatus, notificationDate });
    await policyNumberObj.save();
    res.status(201).json({ success: true, message: 'Policy number created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while creating the policy number.' });
  }
});

// GET route for retrieving an existing policy number
router.get('/:policyNumber', async (req, res) => {
  try {
    const policyNumber = await PolicyNumber.findOne({ policyNumber: req.params.policyNumber });
    if (policyNumber) {
      res.status(200).json({ success: true, policyNumber });
    } else {
      res.status(404).json({ success: false, message: 'Policy number not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while retrieving the policy number.' });
  }
});

module.exports = router;
