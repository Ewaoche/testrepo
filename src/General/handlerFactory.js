const QueryHandler = require('./queryHandler')
const { BadRequest, NotFound, RestrictedError } = require('../errors')

const { default: mongoose, Model } = require('mongoose')

const confirmExistence = (doc, docName) => {
  if (!doc) {
    return Error(`No ${docName} found with that ID`)
  }
  return false
}

exports.deleteOne = (Model) => async (req, res, next) => {
  const id = req.params[Model.modelName.toLowerCase() + 'ID']
  const [valid, invalid] = exports.validateIds(id)
  if (!valid) {
    return res.status(400).json({ message: `${invalid} is an Invalid Id` })
  }
  const doc = await Model.findByIdAndDelete(id)
  const err = confirmExistence(doc, Model.modelName)
  if (err) return res.status(404).json({ message: err.message })
  res.status(204).send()
}

/**
 * Update a Document using the cotent from body
 * @param {Object} Model Model to update its doc
 * @param {[String]} forbiddenFields array of fields not allowed to be updated
 * @returns
 */
exports.updateOne =
  (Model, forbiddenFields = []) =>
  async (req, res, next) => {
    const id = req.params[Model.modelName.toLowerCase() + 'ID']
    const [valid, invalid] = exports.validateIds(id)
    if (!valid) {
      return res.status(400).json({ message: `${invalid} is an Invalid Id` })
    }

    forbiddenFields.forEach((field) => {
      if (req.body[field]) delete req.body[field]
    })

    // If There is a loggedIn User set updatedBy
    if (req.user) req.body.updatedBy = req.user._id

    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    const err = confirmExistence(doc, Model.modelName)
    if (err) return res.status(404).json({ message: err.message })
    res.status(200).json({ status: 'success', data: doc })
  }

exports.getOne = (Model, populateOptions) => async (req, res, next) => {
  const id = req.params[Model.modelName.toLowerCase() + 'ID']
  const [valid, invalid] = exports.validateIds(id)
  if (!valid) {
    return res.status(400).json({ message: `${invalid} is an Invalid Id` })
  }
  let query = Model.findById(id)
  if (populateOptions) {
    populateOptions.forEach((option) => {
      query = query.populate(...option)
    })
  }
  const doc = await query
  const err = confirmExistence(doc, Model.modelName)
  if (err) return next(new NotFound(err.message))
  res.status(200).json({ status: 'succcess', data: doc })
}

/**
 * Retrieve All Documents from a Model.
 * Uses query string to execut Pagination Projection Sorting
 * @param {import('mongoose').Models} Model Model to retrieve from
 * @param {(data:Document)=>any} restructureFunction (optional) a function to format the output
 * @returns
 */

exports.getAll =
  (Model, restructureFunction = null) =>
  async (req, res, next) => {
    const filter = req.filter ? req.filter : {}
    const Processor = new QueryHandler(Model, { ...req.query, ...filter })
    let results = await Processor.process()
    if (restructureFunction) results = results.map(restructureFunction)
    res
      .status(200)
      .json({ status: 'success', result: results.length, data: results })
  }

/**
 *
 * @param {Model} Model
 * @param {(body:object)=>Error | undefined} validator To validate the body
 * @param {(doc:Document, user:Document)=> Promise<void>} callback Possible callback to execute
 * on the newly created document
 * @returns
 */

exports.createOne =
  (Model, validator = false, callback = false) =>
  async (req, res, next) => {
    // Validate Body if validator is passed
    if (validator) {
      const { error } = validator(req.body)
      if (error) return next(new BadRequest(error.message))
    }

    // If There is a loggedIn User set createdBy
    if (req.user) req.body.createdBy = req.user._id
    const newDoc = await Model.create(req.body)
    callback && (await callback(newDoc, req.user))
    res.status(201).json({ status: 'success', data: newDoc })
  }

/**
 *
 * @param {Model} Model the Model / Table
 * @param {[String]} prohibited List of fields not allowed to be edited by user
 * @returns {Function}
 */
exports.updateMe =
  (Model, prohibited = []) =>
  async (req, res, next) => {
    const data = req.body

    if (data.hasOwnProperty('password') || data.hasOwnProperty('type'))
      return res.status(200).json({ message: 'Unauthorized field included!' })

    // Remove prohibited Fields
    prohibited.forEach((field) => {
      if (data.hasOwnProperty(field)) delete data[field]
    })
    const updated = await Model.findByIdAndUpdate(req.user._id, data, {
      new: true,
    })
    res.status(200).json({ status: 'success', data: updated })
  }

/**
 * Validate if a field is a valid Mongoose ID
 * @param {[String]} keyValues An array of potential mongoose Ids
 * @return {[Boolean, String]} an Array with first value of validity status and second value that fails
 */

exports.validateIds = (...keyValues) => {
  for (const val of keyValues)
    if (!mongoose.Types.ObjectId.isValid(val)) return [false, val]
  return [true, null]
}
