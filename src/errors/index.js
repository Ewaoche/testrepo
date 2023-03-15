const UnAuthenticated = require('./unAuthenticated')
const NotFound = require('./not-found')
const BadRequest = require('./badRequest')
const InternalServerError = require('./internalError')
const RestrictedError = require('./Restricted')

module.exports = {
  UnAuthenticated,
  BadRequest,
  NotFound,
  InternalServerError,
  RestrictedError,
}
