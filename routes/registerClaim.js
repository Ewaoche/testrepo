const express = require('express');
const router = express.Router();
const { createRegisterClaim, getRegisterClaimByPolicyNumber } = require('../src/registerClaim/registerClaimController');

router.post('/', createRegisterClaim);
router.get('/:policyNumber', getRegisterClaimByPolicyNumber);

module.exports = router;
