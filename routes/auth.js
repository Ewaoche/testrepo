const AuthenticationControllers = require('../src/Authentication/auth')
const express = require('express')

const authRouter = express.Router()

authRouter.post('/register', AuthenticationControllers.register)
authRouter.post('/login', AuthenticationControllers.login)

module.exports = authRouter
