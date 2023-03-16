const { MongoDBCrudRepository } = require('../General/GeneralRepository')
const Claim = require('../../models/Claim')

const storage_type = process.env.DB_TYPE || 'mongodb'

class ClaimMongoRepository {
  #mongoCrudRepo = new MongoDBCrudRepository(Claim)

  async getOneClaim(id) {
    return this.#mongoCrudRepo.getOne(id, [
      ['participant', 'name title'],
      ['policy'],
    ])
  }

  async getAllClaims(query) {
    return this.#mongoCrudRepo.getAll(query)
  }

  async updateClaim(id, data) {
    return this.#mongoCrudRepo.updateOne(id, data, ['status', 'participant'])
  }

  async createClaim(body) {
    return this.#mongoCrudRepo.createOne(body)
  }
  async deleteClaim(id) {
    return this.#mongoCrudRepo.deleteOne(id)
  }
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
