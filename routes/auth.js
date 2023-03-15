const AuthenticationControllers = require('../src/Authentication/auth')
const express = require('express');

const router = express.Router();

router.post('/register', AuthenticationControllers.register);
router.post('/login', AuthenticationControllers.login);


module.exports = router;


