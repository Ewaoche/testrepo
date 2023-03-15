const { Router } = require('express')
const {
  getAllPolicies,
  createPolicy,
  getOnePolicy,
  updatePolicy,
  deletePolicy,
} = require('../src/Policy/policy.controller')

const policyRouter = Router()

/**
 * @todo
 *
 * Implement route protection for specific endpoints
 * Access restriction and Etc
 */

policyRouter.route('/').get(getAllPolicies).post(createPolicy)

policyRouter
  .route('/:policyID')
  .get(getOnePolicy)
  .patch(updatePolicy)
  .delete(deletePolicy)

module.exports = policyRouter
