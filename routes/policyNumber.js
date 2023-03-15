const express = require('express');
const {
  getPolicyNumbers,
  getPolicyNumber,
  createPolicyNumber,
  updatePolicyNumber,
  deletePolicyNumber
} = require('../src/policyNumber/policyNumberController');

const router = express.Router();

router.route('/').get(getPolicyNumbers).post(createPolicyNumber);

router
  .route('/:id')
  .get(getPolicyNumber)
  .put(updatePolicyNumber)
  .delete(deletePolicyNumber);

module.exports = router;
