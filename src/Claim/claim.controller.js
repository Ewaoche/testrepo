const asyncHandler = require('../../middleware/async')
const handlerNotImplemented = require('../General/handlerNotImplemented')
const ClaimRepository = require('./ClaimRepository')

const repository = ClaimRepository.getRepositoryInstance()

const updateClaimStatus = asyncHandler(handlerNotImplemented)

const getAllClaims = asyncHandler(async (req, res, next) => {
  const filter = req.query
  const results = await repository.getAllClaims(filter)
  res.status(200).json({
    success: true,
    count: results.length,
    data: results,
  })
})

const createClaim = asyncHandler(async (req, res, next) => {
  const body = req.body

  /**
   * @todo
   * Do some validations
   */
  const data = await repository.createClaim(body)

  res.status(201).json({
    success: true,
    data,
  })
})

const getOneClaim = asyncHandler(async (req, res, next) => {
  const id = req.params.claimID
  const data = await repository.getOneClaim(id)
  res.status(200).json({
    success: true,
    data,
  })
})

const updateClaim = asyncHandler(async (req, res, next) => {
  const id = req.params.claimID
  const body = req.body
  const data = await repository.updateClaim(id, body)
  res.status(200).json({
    success: true,
    data,
  })
})
const deleteClaim = asyncHandler(async (req, res, next) => {
  const id = req.params.claimID
  await repository.deleteClaim(id)
  res.status(204).send()
})

module.exports = {
  getAllClaims,
  createClaim,
  getOneClaim,
  updateClaim,
  deleteClaim,
  updateClaimStatus,
}
