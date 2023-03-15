const asyncHandler = require('../../middleware/async')
const Claim = require('../../models/Claim')
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} = require('../General/handlerFactory')
const handlerNotImplemented = require('../General/handlerNotImplemented')

const updateClaimStatus = asyncHandler(handlerNotImplemented)

const getAllClaims = getAll(Claim)
const createClaim = createOne(Claim)
const getOneClaim = getOne(Claim, [['participant', 'name title'], ['policy']])
const updateClaim = updateOne(Claim, ['status', 'participant'])
const deleteClaim = deleteOne(Claim)

module.exports = {
  getAllClaims,
  createClaim,
  getOneClaim,
  updateClaim,
  deleteClaim,
  updateClaimStatus,
}
