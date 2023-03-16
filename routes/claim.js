const { Router } = require('express')
const {
  getAllClaims,
  createClaim,
  getOneClaim,
  updateClaim,
  deleteClaim,
  updateClaimStatus,
} = require('../src/Claim/claim.controller')

const claimRouter = Router({ mergeParams: true })

/**
 * @todo
 *
 * Implement route protection for specific endpoints
 * Access restriction and Etc
 */

claimRouter.route('/').get(getAllClaims).post(createClaim)

claimRouter
  .route('/:claimID')
  .get(getOneClaim)
  .patch(updateClaim)
  .delete(deleteClaim)

claimRouter.patch('/:claimID/status', updateClaimStatus)

module.exports = claimRouter
