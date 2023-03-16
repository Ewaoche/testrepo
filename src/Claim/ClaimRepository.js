const { MongoDBCrudRepository } = require('../General/GeneralRepository')
const Claim = require('../../models/Claim')

const storage_type = process.env.DB_TYPE || 'mongodb'

class ClaimMongoRepository {
  mongoCrudRepo = new MongoDBCrudRepository(Claim)

  async getOneClaim(id) {
    return this.mongoCrudRepo.getOne(id, [
      ['participant', 'name title'],
      ['policy'],
    ])
  }

  getAllClaims = this.mongoCrudRepo.getAll
  updateClaim = async (id, data) =>
    this.mongoCrudRepo.updateOne(id, data, ['status', 'participant'])
  createClaim = this.mongoCrudRepo.createOne
  deleteClaim = this.mongoCrudRepo.deleteOne
}

class ClaimRepository {
  static getRepositoryInstance() {
    switch (storage_type) {
      case 'mongodb':
        return new ClaimMongoRepository()

      default:
        throw new Error('DB_TYPE is not defined')
    }
  }
}

module.exports = ClaimRepository
