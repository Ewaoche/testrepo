const authRouter = require('./auth')
const claimRouter = require('./claim')
const participantRouter = require('./participant')
const policyRouter = require('./policy')

/**
 * Registers Application routers
 * @param {Express} app
 */
module.exports = (app) => {
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/participants', participantRouter)
  app.use('/api/v1/policies', policyRouter)
  app.use('/api/v1/claims', claimRouter)
}
