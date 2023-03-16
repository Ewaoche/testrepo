const Policy = require('../../models/Policy')
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('../General/handlerFactory')

const getAllPolicies = getAll(Policy)
const getOnePolicy = getOne(Policy, [['pending_claims']])
const createPolicy = createOne(Policy)
const updatePolicy = updateOne(Policy)
const deletePolicy = deleteOne(Policy)

module.exports = {
  getAllPolicies,
  getOnePolicy,
  updatePolicy,
  createPolicy,
  deletePolicy,
}
