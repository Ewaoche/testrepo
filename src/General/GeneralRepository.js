const { Model, Document } = require('mongoose')
const { NotFound } = require('../errors')
const QueryHandler = require('./queryHandler')

/**
 * Handles CRUD operations for MongoDB
 */
class MongoDBCrudRepository {
  /**
   *
   * @param {Model} Model
   */
  constructor(Model) {
    this.Model = Model
  }

  /**
   * Retrieve all documents
   * @param {object} query a key value object used in filtering, sorting, projection, pagination
   *
   * @returns array of documents
   */
  async getAll(query = {}) {
    const Processor = new QueryHandler(this.Model, query)
    let results = await Processor.process()
    return results
  }

  /**
   * Retrive a single document bas on Id
   * @param {string | import('mongoose').ObjectId} id id of the document to fetch
   * @param {string[][]} populateOptions list of populate arguments
   */
  async getOne(id, populateOptions = []) {
    let query = this.Model.findById(id)
    if (populateOptions) {
      populateOptions.forEach((option) => {
        query = query.populate(...option)
      })
    }
    const doc = await query
    if (!doc)
      throw new NotFound(`No ${this.Model.modelName} with id: ${id} found!`)
    return doc
  }

  /**
   * Creates a new Document
   * @param {object} data object containing required fields
   * @returns {Document} new Document created
   */
  async createOne(data) {
    const newDoc = await this.Model.create(data)
    return newDoc
  }

  /**
   *
   * @param {string | import('mongoose').ObjectId} id id of the document to update
   * @param {object} data object containing required fields to update
   * @param {string[]} forbiddenFields array of fields not allowed to be edited
   * @returns {Document} updated Document
   */
  async updateOne(id, data, forbiddenFields = []) {
    forbiddenFields.forEach((field) => {
      if (req.body[field]) delete req.body[field]
    })

    const doc = await this.Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })

    if (!doc)
      throw new NotFound(`No ${this.Model.modelName} with id: ${id} found!`)
    return doc
  }

  /**
   * Deletes a document
   * @param {string | import('mongoose').ObjectId} id id of the document to delete
   */
  async deleteOne(id) {
    await this.Model.findByIdAndDelete(id)
  }
}

module.exports = {
  MongoDBCrudRepository,
}
